import axios from "axios";

// Set the base URL for the backend API
const API = axios.create({
  baseURL: "http://localhost:5000/api", // Replace with your backend URL
});

// Interceptor to add the JWT token to the headers
API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");
    if (token) {
      req.headers.Authorization = `Bearer ${token}`; // Add the token to Authorization header
    }
    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Function to handle user registration
export const registerUser = (userData) => API.post("/auth/register", userData);

// Function to handle user login
export const loginUser = (userData) => API.post("/auth/login", userData);

// Function to get the authenticated user's profile
export const getUserProfile = () => API.get("/auth/profile");

// Function to get all channels
export const getAllChannels = () => API.get("/channels");

// Function to get a channel by ID
export const getChannelById = (channelId) => API.get(`/channels/${channelId}`);

// Function to create a new channel
export const createChannel = (channelData) => API.post("/channels", channelData);

// Function to update a channel
export const updateChannel = (channelId, updatedData) =>
  API.put(`/channels/${channelId}`, updatedData);

// Function to delete a channel
export const deleteChannel = (channelId) => API.delete(`/channels/${channelId}`);

// Function to get videos by channel
export const getVideosByChannel = (channelId) =>
  API.get(`/videos/channel/${channelId}`);

// Function to get video details by ID
export const getVideoById = (videoId) => API.get(`/videos/${videoId}`);

// Function to like a video
export const likeVideo = (videoId) => API.post(`/videos/${videoId}/like`);

// Function to dislike a video
export const dislikeVideo = (videoId) => API.post(`/videos/${videoId}/dislike`);

// Function to add a comment to a video
export const addComment = (videoId, commentData) =>
  API.post(`/videos/${videoId}/comments`, commentData);

// Function to add a video
export const addVideo = (videoData) => API.post("/videos", videoData);

export default API;
