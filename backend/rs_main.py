import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.probability import FreqDist
from nltk.stem import WordNetLemmatizer

# Ensure you have the necessary NLTK data files
# nltk.download('punkt')
# nltk.download('punkt_tab')
# nltk.download('stopwords')
# nltk.download('wordnet')

# Sample bio text
boy_bio = """
I love hiking, playing guitar, and reading sci-fi novels. He enjoys cooking and outdoor adventures.
"""
girl_bio = """
I enjoy painting, hiking, and reading fantasy novels. She loves animals, cooking, and nature walks.
"""

def extract_features(text):
    tokens = word_tokenize(text.lower())
    stop_words = set(stopwords.words('english'))
    lemmatizer = WordNetLemmatizer()
    filtered_tokens = [
        lemmatizer.lemmatize(t) for t in tokens 
        if t.isalpha() and t not in stop_words
    ]
    return set(filtered_tokens)

def match_partners(features1, features2):
    overlap = features1.intersection(features2)
    return len(overlap) / ((len(features1) + len(features2)) / 2) if features1 and features2 else 0

boy_features = extract_features(boy_bio)
girl_features = extract_features(girl_bio)
score = match_partners(boy_features, girl_features)
print("Match score:", score)

if score > 0.5:
    print("These two bios are a good match!")
else:
    print("These two bios are not a good match.")