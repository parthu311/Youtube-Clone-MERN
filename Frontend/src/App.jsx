import React, { useState, useEffect } from "react";
import Navbar from "./Compontent/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Video from "./Pages/Video/Video";
import Login from "./Compontent/LogRegi/Login";
import Register from "./Compontent/LogRegi/Register";
import Profile from "./Pages/Profile/Profile";
import CreateChannel from "./Compontent/Channel/CreateChannel";
import ChannelPage from "./Compontent/Channel/ChannelPage";
import ChannelDetails from "./Compontent/Channel/ChannelDetails";
import AddVideoForm from "./Compontent/Channel/AddVideoForm";
import VideoList from "./Compontent/Channel/VideoList";
// import VideoDetails from "./Compontent/Channel/VideoDetails";
import VideoDetailsPage from "./Compontent/Channel/VideoDetails";

const App = () => {
  const [sidebar, setSidebar] = useState(true);

  // State to manage login status
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  // Check if there is a valid JWT token in localStorage on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    // If token exists and is valid, set the user as logged in
    if (token) {
      setIsUserLoggedIn(true);
    } else {
      setIsUserLoggedIn(false);
    }
  }, []); // Empty array means this runs only once, when the component mounts

  // You can also implement a login handler function to set the token
  const handleLogin = (token) => {
    localStorage.setItem("token", token); // Store token in localStorage
    setIsUserLoggedIn(true); // Update login state
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    setIsUserLoggedIn(false); // Update login state
  };

  return (
    <div>
      <Navbar setSidebar={setSidebar} loggedIn={isUserLoggedIn} />
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home sidebar={sidebar} />} />
        
        {/* Video Page */}
        <Route path="/video/:categoryId/:videoId" element={<Video />} />
        
        {/* Authentication */}
        <Route
          path="/login"
          element={<Login onLogin={handleLogin} />}
        />
        <Route path="/register" element={<Register />} />
        
        {/* Profile */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/channels" element={<ChannelPage />} />
        <Route path="/create-channel" element={<CreateChannel />} />
        <Route path="/channels/:id" element={<ChannelDetails />} />
        <Route path="/add-video/:id" element={<AddVideoForm />} />
        <Route path="/videos" element={<VideoList />} />
        <Route path="/videos/:videoId" element={<VideoDetailsPage />} />

      </Routes>
    </div>
  );
};

export default App;
