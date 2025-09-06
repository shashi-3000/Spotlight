import Movie from "../models/movie.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Get all movies (with optional filters)
const getAllMovies = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;
  const { genre, search } = req.query;

  const filter = {};
  if (genre) filter.genre = { $in: [genre] };
  if (search) filter.title = { $regex: search, $options: "i" };

  const movies = await Movie.find(filter)
    .limit(limit)
    .skip((page - 1) * limit)
    .sort({ createdAt: -1 });

  const total = await Movie.countDocuments(filter);

  return res.status(200).json(
    new ApiResponse(200, {
      movies,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalMovies: total,
    }, "Movies fetched successfully")
  );
});

// Get single movie by ID
const getMovieById = asyncHandler(async (req, res) => {
  const { movieId } = req.params;

  const movie = await Movie.findById(movieId).populate("reviews.user", "username");
  if (!movie) throw new ApiError(404, "Movie not found");

  return res.status(200).json(
    new ApiResponse(200, movie, "Movie details fetched successfully")
  );
});

// Toggle Like (like/unlike)
const toggleLikeMovie = asyncHandler(async (req, res) => {
  const { movieId } = req.params;
  const userId = req.user._id;

  const user = await User.findById(userId);
  const movie = await Movie.findById(movieId);

  if (!movie) throw new ApiError(404, "Movie not found");
  if (!user) throw new ApiError(404, "User not found");

  const movieIndex = user.likedMovies.findIndex(
    (id) => id.toString() === movieId.toString()
  );

  let action;
  if (movieIndex === -1) {
    user.likedMovies.push(movieId);
    action = "liked";
  } else {
    user.likedMovies.splice(movieIndex, 1);
    action = "unliked";
  }

  await user.save();

  return res.status(200).json(
    new ApiResponse(200, { likedMovies: user.likedMovies, action }, `Movie ${action} successfully`)
  );
});

// Toggle Save (watchlist)
const toggleSaveMovie = asyncHandler(async (req, res) => {
  const { movieId } = req.params;
  const userId = req.user._id;

  const user = await User.findById(userId);
  const movie = await Movie.findById(movieId);

  if (!movie) throw new ApiError(404, "Movie not found");
  if (!user) throw new ApiError(404, "User not found");

  const movieIndex = user.savedMovies.findIndex(
    (id) => id.toString() === movieId.toString()
  );

  let action;
  if (movieIndex === -1) {
    user.savedMovies.push(movieId);
    action = "saved";
  } else {
    user.savedMovies.splice(movieIndex, 1);
    action = "unsaved";
  }

  await user.save();

  return res.status(200).json(
    new ApiResponse(200, { savedMovies: user.savedMovies, action }, `Movie ${action} successfully`)
  );
});

// Add Review
const addReview = asyncHandler(async (req, res) => {
  const { movieId } = req.params;
  const { comment, rating } = req.body;
  const userId = req.user._id;

  if (!comment || !rating) throw new ApiError(400, "Comment and rating are required");
  if (rating < 1 || rating > 5) throw new ApiError(400, "Rating must be between 1 and 5");

  const movie = await Movie.findById(movieId);
  if (!movie) throw new ApiError(404, "Movie not found");

  const existingReview = movie.reviews.find(
    (r) => r.user.toString() === userId.toString()
  );
  if (existingReview) throw new ApiError(400, "You already reviewed this movie");

  const newReview = { user: userId, comment, rating: Number(rating) };
  movie.reviews.push(newReview);

  // Update average rating
  const totalRating = movie.reviews.reduce((sum, r) => sum + r.rating, 0);
  movie.ratings = totalRating / movie.reviews.length;

  await movie.save();
  await movie.populate("reviews.user", "username");

  return res.status(201).json(
    new ApiResponse(201, movie, "Review added successfully")
  );
});

// Get Liked Movies
const getUserLikedMovies = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate("likedMovies");
  return res.status(200).json(
    new ApiResponse(200, user.likedMovies, "Liked movies fetched successfully")
  );
});

