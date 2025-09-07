//  src/services/tmdb.js 


const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

// Helper function to format movie data consistently
const formatMovieData = (movie) => ({
  id: movie.id,
  title: movie.title,
  poster: movie.poster_path ? `${IMAGE_URL}${movie.poster_path}` : null,
  // Required for backend:
  overview: movie.overview || 'No overview available',
  poster_path: movie.poster_path,
  release_date: movie.release_date,
  genre_ids: movie.genre_ids || []
});

// Get trending movies
export const getTrendingMovies = async () => {
  try {
    const response = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
    const data = await response.json();
    
    return data.results.map(formatMovieData);
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    return [];
  }
};

// Get popular movies - FIXED
export const getPopularMovies = async () => {
  try {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    const data = await response.json();
    
    return data.results.map(formatMovieData);
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    return [];
  }
};

// Get top rated movies - FIXED
export const getTopRatedMovies = async () => {
  try {
    const response = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`);
    const data = await response.json();
    
    return data.results.map(formatMovieData);
  } catch (error) {
    console.error('Error fetching top rated movies:', error);
    return [];
  }
};

// Get action movies - FIXED
export const getActionMovies = async () => {
  try {
    const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28`);
    const data = await response.json();
    
    return data.results.map(formatMovieData);
  } catch (error) {
    console.error('Error fetching action movies:', error);
    return [];
  }
};

// Get fantasy movies - FIXED
export const getFantasyMovies = async () => {
  try {
    const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=14`);
    const data = await response.json();
    
    return data.results.map(formatMovieData);
  } catch (error) {
    console.error('Error fetching fantasy movies:', error);
    return [];
  }
};