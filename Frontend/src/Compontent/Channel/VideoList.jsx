import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../services/api";

const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await API.get("/videos");
        setVideos(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch videos");
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="mt-20 min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
        All Videos
      </h2>
      {error && (
        <p className="text-red-500 text-center mb-4">{error}</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {videos.length > 0 ? (
          videos.map((video) => (
            <div
              key={video._id}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl overflow-hidden transform hover:scale-105 transition duration-300"
            >
              <Link to={`/videos/${video._id}`}>
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="w-full h-40 object-cover"
                />
              </Link>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 truncate">
                  {video.title}
                </h3>
                <p className="text-sm text-gray-600 mt-2 truncate">
                  {video.description}
                </p>
                <Link
                  to={`/videos/${video._id}`}
                  className="text-blue-500 mt-4 inline-block"
                >
                  View Video
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-center col-span-full">
            No videos found.
          </p>
        )}
      </div>
    </div>
  );
};

export default VideoList;
