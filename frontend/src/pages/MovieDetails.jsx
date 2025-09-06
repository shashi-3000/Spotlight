// import React from 'react'

// function MovieDetails() {
//   return (
//     <div className='bg-slate-800'>MovieDetails</div>
//   )
// }

// export default MovieDetails

// import MovieCard from "../components/movies/MovieCard.jsx"
// import oscarBg from "../assets/chair.jpg"
// import MovieCarousel from "../components/movies/MovieCarousel.jsx"

// export default function MoviePage() {
//   // Dummy Data (replace later with TMDB API)
//   const trendingMovies = [
//     { id: 1, title: "Inception", poster: "https://m.media-amazon.com/images/M/MV5BZjhkNjM0ZTMtNGM5MC00ZTQ3LTk3YmYtZTkzYzdiNWE0ZTA2XkEyXkFqcGc@._V1_.jpg" },
//     { id: 2, title: "The Dark Knight", poster: "https://upload.wikimedia.org/wikipedia/en/9/90/HeathJoker.png" },
//     { id: 3, title: "Interstellar", poster: "https://m.media-amazon.com/images/I/91UMpWgj05L._UF1000,1000_QL80_.jpg" },
//     { id: 4, title: "Brokeback Mountain", poster: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSTt4w9sDqCi-6IjA2lzv4mNnB6UgiyDy0u36QchXcz236xh70XoH8MLmcLrLr5ascEU7ifFw" },
//     { id: 5, title: "Interstellar", poster: "/posters/interstellar.jpg" },
//     { id: 6, title: "Interstellar", poster: "/posters/interstellar.jpg" },
//     { id: 7, title: "Interstellar", poster: "/posters/interstellar.jpg" },
//     { id: 7, title: "Interstellar", poster: "/posters/interstellar.jpg" },
//   ]

//   const topRatedMovies = [
//     { id: 8, title: "The Shawshank Redemption", poster: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSf1DK32xKMQzqSl8wnY1BLVu_gdwsRYzVSNM6A03r6c-fEwrif8raKzkFRuerw1KHdDICvOw" },
//     { id: 9, title: "The Godfather", poster: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQAY2xsJVIZxm3K0gNtOMr9CSCvLdr5kdo3V3pv2HMuUkTBhFzRe5-b8NDRmO1mt5S5Xp_YyQ" },
//     { id: 10, title: "The Dark Knight Rises", poster: "/posters/darkknight2.jpg" },
//     { id: 11, title: "The Dark Knight Rises", poster: "/posters/darkknight2.jpg" },
//     { id: 12, title: "The Dark Knight Rises", poster: "/posters/darkknight2.jpg" },
//     { id: 13, title: "The Dark Knight Rises", poster: "/posters/darkknight2.jpg" },
//     { id: 14, title: "The Dark Knight Rises", poster: "/posters/darkknight2.jpg" },
//     { id: 15, title: "The Dark Knight Rises", poster: "/posters/darkknight2.jpg" },
//   ]

//   const genreMovies = {
//     Action: [
//       { id: 17, title: "Mad Max: Fury Road", poster: "/posters/madmax.jpg" },
//       { id: 18, title: "Gladiator", poster: "/posters/gladiator.jpg" },
//     ],
//     Drama: [
//       { id: 19, title: "Forrest Gump", poster: "/posters/forrestgump.jpg" },
//       { id: 20, title: "The Pursuit of Happyness", poster: "/posters/pursuit.jpg" },
//     ],
//   }

//   return (
//     <div className=" mx-auto py-12 px-6 text-white pt-28 p-10" style={{ backgroundImage: `url(${oscarBg})` }}>
//       {/* Trending */}
//       <section className="mb-12">
//         <h2 className="text-2xl font-bold mb-6 text-yellow-400">🔥 Trending</h2>
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
//           {trendingMovies.map((movie) => (
//             <MovieCard key={movie.id} title={movie.title} poster={movie.poster} />
//           ))}
//         </div>
//       </section>

//       {/* Top Rated */}
//       <section className="mb-12">
//         <h2 className="text-2xl font-bold mb-6 text-yellow-400">⭐ Top Rated</h2>
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
//           {topRatedMovies.map((movie) => (
//             <MovieCard key={movie.id} title={movie.title} poster={movie.poster} />
//           ))}
//         </div>
//       </section>

//       {/* Genres */}
//       {Object.entries(genreMovies).map(([genre, movies]) => (
//         <section key={genre} className="mb-12">
//           <h2 className="text-2xl font-bold mb-6 text-yellow-400">{genre} 🎭</h2>
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
//             {movies.map((movie) => (
//               <MovieCard key={movie.id} title={movie.title} poster={movie.poster} />
//             ))}
//           </div>
//         </section>
//       ))}
//     </div>
//   )
// }

import MovieCard from "../components/movies/MovieCard.jsx"
import oscarBg from "../assets/img.jpg"
import MovieCarousel from "../components/movies/MovieCarousel.jsx"

