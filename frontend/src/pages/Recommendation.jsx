

// // export default Recommendations;
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Film, Sparkles, Heart, Search, RefreshCw, AlertCircle } from 'lucide-react';
// import recommendationService from '../services/recommendation.js';

// const Recommendations = () => {
//   const [recommendations, setRecommendations] = useState([]);
//   const [basedOnMovies, setBasedOnMovies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [mlApiStatus, setMlApiStatus] = useState(null);
//   const [searchMovie, setSearchMovie] = useState('');
//   const [searchLoading, setSearchLoading] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     checkMLApiStatus();
//     fetchRecommendations();
//   }, []);

//   const checkMLApiStatus = async () => {
//     try {
//       const status = await recommendationService.checkMLApiHealth();
//       setMlApiStatus(status);
//     } catch (error) {
//       setMlApiStatus({ status: 'error', error: error.message });
//     }
//   };

//   const fetchRecommendations = async () => {
//     try {
//       const token = localStorage.getItem('accessToken');
      
//       if (!token) {
//         navigate('/login');
//         return;
//       }

//       setLoading(true);
//       setError('');
      
//       const result = await recommendationService.getPersonalizedRecommendations();

//       if (result.success) {
//         setRecommendations(result.recommendations || []);
//         setBasedOnMovies(result.basedOn || []);
//       } else {
//         setError(result.message || 'Failed to fetch recommendations');
//         setRecommendations([]);
//         setBasedOnMovies([]);
//       }
//     } catch (error) {
//       console.error('Error fetching recommendations:', error);
//       setError('Failed to load recommendations. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearchRecommendations = async (e) => {
//     e.preventDefault();
    
//     if (!searchMovie.trim()) {
//       alert('Please enter a movie title');
//       return;
//     }

//     setSearchLoading(true);
//     try {
//       const result = await recommendationService.getRecommendationsForMovie(searchMovie.trim());
      
//       if (result.success) {
//         setRecommendations(result.recommendations || []);
//         setBasedOnMovies([searchMovie.trim()]);
//         setError('');
//       } else {
//         setError('Movie not found or failed to get recommendations');
//         setRecommendations([]);
//       }
//     } catch (error) {
//       setError('Failed to get recommendations. Make sure the ML API is running.');
//     } finally {
//       setSearchLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black pt-20">
//         <div className="container mx-auto px-4 py-8">
//           <div className="flex items-center justify-center min-h-[60vh]">
//             <div className="text-center">
//               <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-yellow-400 border-solid mx-auto mb-4"></div>
//               <p className="text-yellow-300 text-xl">Getting your personalized recommendations...</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black pt-20">
//       <div className="container mx-auto px-4 py-8">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <div className="flex items-center justify-center mb-4">
//             <Sparkles className="h-8 w-8 text-yellow-400 mr-3" />
//             <h1 className="text-4xl font-bold text-white">Your Recommendations</h1>
//             <Sparkles className="h-8 w-8 text-yellow-400 ml-3" />
//           </div>
//           <p className="text-gray-400 text-lg">
//             Personalized movie suggestions powered by AI
//           </p>
//         </div>

//         {/* ML API Status */}
//         <div className="text-center mb-6">
//           {mlApiStatus?.status === 'healthy' ? (
//             <div className="inline-flex items-center bg-green-900/30 text-green-400 px-4 py-2 rounded-full border border-green-500/30">
//               <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
//               ML Recommendation Engine Online
//             </div>
//           ) : (
//             <div className="inline-flex items-center bg-red-900/30 text-red-400 px-4 py-2 rounded-full border border-red-500/30">
//               <AlertCircle className="w-4 h-4 mr-2" />
//               ML API Offline - Start Flask server (port 5001)
//             </div>
//           )}
//         </div>

//         {/* Manual Search Section */}
//         <div className="bg-gray-800 rounded-lg p-6 mb-8">
//           <h2 className="text-xl font-semibold text-yellow-300 mb-4 flex items-center">
//             <Search className="w-5 h-5 mr-2" />
//             Get Recommendations for Any Movie
//           </h2>
//           <form onSubmit={handleSearchRecommendations} className="flex gap-4">
//             <input
//               type="text"
//               value={searchMovie}
//               onChange={(e) => setSearchMovie(e.target.value)}
//               placeholder="Enter movie title (e.g., Batman Begins, Inception...)"
//               className="flex-1 bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
//             />
//             <button
//               type="submit"
//               disabled={searchLoading || mlApiStatus?.status !== 'healthy'}
//               className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {searchLoading ? 'Searching...' : 'Get Recommendations'}
//             </button>
//           </form>
//         </div>

