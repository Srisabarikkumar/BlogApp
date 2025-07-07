import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

const useBlogStore = create((set, get) => ({
  blogs: [],
  myBlogs: [],
  blog: null,
  isBlogsLoading: false,
  isCommenting: false,
  isLiking: false,

  getBlogs: async (filters = {}) => {
    set({ isBlogsLoading: true });
    try {
      const query = new URLSearchParams();
      if (filters.category && filters.category !== "all") {
        query.append("category", filters.category);
      }
      if (filters.author && filters.author !== "all") {
        query.append("author", filters.author);
      }
      const response = await axiosInstance.get(`/blogs?${query.toString()}`);
      set({ blogs: response.data });
    } catch (error) {
      set({ error: error.response?.data?.message });
    } finally {
      set({ isBlogsLoading: false });
    }
  },

  createBlog: async (values) => {
    const { blogs } = get();
    try {
      const response = await axiosInstance.post("/blogs", values);
      set({ blogs: [...blogs, response.data] });
      toast.success("Blog created successfully!");
    } catch (error) {
      toast.error("All fields are required");
      set({ error: error.response?.data?.message });
    } finally {
      set({ isBlogsLoading: false });
    }
  },

  updateBlogById: async (blogId, values) => {
    try {
      const response = await axiosInstance.put(`/blogs/${blogId}`, values);
      set({ blog: response.data });
      toast.success("Blog updated successfully");
    } catch (error) {
      set({ error: error.response?.data?.message });
    }
  },

  deleteBlogById: async (blogId) => {
    try {
      const response = await axiosInstance.delete(`/blogs/${blogId}`);
      set({ blog: response.data });
      toast.success("Blog deleted successfully");
    } catch (error) {
      set({ error: error.response?.data?.message });
    }
  },

  getMyBlogs: async () => {
    set({ isBlogsLoading: true });
    try {
      const response = await axiosInstance.get(`/blogs/myBlogs`);
      set({ myBlogs: response.data });
    } catch (error) {
      set({ error: error.response?.data?.message });
    } finally {
      set({ isBlogsLoading: false });
    }
  },

  getBlogById: async (blogId) => {
    try {
      const response = await axiosInstance.get(`blogs/${blogId}`);
      set({ blog: response.data });
    } catch (error) {
      set({ error: error.response?.data?.message });
    }
  },

  commentOnBlog: async (blogId, text) => {
    set({ isCommenting: true });
    try {
      const response = await axiosInstance.post(`blogs/comment/${blogId}`, { text });
      set({ blog: response.data });
    } catch (error) {
      set({ error: error.response?.data?.message });
    } finally {
      set({ isCommenting: false });
    }
  },

  likePost: async (blogId) => {
    set({ isLiking: true });
    try {
      const response = await axiosInstance.post(`blogs/like/${blogId}`);
      set({ blog: response.data });
    } catch (error) {
      set({ error: error.response?.data?.message });;
    } finally {
      set({ isLiking: false });
    }
  }
}));

export default useBlogStore;
