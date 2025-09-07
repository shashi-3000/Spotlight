import { Router } from "express";
import { registerUser, loginUser, logoutUser ,getProfile,deleteAccount, refreshAccessToken} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/user.middleware.js";

const router = Router();

// public routes
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

// protected routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/profile").get(verifyJWT, getProfile);
router.route("/refresh-token").post(refreshAccessToken)

//delete-account
// router.route("/delete-account").delete(verifyJWT, deleteAccount);
// console.log("Delete-account route registered!");
// router.delete("/delete-account", verifyJWT, deleteAccount);
router.route("/delete-account").post(verifyJWT, deleteAccount);



export default router;


