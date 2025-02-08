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
    
# 1. Checking Gender Compatibility (Simplified)
    if gender1 == gender2:  ### I'm not sure if this is the best way to check for.
        gender_compatible = False
    else:
        gender_compatible = True

# 2. Orientation Compatibility
    orientation_compatible = False
    if orientation1 == "heterosexual/straight":
        if orientation2 == "heterosexual/straight" and gender1 != gender2:
            orientation_compatible = True
    elif orientation1 == "homosexual/gay":
        if orientation2 == "homosexual/gay" and gender1 == gender2:
            orientation_compatible = True
    elif orientation1 == "other":
        orientation_compatible = True # For now, "other" is compatible with everyone.

    if orientation2 == "heterosexual/straight":
        if orientation1 == "heterosexual/straight" and gender1 != gender2:
            orientation_compatible = True
    elif orientation2 == "homosexual/gay":
        if orientation1 == "homosexual/gay" and gender1 == gender2:
            orientation_compatible = True
    elif orientation2 == "other":
        orientation_compatible = True # For now "other" is compatible with everyone.
      
# 3. Check Age Compatibility with Range Filter
    min_age = int(data.get('min_age', 18))  # default 18
    max_age = int(data.get('max_age', 99))  # default 99

    if 18 <= age1 <= 99 and 18 <= age2 <= 99: # Whether age is within the global limits
        if min_age <= age1 <= max_age and min_age <= age2 <= max_age: # Check to see whether within the user defined range
            age_compatible = True
        else:
            age_compatible = False
    else:
        age_compatible = False

# 4. Overall Compatibility (Combine criteria)
    overall_compatible = gender_compatible and orientation_compatible and age_compatible

    return jsonify({'gender_compatible': gender_compatible,
                    'orientation_compatible': orientation_compatible,
                    'age_compatible': age_compatible,
                    'overall_compatible': overall_compatible,
                    'min_age': min_age, # Returning the min and max age to the frontend
                    'max_age': max_age}), 200


app.run ('0.0.0.0', port=5000, debug=True)
