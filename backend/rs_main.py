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
Hey there! I'm a 21-year-old guy who loves adventure and exploring new places. I'm passionate about photography and capturing the beauty of nature. When I'm not behind the camera, you can find me hiking, biking, or just enjoying the great outdoors. I'm also a bit of a foodie and love trying out new recipes and restaurants. Music is a big part of my life, and I enjoy playing the guitar and discovering new bands. I'm looking for someone who shares my love for adventure and has a positive outlook on life. Let's create some amazing memories together!
"""
girl_bio = """
Hi! I'm a 22-year-old girl who loves to travel and experience new cultures. I'm passionate about painting and expressing myself through art. When I'm not in my studio, you can find me at the beach, practicing yoga, or reading a good book. I'm also a huge animal lover and enjoy volunteering at the local shelter. Music is my escape, and I love attending live concerts and discovering new artists. I'm looking for someone who is kind, adventurous, and has a great sense of humor. Let's explore the world and make unforgettable memories together!
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