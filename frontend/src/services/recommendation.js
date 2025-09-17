// src/services/recommendation.js

const API_BASE_URL = 'http://localhost:3000/api'; // Your MERN backend
const ML_API_URL = 'http://127.0.0.1:5001'; // Your Flask ML API

class RecommendationService {
  // Get user's liked movies from MERN backend
  async getUserLikedMovies() {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${API_BASE_URL}/movies/user/liked`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch liked movies');
      }

      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Error fetching liked movies:', error);
      throw error;
    }
  }

  // Get recommendations from Flask ML API
  async getRecommendationsFromML(movieTitle) {
    try {
      const response = await fetch(`${ML_API_URL}/recommend`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ movie: movieTitle })
      });

      if (!response.ok) {
        throw new Error(`ML API error: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error getting ML recommendations:', error);
      throw error;
    }
  }

  // Get personalized recommendations based on user's liked movies
  async getPersonalizedRecommendations() {
    try {
      // 1. Get user's liked movies from MERN backend
      const likedMovies = await this.getUserLikedMovies();
      
      if (!likedMovies || likedMovies.length === 0) {
        return {
          success: false,
          message: 'No liked movies found. Please like some movies first!',
          recommendations: [],
          basedOn: []
        };
      }

      // 2. Get recommendations for each liked movie from ML API
      const allRecommendations = [];
      const basedOnMovies = [];
      
      // Take up to 3 most recent liked movies to base recommendations on
      const moviesToBaseOn = likedMovies.slice(0, 3);
      
      for (const movie of moviesToBaseOn) {
        try {
          const mlResult = await this.getRecommendationsFromML(movie.title);
          
          if (mlResult.success && mlResult.recommendations) {
            allRecommendations.push(...mlResult.recommendations);
            basedOnMovies.push(movie.title);
          }
        } catch (error) {
          console.warn(`Failed to get recommendations for ${movie.title}:`, error);
          // Continue with other movies even if one fails
        }
      }

      // 3. Remove duplicates and filter out movies user already liked
      const likedTitles = likedMovies.map(m => m.title.toLowerCase());
      const uniqueRecommendations = [...new Set(allRecommendations)]
        .filter(title => !likedTitles.includes(title.toLowerCase()))
        .slice(0, 20); // Limit to 20 recommendations

      return {
        success: true,
        recommendations: uniqueRecommendations,
        basedOn: basedOnMovies,
        totalFound: uniqueRecommendations.length
      };

    } catch (error) {
      console.error('Error getting personalized recommendations:', error);
      return {
        success: false,
        message: 'Failed to generate recommendations. Please try again.',
        recommendations: [],
        basedOn: []
      };
    }
  }

  // Check if ML API is healthy
  async checkMLApiHealth() {
    try {
      const response = await fetch(`${ML_API_URL}/health`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('ML API health check failed:', error);
      return { status: 'error', error: error.message };
    }
  }

  // Get recommendations for a specific movie (for manual search)
  async getRecommendationsForMovie(movieTitle) {
    try {
      const result = await this.getRecommendationsFromML(movieTitle);
      return result;
    } catch (error) {
      console.error('Error getting recommendations for movie:', error);
      throw error;
    }
  }
}

export default new RecommendationService();