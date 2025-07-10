import { Link } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import { CgProfile } from "react-icons/cg";
import { MdLogout } from "react-icons/md";
import { ImBlog } from "react-icons/im";
import { IoMdCreate } from "react-icons/io";
import { Avatar } from "antd";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <div className="navbar flex top-0 left-0 right-0 justify-between bg-[#ba68c8] sticky z-50">
      <Link className="btn btn-ghost text-xl text-white font-mono" to={"/"}>
        Blogify
      </Link>

      <div className="flex gap-2">
         <Link to="/create-blog">
            <button className="btn lg:hidden rounded-full bg-inherit btn-secondary">
              <IoMdCreate />
            </button>
          </Link>
        <Link to="/my-profile">
          <button className="btn rounded-full bg-inherit btn-secondary">
            {authUser?.profilePic ? (
          <img
            src={authUser?.profilePic || authUser?.name?.charAt(0)}
            className="size-8 object"
          />
        ) : (
          <Avatar className="text-white bg-black uppercase">
            {authUser?.name?.charAt(0)}
          </Avatar>
        )}
            <span className="hidden sm:inline">{authUser?.name}</span>
          </button>
        </Link>
        <Link to="/my-blogs">
          <button className="btn rounded-full bg-inherit btn-secondary">
            <ImBlog className="size-4" />
            <span className="hidden sm:inline">My Blogs</span>
          </button>
        </Link>
        <button
          onClick={logout}
          className="btn rounded-full bg-inherit btn-secondary"
        >
          <MdLogout className="size-4" />
          <span className="hidden sm:inline">logout</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
