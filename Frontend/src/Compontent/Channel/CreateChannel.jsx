import { useState } from "react";
import { useNavigate } from "react-router-dom"; // For redirecting after channel creation
import { createChannel } from "../../services/api";

const CreateChannel = () => {
  const [channelName, setChannelName] = useState("");
  const [description, setDescription] = useState("");
  const [channelBanner, setChannelBanner] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const handleSubmit = async (e) => {
    e.preventDefault();
    const channelData = { channelName, description, channelBanner };

    try {
      const response = await createChannel(channelData);
      // Redirect to the channel page or channel list after successful creation
      navigate("/channels"); // Adjust this route to your needs
    } catch (error) {
      setError("Error creating channel. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Create New Channel</h2>
        
        {/* Error message */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Channel Name */}
          <div>
            <label htmlFor="channelName" className="block text-gray-600">Channel Name</label>
            <input
              type="text"
              id="channelName"
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
              placeholder="Enter channel name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-gray-600">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter channel description"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
            />
          </div>

          {/* Channel Banner */}
          <div>
            <label htmlFor="channelBanner" className="block text-gray-600">Channel Banner (URL)</label>
            <input
              type="text"
              id="channelBanner"
              value={channelBanner}
              onChange={(e) => setChannelBanner(e.target.value)}
              placeholder="Enter channel banner URL"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Create Channel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateChannel;
