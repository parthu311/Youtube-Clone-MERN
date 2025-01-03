const Comment = require("../models/Comment");

// Get all comments for a video
const getCommentsByVideoId = async (req, res) => {
  try {
    const comments = await Comment.find({ videoId: req.params.videoId });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Add a comment
const addComment = async (req, res) => {
  const { text } = req.body;

  try {
    const comment = new Comment({ text, videoId: req.params.videoId, userId: req.user.id });
    await comment.save();
    res.status(201).json({ message: "Comment added successfully", comment });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update a comment
const updateComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndUpdate(req.params.commentId, req.body, { new: true });
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.status(200).json({ message: "Comment updated successfully", comment });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete a comment
const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { getCommentsByVideoId, addComment, updateComment, deleteComment };