//         {/* Error Display */}
//         {error && (
//           <div className="bg-red-900/30 border border-red-500/30 text-red-300 p-4 rounded-lg mb-6">
//             <div className="flex items-center mb-2">
//               <AlertCircle className="w-5 h-5 mr-2" />
//               <h3 className="font-semibold">Error</h3>
//             </div>
//             <p>{error}</p>
//             {error.includes('liked movies') && (
//               <div className="mt-2">
//                 <button
//                   onClick={() => navigate('/movies')}
//                   className="text-yellow-400 hover:text-yellow-300 underline"
//                 >
//                   Browse movies to like some first →
//                 </button>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Based On Movies */}
//         {basedOnMovies.length > 0 && (
//           <div className="mb-8">
//             <div className="flex items-center mb-4">
//               <Heart className="h-5 w-5 text-red-500 mr-2" />
//               <h2 className="text-xl font-semibold text-yellow-300">
//                 Based on: 
//               </h2>
//             </div>
//             <div className="flex flex-wrap gap-2">
//               {basedOnMovies.map((movie, index) => (
//                 <span
//                   key={index}
//                   className="bg-gray-700 text-yellow-300 px-3 py-1 rounded-full text-sm border border-yellow-400/30"
//                 >
//                   {movie}
//                 </span>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Recommendations Grid */}
//         {recommendations.length > 0 ? (
//           <div>
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-2xl font-bold text-white">
//                 Recommended For You ({recommendations.length} movies)
//               </h2>
//               <button
//                 onClick={fetchRecommendations}
//                 className="flex items-center bg-transparent border border-yellow-400 hover:bg-yellow-400 hover:text-black text-yellow-400 font-semibold px-4 py-2 rounded-lg transition-colors duration-300"
//               >
//                 <RefreshCw className="w-4 h-4 mr-2" />
//                 Refresh
//               </button>
//             </div>
            
//             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
//               {recommendations.map((movieTitle, index) => (
//                 <div
//                   key={index}
//                   className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-all duration-300 cursor-pointer group hover:scale-105"
//                 >
//                   <div className="aspect-[3/4] bg-gray-700 rounded-lg mb-3 flex items-center justify-center group-hover:bg-gray-600 transition-colors duration-300">
//                     <Film className="h-12 w-12 text-gray-500 group-hover:text-gray-400" />
//                   </div>
//                   <h3 className="text-yellow-300 font-semibold text-center text-sm group-hover:text-yellow-400 transition-colors duration-300 line-clamp-2">
//                     {movieTitle}
//                   </h3>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ) : (
//           !loading && !error && (
//             <div className="text-center py-16">
//               <Film className="mx-auto mb-4 h-16 w-16 text-gray-500" />
//               <h2 className="text-2xl font-bold text-white mb-2">No Recommendations Yet</h2>
//               <p className="text-gray-400 mb-6">
//                 Like some movies first or search for a specific movie above!
//               </p>
//               <button
//                 onClick={() => navigate('/movies')}
//                 className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-full transition-colors duration-300"
//               >
//                 Explore Movies
//               </button>
//             </div>
//           )
//         )}
//       </div>
//     </div>
//   );
// };

// export default Recommendations;




