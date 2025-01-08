import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../services/api";

const ChannelVideos = () => {
  const { channelId } = useParams();
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await API.get(`/videos/channel/${channelId}`);
        setVideos(response.data);
      } catch (error) {
        setError("Failed to load videos.");
      }
    };

    fetchVideos();
  }, [channelId]);

  if (error) {
    return <p className="text-red-500 text-center mt-4">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {videos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {videos.map((video) => (
            <div
              key={video._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transform transition duration-300"
            >
              <img
                src={video.thumbnailUrl}
                alt={video.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 truncate">
                  {video.title}
                </h3>
                <p className="text-sm text-gray-600 truncate">
                  {video.description}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Channel: {video.channelName || "Unknown"}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-center mt-4">
          No videos found for this channel.
        </p>
      )}
    </div>
  );
};

export default ChannelVideos;
