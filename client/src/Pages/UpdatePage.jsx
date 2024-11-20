import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdatePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    // Fetch the post data by ID and populate the form
    const fetchPost = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/get-post/${id}`
        );
        if (data) {
          // Set form values
          setValue("Title", data.Title);
          setValue("Author", data.Author);
          setValue("Content", data.Content);
          setValue("Tags", data.Tags.join(", "));
          setValue("PublishedDate", new Date(data.PublishedDate).toISOString().split("T")[0]);
        }
      } catch (error) {
        console.error("Failed to fetch post data:", error);
      }
    };

    fetchPost();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      // Transform tags into an array
      const formattedData = {
        ...data,
        Tags: data.Tags.split(",").map((tag) => tag.trim()),
      };
      const response = await axios.patch(
        `http://localhost:5000/update-post/${id}`,
        formattedData
      );
      if (response.data.modifiedCount > 0) {
        alert("Post updated successfully!");
        navigate("/employlist"); // Navigate back to post list
      }
    } catch (error) {
      console.error("Failed to update post:", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Update Post</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block font-medium mb-2">Title</label>
          <input
            {...register("Title")}
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter post title"
          />
        </div>

        {/* Author */}
        <div>
          <label className="block font-medium mb-2">Author</label>
          <input
            {...register("Author")}
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter author name"
          />
        </div>

        {/* Content */}
        <div>
          <label className="block font-medium mb-2">Content</label>
          <textarea
            {...register("Content")}
            className="w-full p-2 border border-gray-300 rounded-md"
            rows="5"
            placeholder="Enter post content"
          ></textarea>
        </div>

        {/* Tags */}
        <div>
          <label className="block font-medium mb-2">Tags</label>
          <input
            {...register("Tags")}
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter tags (comma-separated)"
          />
        </div>

        {/* Published Date */}
        <div>
          <label className="block font-medium mb-2">Published Date</label>
          <input
            {...register("PublishedDate")}
            type="date"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Update Post
        </button>
      </form>
    </div>
  );
};

export default UpdatePage;
