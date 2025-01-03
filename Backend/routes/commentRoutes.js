const express = require("express");
const {
  getCommentsByVideoId,
  addComment,
  updateComment,
  deleteComment,
} = require("../controllers/commentController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

// Routes
router.get("/:videoId", getCommentsByVideoId);          // Get all comments for a video
router.post("/:videoId", protect, addComment);          // Add a comment to a video (protected)
router.put("/:commentId", protect, updateComment);      // Update a comment (protected)
router.delete("/:commentId", protect, deleteComment);   // Delete a comment (protected)

module.exports = router;
