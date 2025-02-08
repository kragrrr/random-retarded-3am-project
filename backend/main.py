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
    if result >0.8:
        result = "Match"
    else:
        result = "No Match"
    return jsonify({'result': str(result)}), 200

app.run ('0.0.0.0', port=5000, debug=True)
