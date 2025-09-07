// import React from 'react'


// export default function MovieCard({ title, poster }) {
//   return (
//     <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer min-w-[180px] w-[180px]">
//       <img
//         src={poster}
//         alt={title}
//         className="w-full h-64 object-cover"
//         onError={(e) => {
//           e.target.src = "https://via.placeholder.com/300x450/374151/9CA3AF?text=No+Image";
//         }}
//       />
//       <div className="p-3 text-center">
//         <h3 className="text-sm font-semibold text-yellow-300 truncate" title={title}>
//           {title}
//         </h3>
//       </div>
//     </div>
//   );
// }


// import React, { useState } from 'react';
// import { Heart, Bookmark } from 'lucide-react';
// import { movieAPI } from '../../services/api.js';
// import { tokenUtils } from '../../services/api.js';

// export default function MovieCard({ title, poster, movie }) {
//   const [isLiked, setIsLiked] = useState(false);
//   const [isSaved, setIsSaved] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleLike = async (e) => {
//     e.stopPropagation(); // Prevent card click
    
//     // Add this debug line:
//     console.log('Movie object received in MovieCard:', movie);
  

//     if (!tokenUtils.isLoggedIn()) {
//       alert('Please login to like movies');
//       return;
//     }

//     setLoading(true);
//     try {
//       console.log('Liking movie:', movie); // Debug log
//       const response = await movieAPI.toggleLike(movie);
//       setIsLiked(response.data.action === 'liked');
//       alert(`Movie ${response.data.action}!`);
//     } catch (error) {
//       console.error('Error toggling like:', error);
//       alert('Failed to like movie: ' + error.message);
//     }
//     setLoading(false);
//   };

//   const handleSave = async (e) => {
//     e.stopPropagation();
    
//     if (!tokenUtils.isLoggedIn()) {
//       alert('Please login to save movies');
//       return;
//     }

//     setLoading(true);
//     try {
//       console.log('Saving movie:', movie); // Debug log
//       const response = await movieAPI.toggleSave(movie);
//       setIsSaved(response.data.action === 'saved');
//       alert(`Movie ${response.data.action}!`);
//     } catch (error) {
//       console.error('Error toggling save:', error);
//       alert('Failed to save movie: ' + error.message);
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer min-w-[180px] w-[180px] relative group">
//       <img
//         src={poster}
//         alt={title}
//         className="w-full h-64 object-cover"
//         onError={(e) => {
//           e.target.src = "https://via.placeholder.com/300x450/374151/9CA3AF?text=No+Image";
//         }}
//       />
      
//       {/* Buttons - Show on Hover */}
//       <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//         <button
//           onClick={handleLike}
//           disabled={loading}
//           className={`p-2 rounded-full ${isLiked ? 'bg-red-500' : 'bg-black/70 hover:bg-red-500'} text-white transition-colors duration-300`}
//         >
//           <Heart size={16} fill={isLiked ? 'white' : 'none'} />
//         </button>
        
//         <button
//           onClick={handleSave}
//           disabled={loading}
//           className={`p-2 rounded-full ${isSaved ? 'bg-blue-500' : 'bg-black/70 hover:bg-blue-500'} text-white transition-colors duration-300`}
//         >
//           <Bookmark size={16} fill={isSaved ? 'white' : 'none'} />
//         </button>
//       </div>

//       <div className="p-3 text-center">
//         <h3 className="text-sm font-semibold text-yellow-300 truncate" title={title}>
//           {title}
//         </h3>
//       </div>
//     </div>
//   );
// }


import React, { useState } from 'react';
import { Heart, Bookmark } from 'lucide-react';
import { movieAPI } from '../../services/api.js';
import { tokenUtils } from '../../services/api.js';

export default function MovieCard({ title, poster, movie }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageError = (e) => {
    if (!imageError) {
      setImageError(true);
      // Use a more reliable placeholder or local fallback
      e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='450' viewBox='0 0 300 450' fill='%23374151'%3E%3Crect width='300' height='450' fill='%23374151'/%3E%3Ctext x='150' y='225' text-anchor='middle' fill='%239CA3AF' font-size='14' font-family='Arial'%3ENo Image%3C/text%3E%3C/svg%3E";
    }
  };

  const handleLike = async (e) => {
    e.stopPropagation();
    
    console.log('Movie object received in MovieCard:', movie);
    
    if (!tokenUtils.isLoggedIn()) {
      alert('Please login to like movies');
      return;
    }

    setLoading(true);
    try {
      console.log('Liking movie:', movie);
      const response = await movieAPI.toggleLike(movie);
      setIsLiked(response.data.action === 'liked');
      alert(`Movie ${response.data.action}!`);
    } 
    catch (error) {
      console.error('Error toggling like:', error);
      alert('Failed to like movie: ' + error.message);
    }
    setLoading(false);
  };

  const handleSave = async (e) => {
    e.stopPropagation();
    
    if (!tokenUtils.isLoggedIn()) {
      alert('Please login to save movies');
      return;
    }

    setLoading(true);
    try {
      console.log('Saving movie:', movie);
      const response = await movieAPI.toggleSave(movie);
      setIsSaved(response.data.action === 'saved');
      alert(`Movie ${response.data.action}!`);
    } 
    catch (error) {
      console.error('Error toggling save:', error);
      alert('Failed to save movie: ' + error.message);
    }
    setLoading(false);
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer min-w-[180px] w-[180px] relative group">
      <img
        src={poster || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='450' viewBox='0 0 300 450' fill='%23374151'%3E%3Crect width='300' height='450' fill='%23374151'/%3E%3Ctext x='150' y='225' text-anchor='middle' fill='%239CA3AF' font-size='14' font-family='Arial'%3ENo Image%3C/text%3E%3C/svg%3E"}
        alt={title}
        className="w-full h-64 object-cover"
        onError={handleImageError}
      />
      
      {/* Buttons - Show on Hover */}
      <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={handleLike}
          disabled={loading}
          className={`p-2 rounded-full ${isLiked ? 'bg-red-500' : 'bg-black/70 hover:bg-red-500'} text-white transition-colors duration-300`}
        >
          <Heart size={16} fill={isLiked ? 'white' : 'none'} />
        </button>
        
        <button
          onClick={handleSave}
          disabled={loading}
          className={`p-2 rounded-full ${isSaved ? 'bg-blue-500' : 'bg-black/70 hover:bg-blue-500'} text-white transition-colors duration-300`}
        >
          <Bookmark size={16} fill={isSaved ? 'white' : 'none'} />
        </button>
      </div>

      <div className="p-3 text-center">
        <h3 className="text-sm font-semibold text-yellow-300 truncate" title={title}>
          {title}
        </h3>
      </div>
    </div>
  );
}