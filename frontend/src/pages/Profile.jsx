// // import MovieCard from "../components/movies/MovieCard.jsx"
// // import Button from '../components/ui/Button.jsx'



// // export default function Profile() {
// //   const name = "John Doe"
// //   const email = "johndoe@example.com"

// //   // Function to get initials from name
// //   const getInitials = (fullName) => {
// //     return fullName
// //       .split(" ")
// //       .map((n) => n[0])
// //       .join("")
// //       .toUpperCase()
// //   }

// //   return (
// //     <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white pt-24 px-6 py-12 p-20">
// //       <div className="max-w-5xl mx-auto space-y-12">

// //         {/* User Info */}
// //         <section className="flex items-center space-x-6">
// //           {/* Initials Avatar */}
// //           <div className="w-20 h-20 rounded-full bg-yellow-500 flex items-center justify-center text-black text-2xl font-bold shadow-lg">
// //             {getInitials(name)}
// //           </div>

// //           {/* Name & Email */}
// //           <div>
// //             <h1 className="text-4xl font-bold text-yellow-400">{name}</h1>
// //             <p className="text-gray-400">{email}</p>
// //             <div className="mt-4 flex space-x-3">
// //               <Button className="bg-yellow-400 hover:bg-yellow-500 text-black">
// //                 Edit Profile
// //               </Button>
// //               <Button variant="outline" className="text-white border-gray-500 bg-gray-500 hover:bg-gray-600">
// //                 Change Password
// //               </Button>
// //             </div>
// //           </div>
// //         </section>

// //         {/* Liked Movies */}
// //         <section>
// //           <h2 className="text-2xl font-semibold mb-4">❤️ Liked Movies</h2>
// //           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
// //             <MovieCard title="Avengers - The Endgame" poster="https://m.media-amazon.com/images/I/71niXI3lxlL._AC_SY679_.jpg" />
// //             <MovieCard title="The Dark Knight" poster="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTfE_qrYMBZ_JB8om-34WGaZARhpX26yWRttqIDvn4_7l--UzX8mxKcPrc59IcvTpEA_G8gPA" />
// //           </div>
// //         </section>

// //         {/* Saved Movies */}
// //         <section>
// //           <h2 className="text-2xl font-semibold mb-4">📌 Saved Movies</h2>
// //           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
// //             <MovieCard title="Interstellar" poster="https://m.media-amazon.com/images/I/91kFYg4fX3L._SY679_.jpg" />
// //             <MovieCard title="Fight Club" poster="https://m.media-amazon.com/images/I/51EG732BV3L.jpg" />
// //           </div>
// //         </section>

// //         {/* Reviews */}
// //         <section>
// //           <h2 className="text-2xl font-semibold mb-4">✍️ My Reviews</h2>
// //           <div className="space-y-4">
// //             <div className="bg-gray-800 p-4 rounded-lg shadow">
// //               <h3 className="font-bold text-yellow-300">Inception</h3>
// //               <p className="text-gray-300 text-sm">⭐⭐⭐⭐⭐ - "Mind-blowing movie, Nolan is a genius!"</p>
// //             </div>
// //             <div className="bg-gray-800 p-4 rounded-lg shadow">
// //               <h3 className="font-bold text-yellow-300">The Dark Knight</h3>
// //               <p className="text-gray-300 text-sm">⭐⭐⭐⭐⭐ - "Heath Ledger’s Joker is unmatched."</p>
// //             </div>
// //           </div>
// //         </section>

// //         {/* Account Actions */}
// //         <section className="pt-6 border-t border-gray-700 ">
// //           <div className="flex space-x-4">
// //             <Button className="bg-gray-500 hover:bg-gray-700">Logout</Button>
// //             <Button variant="outline" className="text-white border-gray-500 bg-red-600 hover:bg-red-700">
// //               Delete Account
// //             </Button>
// //           </div>
// //         </section>
// //       </div>
// //     </div>
// //   )
// // }



// // import { useState, useEffect } from 'react';
// // import { userAPI } from '../services/api';

// // export default function Profile() {
// //   const [user, setUser] = useState(null);
// //   const [likedMovies, setLikedMovies] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     loadData();
// //   }, []);

