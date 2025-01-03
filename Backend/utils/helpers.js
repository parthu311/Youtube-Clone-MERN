// Function to format date to a more readable format
const formatDate = (date) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  };
  
  // Function to generate video URL slug (e.g., "How to Learn React" -> "how-to-learn-react")
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^[-]+|[-]+$/g, "");
  };
  
  // Function to calculate the time since a video was uploaded in a human-readable format
  const timeAgo = (date) => {
    const now = new Date();
    const seconds = Math.floor((now - new Date(date)) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);
  
    if (years > 0) return `${years} year${years > 1 ? "s" : ""} ago`;
    if (months > 0) return `${months} month${months > 1 ? "s" : ""} ago`;
    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
  };
  
  // Function to check if a string is a valid URL (for video and thumbnail URLs)
  const isValidUrl = (str) => {
    const pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([A-Z0-9](?:[A-Z0-9-]*[A-Z0-9])?)(\\.[A-Z0-9](?:[A-Z0-9-]*[A-Z0-9])?)*)|(([0-1]?[0-9]{1,2}|2[0-4][0-9]|25[0-5])\\.){3}(?:[0-1]?[0-9]{1,2}|2[0-4][0-9]|25[0-5])))" + // domain name
        "(\\:\\d+)?(\\/[-A-Z0-9+&@#/%=~_|,;]*)?" + // path
        "(\\?[;&A-Z0-9+%_=-]*)?" + // query string
        "(\\#[-A-Z0-9_]*)?$",
      "i"
    );
    return pattern.test(str);
  };
  
  // Function to sanitize input (e.g., to prevent XSS attacks)
  const sanitizeInput = (input) => {
    return input.replace(/<\/?[^>]+(>|$)/g, ""); // Removes any HTML tags
  };
  
  module.exports = {
    formatDate,
    generateSlug,
    timeAgo,
    isValidUrl,
    sanitizeInput,
  };
  