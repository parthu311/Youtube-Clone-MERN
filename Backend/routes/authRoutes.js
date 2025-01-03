const express = require("express");
const { registerUser, loginUser, getUserProfile } = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

// Routes
router.post("/register", registerUser); // User registration
router.post("/login", loginUser);       // User login
router.get("/profile", protect, getUserProfile); // Get user profile (protected)

module.exports = router;
