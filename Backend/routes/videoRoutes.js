const express = require("express");
const {
  getAllVideos,
  getVideoById,
  addVideo,
  updateVideo,
  getVideosByChannel,
  deleteVideo,
} = require("../controllers/videoController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

// Routes
router.get("/", getAllVideos);                    // Get all videos
router.get("/:id", getVideoById);                 // Get video by ID
router.get("/channel/:channelId", getVideosByChannel); // Get videos by channel
router.post("/", protect, addVideo);              // Add a new video
router.put("/:id", protect, updateVideo);         // Update a video
router.delete("/:id", protect, deleteVideo);      // Delete a video

module.exports = router;

