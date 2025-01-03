const express = require("express");
const {
  getAllChannels,
  getChannelById,
  createChannel,
  updateChannel,
  deleteChannel,
} = require("../controllers/channelController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

// Routes
router.get("/", getAllChannels);                  // Get all channels
router.get("/:id", getChannelById);               // Get a single channel by ID
router.post("/", protect, createChannel);         // Create a new channel (protected)
router.put("/:id", protect, updateChannel);       // Update a channel (protected)
router.delete("/:id", protect, deleteChannel);    // Delete a channel (protected)

module.exports = router;
