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
  addMovie
} from "../controllers/movie.controller.js";
import { verifyJWT } from "../middlewares/user.middleware.js";

const router = Router();

// Public movie routes
router.route("/").get(getAllMovies);

router.route("/:movieId").get(getMovieById);

// Protected movie routes
router.route("/:movieId/like").post(verifyJWT, toggleLikeMovie);
router.route("/:movieId/save").post(verifyJWT, toggleSaveMovie);
router.route("/:movieId/review").post(verifyJWT, addReview);

// User-specific routes
router.route("/user/liked").get(verifyJWT, getUserLikedMovies);
router.route("/user/saved").get(verifyJWT, getUserSavedMovies);
router.route("/user/reviews").get(verifyJWT, getUserReviews);



// in movie.route.js
router.route("/add").post(verifyJWT, addMovie);



export default router;