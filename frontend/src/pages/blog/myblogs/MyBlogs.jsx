import { useEffect } from "react";
import useBlogStore from "../../../store/useBlogStore";
import { Link, useNavigate } from "react-router-dom";
import createBlogImg from "../../../assets/Design thinking-pana.svg";
import BlogCard from "../home/components/BlogCard";
import notebook from "../../../assets/Notebook-bro.svg";

const MyBlogs = () => {
  const { getMyBlogs, myBlogs, isBlogsLoading } = useBlogStore();

  const navigate = useNavigate();

  useEffect(() => {
    getMyBlogs();
  }, [getMyBlogs]);

  const blogHandler = (blogId) => {
    navigate(`/blog/${blogId}`);
  };

  return (
    <div className="flex">
      <div className="px-14 space-y-5 fixed m-10 lg:flex hidden flex-col items-center">
        <img src={notebook} className="size-52 object-cover" alt="welcome" />
      </div>
      {!isBlogsLoading && myBlogs.length === 0 ? (
        <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row py-20 px-10">
          <div className="flex-1 lg:flex gap-4 items-center justify-center">
            <img src={createBlogImg} className="max-h-96" alt="createBlog" />
            <div className="p-4">
              <p className="text-xl font-semibold py-4">
                U haven't created any blogs yet!.{" "}
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
          {myBlogs.map((blog) => (
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

export default MyBlogs;
