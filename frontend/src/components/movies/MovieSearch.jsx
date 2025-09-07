import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import MovieCard from './MovieCard';

export default function MovieSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // TMDB API configuration
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const BASE_URL = 'https://api.themoviedb.org/3';
  const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

  // Format movie data for consistency
  const formatMovieData = (movie) => ({
    id: movie.id,
    title: movie.title,
    poster: movie.poster_path ? `${IMAGE_URL}${movie.poster_path}` : null,
    poster_path: movie.poster_path,
    overview: movie.overview || 'No overview available',
    release_date: movie.release_date,
    genre_ids: movie.genre_ids || []
  });

  // Search movies function
  const searchMovies = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=1`
      );
      const data = await response.json();
      
      const formattedResults = data.results ? data.results.map(formatMovieData) : [];
      setSearchResults(formattedResults);
      setShowResults(true);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  // Debounce search to avoid too many API calls
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchMovies(searchQuery);
    }, 500); // Wait 500ms after user stops typing

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setShowResults(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      {/* Search Input */}
      <div className="relative mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search for movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-12 py-4 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/20 text-lg"
          />
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>
          )}
        </div>
        
        {loading && (
          <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-yellow-400 border-t-transparent"></div>
          </div>
        )}
      </div>

      {/* Search Results */}
      {showResults && (
        <div className="bg-gray-900 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-yellow-400">
              Search Results ({searchResults.length})
            </h2>
            {searchQuery && (
              <span className="text-gray-400">
                for "{searchQuery}"
              </span>
            )}
          </div>

          {searchResults.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {searchResults.map((movie) => (
                <MovieCard
                  key={movie.id}
                  title={movie.title}
                  poster={movie.poster}
                  movie={movie}
                />
              ))}
            </div>
          ) : searchQuery && !loading ? (
            <div className="text-center py-8">
              <p className="text-gray-400 text-lg">No movies found for "{searchQuery}"</p>
              <p className="text-gray-500 text-sm mt-2">Try searching with different keywords</p>
            </div>
          ) : null}
        </div>
      )}

      {/* Search Tips */}
      {!showResults && !searchQuery && (
        <div className="text-center text-gray-500 text-sm">
          <p>Search for your favorite movies by title</p>
          <p className="mt-1">Try searching for "Avengers", "Batman", "Star Wars", etc.</p>
        </div>
      )}
    </div>
  );
}