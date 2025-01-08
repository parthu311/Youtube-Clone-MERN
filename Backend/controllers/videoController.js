const Video = require("../models/Video");
const mongoose = require("mongoose");

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
  const { id } = req.params;  // Extract video ID from the route params

  try {
    const video = await Video.findById(id);  // Find the video by ID
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }
    res.json(video);  // Send the video data as JSON
  } catch (error) {
    console.error("Error fetching video:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get videos by channel
const getVideosByChannel = async (req, res) => {
  const { channelId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(channelId)) {
    return res.status(400).json({ message: "Invalid channel ID." });
  }

  try {
    const videos = await Video.find({ channel: channelId }).populate("channel", "channelName");
    res.status(200).json(videos.length ? videos : []);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Add a video
const addVideo = async (req, res) => {
  const { title, description, thumbnailUrl, videoUrl, channel } = req.body;

  try {
    const video = new Video({ title, description, thumbnailUrl, videoUrl, channel });
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

module.exports = {
  getAllVideos,
  getVideoById,
  getVideosByChannel,
  addVideo,
  updateVideo,
  deleteVideo,
};
