from gensim.models import FastText
from gensim.test.utils import common_texts
import flask
import flask_cors
from flask import request, jsonify

app = flask.Flask(__name__)
flask_cors.CORS(app)

# Example corpus (replace with your own corpus)
corpus = common_texts

# Training FastText model
model = FastText(sentences=corpus, vector_size=100, window=5, min_count=1, workers=4, sg=1)
@app.route('/matchbio', methods=['POST'])
def matchbio():
    data = request.form
    bio1 = data['bio1']
    bio2 = data['bio2']
    result = model.wv.n_similarity(bio1, bio2)
    return jsonify({'result': str(result)}), 200

# For Features like Gender / Age / Orientation
@app.route('/matchPref', methods=['POST'])
def matchPref():
    data = request.form
    gender1 = data['gender1']
    orientation1 = data['orientation1']
    age1 = int(data['age1'])
    gender2 = data['gender2']
    orientation2 = data['orientation2']
    age2 = int(data['age2'])
    
# # 0. Checking Gender Compatibility (Simplified)
#     if gender1 == gender2:  ### Wrong???
#         gender_compatible = False
#     else:
#         gender_compatible = True

# 1. Orientation Compatibility
    orientation_compatible = False

    match (orientation1.lower(), orientation2.lower()):
        case ("heterosexual/straight", "heterosexual/straight"):
            # Straight only matches straight with different genders
            orientation_compatible = (gender1 != gender2)
        
        case ("homosexual/gay", "homosexual/gay"):
            # Gay only matches gay with same gender
            orientation_compatible = (gender1 == gender2)
        
        case ("other", "other"):
            # Other only matches other
            orientation_compatible = True
        
        case _:
            # All other combinations are incompatible
            orientation_compatible = False
        
# 2. Check Age Compatibility with Range Filter
    min_age = int(data.get('min_age', 18))  # default 18
    max_age = int(data.get('max_age', 99))  # default 99

    if 18 <= age1 <= 99 and 18 <= age2 <= 99: # Whether age is within the global limits
        if min_age <= age1 <= max_age and min_age <= age2 <= max_age: # Check to see whether within the user defined range
            age_compatible = True
        else:
            age_compatible = False
    else:
        age_compatible = False

# 3. Overall Compatibility (Combine criteria)
    overall_compatible = orientation_compatible and age_compatible # and gender_compatible - was wrong???

    return jsonify({'orientation_compatible': orientation_compatible,
                    'age_compatible': age_compatible,
                    'overall_compatible': overall_compatible,
                    'min_age': min_age, # Returning the min and max age to the frontend
                    'max_age': max_age}), 200


app.run ('0.0.0.0', port=5000, debug=True)
