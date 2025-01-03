const express = require("express");
const {
  getAllVideos,
  getVideoById,
  addVideo,
  updateVideo,
  deleteVideo,
} = require("../controllers/videoController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

// Routes
router.get("/", getAllVideos);                    // Get all videos
router.get("/:id", getVideoById);                 // Get a single video by ID
router.post("/", protect, addVideo);              // Add a new video (protected)
router.put("/:id", protect, updateVideo);         // Update a video (protected)
router.delete("/:id", protect, deleteVideo);      // Delete a video (protected)

module.exports = router;
