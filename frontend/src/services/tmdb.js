// src/services/tmdb.js - SIMPLE VERSION

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

// Simple function to get fantasy movies
export const getFantasyMovies = async () => {
  try {
    const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=14`);
    const data = await response.json();
    
    return data.results.map(movie => ({
      id: movie.id,
      title: movie.title,
      poster: movie.poster_path ? `${IMAGE_URL}${movie.poster_path}` : null,
    }));
  } catch (error) {
    console.error('Error fetching fantasy movies:', error);
    return [];
  }
};