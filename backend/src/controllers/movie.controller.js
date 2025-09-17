
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






// Replace your existing toggleLikeMovie function with this:
const toggleLikeMovie = asyncHandler(async (req, res) => {
  const { movieId } = req.params; // This is TMDB ID
  const userId = req.user._id;
  const { title, poster, overview } = req.body; // Movie data from frontend

  const user = await User.findById(userId);
  if (!user) throw new ApiError(404, "User not found");

  // Check if movie exists in our database by TMDB ID
  let movie = await Movie.findOne({ tmdbId: parseInt(movieId) });
  
  // If movie doesn't exist, create it
  if (!movie) {
    movie = await Movie.create({
      title: title,
      description: overview || '',
      tmdbId: parseInt(movieId),
      poster: poster
    });
    console.log(`Created new movie in DB: ${movie.title}`);
  }

  // Check if user already liked this movie (using MongoDB _id)
  const movieIndex = user.likedMovies.findIndex(
    (id) => id.toString() === movie._id.toString()
  );

  let action;
  if (movieIndex === -1) {
    // Movie not liked yet, add it
    user.likedMovies.push(movie._id);
    action = "liked";
  } else {
    // Movie already liked, remove it
    user.likedMovies.splice(movieIndex, 1);
    action = "unliked";
  }

  await user.save();

  return res.status(200).json(
    new ApiResponse(200, { action }, `Movie ${action} successfully`)
  );
});

// Replace your existing toggleSaveMovie function with this:
const toggleSaveMovie = asyncHandler(async (req, res) => {
  const { movieId } = req.params; // This is TMDB ID
  const userId = req.user._id;
  const { title, poster, overview } = req.body; // Movie data from frontend

  const user = await User.findById(userId);
  if (!user) throw new ApiError(404, "User not found");

  // Check if movie exists in our database by TMDB ID
  let movie = await Movie.findOne({ tmdbId: parseInt(movieId) });
  
  // If movie doesn't exist, create it
  if (!movie) {
    movie = await Movie.create({
      title: title,
      description: overview || '',
      tmdbId: parseInt(movieId),
      poster: poster
    });
    console.log(`Created new movie in DB: ${movie.title}`);
  }

  // Check if user already saved this movie (using MongoDB _id)
  const movieIndex = user.savedMovies.findIndex(
    (id) => id.toString() === movie._id.toString()
  );

  let action;
  if (movieIndex === -1) {
    // Movie not saved yet, add it
    user.savedMovies.push(movie._id);
    action = "saved";
  } else {
    // Movie already saved, remove it
    user.savedMovies.splice(movieIndex, 1);
    action = "unsaved";
  }

  await user.save();

  return res.status(200).json(
    new ApiResponse(200, { action }, `Movie ${action} successfully`)
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

const getUserRecommendations = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  
  try {
    // Get user's liked movies
    const user = await User.findById(userId).populate("likedMovies");
    
    if (!user.likedMovies || user.likedMovies.length === 0) {
      return res.status(200).json(
        new ApiResponse(200, [], "No liked movies found. Like some movies to get recommendations!")
      );
    }
    
    // Get recommendations for each liked movie (limit to last 5 liked movies for performance)
    const recentLikedMovies = user.likedMovies.slice(-5);
    const allRecommendations = [];
    
    for (const movie of recentLikedMovies) {
      try {
        // Call Flask recommendation API
        const response = await fetch('http://localhost:5001/recommend', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ movie: movie.title })
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.recommendations) {
            allRecommendations.push(...data.recommendations);
          }
        }
      } catch (error) {
        console.error(`Error getting recommendations for ${movie.title}:`, error);
      }
    }
    
    // Remove duplicates and user's already liked movies
    const userLikedTitles = user.likedMovies.map(movie => movie.title.toLowerCase());
    const uniqueRecommendations = [...new Set(allRecommendations)]
      .filter(title => !userLikedTitles.includes(title.toLowerCase()))
      .slice(0, 10); // Limit to 10 recommendations
    
    return res.status(200).json(
      new ApiResponse(200, {
        recommendations: uniqueRecommendations,
        basedOn: recentLikedMovies.map(movie => movie.title)
      }, "Recommendations fetched successfully")
    );
    
  } catch (error) {
    console.error('Recommendation service error:', error);
    return res.status(500).json(
      new ApiResponse(500, [], "Recommendation service unavailable")
    );
  }
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
  addMovie,
  getUserRecommendations
};
