// //   const loadData = async () => {
// //     try {
// //       const userResponse = await userAPI.getProfile();
// //       const likedResponse = await userAPI.getLikedMovies();
      
// //       setUser(userResponse.data);
// //       setLikedMovies(likedResponse.data);
      
// //       console.log('User:', userResponse.data);
// //       console.log('Liked movies:', likedResponse.data);
// //     } catch (error) {
// //       console.error('Error:', error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   if (loading) return <div>Loading...</div>;

// //   return (
// //     <div className="min-h-screen bg-black text-white pt-24 p-20">
// //       <h1>Profile Page</h1>
      
// //       <div>
// //         <p>Username: {user.username}</p>
// //         <p>Email: {user.email}</p>
// //       </div>

// //       <h2>Liked Movies: {likedMovies.length}</h2>
// //       {likedMovies.length > 0 ? (
// //         <ul>
// //           {likedMovies.map(movie => (
// //             <li key={movie._id}>{movie.title}</li>
// //           ))}
// //         </ul>
// //       ) : (
// //         <p>No liked movies yet</p>
// //       )}
// //     </div>
// //   );
// // }




// import { useState, useEffect } from 'react';
// import { userAPI } from '../services/api';
// import MovieCard from "../components/movies/MovieCard.jsx";

// export default function Profile() {
//   const [user, setUser] = useState(null);
//   const [likedMovies, setLikedMovies] = useState([]);
//   const [savedMovies, setSavedMovies] = useState([]);
//   const [userReviews, setUserReviews] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadData();
//   }, []);

//   const loadData = async () => {
//     try {
//       const userResponse = await userAPI.getProfile();
//       const likedResponse = await userAPI.getLikedMovies();
//       const savedResponse = await userAPI.getSavedMovies();
//       const reviewsResponse = await userAPI.getUserReviews();
      
//       setUser(userResponse.data);
//       setLikedMovies(likedResponse.data);
//       setSavedMovies(savedResponse.data);
//       setUserReviews(reviewsResponse.data);
//     } catch (error) {
//       console.error('Error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // delete handle
//   // const handleDeleteAccount = async () => {
//   //   const confirmDelete = window.confirm("Are you sure you want to delete your account?");
    
//   //   if (confirmDelete) {
//   //     try {
//   //       await userAPI.deleteAccount();
//   //       alert('Account deleted successfully');
//   //       // Clear tokens and redirect
//   //       localStorage.removeItem('accessToken');
//   //       localStorage.removeItem('refreshToken');
//   //       window.location.href = '/';
//   //     } catch (error) {
//   //       console.error('Delete error:', error);
//   //       alert('Failed to delete account');
//   //     }
//   //   }
//   // };
//   const handleDeleteAccount = async () => {
//     const confirmDelete = window.confirm("Are you sure you want to delete your account?");
    
//     if (confirmDelete) {
//       try {
//         console.log('Attempting to delete account...'); // ADD THIS
//         const response = await userAPI.deleteAccount();
//         console.log('Delete response:', response); // ADD THIS
//         alert('Account deleted successfully');
//         localStorage.removeItem('accessToken');
//         localStorage.removeItem('refreshToken');
//         window.location.href = '/';
//       } catch (error) {
//         console.error('Full delete error:', error); // CHANGE THIS
//         alert(`Failed to delete account: ${error.message}`); // CHANGE THIS
//       }
//     }
//   };

//   const getInitials = (name) => {
//     return name?.split(" ").map((n) => n[0]).join("").toUpperCase() || "U";
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-black text-white pt-24 flex items-center justify-center">
//         <p className="text-xl">Loading profile...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-tr from-black via-slate-900 to-black text-white pt-24 px-6 py-12">
//       <div className="max-w-5xl mx-auto space-y-12">
        
//         {/* User Info */}
//         <section className="flex items-center space-x-6">
//           <div className="w-20 h-20 rounded-full bg-yellow-500 flex items-center justify-center text-black text-2xl font-bold">
//             {getInitials(user?.username)}
//           </div>
//           <div>
//             <h1 className="text-4xl font-bold text-yellow-400">{user?.username}</h1>
//             <p className="text-gray-400">{user?.email}</p>
//           </div>
//         </section>

