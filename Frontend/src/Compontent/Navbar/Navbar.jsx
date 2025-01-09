import React, { useState } from 'react';
import './Navbar.css';
import menu_icon from '../../assets/menu.png';
import logo from '../../assets/logo.png';
import search_icon from '../../assets/search.png';
import upload_icon from '../../assets/upload.png';
import more_icon from '../../assets/more.png';
import notification_icon from '../../assets/notification.png';
import profile_icon from '../../assets/jack.png';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Navbar = ({ setSidebar, loggedIn }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const API_KEY = 'AIzaSyCroC99iJtvHRuttGg6OPj5pAXxwezagR8';

  // Function to handle search
  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent form reload
    if (!searchQuery.trim()) return;

    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search`,
        {
          params: {
            part: 'snippet',
            q: searchQuery,
            key: API_KEY,
            maxResults: 12,
            type: 'video',
          },
        }
      );
      setSearchResults(response.data.items); // Save the search results
    } catch (error) {
      console.error('Error fetching YouTube data:', error);
    }
  };

  return (
    <>
      <nav className='flex-div'>
        {/* Left Section */}
        <div className="nav-left flex-div">
          <img
            className='menu-icon'
            onClick={() => setSidebar(prev => !prev)}
            src={menu_icon}
            alt="menu"
          />
          <Link to='./'>
            <img className='logo' src={logo} alt="logo" />
          </Link>
        </div>

        {/* Middle Section */}
        <div className="nav-middle flex-div">
          <form className="search-box flex-div" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder='Search'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-button">
              <img src={search_icon} alt="search" />
            </button>
          </form>
        </div>

        {/* Right Section */}
        <div className="nav-right flex-div">
          <img src={upload_icon} alt="upload" />
          <img src={more_icon} alt="more" />
          <img src={notification_icon} alt="notification" />

          {/* Conditionally Render Profile Icon or Login Button */}
          {loggedIn ? (
            <Link to='/profile'>
              <img src={profile_icon} className='user-icon' alt="profile" />
            </Link>
          ) : (
            <Link to='/login' className='login-button'>
              <button className="btn-primary">Login</button>
            </Link>
          )}
        </div>
      </nav>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="search-results">
          {searchResults.map((result) => (
            <div key={result.id.videoId} className="video-card">
              <a
                href={`https://www.youtube.com/watch?v=${result.id.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={result.snippet.thumbnails.high.url}
                  alt={result.snippet.title}
                  className="video-thumbnail"
                />
                <div className="video-details">
                  <h3 className="video-title">{result.snippet.title}</h3>
                  <p className="video-channel">{result.snippet.channelTitle}</p>
                </div>
              </a>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Navbar;
