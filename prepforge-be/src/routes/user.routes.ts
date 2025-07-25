import { Router } from "express";
import {
    changeCurrentPassword,
    getCurrentUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    registerUser,
    submitContactUs,
    submitFeedback,
    updateCurrentUserData,
    updateUserAvatar,
    verifyEmail
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";

const router: Router = Router();

// Public Routes
router.route("/register").post(registerUser); // Endpoint to register a new user
router.route("/login").post(loginUser);       // Endpoint to log in a user

// Secured Routes
router.route("/logout").post(verifyJWT, logoutUser);           // Endpoint to log out a user
router.route("/refreshToken").post(refreshAccessToken);        // Endpoint to refresh access token
router.route("/changePassword").post(verifyJWT, changeCurrentPassword); // Endpoint to change password
router.route("/currentUser").get(verifyJWT, getCurrentUser);   // Endpoint to fetch current logged-in user
router.route("/updateData").patch(verifyJWT, updateCurrentUserData);   // Endpoint to update current Logged-in user
router.route("/updateAvatar").patch(verifyJWT, upload.single("avatar"), updateUserAvatar);
router.route("/verify-email").get(verifyEmail);
router.route('/feedback').post(submitFeedback);
router.route('/contact-us').post(submitContactUs);

export default router;
