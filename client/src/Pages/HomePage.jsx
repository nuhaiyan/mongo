import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HomePage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { Title, Author, Content, Tags, PublishedDate } = data;
    console.log(data);
    try {
      const postInfo = {
        Title,
        Author,
        Content,
        Tags: Tags.split(",").map((tag) => tag.trim()), // Convert Tags to an array
        PublishedDate,
      };

      const { data } = await axios.post(`http://localhost:5000/add-user`, postInfo);
      console.log(data);

      if (data.acknowledged === true) {
        navigate("/employlist");
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center min-h-[80vh]">
      <div className="bg-slate-500 my-10 rounded-lg p-5 min-w-[600px]">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            {/* Title Field */}
            <div>
              <label htmlFor="title" className="block text-white mb-2 text-sm">
                Title
              </label>
              <input
                type="text"
                placeholder="Enter the Title"
                className="w-full px-3 py-2 border outline-none rounded-lg text-white bg-transparent"
                {...register("Title", { required: "Title is required" })}
              />
              {errors.Title && (
                <small className="text-red-500 font-bold">{errors.Title.message}</small>
              )}
            </div>

            {/* Author Field */}
            <div>
              <label htmlFor="author" className="block text-white mb-2 text-sm">
                Author
              </label>
              <input
                type="text"
                placeholder="Enter the Author's Name"
                className="w-full px-3 py-2 border outline-none rounded-lg text-white bg-transparent"
                {...register("Author", { required: "Author is required" })}
              />
              {errors.Author && (
                <small className="text-red-500 font-bold">{errors.Author.message}</small>
              )}
            </div>

            {/* Content Field */}
            <div>
              <label htmlFor="content" className="block text-white mb-2 text-sm">
                Content
              </label>
              <textarea
                rows="5"
                placeholder="Enter the Content"
                className="w-full px-3 py-2 border outline-none rounded-lg text-white bg-transparent"
                {...register("Content", { required: "Content is required" })}
              ></textarea>
              {errors.Content && (
                <small className="text-red-500 font-bold">{errors.Content.message}</small>
              )}
            </div>

            {/* Tags Field */}
            <div>
              <label htmlFor="tags" className="block text-white mb-2 text-sm">
                Tags
              </label>
              <input
                type="text"
                placeholder="Enter comma-separated Tags (e.g., JavaScript, React)"
                className="w-full px-3 py-2 border outline-none rounded-lg text-white bg-transparent"
                {...register("Tags", { required: "Tags are required" })}
              />
              {errors.Tags && (
                <small className="text-red-500 font-bold">{errors.Tags.message}</small>
              )}
            </div>

            {/* Published Date Field */}
            <div>
              <label htmlFor="publishedDate" className="block text-white mb-2 text-sm">
                Published Date
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border outline-none rounded-lg text-white bg-transparent"
                {...register("PublishedDate", { required: "Published Date is required" })}
              />
              {errors.PublishedDate && (
                <small className="text-red-500 font-bold">
                  {errors.PublishedDate.message}
                </small>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex my-4 justify-center">
              <div>
                <input
                  type="submit"
                  value="Submit"
                  className="bg-slate-600 rounded-lg p-3"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HomePage;
