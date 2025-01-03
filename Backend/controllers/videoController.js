const Video = require("../models/Video");

// Get all videos
const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find();
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get a video by ID
const getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }
    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Add a video
const addVideo = async (req, res) => {
  const { title, description, thumbnailUrl, videoUrl, channelId } = req.body;

  try {
    const video = new Video({ title, description, thumbnailUrl, videoUrl, channelId });
    await video.save();
    res.status(201).json({ message: "Video added successfully", video });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update a video
const updateVideo = async (req, res) => {
  try {
    const video = await Video.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }
    res.status(200).json({ message: "Video updated successfully", video });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete a video
const deleteVideo = async (req, res) => {
  try {
    const video = await Video.findByIdAndDelete(req.params.id);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }
    res.status(200).json({ message: "Video deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { getAllVideos, getVideoById, addVideo, updateVideo, deleteVideo };
