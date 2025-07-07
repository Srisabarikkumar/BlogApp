import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import useAuthStore from "./store/useAuthStore";
import { lazy, Suspense, useEffect } from "react";
import { FiLoader } from "react-icons/fi";

const LoginPage = lazy(() => import("./pages/auth/login/LoginPage"));
const SignUpPage = lazy(() => import("./pages/auth/signup/SignUpPage"));
const Blogs = lazy(() => import("./pages/blog/home/Blogs"));
const ProfilePage = lazy(() => import("./pages/profile/ProfilePage"));
const CreateBlog = lazy(() => import("./pages/blog/createblog/CreateBlog"));
const MyBlogs = lazy(() => import("./pages/blog/myblogs/MyBlogs"));
const Blog = lazy(() => import("./pages/blog/home/Blog"));
const EditBlog = lazy(() => import("./pages/blog/editblog/EditBlog"));
const Layout = lazy(() => import("./components/Layout"));

function App() {
  const { authUser, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <div className="bg-violet-50 overflow-auto h-screen">
      <Toaster />
      <Suspense fallback={
         <div className="flex items-center justify-center h-screen">
          <FiLoader className="size-10 animate-spin" />
         </div>
      }>
        <Routes>
          <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
          <Route path="/create-blog" element={authUser ? <CreateBlog /> : <Navigate to="/login" />} />
          <Route path="/edit-blog/:id" element={authUser ? <EditBlog /> : <Navigate to="/login" />} />
          <Route path="/register" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
          <Route path="/" element={<Layout />}>
            <Route path="/" element={authUser ? <Blogs /> : <Navigate to="/login" />} />
            <Route path="/my-blogs" element={authUser ? <MyBlogs /> : <Navigate to="/login" />} />
            <Route path="/blog/:id" element={authUser ? <Blog /> : <Navigate to="/login" />} />
            <Route path="/my-profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
