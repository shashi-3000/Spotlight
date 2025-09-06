// const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
// const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
// const TMDB_API_KEY = '712c6ccc58f90c04e030cb7c14899e25';

// // DEBUG: Check if API key is loaded
// console.log('TMDB API Key:', TMDB_API_KEY);
// console.log('Full URL example:', `${TMDB_BASE_URL}/trending/movie/week?api_key=${TMDB_API_KEY}`);

// // Helper function for TMDB API calls
// const tmdbCall = async (endpoint) => {
//   try {
//     const response = await fetch(`${TMDB_BASE_URL}${endpoint}?api_key=${TMDB_API_KEY}`);
//     if (!response.ok) {
//       throw new Error('Failed to fetch from TMDB');
//     }
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('TMDB API Error:', error);
//     throw error;
//   }
// };

// // Transform TMDB movie data to your app format
// const transformMovie = (tmdbMovie) => ({
//   id: tmdbMovie.id, // TMDB ID
//   title: tmdbMovie.title,
//   poster: tmdbMovie.poster_path ? `${TMDB_IMAGE_BASE_URL}${tmdbMovie.poster_path}` : null,
//   description: tmdbMovie.overview,
//   releaseDate: tmdbMovie.release_date,
//   rating: tmdbMovie.vote_average,
//   tmdbId: tmdbMovie.id
// });

// export const tmdbAPI = {
//   // Get trending movies
//   getTrending: async () => {
//     const data = await tmdbCall('/trending/movie/week');
//     return data.results.map(transformMovie);
//   },

//   // Get top rated movies
//   getTopRated: async () => {
//     const data = await tmdbCall('/movie/top_rated');
//     return data.results.map(transformMovie);
//   },

//   // Get movies by genre
//   getMoviesByGenre: async (genreId) => {
//     const data = await tmdbCall(`/discover/movie?with_genres=${genreId}&sort_by=popularity.desc`);
//     return data.results.map(transformMovie);
//   },

//   // Search movies
//   searchMovies: async (query) => {
//     const data = await tmdbCall(`/search/movie?query=${encodeURIComponent(query)}`);
//     return data.results.map(transformMovie);
//   },

//   // Get movie details
//   getMovieDetails: async (tmdbId) => {
//     const movie = await tmdbCall(`/movie/${tmdbId}`);
//     return transformMovie(movie);
//   }
// };

// // Genre IDs from TMDB
// export const GENRE_IDS = {
//   ACTION: 28,
//   ADVENTURE: 12,
//   ANIMATION: 16,
//   COMEDY: 35,
//   CRIME: 80,
//   DOCUMENTARY: 99,
//   DRAMA: 18,
//   FAMILY: 10751,
//   FANTASY: 14,
//   HISTORY: 36,
//   HORROR: 27,
//   MUSIC: 10402,
//   MYSTERY: 9648,
//   ROMANCE: 10749,
//   SCIENCE_FICTION: 878,
//   TV_MOVIE: 10770,
//   THRILLER: 53,
//   WAR: 10752,
//   WESTERN: 37
// };


// src/services/tmdb.js - SIMPLE VERSION
// const API_KEY = '712c6ccc58f90c04e030cb7c14899e25'; // Put your actual key here
const API_KEY = import.meta.env.VITE_TMDB_API_KEY; // Put your actual key here
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

// Simple function to get trending movies
export const getTrendingMovies = async () => {
  try {
    const response = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
    const data = await response.json();
    
    return data.results.map(movie => ({
      id: movie.id,
      title: movie.title,
      poster: movie.poster_path ? `${IMAGE_URL}${movie.poster_path}` : null,
    }));
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    return [];
  }
};

// Simple function to get popular movies
export const getPopularMovies = async () => {
  try {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    const data = await response.json();
    
    return data.results.map(movie => ({
      id: movie.id,
      title: movie.title,
      poster: movie.poster_path ? `${IMAGE_URL}${movie.poster_path}` : null,
    }));
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    return [];
  }
};

// Simple function to get top rated movies
export const getTopRatedMovies = async () => {
  try {
    const response = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`);
    const data = await response.json();
    
    return data.results.map(movie => ({
      id: movie.id,
      title: movie.title,
      poster: movie.poster_path ? `${IMAGE_URL}${movie.poster_path}` : null,
    }));
  } catch (error) {
    console.error('Error fetching top rated movies:', error);
    return [];
  }
};

// Simple function to get action movies
export const getActionMovies = async () => {
  try {
    const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28`);
    const data = await response.json();
    
    return data.results.map(movie => ({
      id: movie.id,
      title: movie.title,
      poster: movie.poster_path ? `${IMAGE_URL}${movie.poster_path}` : null,
    }));
  } catch (error) {
    console.error('Error fetching action movies:', error);
    return [];
  }
};