import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Film, Sparkles, Heart, RefreshCw, AlertCircle } from 'lucide-react';

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [basedOnMovies, setBasedOnMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      
      if (!token) {
        navigate('/login');
        return;
      }

      setLoading(true);
      setError('');
      
      // Call your MERN backend API
      const response = await fetch('http://localhost:5000/api/movies/user/recommendations', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (result.success) {
        setRecommendations(result.data.recommendations || []);
        setBasedOnMovies(result.data.basedOn || []);
        
        if (result.data.recommendations?.length === 0) {
          setError(result.message || 'No recommendations found');
        }
      } else {
        setError(result.message || 'Failed to fetch recommendations');
        setRecommendations([]);
        setBasedOnMovies([]);
      }
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      setError('Failed to load recommendations. Make sure both your MERN backend (port 5000) and Flask ML API (port 5001) are running.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-yellow-400 border-solid mx-auto mb-4"></div>
              <p className="text-yellow-300 text-xl">Getting your personalized recommendations...</p>
              <p className="text-gray-400 text-sm mt-2">Analyzing your liked movies with AI...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="h-8 w-8 text-yellow-400 mr-3" />
            <h1 className="text-4xl font-bold text-white">Your Recommendations</h1>
            <Sparkles className="h-8 w-8 text-yellow-400 ml-3" />
          </div>
          <p className="text-gray-400 text-lg">
            AI-powered movie suggestions based on your liked movies
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-900/30 border border-red-500/30 text-red-300 p-6 rounded-lg mb-6">
            <div className="flex items-center mb-2">
              <AlertCircle className="w-5 h-5 mr-2" />
              <h3 className="font-semibold">Unable to Load Recommendations</h3>
            </div>
            <p className="mb-4">{error}</p>
            
            {error.includes('liked movies') || error.includes('No recommendations found') ? (
              <div className="space-y-2">
                <p className="text-yellow-300 font-semibold">💡 To get recommendations:</p>
                <ol className="list-decimal list-inside space-y-1 text-sm">
                  <li>Go to the Movies page</li>
                  <li>Browse and like movies you enjoy</li>
                  <li>Come back here for AI-powered suggestions!</li>
                </ol>
                <button
                  onClick={() => navigate('/movies')}
                  className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-full transition-colors duration-300"
                >
                  Explore Movies
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-yellow-300 font-semibold">🔧 Troubleshooting:</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Make sure your MERN backend is running on port 5000</li>
                  <li>Make sure your Flask ML API is running on port 5001</li>
                  <li>Check the console for detailed error messages</li>
                </ul>
                <button
                  onClick={fetchRecommendations}
                  className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-2 rounded-lg transition-colors duration-300"
                >
                  Try Again
                </button>
              </div>
            )}
          </div>
        )}

        {/* Based On Movies */}
        {basedOnMovies.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <Heart className="h-5 w-5 text-red-500 mr-2" />
              <h2 className="text-xl font-semibold text-yellow-300">
                Based on your liked movies:
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {basedOnMovies.map((movie, index) => (
                <span
                  key={index}
                  className="bg-gray-700 text-yellow-300 px-4 py-2 rounded-full text-sm border border-yellow-400/30"
                >
                  ❤️ {movie}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Recommendations Grid */}
        {recommendations.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">
                Recommended For You ({recommendations.length} movies)
              </h2>
              <button
                onClick={fetchRecommendations}
                className="flex items-center bg-transparent border border-yellow-400 hover:bg-yellow-400 hover:text-black text-yellow-400 font-semibold px-4 py-2 rounded-lg transition-colors duration-300"
                disabled={loading}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {recommendations.map((movieTitle, index) => (
                <div
                  key={index}
                  className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-all duration-300 cursor-pointer group hover:scale-105"
                >
                  <div className="aspect-[3/4] bg-gray-700 rounded-lg mb-3 flex items-center justify-center group-hover:bg-gray-600 transition-colors duration-300">
                    <Film className="h-12 w-12 text-gray-500 group-hover:text-gray-400" />
                  </div>
                  <h3 className="text-yellow-300 font-semibold text-center text-sm group-hover:text-yellow-400 transition-colors duration-300 line-clamp-2">
                    {movieTitle}
                  </h3>
                </div>
              ))}
            </div>

            {/* Additional Info */}
            <div className="text-center mt-8 p-4 bg-gray-800/50 rounded-lg">
              <p className="text-gray-400 text-sm">
                🤖 Powered by AI using cosine similarity analysis of movie features
              </p>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && recommendations.length === 0 && basedOnMovies.length === 0 && (
          <div className="text-center py-16">
            <Heart className="mx-auto mb-4 h-16 w-16 text-gray-500" />
            <h2 className="text-2xl font-bold text-white mb-2">Start Building Your Profile</h2>
            <p className="text-gray-400 mb-6">
              Like some movies to unlock personalized AI recommendations!
            </p>
            <button
              onClick={() => navigate('/movies')}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-full transition-colors duration-300"
            >
              Discover Movies
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recommendations;