// Get Saved Movies
const getUserSavedMovies = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate("savedMovies");
  return res.status(200).json(
    new ApiResponse(200, user.savedMovies, "Saved movies fetched successfully")
  );
});

// Get User Reviews
const getUserReviews = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const movies = await Movie.find({ "reviews.user": userId }).populate(
    "reviews.user",
    "username"
  );

  const userReviews = movies.map((movie) => ({
    movieId: movie._id,
    title: movie.title,
    poster: movie.poster,
    review: movie.reviews.find((r) => r.user._id.toString() === userId.toString()),
  }));

  return res.status(200).json(
    new ApiResponse(200, userReviews, "User reviews fetched successfully")
  );
});

//adding movies
const addMovie = asyncHandler(async (req, res) => {
  if (req.user.role !== "admin") {
    throw new ApiError(403, "Only admins can add movies");
  }

  const { title, description, genre, poster } = req.body;
  const movie = await Movie.create({ title, description, genre, poster });

  return res.status(201).json(
    new ApiResponse(201, movie, "Movie added successfully")
  );
});



export {
  getAllMovies,
  getMovieById,
  toggleLikeMovie,
  toggleSaveMovie,
  addReview,
  getUserLikedMovies,
  getUserSavedMovies,
  getUserReviews,
  addMovie
};









// import Movie from "../models/movie.model.js";
// import { User } from "../models/user.model.js";
// import { ApiError } from "../utils/ApiError.js";
// import { ApiResponse } from "../utils/ApiResponse.js";
// import { asyncHandler } from "../utils/asyncHandler.js";


// const getAllMovies = asyncHandler(async (req, res) => {
//   const page = Number(req.query.page) || 1;
//   const limit = Number(req.query.limit) || 20;
//   const { genre, search } = req.query;

//   const filter = {};
//   if (genre) filter.genre = { $in: [genre] };
//   if (search) filter.title = { $regex: search, $options: "i" };

//   const movies = await Movie.find(filter)
//     .limit(limit)
//     .skip((page - 1) * limit)
//     .sort({ createdAt: -1 });

//   const total = await Movie.countDocuments(filter);

//   return res.status(200).json(
//     new ApiResponse(200, {
//       movies,
//       currentPage: page,
//       totalPages: Math.ceil(total / limit),
//       totalMovies: total,
//     }, "Movies fetched successfully")
//   );
// });

// // Get single movie by ID
// const getMovieById = asyncHandler(async (req, res) => {
//   const { movieId } = req.params;

//   const movie = await Movie.findById(movieId).populate("reviews.user", "username");
//   if (!movie) {
//     throw new ApiError(404, "Movie not found");
//   }

//   return res.status(200).json(
//     new ApiResponse(200, movie, "Movie details fetched successfully")
//   );
// });

// // Toggle Like
// const toggleLikeMovie = asyncHandler(async (req, res) => {
//   const { movieId } = req.params;
//   const userId = req.user._id;

//   const user = await User.findById(userId);
//   const movie = await Movie.findById(movieId);

//   if (!movie) throw new ApiError(404, "Movie not found");
//   if (!user) throw new ApiError(404, "User not found");

//   const movieIndex = user.likedMovies.findIndex(
//     (id) => id.toString() === movieId.toString()
//   );

//   let action;
//   if (movieIndex === -1) {
//     user.likedMovies.push(movieId);
//     action = "liked";
//   } else {
//     user.likedMovies.splice(movieIndex, 1);
//     action = "unliked";
//   }

//   await user.save();

//   return res.status(200).json(
//     new ApiResponse(200, { likedMovies: user.likedMovies, action }, `Movie ${action} successfully`)
//   );
// });

// // Toggle Save (watchlist)
// const toggleSaveMovie = asyncHandler(async (req, res) => {
//   const { movieId } = req.params;
//   const userId = req.user._id;

