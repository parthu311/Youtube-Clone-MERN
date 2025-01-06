import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../services/api";

const ChannelPage = () => {
  const [channels, setChannels] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const response = await API.get("/channels");
        setChannels(response.data);
      } catch (error) {
        setError("Failed to load channels.");
      }
    };

    fetchChannels();
  }, []);

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-700 mb-6">Channels</h1>
        <Link
          to="/create-channel"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Create New Channel
        </Link>

        <div className="mt-6 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {channels.map((channel) => (
            <div
              key={channel._id}
              className="bg-white p-4 shadow rounded-lg hover:shadow-lg transition"
            >
              <h2 className="text-xl font-bold text-gray-800">
                {channel.channelName}
              </h2>
              <p className="text-gray-600 mt-2">{channel.description}</p>
              {channel.channelBanner && (
                <img
                  src={channel.channelBanner}
                  alt={channel.channelName}
                  className="w-full h-32 object-cover mt-4 rounded-md"
                />
              )}
              <Link
                to={`/channels/${channel._id}`}
                className="text-blue-500 mt-4 inline-block"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChannelPage;
