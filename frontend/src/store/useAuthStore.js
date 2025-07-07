import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

const useAuthStore = create((set) => ({
  authUser: null,
  ischeckingAuth: true,
  isUpdatingProfile: false,
  isSigningUp: false,
  isLoggingIn: false,
  error: null,

  checkAuth: async () => {
    try {
      const response = await axiosInstance.get("/auth/check");
      set({ authUser: response.data });
    } catch (error) {
      set({ authUser: null });
      console.log(error);
    } finally {
      set({ ischeckingAuth: false });
    }
  },

  signup: async (values) => {
    set({ isSigningUp: true, error: null });
    try {
      const response = await axiosInstance.post("/auth/register", values);
      set({ authUser: response.data });
      toast.success("Account created successfully");
    } catch (error) {
      toast.error("User already exists");
      set({ error: error.response?.data?.message });
    } finally {
      set({ isSigningUp: false, error: null });
    }
  },

  login: async (values) => {
    set({ isLoggingIn: true, error: null });
    try {
      const response = await axiosInstance.post("/auth/login", values);
      set({ authUser: response.data });
      console.log(response.data);
      toast.success(`Welcome back ${response.data.name}`);
    } catch (error) {
      toast.error("Invalid credentials");
      set({ error: error.response.data.message });
    } finally {
      set({ isLoggingIn: false, error: null });
    }
  },

  updateProfile: async (values) => {
    set({ isUpdatingProfile: true });
    try {
      const response = await axiosInstance.put("/auth/profile", values);
      set({ authUser: response.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  },
}));

export default useAuthStore;
