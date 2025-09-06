import { Router } from "express";
import { registerUser, loginUser, logoutUser ,getProfile, refreshAccessToken} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/user.middleware.js";

const router = Router();

// public routes
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

// protected routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/profile").get(verifyJWT, getProfile);

router.route("/refresh-token").post(refreshAccessToken)

export default router;