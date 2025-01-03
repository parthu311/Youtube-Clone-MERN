const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const authRoutes = require("./routes/authRoutes");
const videoRoutes = require("./routes/videoRoutes");
const channelRoutes = require("./routes/channelRoutes");
const commentRoutes = require("./routes/commentRoutes");
const errorHandler = require("./middlewares/errorHandler");

// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Parse JSON request body
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev")); // Log requests in development mode
}

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/channels", channelRoutes);
app.use("/api/comments", commentRoutes);

// Error handling middleware
app.use(errorHandler);

module.exports = app;
