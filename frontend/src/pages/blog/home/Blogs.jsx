import { useEffect } from "react";
import useBlogStore from "../../../store/useBlogStore";
import { Link, useNavigate } from "react-router-dom";
import BlogCard from "./components/BlogCard";
import emptyImg from "../../../assets/Empty-pana.svg";
import welcome from "../../../assets/Welcome-pana.svg";

const Blogs = () => {
  const { getBlogs, blogs, isBlogsLoading } = useBlogStore();
  const navigate = useNavigate();

  useEffect(() => {
    getBlogs();
  }, [getBlogs]);

  const blogHandler = (blogId) => {
    navigate(`/blog/${blogId}`);
  };

  return (
    <div className="flex">
      <div className="px-14 space-y-5 fixed m-10 lg:flex hidden flex-col items-center">
        <img src={welcome} className="size-52 object-cover" alt="welcome" />
        <Link to="/create-blog">
          <button className="btn rounded-full btn-primary btn-outline">
            Create a Blog
          </button>
        </Link>
      </div>
      {!isBlogsLoading && blogs.length === 0 ? (
        <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row py-32 my-auto px-10">
          <div className="flex-1 lg:flex gap-4 items-center justify-center">
            <img src={emptyImg} className="max-h-96" alt="createBlog" />
          <div className="p-4">
            <p className="text-xl font-semibold py-4">
              No blogs at this time, Be the first to create one!.
            </p>
            <Link to="/create-blog">
              <button className="btn rounded-full btn-primary btn-outline">
                Create Blog
              </button>
            </Link>
          </div>
          </div>
        </div>
      ) : (
        <div className="p-6 max-w-2xl mx-auto">
          {blogs.map((blog) => (
            <BlogCard
              onClick={() => blogHandler(blog._id)}
              key={blog._id}
              blog={blog}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Blogs;
