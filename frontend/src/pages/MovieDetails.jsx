// import MovieCard from "../components/movies/MovieCard.jsx"
// import oscarBg from "../assets/img.jpg"
// import MovieCarousel from "../components/movies/MovieCarousel.jsx"

// export default function MoviePage() {
//   // Dummy Data (replace later with TMDB API)
//   const trendingMovies = [
//     { id: 1, title: "Inception", poster: "https://m.media-amazon.com/images/M/MV5BZjhkNjM0ZTMtNGM5MC00ZTQ3LTk3YmYtZTkzYzdiNWE0ZTA2XkEyXkFqcGc@._V1_.jpg" },
//     { id: 2, title: "The Dark Knight", poster: "https://upload.wikimedia.org/wikipedia/en/9/90/HeathJoker.png" },
//     { id: 3, title: "Interstellar", poster: "https://m.media-amazon.com/images/I/91UMpWgj05L._UF1000,1000_QL80_.jpg" },
//     { id: 4, title: "Brokeback Mountain", poster: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSTt4w9sDqCi-6IjA2lzv4mNnB6UgiyDy0u36QchXcz236xh70XoH8MLmcLrLr5ascEU7ifFw" },
//     { id: 5, title: "Pulp Fiction", poster: "https://via.placeholder.com/300x450/374151/9CA3AF?text=Pulp+Fiction" },
//     { id: 6, title: "The Matrix", poster: "https://via.placeholder.com/300x450/374151/9CA3AF?text=The+Matrix" },
//     { id: 7, title: "Goodfellas", poster: "https://via.placeholder.com/300x450/374151/9CA3AF?text=Goodfellas" },
//     { id: 8, title: "Fight Club", poster: "https://via.placeholder.com/300x450/374151/9CA3AF?text=Fight+Club" },
//   ]

//   const topRatedMovies = [
//     { id: 9, title: "The Shawshank Redemption", poster: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSf1DK32xKMQzqSl8wnY1BLVu_gdwsRYzVSNM6A03r6c-fEwrif8raKzkFRuerw1KHdDICvOw" },
//     { id: 10, title: "The Godfather", poster: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQAY2xsJVIZxm3K0gNtOMr9CSCvLdr5kdo3V3pv2HMuUkTBhFzRe5-b8NDRmO1mt5S5Xp_YyQ" },
//     { id: 11, title: "Schindler's List", poster: "https://via.placeholder.com/300x450/374151/9CA3AF?text=Schindlers+List" },
//     { id: 12, title: "12 Angry Men", poster: "https://via.placeholder.com/300x450/374151/9CA3AF?text=12+Angry+Men" },
//     { id: 13, title: "The Lord of the Rings", poster: "https://via.placeholder.com/300x450/374151/9CA3AF?text=LOTR" },
//     { id: 14, title: "Casablanca", poster: "https://via.placeholder.com/300x450/374151/9CA3AF?text=Casablanca" },
//     { id: 15, title: "One Flew Over", poster: "https://via.placeholder.com/300x450/374151/9CA3AF?text=One+Flew+Over" },
//     { id: 16, title: "Gone with the Wind", poster: "https://via.placeholder.com/300x450/374151/9CA3AF?text=Gone+Wind" },
//   ]

//   const actionMovies = [
//     { id: 17, title: "Mad Max: Fury Road", poster: "https://via.placeholder.com/300x450/374151/9CA3AF?text=Mad+Max" },
//     { id: 18, title: "Gladiator", poster: "https://via.placeholder.com/300x450/374151/9CA3AF?text=Gladiator" },
//     { id: 19, title: "Die Hard", poster: "https://via.placeholder.com/300x450/374151/9CA3AF?text=Die+Hard" },
//     { id: 20, title: "Terminator 2", poster: "https://via.placeholder.com/300x450/374151/9CA3AF?text=T2" },
//     { id: 21, title: "John Wick", poster: "https://via.placeholder.com/300x450/374151/9CA3AF?text=John+Wick" },
//     { id: 22, title: "Speed", poster: "https://via.placeholder.com/300x450/374151/9CA3AF?text=Speed" },
//   ]

//   const dramaMovies = [
//     { id: 23, title: "Forrest Gump", poster: "https://via.placeholder.com/300x450/374151/9CA3AF?text=Forrest+Gump" },
//     { id: 24, title: "The Pursuit of Happyness", poster: "https://via.placeholder.com/300x450/374151/9CA3AF?text=Pursuit" },
//     { id: 25, title: "A Beautiful Mind", poster: "https://via.placeholder.com/300x450/374151/9CA3AF?text=Beautiful+Mind" },
//     { id: 26, title: "Good Will Hunting", poster: "https://via.placeholder.com/300x450/374151/9CA3AF?text=Good+Will" },
//     { id: 27, title: "The Green Mile", poster: "https://via.placeholder.com/300x450/374151/9CA3AF?text=Green+Mile" },
//   ]

//   return (
//     <div className="mx-auto py-12 px-6 text-white pt-28 p-10 min-h-screen" 
//          style={{ backgroundImage: `url(${oscarBg})`, backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>
      
//       <div className=" inset-10 bg-black/65 p-10 rounded-md">
//         {/* Trending Carousel */}
//         <MovieCarousel title="🔥 Trending" movies={trendingMovies} />
        
//         {/* Top Rated Carousel */}
//         <MovieCarousel title="⭐ Top Rated" movies={topRatedMovies} />
        
//         {/* Action Movies Carousel */}
//         <MovieCarousel title="🎬 Action Movies" movies={actionMovies} />
        
