import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../../services/api";

const ChannelDetails = () => {
  const { id } = useParams();
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

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  if (!channel) {
    return <p className="text-center">Loading channel details...</p>;
  }

  return (
    <>
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
        </div>

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
                    src={video.thumbnail || "default-thumbnail.jpg"}
                    alt={video.title}
                    className="w-full h-40 object-cover"
                  />
                </Link>
                <div className="p-4">
                  <h3 className="text-xl font-semibold truncate">{video.title}</h3>
                  <p className="text-gray-600 mt-2">{video.description}</p>
                </div>
              </div>
            ))}
             <Link
  to={`/add-video/${id}`}
  className="mt-4 inline-block px-6 py-3 bg-blue-500 text-white text-xl font-bold rounded-md hover:bg-blue-600 text-center flex items-center justify-center"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="w-6 h-6 mr-2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25V9m10.5 6.75v-3m0 0v-3m0 6H5.25a2.25 2.25 0 01-2.25-2.25v-3A2.25 2.25 0 015.25 6.75H9M21 15.75h-3"
    />
  </svg>
  Add Video
</Link>
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
    </>
  );
};

export default ChannelDetails;
