import { useEffect, useState } from "react";
import useBlogStore from "../../../store/useBlogStore";
import { useNavigate, useParams } from "react-router-dom";
import { Avatar } from "antd";
import ReadOnlyBlog from "./components/ReadOnlyBlog";
import blogImage from "../../../assets/Blog post-bro.svg";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import avatar from "../../../assets/avatar.png";
import useAuthStore from "../../../store/useAuthStore";
import { FaEdit, FaRegHeart } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FiLoader } from "react-icons/fi";
import { formatBlogDate } from "../../../lib/date";

const Blog = () => {
  const [comment, setComment] = useState("");
  const {
    blog,
    getBlogById,
    isCommenting,
    isLiking,
    commentOnBlog,
    deleteBlogById,
    likePost,
  } = useBlogStore();
  const { authUser } = useAuthStore();
  const { id } = useParams();
  const navigate = useNavigate();

  const isLiked = blog?.likes?.includes(authUser._id);
  const blogOwner = blog?.userId;

  useEffect(() => {
    if (id) {
      useBlogStore.setState({ blog: null });
      getBlogById(id);
    }
  }, [getBlogById, id]);

  const deleteBlogHandler = (blogId) => {
    deleteBlogById(blogId);
    navigate("/my-blogs");
  };

  return (
    <div className="mx-auto max-w-2xl">
      {!blog ? (
        <div className="flex items-center justify-center h-screen">
          <FiLoader className="size-10 animate-spin" />
        </div>
      ) : (
        <div className="p-6">
          {authUser?._id === blog?.userId && (
            <div key={blog?._id} className="mb-10 border-b space-y-6 pb-6">
              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`/edit-blog/${blog?._id}`)}
                  className="hover:bg-gray-300 p-2 rounded-md"
                >
                  <FaEdit className="size-5" />
                </button>
                <button
                  onClick={() => deleteBlogHandler(blog?._id)}
                  className="hover:bg-gray-300 p-2 rounded-md"
                >
                  <MdDelete className="size-5" />
                </button>
              </div>
            </div>
          )}
          <img
            src={blog?.image || blogImage}
            className="w-full h-80 my-5"
            alt="blog-image"
          />
          <h1 className="text-3xl font-bold my-10">{blog?.title}</h1>
          <div className="flex my-5 gap-5">
            <p className="text-sm flex items-center gap-2 text-gray-500 mb-3">
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
              {blog?.author}
            </p>
            <p className="text-sm flex gap-5 items-center text-gray-500 mb-3">
              # {blog?.category}
              <div
                className="flex gap-1 items-center group cursor-pointer"
                onClick={() => likePost(blog?._id)}
              >
                {isLiking && <AiOutlineLoading3Quarters className="size-sm" />}
                {!isLiked && !isLiking && (
                  <FaRegHeart className="w-4 h-4 cursor-pointer text-slate-500 group-hover:text-pink-500" />
                )}
                {isLiked && !isLiking && (
                  <FaRegHeart className="w-4 h-4 cursor-pointer text-pink-500" />
                )}

                <span
                  className={`text-sm group-hover:text-pink-500 ${
                    isLiked ? "text-pink-500" : "text-slate-500"
                  }`}
                >
                  {blog?.likes?.length}
                </span>
              </div>
            </p>
          </div>
          <div className="tiptap prose max-w-none">
            <ReadOnlyBlog content={blog?.content} />
          </div>
          <h1 className="text-2xl my-12 font-semibold">
            Responses{`(${blog?.comments?.length})`}
          </h1>
          <div className="flex items-center mb-2">
            {authUser?.profilePic ? (
              <img
                src={authUser?.profilePic || authUser?.name.charAt(0)}
                className="size-9"
              />
            ) : (
              <Avatar className="text-white bg-black uppercase">
                {authUser?.profilePic || authUser?.name?.charAt(0)}
              </Avatar>
            )}
            <div className="ml-3">{authUser?.name}</div>
          </div>
          <form
            className="flex flex-col lg:flex-row gap-2 items-center mt-4  pt-2"
            onSubmit={(e) => {
              e.preventDefault();
              commentOnBlog(blog?._id, comment);
              setComment("");
            }}
          >
            <textarea
              className="textarea w-full p-2 rounded text-md resize-none border focus:outline-none  border-gray-800"
              placeholder="Add your response..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button className="btn btn-primary rounded-full btn-sm text-white px-4">
              {isCommenting ? (
                <AiOutlineLoading3Quarters size="md" className="animate-spin" />
              ) : (
                "Respond"
              )}
            </button>
          </form>

          <div className="flex flex-col gap-3 space-y-14 mt-14">
            {blog?.comments?.length === 0 ? <p>No responses yet. Be the first one to respond!</p> : blog?.comments?.map((comment) => (
              <div
                key={comment?._id}
                className="flex gap-2 items-start border-b"
              >
                <div className="avatar">
                  <div className="w-8 rounded-full">
                    <img src={comment?.user?.profilePic || avatar} />
                  </div>
                </div>
                <div className="ml-1">
                  <p className="text-sm font-semibold">{comment?.user?.name}</p>
                  <p className="text-xs text-gray-500">
                    {formatBlogDate(comment?.createdAt)}
                  </p>
                  <p className="py-5">{comment?.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