//         {/* Liked Movies */}
//         <section>
//           <h2 className="text-2xl font-semibold mb-4 text-yellow-400">
//             ❤️ Liked Movies ({likedMovies.length})
//           </h2>
//           {likedMovies.length > 0 ? (
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//               {likedMovies.map((movie) => (
//                 <MovieCard 
//                   key={movie._id}
//                   title={movie.title} 
//                   poster={movie.poster} 
//                 />
//               ))}
//             </div>
//           ) : (
//             <p className="text-gray-400">No liked movies yet</p>
//           )}
//         </section>

//         {/* Saved Movies */}
//         <section>
//           <h2 className="text-2xl font-semibold mb-4 text-yellow-400">
//             📌 Saved Movies ({savedMovies.length})
//           </h2>
//           {savedMovies.length > 0 ? (
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//               {savedMovies.map((movie) => (
//                 <MovieCard 
//                   key={movie._id}
//                   title={movie.title} 
//                   poster={movie.poster} 
//                 />
//               ))}
//             </div>
//           ) : (
//             <p className="text-gray-400">No saved movies yet</p>
//           )}
//         </section>

//         {/* Reviews */}
//         <section>
//           <h2 className="text-2xl font-semibold mb-4 text-yellow-400">
//             ✍️ My Reviews ({userReviews.length})
//           </h2>
//           {userReviews.length > 0 ? (
//             <div className="space-y-4">
//               {userReviews.map((item) => (
//                 <div key={item.movieId} className="bg-gray-800 p-4 rounded-lg">
//                   <h3 className="font-bold text-yellow-300">{item.title}</h3>
//                   <p className="text-gray-300">
//                     {"⭐".repeat(item.review.rating)} - "{item.review.comment}"
//                   </p>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p className="text-gray-400">No reviews written yet</p>
//           )}
//         </section>

//         <button 
//           onClick={handleDeleteAccount}
//           className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded mt-6"
//         >
//           Delete Account
//         </button>

//       </div>
//     </div>
//   );
// }