//   const user = await User.findById(userId);
//   const movie = await Movie.findById(movieId);

//   if (!movie) throw new ApiError(404, "Movie not found");
//   if (!user) throw new ApiError(404, "User not found");

//   const movieIndex = user.savedMovies.findIndex(
//     (id) => id.toString() === movieId.toString()
//   );

//   let action;
//   if (movieIndex === -1) {
//     user.savedMovies.push(movieId);
//     action = "saved";
//   } else {
//     user.savedMovies.splice(movieIndex, 1);
//     action = "unsaved";
//   }

//   await user.save();

//   return res.status(200).json(
//     new ApiResponse(200, { savedMovies: user.savedMovies, action }, `Movie ${action} successfully`)
//   );
// });

// // Add Review
// const addReview = asyncHandler(async (req, res) => {
//   const { movieId } = req.params;
//   const { comment, rating } = req.body;
//   const userId = req.user._id;

//   if (!comment || !rating) {
//     throw new ApiError(400, "Comment and rating are required");
//   }
//   if (rating < 1 || rating > 5) {
//     throw new ApiError(400, "Rating must be between 1 and 5");
//   }

//   const movie = await Movie.findById(movieId);
//   if (!movie) throw new ApiError(404, "Movie not found");

//   const existingReview = movie.reviews.find(
//     (r) => r.user.toString() === userId.toString()
//   );
//   if (existingReview) {
//     throw new ApiError(400, "You already reviewed this movie");
//   }

//   const newReview = { user: userId, comment, rating: Number(rating) };
//   movie.reviews.push(newReview);

//   // Update average rating
//   const totalRating = movie.reviews.reduce((sum, r) => sum + r.rating, 0);
//   movie.ratings = totalRating / movie.reviews.length;

//   await movie.save();
//   await movie.populate("reviews.user", "username");

//   return res.status(201).json(
//     new ApiResponse(201, movie, "Review added successfully")
//   );
// });

// // Get Liked Movies
// const getUserLikedMovies = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.user._id).populate("likedMovies");
//   return res.status(200).json(
//     new ApiResponse(200, user.likedMovies, "Liked movies fetched successfully")
//   );
// });

// // Get Saved Movies
// const getUserSavedMovies = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.user._id).populate("savedMovies");
//   return res.status(200).json(
//     new ApiResponse(200, user.savedMovies, "Saved movies fetched successfully")
//   );
// });

// // Get User Reviews
// const getUserReviews = asyncHandler(async (req, res) => {
//   const userId = req.user._id;

//   const movies = await Movie.find({ "reviews.user": userId }).populate(
//     "reviews.user",
//     "username"
//   );

//   const userReviews = movies.map((movie) => ({
//     movieId: movie._id,
//     title: movie.title,
//     poster: movie.poster,
//     review: movie.reviews.find((r) => r.user._id.toString() === userId.toString()),
//   }));

//   return res.status(200).json(
//     new ApiResponse(200, userReviews, "User reviews fetched successfully")
//   );
// });

// export {
//   getAllMovies,
//   getMovieById,
//   toggleLikeMovie,
//   toggleSaveMovie,
//   addReview,
//   getUserLikedMovies,
//   getUserSavedMovies,
//   getUserReviews,
// };



// import { Movie } from "../models/movie.model.js";
// import { User } from "../models/user.model.js";
// import { ApiError } from "../utils/ApiError.js";
// import { ApiResponse } from "../utils/ApiResponse.js";
// import { asyncHandler } from "../utils/asyncHandler.js";

// // Get all movies
// const getAllMovies = asyncHandler(async (req, res) => {
//   const movies = await Movie.find({});
//   return res.status(200).json(new ApiResponse(200, movies, "Movies fetched"));
// });

// // Get movie by ID
// const getMovieById = asyncHandler(async (req, res) => {
//   const { movieId } = req.params;
//   const movie = await Movie.findById(movieId);

//   if (!movie) {
//     throw new ApiError(404, "Movie not found");
//   }

