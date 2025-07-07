import { Blog } from "../models/blog.model.js";
import cloudinary from "../utils/cloudinary.js"

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("userId", "name profilePic email").sort({ createdAt: -1 });
    res.status(201).json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createBlog = async (req, res) => {
  try {
    const { title, category, content } = req.body;
    let { image } = req.body; 
    const userId = req.user._id.toString();

    if (!title || !category || !content) {
      return res
        .status(400)
        .json({ error: "Blog must have all the required fields" });
    }

    if (image) {
      const uploadedResponse = await cloudinary.uploader.upload(image);
      image = uploadedResponse.secure_url;
    }

    const newBlog = new Blog({
      userId,
      title,
      category,
      content,
      image,
      author: req.user.name
    });

    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const commentOnBlog = async (req, res) => {
  try {
    const { id: blogId } = req.params;
    const { text } = req.body;

    const userId = req.user._id.toString();

    if (!text) return res.status(400).json({ error: "Text field is required" });

    const blog = await Blog.findById(blogId);
    if (!blog) return res.status(404).json({ error: "Blog not found" });

    const comment = {
      text,
      user: userId,
    };

    blog.comments.push(comment);
    await blog.save();

    const updatedBlog = await Blog.findById(blogId)
      .populate("comments.user", "name profilePic");

    res.status(201).json(updatedBlog);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};


export const likeUnlikeBlog = async (req, res) => {
  try {
    const { id: blogId } = req.params;
    const userId = req.user._id.toString();

    const blog = await Blog.findById(blogId);

    if (!blog) return res.status(404).json({ error: "Blog not found" });

    const isLiked = blog.likes.includes(userId);

    if (isLiked) {
      await Blog.updateOne({ _id: blogId }, { $pull: { likes: userId } });
    } else {
      blog.likes.push(userId);
      await blog.save();
    }

    const updatedBlog = await Blog.findById(blogId)
      .populate("comments.user", "name profilePic");

    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateBlogById = async (req, res) => {
  try {
    const { title, category, content, image } = req.body;
    const { id } = req.params;


    const updateData = { title, category, content, image };

    const blog = await Blog.findByIdAndUpdate(id, updateData, { new: true });

    if (!blog) {
        return res.status(400).json({ error: "Blog not found" });
    }

    res.status(201).json({ message: "Blog updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const blogId = req.params.id;
  
    const blog = await Blog.findById(blogId).populate("comments.user", "name profilePic").exec();
    if (!blog) {
      return res.status(400).json({ error: "Blog not found" });
    }

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

export const getMyBlogs = async (req, res) => {
  try {
    const userId = req.user._id.toString();

    const blogs = await Blog.find({ userId }).sort({ createdAt: -1 }).populate({
      path: "userId",
      select: "-password"
    });

    res.status(200).json(blogs);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export const deleteBlogById = async (req, res) => {
    try {
        const { id } = req.params;
        await Blog.findByIdAndDelete(id);

        res.status(201).json({ message: "Song deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};
