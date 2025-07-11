import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import blogRoutes from "./routes/blog.route.js";
import connectToDB from "./db/connectToDB.js";

dotenv.config();

const __dirname = path.resolve();
const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5173",
  "https://blogapp-iii8.onrender.com"
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
  });
}

app.listen(PORT, () => {
    connectToDB();
    console.log(`Server is running on ${PORT}`);
});