import { useState, useEffect } from 'react';
import { userAPI, tokenUtils } from '../services/api';
import MovieCard from "../components/movies/MovieCard.jsx";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [likedMovies, setLikedMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [userReviews, setUserReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    if (!tokenUtils.isLoggedIn()) {
      alert('Please login first');
      window.location.href = '/login';
      return;
    }
    loadData();
  }, []);

  const loadData = async () => {
    try {
      console.log('📊 Loading profile data...');
      
      const userResponse = await userAPI.getProfile();
      console.log('👤 User profile loaded:', userResponse);
      
      // Load other data (handle errors gracefully)
      let likedResponse = { data: [] };
      let savedResponse = { data: [] };
      let reviewsResponse = { data: [] };
      
      try {
        likedResponse = await userAPI.getLikedMovies();
        savedResponse = await userAPI.getSavedMovies();
        reviewsResponse = await userAPI.getUserReviews();
      } catch (movieError) {
        console.warn('⚠️ Error loading movie data:', movieError);
      }
      
      setUser(userResponse.data);
      setLikedMovies(likedResponse.data || []);
      setSavedMovies(savedResponse.data || []);
      setUserReviews(reviewsResponse.data || []);
      
    } catch (error) {
      console.error('❌ Error loading profile data:', error);
      
      // If token is invalid, redirect to login
      if (error.message?.includes('401') || error.message?.includes('Unauthorized')) {
        alert('Session expired. Please login again.');
        tokenUtils.clearTokens();
        window.location.href = '/login';
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    // Double confirmation
    const firstConfirm = window.confirm(
      "⚠️ WARNING: This will permanently delete your account and all your data.\n\nAre you absolutely sure?"
    );
    
    if (!firstConfirm) return;
    
    const secondConfirm = window.confirm(
      "This action CANNOT be undone.\n\nType 'DELETE' in your mind and click OK to proceed."
    );
    
    if (!secondConfirm) return;

    setIsDeleting(true);
    
    try {
      console.log('🗑️ Starting account deletion...');
      
      // Check token exists
      const token = tokenUtils.getAccessToken();
      if (!token) {
        throw new Error('No access token found. Please login again.');
      }
      
      console.log('🔑 Token check passed, calling delete API...');
      
      // Call delete API
      const response = await userAPI.deleteAccount();
      console.log('✅ Account deleted successfully:', response);
      
      // Clear all data
      tokenUtils.clearTokens();
      
      // Show success message
      alert('✅ Account deleted successfully!');
      
      // Redirect to home page
      window.location.replace('/');
      
    } catch (error) {
      console.error('❌ Delete account failed:', error);
      
      let errorMessage = 'Failed to delete account. ';
      
      if (error.message?.includes('401') || error.message?.includes('Unauthorized')) {
        errorMessage += 'Your session has expired. Please login again.';
        tokenUtils.clearTokens();
        setTimeout(() => window.location.href = '/login', 2000);
      } else if (error.message?.includes('404')) {
        errorMessage += 'Account not found.';
      } else if (error.message?.includes('500')) {
        errorMessage += 'Server error. Please try again later.';
      } else {
        errorMessage += error.message || 'Unknown error occurred.';
      }
      
      alert('❌ ' + errorMessage);
      
    } finally {
      setIsDeleting(false);
    }
  };

  const getInitials = (name) => {
    return name?.split(" ").map((n) => n[0]).join("").toUpperCase() || "U";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p className="text-xl">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white pt-24 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-400">Failed to load profile</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-black via-slate-900 to-black text-white pt-24 px-6 py-12">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* User Info */}
        <section className="flex items-center space-x-6">
          <div className="w-20 h-20 rounded-full bg-yellow-500 flex items-center justify-center text-black text-2xl font-bold">
            {getInitials(user?.username)}
          </div>
          <div>
            <h1 className="text-4xl font-bold text-yellow-400">{user?.username}</h1>
            <p className="text-gray-400">{user?.email}</p>
          </div>
        </section>

        {/* Liked Movies */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-yellow-400">
            ❤️ Liked Movies ({likedMovies.length})
          </h2>
          {likedMovies.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {likedMovies.map((movie) => (
                <MovieCard 
                  key={movie._id}
                  title={movie.title} 
                  poster={movie.poster} 
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No liked movies yet</p>
          )}
        </section>

        {/* Saved Movies */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-yellow-400">
            📌 Saved Movies ({savedMovies.length})
          </h2>
          {savedMovies.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {savedMovies.map((movie) => (
                <MovieCard 
                  key={movie._id}
                  title={movie.title} 
                  poster={movie.poster} 
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No saved movies yet</p>
          )}
        </section>

        {/* Reviews */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-yellow-400">
            ✍️ My Reviews ({userReviews.length})
          </h2>
          {userReviews.length > 0 ? (
            <div className="space-y-4">
              {userReviews.map((item, index) => (
                <div key={item.movieId || index} className="bg-gray-800 p-4 rounded-lg">
                  <h3 className="font-bold text-yellow-300">{item.title}</h3>
                  <p className="text-gray-300">
                    {"⭐".repeat(item.review?.rating || 0)} - "{item.review?.comment || 'No comment'}"
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No reviews written yet</p>
          )}
        </section>

        {/* Delete Account Section - DANGER ZONE */}
        <section className="pt-8 border-t-2 border-red-800">
          <div className="bg-red-900/20 border-2 border-red-700 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-red-400 mb-3 flex items-center">
              ⚠️ Danger Zone
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              <strong>Warning:</strong> Deleting your account is permanent and cannot be undone. 
              All your data including liked movies, saved movies, and reviews will be lost forever.
            </p>
            
            <button 
              onClick={handleDeleteAccount}
              disabled={isDeleting}
              className={`
                ${isDeleting 
                  ? 'bg-gray-600 cursor-not-allowed opacity-50' 
                  : 'bg-red-600 hover:bg-red-700 hover:scale-105'
                } 
                text-white font-semibold px-8 py-3 rounded-lg transition-all duration-200 
                border-2 border-red-500 shadow-lg
              `}
            >
              {isDeleting ? (
                <span className="flex items-center">
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                  Deleting Account...
                </span>
              ) : (
                '🗑️ Delete My Account'
              )}
            </button>
            
            {isDeleting && (
              <p className="text-yellow-400 mt-3 text-sm">
                Please wait, this may take a few seconds...
              </p>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}