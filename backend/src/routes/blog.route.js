import express from "express";
import {
  commentOnBlog,
  createBlog,
  deleteBlogById,
  getAllBlogs,
  getBlogById,
  getMyBlogs,
  likeUnlikeBlog,
  updateBlogById,
} from "../controllers/blog.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.use(protectRoute);

router.get("/", getAllBlogs);
router.post("/", singleUpload, createBlog);
router.get("/myblogs", getMyBlogs);
router.get("/:id", getBlogById);
router.put("/:id", updateBlogById);
router.delete("/:id", deleteBlogById);
router.post("/comment/:id", commentOnBlog);
router.post("/like/:id", likeUnlikeBlog);

export default router;
