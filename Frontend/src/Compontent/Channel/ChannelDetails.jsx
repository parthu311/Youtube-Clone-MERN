import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import API from "../../services/api";

const ChannelDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchChannelDetails = async () => {
      try {
        const channelResponse = await API.get(`/channels/${id}`);
        setChannel(channelResponse.data);

        const videoResponse = await API.get(`/videos/channel/${id}`);
        setVideos(videoResponse.data);
      } catch (error) {
        console.error("Error fetching channel or videos:", error);
        setError("Failed to load channel details or videos.");
      }
    };

    fetchChannelDetails();
  }, [id]);

  const handleDelete = async (videoId) => {
    if (window.confirm("Are you sure you want to delete this video?")) {
      try {
        await API.delete(`/videos/${videoId}`);
        setVideos((prev) => prev.filter((video) => video._id !== videoId));
      } catch (error) {
        console.error("Error deleting video:", error);
        alert("Failed to delete the video. Please try again.");
      }
    }
  };

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  if (!channel) {
    return <p className="text-center">Loading channel details...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <div className="relative">
          {channel.channelBanner && (
            <img
              src={channel.channelBanner}
              alt={channel.channelName}
              className="w-full h-48 object-cover rounded-md"
            />
          )}
          <div className="absolute bottom-0 left-0 p-4 bg-gradient-to-t from-black to-transparent rounded-md mb-4">
            <h1 className="text-3xl font-bold text-white">{channel.channelName}</h1>
            <p className="text-gray-300 mt-2">{channel.description}</p>
          </div>
        </div><Link
              to={`/add-video/${id}`}
              className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Add Video
            </Link>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Videos</h2>
        {videos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <div
                key={video._id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <Link to={`/videos/${video._id}`}>
                  <img
                    src={video.thumbnail || "https://www.nsbpictures.com/wp-content/uploads/2021/01/background-for-thumbnail-youtube-2.png"}
                    alt={video.title}
                    className="w-full h-40 object-cover"
                  />
                </Link>
                <div className="p-4">
                  <h3 className="text-xl font-semibold truncate">{video.title}</h3>
                  <p className="text-gray-600 mt-2">{video.description}</p>

                  <div className="flex justify-between items-center mt-4">
                    {/* Edit Button */}
                    <Link
                      to={`/edit-video/${video._id}`}
                      className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                    >
                      Edit
                    </Link>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(video._id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center mt-8">
            <p className="text-gray-600">No videos found for this channel.</p>
            <Link
              to={`/add-video/${id}`}
              className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Add Video
            </Link>
          </div>
        )}

        <Link to="/channels" className="text-blue-500 mt-6 inline-block">
          Back to Channels
        </Link>
      </div>
    </div>
  );
};

export default ChannelDetails;
