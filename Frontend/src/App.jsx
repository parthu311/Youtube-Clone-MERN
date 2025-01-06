import React, { useState } from "react";
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


const App = () => {
  const [sidebar, setSidebar] = useState(true);

  return (
    <div>
      <Navbar setSidebar={setSidebar} />
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home sidebar={sidebar} />} />
        
        {/* Video Page */}
        <Route path="/video/:categoryId/:videoId" element={<Video />} />
        
        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Profile */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/channels" element={<ChannelPage/>} />
        <Route path="/create-channel" element={<CreateChannel/>} />
        <Route path="/channels/:id" element={<ChannelDetails/>} />
      </Routes>
    </div>
  );
};

export default App;
