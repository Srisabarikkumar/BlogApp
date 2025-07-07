# Blogify

## Overview

Blogify is a modern, full-featured blogging platform built with cutting-edge web technologies. It empowers users to effortlessly turn their ideas into beautifully crafted blogs, share their thoughts with the world, and explore content from others — all in one intuitive and responsive interface.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [License](#license)

## Features:

- **User Authentication**: Uses JWT for authentication.
- **Create Blogs/ Edit Blogs**: Users can create or edit their blogs.
- **Explore Blogs**: Users can see the blogs listings created by various authors.
- **Responsive Design**: The application is optimized for desktop and mobile devices.

## Technologies Used:

- **Frontend**: React.js, react-router-dom, Zustand, Tailwind css, Daisy UI, Ant Design.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB.
- **Authentication**: JWT, bcryptjs.
- **Tools and ORM**: Mongoose, Vite, npm.

## Usage:

1. **Sign Up/Log In**: Signup / Login.
2. **View Blogs**: View Blogs of other users.
3. **Create Blogs**: Create your own blogs.
4. **Manage your blogs**: Edit or delete your blogs.

## API Endpoints:

- **Authentication**
  - `POST /api/auth/signup`: Register a user.
  - `POST /api/auth/login`: Logs the user in.
  - `POST /api/auth/logout`: Logs out the user.
  - `GET /api/auth/check`: Fetches the currently authenticated user.

- **Blogs**
  - `GET /api/blogs`: Fetches all the blogs.
  - `GET /api/blogs?category=:category&author=:author`: Filter's the blogs by category, author or both.
  - `POST /api/blogs`: Create a blog.
  - `PUT /blogs/:id`: Update a blog.
  - `DELETE /blogs/:id`: Deletes a blog.
  - `GET /blogs/myblogs`: Fetches the authenticated user's blogs.

## License

This project is licensed under the [MIT License](LICENSE)