//   return res.status(200).json(new ApiResponse(200, movie, "Movie details"));
// });

// // Like a movie
// const likeMovie = asyncHandler(async (req, res) => {
//   const { userId, movieId } = req.body;

//   const user = await User.findById(userId);
//   const movie = await Movie.findById(movieId);

//   if (!user || !movie) {
//     throw new ApiError(404, "User or Movie not found");
//   }

//   if (!user.likedMovies.includes(movieId)) {
//     user.likedMovies.push(movieId);
//     await user.save();
//   }

//   return res.status(200).json(new ApiResponse(200, user, "Movie liked"));
// });

// // Save (watchlist) movie
// const saveMovie = asyncHandler(async (req, res) => {
//   const { userId, movieId } = req.body;

//   const user = await User.findById(userId);
//   const movie = await Movie.findById(movieId);

//   if (!user || !movie) {
//     throw new ApiError(404, "User or Movie not found");
//   }

//   if (!user.savedMovies.includes(movieId)) {
//     user.savedMovies.push(movieId);
//     await user.save();
//   }

//   return res.status(200).json(new ApiResponse(200, user, "Movie saved"));
// });

// // Add review
// const addReview = asyncHandler(async (req, res) => {
//   const { movieId, review } = req.body;

//   const movie = await Movie.findById(movieId);
//   if (!movie) {
//     throw new ApiError(404, "Movie not found");
//   }

//   movie.reviews.push(review);
//   await movie.save();

//   return res.status(200).json(new ApiResponse(200, movie, "Review added"));
// });

// export { getAllMovies, getMovieById, likeMovie, saveMovie, addReview };



// import { Movie } from "../models/movie.model.js";
// import { User } from "../models/user.model.js";
// import { ApiError } from "../utils/ApiError.js";
// import { ApiResponse } from "../utils/ApiResponse.js";
// import { asyncHandler } from "../utils/asyncHandler.js";

// // Get all movies with pagination
// const getAllMovies = asyncHandler(async (req, res) => {
//   const { page = 1, limit = 20, genre, search } = req.query;
  
//   let filter = {};
//   if (genre) filter.genre = { $in: [genre] };
//   if (search) filter.title = { $regex: search, $options: 'i' };

//   const movies = await Movie.find(filter)
//     .limit(limit * 1)
//     .skip((page - 1) * limit)
//     .sort({ createdAt: -1 });

//   const total = await Movie.countDocuments(filter);

//   return res.status(200).json(
//     new ApiResponse(200, {
//       movies,
//       currentPage: page,
//       totalPages: Math.ceil(total / limit),
//       totalMovies: total
//     }, "Movies fetched successfully")
//   );
// });

// // Get movie by ID with populated reviews
// const getMovieById = asyncHandler(async (req, res) => {
//   const { movieId } = req.params;
  
//   const movie = await Movie.findById(movieId)
//     .populate('reviews.user', 'username');

//   if (!movie) {
//     throw new ApiError(404, "Movie not found");
//   }

//   return res.status(200).json(
//     new ApiResponse(200, movie, "Movie details fetched successfully")
//   );
// });

// // Like/Unlike a movie (toggle)
// const toggleLikeMovie = asyncHandler(async (req, res) => {
//   const { movieId } = req.params;
//   const userId = req.user._id; // from verifyJWT middleware

//   const user = await User.findById(userId);
//   const movie = await Movie.findById(movieId);

//   if (!movie) {
//     throw new ApiError(404, "Movie not found");
//   }

//   const movieIndex = user.likedMovies.indexOf(movieId);
//   let action;

//   if (movieIndex === -1) {
//     // Add to liked movies
//     user.likedMovies.push(movieId);
//     action = "liked";
//   } else {
//     // Remove from liked movies
//     user.likedMovies.splice(movieIndex, 1);
//     action = "unliked";
//   }

//   await user.save();

