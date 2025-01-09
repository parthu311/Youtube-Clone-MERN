import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Mocked APIs
const mockVideoData = {
  title: "Sample Video",
  description: "This is a sample video description.",
  url: "https://www.w3schools.com/html/mov_bbb.mp4",
  likes: 10,
  dislikes: 2,
  comments: [
    { _id: "comment1", text: "Great video!" },
    { _id: "comment2", text: "Loved it!" },
  ],
};

const getVideoById = async (videoId) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: mockVideoData }), 500);
  });
};

const likeVideo = async (videoId) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: { success: true } }), 200);
  });
};

const dislikeVideo = async (videoId) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: { success: true } }), 200);
  });
};

const addComment = async (videoId, { text }) => {
  return new Promise((resolve) => {
    const newComment = { _id: `comment${Date.now()}`, text };
    setTimeout(() => resolve({ data: newComment }), 200);
  });
};

// VideoDetailsPage Component
const VideoDetailsPage = () => {
  const { videoId } = useParams(); // Extract videoId from URL params
  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        const response = await getVideoById(videoId);
        setVideo(response.data);
        setComments(response.data.comments || []);
      } catch (error) {
        console.error("Error fetching video details:", error);
      }
    };

    fetchVideoDetails();
  }, [videoId]);

  const handleLike = async () => {
    try {
      await likeVideo(videoId);
      setVideo((prev) => ({ ...prev, likes: prev.likes + 1 }));
    } catch (error) {
      console.error("Error liking video:", error);
    }
  };

  const handleDislike = async () => {
    try {
      await dislikeVideo(videoId);
      setVideo((prev) => ({ ...prev, dislikes: prev.dislikes + 1 }));
    } catch (error) {
      console.error("Error disliking video:", error);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
      const response = await addComment(videoId, { text: newComment });
      setComments((prev) => [...prev, response.data]);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  if (!video) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">{video.title}</h1>
      <video className="w-full rounded-lg shadow-lg" src={video.url} controls />
      <p className="mt-2 text-lg text-gray-700">{video.description}</p>

      <div className="flex items-center mt-4">
        {/* Like button */}
        <button
          onClick={handleLike}
          className="flex items-center text-lg text-gray-600 hover:text-blue-600 focus:outline-none mr-4"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/4926/4926585.png"
            alt="Like"
            className="w-6 h-6 mr-2"
          />
          Like ({video.likes})
        </button>

        {/* Dislike button */}
        <button
          onClick={handleDislike}
          className="flex items-center text-lg text-gray-600 hover:text-red-600 focus:outline-none"
        >
          <img
            src="https://image.similarpng.com/very-thumbnail/2020/08/Dislike-icon-on-transparent-PNG.png"
            alt="Dislike"
            className="w-6 h-6 mr-2"
          />
          Dislike ({video.dislikes})
        </button>
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-2">Comments</h2>
        <ul className="space-y-2">
          {comments.map((comment) => (
            <li key={comment._id} className="p-2 bg-gray-100 rounded-lg shadow-sm">
              {comment.text}
            </li>
          ))}
        </ul>

        <form onSubmit={handleAddComment} className="mt-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment"
            required
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default VideoDetailsPage;
