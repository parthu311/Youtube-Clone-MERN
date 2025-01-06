import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../../services/api";

const ChannelDetails = () => {
  const { id } = useParams();
  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState("");
  const [newVideo, setNewVideo] = useState({
    title: "",
    description: "",
    thumbnailUrl: "",
    videoUrl: "",
  });

  useEffect(() => {
    // Fetch channel details
    const fetchChannelDetails = async () => {
      try {
        const response = await API.get(`/channels/${id}`);
        setChannel(response.data);
      } catch (error) {
        setError("Failed to load channel details.");
      }
    };

    // Fetch videos by channel
    const fetchVideos = async () => {
      try {
        const response = await API.get(`/videos/channel/${id}`);
        setVideos(response.data);
      } catch (error) {
        setError("Failed to load videos.");
      }
    };

    fetchChannelDetails();
    fetchVideos();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVideo((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddVideo = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/videos", {
        ...newVideo,
        channel: id, // Associate video with the channel
      });
      setVideos((prev) => [...prev, response.data.video]); // Add new video to the list
      setNewVideo({ title: "", description: "", thumbnailUrl: "", videoUrl: "" }); // Reset form
    } catch (error) {
      setError("Failed to add video.");
    }
  };

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  if (!channel) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-700">{channel.channelName}</h1>
        <p className="text-gray-600 mt-4">{channel.description}</p>
        {channel.channelBanner && (
          <img
            src={channel.channelBanner}
            alt={channel.channelName}
            className="w-full h-64 object-cover mt-6 rounded-md"
          />
        )}

        {/* Add Video Form */}
        <form onSubmit={handleAddVideo} className="mt-6 space-y-4">
          <h2 className="text-xl font-bold text-gray-700">Add New Video</h2>
          <input
            type="text"
            name="title"
            value={newVideo.title}
            onChange={handleInputChange}
            placeholder="Video Title"
            className="w-full p-2 border rounded"
            required
          />
          <textarea
            name="description"
            value={newVideo.description}
            onChange={handleInputChange}
            placeholder="Video Description"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="thumbnailUrl"
            value={newVideo.thumbnailUrl}
            onChange={handleInputChange}
            placeholder="Thumbnail URL"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="videoUrl"
            value={newVideo.videoUrl}
            onChange={handleInputChange}
            placeholder="Video URL"
            className="w-full p-2 border rounded"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Add Video
          </button>
        </form>

        {/* Videos List */}
        <div className="mt-6">
          <h2 className="text-xl font-bold text-gray-700">Videos</h2>
          {videos.length === 0 ? (
            <p className="text-gray-600">No videos available.</p>
          ) : (
            <div className="space-y-4">
              {videos.map((video) => (
                <div key={video._id} className="p-4 bg-gray-100 rounded shadow">
                  <h3 className="font-bold">{video.title}</h3>
                  <p>{video.description}</p>
                  {video.thumbnailUrl && (
                    <img
                      src={video.thumbnailUrl}
                      alt={video.title}
                      className="w-full h-32 object-cover mt-2 rounded"
                    />
                  )}
                  <a
                    href={video.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 mt-2 inline-block"
                  >
                    Watch Video
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>

        <Link to="/channels" className="text-blue-500 mt-6 inline-block">
          Back to Channels
        </Link>
      </div>
    </div>
  );
};

export default ChannelDetails;
