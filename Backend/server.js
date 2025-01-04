const http = require("http");
const mongoose = require("mongoose");
const app = require("./app");
require("dotenv").config();

// Load environment variables
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/youtube')
  .then(() => console.log('Connected to MongoDB!'))
  .catch(err => console.log('Connection error:', err));


const server = http.createServer(app);
    server.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
