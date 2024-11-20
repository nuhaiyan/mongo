import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  // Fetch posts from the server
  const fetchPosts = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/get-posts");
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  // Delete post by ID
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/delete-post/${id}`);
      setPosts(posts.filter((post) => post._id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  // Fetch posts when the component mounts
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Post List</h1>
      {posts.length === 0 ? (
        <p>Loading posts...</p>
      ) : (
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">#</th>
              <th className="border border-gray-300 p-2">Title</th>
              <th className="border border-gray-300 p-2">Author</th>
              <th className="border border-gray-300 p-2">Content</th>
              <th className="border border-gray-300 p-2">Tags</th>
              <th className="border border-gray-300 p-2">Published Date</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, index) => (
              <tr key={post._id} className="text-center">
                <td className="border border-gray-300 p-2">{index + 1}</td>
                <td className="border border-gray-300 p-2">{post.Title}</td>
                <td className="border border-gray-300 p-2">{post.Author}</td>
                <td className="border border-gray-300 p-2">
                  {post.Content.length > 50
                    ? `${post.Content.substring(0, 50)}...`
                    : post.Content}
                </td>
                <td className="border border-gray-300 p-2">
                  {post.Tags?.join(", ")}
                </td>
                <td className="border border-gray-300 p-2">
                  {new Date(post.PublishedDate).toLocaleDateString()}
                </td>
                <td className="border border-gray-300 p-2 space-x-2">
                  <Link
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    to={`/user-update/${post._id}`}
                  >
                    Update
                  </Link>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={() => handleDelete(post._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PostList;
