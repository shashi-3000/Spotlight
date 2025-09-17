from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import ast
import nltk
from nltk.stem.porter import PorterStemmer
import pickle
import os

app = Flask(__name__)
CORS(app)

# Global variables
movies = None
new_df = None
similarity = None
ps = None

def convert(obj):
    L = []
    for i in ast.literal_eval(obj):
        L.append(i['name'])
    return L

def convert3(obj):
    L = []
    counter = 0
    for i in ast.literal_eval(obj):
        if counter != 3:
            L.append(i['name'])
            counter += 1
        else:
            break
    return L

def fetchDirector(obj):
    L = []
    for i in ast.literal_eval(obj):
        if i['job'] == 'Director':
            L.append(i['name'])
            break
    return L

def stem(text):
    global ps
    y = []
    for i in text.split():
        y.append(ps.stem(i))
    return " ".join(y)

def load_data():
    global movies, new_df, similarity, ps
    
    try:
        print("Loading movie data...")
        
        # Initialize stemmer
        ps = PorterStemmer()
        
        # Load data
        movies = pd.read_csv("tmdb_5000_movies.csv")
        credits = pd.read_csv("tmdb_5000_credits.csv")
        
        # Merge datasets
        movies = movies.merge(credits, on='title')
        
        # Select required columns
        movies = movies[['movie_id', 'title', 'overview', 'genres', 'keywords', 'cast', 'crew']]
        movies.dropna(inplace=True)
        
        # Apply preprocessing functions
        movies['genres'] = movies['genres'].apply(convert)
        movies['keywords'] = movies['keywords'].apply(convert)
        movies['cast'] = movies['cast'].apply(convert3)
        movies['crew'] = movies['crew'].apply(fetchDirector)
        movies['overview'] = movies['overview'].apply(lambda x: x.split())
        
        # Remove spaces
        movies['genres'] = movies['genres'].apply(lambda x: [i.replace(" ", "") for i in x])
        movies['keywords'] = movies['keywords'].apply(lambda x: [i.replace(" ", "") for i in x])
        movies['cast'] = movies['cast'].apply(lambda x: [i.replace(" ", "") for i in x])
        movies['crew'] = movies['crew'].apply(lambda x: [i.replace(" ", "") for i in x])
        
        # Create tags
        movies['tags'] = movies['overview'] + movies['genres'] + movies['keywords'] + movies['cast'] + movies['crew']
        
        # Create new dataframe
        new_df = movies[['movie_id', 'title', 'tags']].copy()
        new_df['tags'] = new_df['tags'].apply(lambda x: " ".join(x))
        new_df['tags'] = new_df['tags'].apply(lambda x: x.lower())
        new_df['tags'] = new_df['tags'].apply(stem)
        
        # Check if similarity matrix exists
        if os.path.exists('similarity.pkl'):
            print("Loading pre-computed similarity matrix...")
            with open('similarity.pkl', 'rb') as f:
                similarity = pickle.load(f)
        else:
            print("Computing similarity matrix...")
            cv = CountVectorizer(max_features=5000, stop_words='english')
            vectors = cv.fit_transform(new_df['tags']).toarray()
            similarity = cosine_similarity(vectors)
            
            # Save similarity matrix
            with open('similarity.pkl', 'wb') as f:
                pickle.dump(similarity, f)
            print("Similarity matrix saved!")
        
        print("Data loaded successfully!")
        
    except Exception as e:
        print(f"Error loading data: {e}")
        raise e

def recommend(movie):
    """Get 5 movie recommendations for a given movie title"""
    global new_df, similarity
    
    try:
        # Find movie index
        movie_matches = new_df[new_df['title'].str.lower() == movie.lower()]
        
        if movie_matches.empty:
            # Try partial matching
            movie_matches = new_df[new_df['title'].str.contains(movie, case=False, na=False)]
            
        if movie_matches.empty:
            return []
            
        movie_index = movie_matches.index[0]
        
        # Get similarities
        distances = similarity[movie_index]
        movies_list = sorted(list(enumerate(distances)), reverse=True, key=lambda x: x[1])[1:6]
        
        recommendations = []
        for i in movies_list:
            recommendations.append(new_df.iloc[i[0]].title)
            
        return recommendations
        
    except Exception as e:
        print(f"Error in recommend function: {e}")
        return []

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "data_loaded": new_df is not None})

@app.route('/recommend', methods=['POST'])
def get_recommendations():
    try:
        data = request.json
        movie_title = data.get('movie', '').strip()
        
        if not movie_title:
            return jsonify({"error": "Movie title is required"}), 400
            
        recommendations = recommend(movie_title)
        
        return jsonify({
            "success": True,
            "movie": movie_title,
            "recommendations": recommendations,
            "count": len(recommendations)
        })
        
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


if __name__ == '__main__':
    # Download NLTK data if not already present
    try:
        nltk.data.find('corpora/stopwords')
    except LookupError:
        nltk.download('stopwords')
        
    try:
        nltk.data.find('tokenizers/punkt')
    except LookupError:
        nltk.download('punkt')
    
    # Load data
    load_data()
    
    print("Starting Flask server on port 5001...")
    app.run(debug=True, host='0.0.0.0', port=5001)