export default function MoviePage() {
  // Dummy Data (replace later with TMDB API)
  const trendingMovies = [
    { id: 1, title: "Inception", poster: "https://m.media-amazon.com/images/M/MV5BZjhkNjM0ZTMtNGM5MC00ZTQ3LTk3YmYtZTkzYzdiNWE0ZTA2XkEyXkFqcGc@._V1_.jpg" },
    { id: 2, title: "The Dark Knight", poster: "https://upload.wikimedia.org/wikipedia/en/9/90/HeathJoker.png" },
    { id: 3, title: "Interstellar", poster: "https://m.media-amazon.com/images/I/91UMpWgj05L._UF1000,1000_QL80_.jpg" },
    { id: 4, title: "Brokeback Mountain", poster: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSTt4w9sDqCi-6IjA2lzv4mNnB6UgiyDy0u36QchXcz236xh70XoH8MLmcLrLr5ascEU7ifFw" },
    { id: 5, title: "Pulp Fiction", poster: "https://via.placeholder.com/300x450/374151/9CA3AF?text=Pulp+Fiction" },
    { id: 6, title: "The Matrix", poster: "https://via.placeholder.com/300x450/374151/9CA3AF?text=The+Matrix" },
    { id: 7, title: "Goodfellas", poster: "https://via.placeholder.com/300x450/374151/9CA3AF?text=Goodfellas" },
    { id: 8, title: "Fight Club", poster: "https://via.placeholder.com/300x450/374151/9CA3AF?text=Fight+Club" },
  ]

  const topRatedMovies = [
    { id: 9, title: "The Shawshank Redemption", poster: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSf1DK32xKMQzqSl8wnY1BLVu_gdwsRYzVSNM6A03r6c-fEwrif8raKzkFRuerw1KHdDICvOw" },
    { id: 10, title: "The Godfather", poster: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQAY2xsJVIZxm3K0gNtOMr9CSCvLdr5kdo3V3pv2HMuUkTBhFzRe5-b8NDRmO1mt5S5Xp_YyQ" },
    { id: 11, title: "Schindler's List", poster: "https://via.placeholder.com/300x450/374151/9CA3AF?text=Schindlers+List" },
    { id: 12, title: "12 Angry Men", poster: "https://via.placeholder.com/300x450/374151/9CA3AF?text=12+Angry+Men" },
    { id: 13, title: "The Lord of the Rings", poster: "https://via.placeholder.com/300x450/374151/9CA3AF?text=LOTR" },
    { id: 14, title: "Casablanca", poster: "https://via.placeholder.com/300x450/374151/9CA3AF?text=Casablanca" },
    { id: 15, title: "One Flew Over", poster: "https://via.placeholder.com/300x450/374151/9CA3AF?text=One+Flew+Over" },
    { id: 16, title: "Gone with the Wind", poster: "https://via.placeholder.com/300x450/374151/9CA3AF?text=Gone+Wind" },
  ]

  const actionMovies = [
    { id: 17, title: "Mad Max: Fury Road", poster: "https://via.placeholder.com/300x450/374151/9CA3AF?text=Mad+Max" },
    { id: 18, title: "Gladiator", poster: "https://via.placeholder.com/300x450/374151/9CA3AF?text=Gladiator" },
    { id: 19, title: "Die Hard", poster: "https://via.placeholder.com/300x450/374151/9CA3AF?text=Die+Hard" },
    { id: 20, title: "Terminator 2", poster: "https://via.placeholder.com/300x450/374151/9CA3AF?text=T2" },
    { id: 21, title: "John Wick", poster: "https://via.placeholder.com/300x450/374151/9CA3AF?text=John+Wick" },
    { id: 22, title: "Speed", poster: "https://via.placeholder.com/300x450/374151/9CA3AF?text=Speed" },
  ]

  const dramaMovies = [
    { id: 23, title: "Forrest Gump", poster: "https://via.placeholder.com/300x450/374151/9CA3AF?text=Forrest+Gump" },
    { id: 24, title: "The Pursuit of Happyness", poster: "https://via.placeholder.com/300x450/374151/9CA3AF?text=Pursuit" },
    { id: 25, title: "A Beautiful Mind", poster: "https://via.placeholder.com/300x450/374151/9CA3AF?text=Beautiful+Mind" },
    { id: 26, title: "Good Will Hunting", poster: "https://via.placeholder.com/300x450/374151/9CA3AF?text=Good+Will" },
    { id: 27, title: "The Green Mile", poster: "https://via.placeholder.com/300x450/374151/9CA3AF?text=Green+Mile" },
  ]

  return (
    <div className="mx-auto py-12 px-6 text-white pt-28 p-10 min-h-screen" 
         style={{ backgroundImage: `url(${oscarBg})`, backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>
      
      <div className=" inset-10 bg-black/65 p-10 rounded-md">
        {/* Trending Carousel */}
        <MovieCarousel title="🔥 Trending" movies={trendingMovies} />
        
        {/* Top Rated Carousel */}
        <MovieCarousel title="⭐ Top Rated" movies={topRatedMovies} />
        
        {/* Action Movies Carousel */}
        <MovieCarousel title="🎬 Action Movies" movies={actionMovies} />
        
        {/* Drama Movies Carousel */}
        <MovieCarousel title="🎭 Drama Movies" movies={dramaMovies} />
      </div>
      
    </div>
  )
}