# Blogify

## Overview

Blogify is a modern, full-featured blogging platform built with cutting-edge web technologies. It empowers users to effortlessly turn their ideas into beautifully crafted blogs, share their thoughts with the world, and explore content from others — all in one intuitive and responsive interface.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Usage](#usage)
- [Installation and setup](#installation-and-setup)
- [API Endpoints](#api-endpoints)
- [License](#license)

## Features:

- **User Authentication**: Uses JWT for authentication.
- **Create Blogs/ Edit Blogs**: Users can create or edit their blogs.
- **Explore Blogs**: Users can see the blogs listings created by various authors, like and comment on blogs.
- **Responsive Design**: The application is optimized for desktop and mobile devices.

## Technologies Used:

- **Frontend**: React.js, react-router-dom, Zustand, Tailwind css, Daisy UI, Ant Design.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB.
- **Authentication**: JWT, bcryptjs.
- **Tools and ORM**: Mongoose, Vite, npm.

## Usage:

1. **Sign Up/Log In**: Signup / Login.
2. **View Blogs**: View Blogs of other users, like and comment on those blogs.
3. **Create Blogs**: Create your own blogs.
4. **Manage your blogs**: Edit or delete your blogs.

## Installation and setup:

1. Clone the repository:
    ```bash
    git clone <repository-url>
    cd blogapp
    ```
    
2. Setup the backend:
    ```bash
    cd backend
    npm install
    ```

3. Create a .env file:
    ```bash
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    ```
    Start the server with nodemon:
    ```
    nodemon src/index.js
    ```

4. Setup the frontend:
    ```
    cd frontend
    npm install
    npm run dev
    ```

5. Access the application:
    ```
    http://localhost:5173
    ```

## API Endpoints:

- **Authentication**
  - `POST /api/auth/register`: Register a user.
  - `POST /api/auth/login`: Logs the user in.
  - `POST /api/auth/logout`: Logs out the user.
  - `GET /api/auth/check`: Fetches the authenticated user.
  - `GET /api/auth/profile`: Fetches the authenticated user's profile.

- **Blogs**
  - `GET /api/blogs`: Fetches all the blogs.
  - `POST /api/blogs`: Create a blog.
  - `GET /api/blogs/:id`: Get blog by Id.
  - `PUT /api/blogs/:id`: Edit/Update a blog.
  - `DELETE /api/blogs/:id`: Deletes a blog.
  - `GET /api/blogs/myblogs`: Fetches the authenticated user's blogs.
  - `GET /api/blogs/comment/:id`: Comment on user's blog.
  - `GET /api/blogs/like/:id`: Like or Unlike a blog.

## License

This project is licensed under the [MIT License](LICENSE)
