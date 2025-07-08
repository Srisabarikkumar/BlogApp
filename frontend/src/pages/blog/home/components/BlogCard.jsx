import { Avatar } from "antd";
import { BookOutlined } from "@ant-design/icons";
import { formatBlogDate } from "../../../../lib/date";
import { FaComment } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import blogImage from "../../../../assets/Blog post-bro.svg";

const BlogCard = ({ blog, onClick }) => {
  const blogOwner = blog?.userId;

  return (
    <div
      onClick={onClick}
      className="mb-4 border-b border-gray-300 cursor-pointer"
    >
      <div className="flex items-center mb-2">
        {blogOwner?.profilePic ? (
          <img
            src={blogOwner?.profilePic || blog.author?.charAt(0)}
            className="size-9"
          />
        ) : (
          <Avatar className="text-white bg-black uppercase">
            {blog?.author?.charAt(0)}
          </Avatar>
        )}
        <div className="ml-3">
          <p className="text-sm font-semibold">{blog.author}</p>
          <p className="text-xs text-gray-500">
            {formatBlogDate(blog.createdAt)}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-md lg:text-xl font-extrabold">{blog.title}</h1>
        <img
          className="h-28 w-32 object-fit"
          src={blog.image || blogImage}
          alt="blog-image"
        />
      </div>

      <div className="mb-2 flex flex-wrap gap-3">
        <p># {blog?.category}</p>
        <div className="flex gap-1 items-center text-zinc-500">
          <FaComment className="size-4" />
          <p className="text-sm">{blog?.comments?.length}</p>
        </div>
        <div className="flex gap-1 items-center text-zinc-500">
          <FaHeart className="size-4" />
          <p className="text-sm">{blog?.likes?.length}</p>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-4"></div>
        <div className="flex items-center gap-2">
          <BookOutlined />
          <span className="py-2">3 min read</span>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
