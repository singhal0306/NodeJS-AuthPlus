# Node.js Login System with hbs Templates and Profile Image Management

## Overview

This project is a robust and secure login system built using Node.js, `hbs` (Handlebars) for template rendering, and MySQL as the database. It allows users to register, log in, manage sessions, and securely update their profile information, including the ability to change their profile image. The system is designed with security in mind, using bcrypt for password hashing and Express.js for server-side logic.

## Features

- User registration and login
- Secure session management
- Password hashing with bcrypt
- Profile management with the ability to change the profile image
- Clean and responsive UI using `hbs` templates
- MySQL database integration

## Technologies Used

- **Node.js**: Server-side JavaScript runtime
- **Express.js**: Web framework for Node.js
- **hbs (Handlebars)**: Template engine for dynamic views
- **MySQL**: Relational database for storing user data
- **bcrypt**: Library for hashing passwords
- **multer**: Middleware for handling file uploads (profile images)

## Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/singhal0306/NodeJS-AuthPlus.git
    cd your-repo-name
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Set up MySQL database:**
    - Create a MySQL database.
    - Import the provided SQL schema.
    - Update the database connection details in `src/mysql.js`.

4. **Configure environment variables:**
    Create a `.env` file in the root directory and add the following:
    ```env
    DATABASE_HOST = localhost
    DATABASE_USER = root
    DATABASE_PASSWORD =
    DATABASE = login-system
    JWT_SECRET =
    JWT_EXPIRES_IN = 90d
    JWT_COOKIE_EXPIRES = 90
    ```

5. **Run the application:**
    ```bash
    npm start
    ```

6. **Access the application:**
    Open your browser and navigate to `http://localhost:8000`.

## Project Structure

```plaintext
|-- src/
|   |-- mysql.js           # Database connection setup
|
|-- public/      
|   |-- style.css            # Stylesheets
|
|-- routes/
|   |-- auth.js         # Authentication routes
|   |-- pages.js      # Profile management routes
|
|-- templates/
|   |-- home.hbs    # Main layout
|   |-- login.hbs
|   |-- login2.hbs   # Login page
|   |-- signup.hbs # Registration page
|   |-- profile.hbs     # Profile page with image upload
|
|-- controllers/
|   |-- auth.js
|
|-- upload
|   |-- profile_images  # Profile images uploaded
|
|-- index.js              # Main application file
|-- .env.example        # Example environment file
|-- package.json        # Node.js dependencies
