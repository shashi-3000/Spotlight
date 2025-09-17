

// import { Router } from "express";
// import { 
//   getAllMovies, 
//   getMovieById, 
//   toggleLikeMovie, 
//   toggleSaveMovie, 
//   addReview,
//   getUserLikedMovies,
//   getUserSavedMovies,
//   getUserReviews,
//   addMovie
// } from "../controllers/movie.controller.js";
// import { verifyJWT } from "../middlewares/user.middleware.js";

// const router = Router();

// // Public movie routes
// router.route("/").get(getAllMovies);

// // User-specific routes (MUST come BEFORE /:movieId routes)
// router.route("/user/liked").get(verifyJWT, getUserLikedMovies);
// router.route("/user/saved").get(verifyJWT, getUserSavedMovies);
// router.route("/user/reviews").get(verifyJWT, getUserReviews);

// // Admin routes
// router.route("/add").post(verifyJWT, addMovie);

// // Movie-specific routes (MUST come AFTER specific routes above)
// router.route("/:movieId").get(getMovieById);
// router.route("/:movieId/like").post(verifyJWT, toggleLikeMovie);
// router.route("/:movieId/save").post(verifyJWT, toggleSaveMovie);
// router.route("/:movieId/review").post(verifyJWT, addReview);

// export default router;



import { Router } from "express";
import {
   getAllMovies,
   getMovieById,
   toggleLikeMovie,
   toggleSaveMovie,
   addReview,
   getUserLikedMovies,
   getUserSavedMovies,
   getUserReviews,
   addMovie,
   getUserRecommendations  // Add this import
} from "../controllers/movie.controller.js";

import { verifyJWT } from "../middlewares/user.middleware.js";

const router = Router();

// Public movie routes
router.route("/").get(getAllMovies);

// User-specific routes (MUST come BEFORE /:movieId routes)
router.route("/user/liked").get(verifyJWT, getUserLikedMovies);
router.route("/user/saved").get(verifyJWT, getUserSavedMovies);
router.route("/user/reviews").get(verifyJWT, getUserReviews);
router.route("/user/recommendations").get(verifyJWT, getUserRecommendations); // Add this line

// Admin routes
router.route("/add").post(verifyJWT, addMovie);

// Movie-specific routes (MUST come AFTER specific routes above)
router.route("/:movieId").get(getMovieById);
router.route("/:movieId/like").post(verifyJWT, toggleLikeMovie);
router.route("/:movieId/save").post(verifyJWT, toggleSaveMovie);
router.route("/:movieId/review").post(verifyJWT, addReview);

export default router;