//         {/* Drama Movies Carousel */}
//         <MovieCarousel title="🎭 Drama Movies" movies={dramaMovies} />
//       </div>
      
//     </div>
//   )
// }


// import { useState, useEffect } from 'react';
// import MovieCard from "../components/movies/MovieCard.jsx";
// import oscarBg from "../assets/img.jpg";
// import MovieCarousel from "../components/movies/MovieCarousel.jsx";
// import { getTrendingMovies, getPopularMovies, getTopRatedMovies, getActionMovies, getFantasyMovies } from '../services/tmdb.js';

// export default function MoviePage() {
//   const [trendingMovies, setTrendingMovies] = useState([]);
//   const [popularMovies, setPopularMovies] = useState([]);
//   const [topRatedMovies, setTopRatedMovies] = useState([]);
//   const [actionMovies, setActionMovies] = useState([]);
//   const [fantasyMovies, setFantasyMovies] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadMovies();
//   }, []);

//   const loadMovies = async () => {
//     setLoading(true);
//     try {
//       // Get all movie categories
//       const trending = await getTrendingMovies();
//       const popular = await getPopularMovies();
//       const topRated = await getTopRatedMovies();
//       const action = await getActionMovies();
//       const fantasy = await getFantasyMovies();

//       setTrendingMovies(trending.slice(0, 10)); // Show only 10 movies
//       setPopularMovies(popular.slice(0, 20));
//       setTopRatedMovies(topRated.slice(0, 20));
//       setActionMovies(action.slice(0, 20));
//       setFantasyMovies(fantasy.slice(0, 20));
      
//     } catch (error) {
//       console.error('Error loading movies:', error);
//       alert('Failed to load movies. Check your API key and internet connection.');
//     }
//     setLoading(false);
//   };

//   if (loading) {
//     return (
//       <div className="mx-auto py-12 px-6 text-white pt-28 p-10 min-h-screen flex items-center justify-center" 
//            style={{ backgroundImage: `url(${oscarBg})`, backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>
//         <div className="bg-black/65 p-10 rounded-md text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
//           <p className="text-lg">Loading movies...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="mx-auto py-12 px-6 text-white pt-28 p-10 min-h-screen" 
//          style={{ backgroundImage: `url(${oscarBg})`, backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>
      
//       <div className="inset-10 bg-black/65 p-10 rounded-md">
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-bold mb-2">🎬 SPOTLIGHT</h1>
//           <p className="text-lg text-gray-300">Discover amazing movies from TMDB</p>
//         </div>

//         {/* Movie Carousels */}
//         <MovieCarousel title="🔥 Trending Movies" movies={trendingMovies} />
//         <MovieCarousel title="⭐ Popular Movies" movies={popularMovies} />
//         <MovieCarousel title="🏆 Top Rated" movies={topRatedMovies} />
//         <MovieCarousel title="🎬 Action Movies" movies={actionMovies} />
//         <MovieCarousel title="🎬 Fantasy Movies" movies={fantasyMovies} />
//       </div>
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import oscarBg from "../assets/img.jpg";
import MovieCarousel from "../components/movies/MovieCarousel.jsx";
import MovieSearch from "../components/movies/MovieSearch.jsx";
import { 
  getTrendingMovies, 
  getPopularMovies, 
  getTopRatedMovies, 
  getActionMovies, 
  getFantasyMovies 
} from "../services/tmdb.js";

export default function Movies() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [actionMovies, setActionMovies] = useState([]);
  const [fantasyMovies, setFantasyMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    try {
      console.log("Loading movies from TMDB...");
      
      const [trending, popular, topRated, action, fantasy] = await Promise.all([
        getTrendingMovies(),
        getPopularMovies(), 
        getTopRatedMovies(),
        getActionMovies(),
        getFantasyMovies()
      ]);

      setTrendingMovies(trending);
      setPopularMovies(popular);
      setTopRatedMovies(topRated);
      setActionMovies(action);
      setFantasyMovies(fantasy);

    } catch (error) {
      console.error("Error loading movies:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p className="text-xl">Loading movies...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white pt-24 px-6 py-12"
    style={{ backgroundImage: `url(${oscarBg})`, backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>
      <div className=" inset-10 bg-black/70 p-10 rounded-md">
        
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-yellow-400 mb-4">Discover Movies</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Explore amazing movies from TMDB. Like, save, and build your personal collection.
          </p>
        </div>

        {/* Search Section */}
        <MovieSearch />

        {/* Movie Carousels */}
        <div className="space-y-8">
          {trendingMovies.length > 0 && (
            <MovieCarousel title="🔥 Trending Movies" movies={trendingMovies} />
          )}
          
          {popularMovies.length > 0 && (
            <MovieCarousel title="⭐ Popular Movies" movies={popularMovies} />
          )}
          
          {topRatedMovies.length > 0 && (
            <MovieCarousel title="🏆 Top Rated Movies" movies={topRatedMovies} />
          )}
          
          {actionMovies.length > 0 && (
            <MovieCarousel title="💥 Action Movies" movies={actionMovies} />
          )}
          
          {fantasyMovies.length > 0 && (
            <MovieCarousel title="🧙‍♂️ Fantasy Movies" movies={fantasyMovies} />
          )}
        </div>

        {/* No Movies Message */}
        {!loading && trendingMovies.length === 0 && popularMovies.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-xl">Unable to load movies at the moment</p>
            <button 
              onClick={loadMovies}
              className="mt-4 bg-yellow-400 text-black px-6 py-3 rounded-lg hover:bg-yellow-500 transition-colors"
            >
              Retry
            </button>
          </div>
        )}
      </div>
    </div>
  );
}





