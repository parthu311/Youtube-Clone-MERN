import React, { useEffect, useState } from "react";
import { getUserProfile } from "../../services/api";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await getUserProfile();
        setUser(response.data);
      } catch (error) {
        setError("Failed to fetch profile. Please log in again.");
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchProfile();
  }, [navigate]);

  if (error) return <p className="text-center text-red-600">{error}</p>;
  if (!user) return <p className="text-center">Loading...</p>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          User Profile
        </h2>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Username:</span>
            <span className="text-gray-600">{user.username}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Email:</span>
            <span className="text-gray-600">{user.email}</span>
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-4 flex-wrap">
          {/* Create Channel Button */}
          <button
            onClick={() => navigate("/create-channel")}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
          >
            Create Channel
          </button>

          {/* View Channels Button */}
          <button
            onClick={() => navigate("/channels")}
            className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2"
          >
            View Channels
          </button>

          {/* Logout Button */}
          <button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
