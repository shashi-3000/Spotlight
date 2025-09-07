import React, { useState } from 'react';
import { Heart, Bookmark, X } from 'lucide-react';
import { movieAPI } from '../../services/api.js';
import { tokenUtils } from '../../services/api.js';

export default function ProfileMovieCard({ movie, type, onRemove }) {
  const [loading, setLoading] = useState(false);

  const handleUnlike = async (e) => {
    e.stopPropagation();
    
    if (!tokenUtils.isLoggedIn()) {
      alert('Please login to unlike movies');
      return;
    }

    setLoading(true);
    try {
      // Convert your database movie back to TMDB format for the API call
      const tmdbMovie = {
        id: movie.tmdbId, // This is the TMDB ID stored in your database
        title: movie.title,
        poster: movie.poster,
        overview: movie.description || movie.overview || 'No overview available'
      };

      const response = await movieAPI.toggleLike(tmdbMovie);
      
      if (response.data.action === 'unliked') {
        // Remove from UI
        onRemove(movie._id);
        alert('Movie unliked successfully!');
      }
    } catch (error) {
      console.error('Error unliking movie:', error);
      alert('Failed to unlike movie: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUnsave = async (e) => {
    e.stopPropagation();
    
    if (!tokenUtils.isLoggedIn()) {
      alert('Please login to unsave movies');
      return;
    }

    setLoading(true);
    try {
      // Convert your database movie back to TMDB format for the API call
      const tmdbMovie = {
        id: movie.tmdbId, // This is the TMDB ID stored in your database
        title: movie.title,
        poster: movie.poster,
        overview: movie.description || movie.overview || 'No overview available'
      };

      const response = await movieAPI.toggleSave(tmdbMovie);
      
      if (response.data.action === 'unsaved') {
        // Remove from UI
        onRemove(movie._id);
        alert('Movie unsaved successfully!');
      }
    } catch (error) {
      console.error('Error unsaving movie:', error);
      alert('Failed to unsave movie: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer min-w-[180px] w-[180px] relative group">
      <img
        src={movie.poster || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='450' viewBox='0 0 300 450' fill='%23374151'%3E%3Crect width='300' height='450' fill='%23374151'/%3E%3Ctext x='150' y='225' text-anchor='middle' fill='%239CA3AF' font-size='14' font-family='Arial'%3ENo Image%3C/text%3E%3C/svg%3E"}
        alt={movie.title}
        className="w-full h-64 object-cover"
      />
      
      {/* Remove Button - Show on Hover */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {type === 'liked' ? (
          <button
            onClick={handleUnlike}
            disabled={loading}
            className="p-2 rounded-full bg-red-500 hover:bg-red-600 text-white transition-colors duration-300"
            title="Unlike this movie"
          >
            {loading ? (
              <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
            ) : (
              <Heart size={16} fill="white" />
            )}
          </button>
        ) : (
          <button
            onClick={handleUnsave}
            disabled={loading}
            className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-300"
            title="Unsave this movie"
          >
            {loading ? (
              <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
            ) : (
              <Bookmark size={16} fill="white" />
            )}
          </button>
        )}
      </div>

      <div className="p-3 text-center">
        <h3 className="text-sm font-semibold text-yellow-300 truncate" title={movie.title}>
          {movie.title}
        </h3>
      </div>
    </div>
  );
}