//   return res.status(200).json(
//     new ApiResponse(200, { 
//       likedMovies: user.likedMovies,
//       action 
//     }, `Movie ${action} successfully`)
//   );
// });

// // Save/Unsave movie to watchlist (toggle)
// const toggleSaveMovie = asyncHandler(async (req, res) => {
//   const { movieId } = req.params;
//   const userId = req.user._id;

//   const user = await User.findById(userId);
//   const movie = await Movie.findById(movieId);

//   if (!movie) {
//     throw new ApiError(404, "Movie not found");
//   }

//   const movieIndex = user.savedMovies.indexOf(movieId);
//   let action;

//   if (movieIndex === -1) {
//     // Add to saved movies
//     user.savedMovies.push(movieId);
//     action = "saved";
//   } else {
//     // Remove from saved movies
//     user.savedMovies.splice(movieIndex, 1);
//     action = "unsaved";
//   }

//   await user.save();

//   return res.status(200).json(
//     new ApiResponse(200, { 
//       savedMovies: user.savedMovies,
//       action 
//     }, `Movie ${action} successfully`)
//   );
// });

// // Add review to movie
// const addReview = asyncHandler(async (req, res) => {
//   const { movieId } = req.params;
//   const { comment, rating } = req.body;
//   const userId = req.user._id;

//   if (!comment || !rating) {
//     throw new ApiError(400, "Comment and rating are required");
//   }

//   if (rating < 1 || rating > 5) {
//     throw new ApiError(400, "Rating must be between 1 and 5");
//   }

//   const movie = await Movie.findById(movieId);
//   if (!movie) {
//     throw new ApiError(404, "Movie not found");
//   }

//   // Check if user already reviewed this movie
//   const existingReview = movie.reviews.find(
//     review => review.user.toString() === userId.toString()
//   );

//   if (existingReview) {
//     throw new ApiError(400, "You have already reviewed this movie");
//   }

//   const newReview = {
//     user: userId,
//     comment,
//     rating: Number(rating)
//   };

//   movie.reviews.push(newReview);

//   // Update average rating
//   const totalRating = movie.reviews.reduce((sum, review) => sum + review.rating, 0);
//   movie.ratings = totalRating / movie.reviews.length;

//   await movie.save();

//   // Populate the new review before sending response
//   await movie.populate('reviews.user', 'username');

//   return res.status(201).json(
//     new ApiResponse(201, movie, "Review added successfully")
//   );
// });

// // Get user's liked movies
// const getUserLikedMovies = asyncHandler(async (req, res) => {
//   const userId = req.user._id;
  
//   const user = await User.findById(userId).populate('likedMovies');
  
//   return res.status(200).json(
//     new ApiResponse(200, user.likedMovies, "Liked movies fetched successfully")
//   );
// });

// // Get user's saved movies
// const getUserSavedMovies = asyncHandler(async (req, res) => {
//   const userId = req.user._id;
  
//   const user = await User.findById(userId).populate('savedMovies');
  
//   return res.status(200).json(
//     new ApiResponse(200, user.savedMovies, "Saved movies fetched successfully")
//   );
// });

// // Get user's reviews
// const getUserReviews = asyncHandler(async (req, res) => {
//   const userId = req.user._id;
  
//   const movies = await Movie.find({ 'reviews.user': userId })
//     .populate('reviews.user', 'username');
  
//   const userReviews = movies.map(movie => ({
//     movieId: movie._id,
//     movieTitle: movie.title,
//     moviePoster: movie.poster,
//     review: movie.reviews.find(review => review.user._id.toString() === userId.toString())
//   }));
  
//   return res.status(200).json(
//     new ApiResponse(200, userReviews, "User reviews fetched successfully")
//   );
// });

// export { 
//   getAllMovies, 
//   getMovieById, 
//   toggleLikeMovie, 
//   toggleSaveMovie, 
//   addReview,
//   getUserLikedMovies,
//   getUserSavedMovies,
//   getUserReviews
// };