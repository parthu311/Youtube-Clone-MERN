const Channel = require("../models/Channel");

// Get all channels
const getAllChannels = async (req, res) => {
  try {
    const channels = await Channel.find();
    res.status(200).json(channels);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get a channel by ID
const getChannelById = async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.id);
    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }
    res.status(200).json(channel);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Create a channel
const createChannel = async (req, res) => {
  const { channelName, description, channelBanner } = req.body;

  try {
    const channel = new Channel({ channelName, description, channelBanner, owner: req.user.id });
    await channel.save();
    res.status(201).json({ message: "Channel created successfully", channel });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update a channel
const updateChannel = async (req, res) => {
  try {
    const channel = await Channel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }
    res.status(200).json({ message: "Channel updated successfully", channel });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete a channel
const deleteChannel = async (req, res) => {
  try {
    const channel = await Channel.findByIdAndDelete(req.params.id);
    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }
    res.status(200).json({ message: "Channel deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { getAllChannels, getChannelById, createChannel, updateChannel, deleteChannel };
