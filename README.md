# Notes App API

A secure REST API for creating, reading, updating, and deleting notes.  
Each note belongs to an authenticated user and all note operations are protected with JWT authentication.  
Built with **Node.js**, **Express**, and **MongoDB**.

## Overview

This project demonstrates a complete backend setup including authentication, protected routes, and error handling.  
Users can register, log in, and manage their own notes.  

## Features

- JWT authentication (register and login)
- Secure CRUD operations for notes
- Middleware-based error handling
- Express-Async-Handler for async control flow
- Modular MVC structure

## Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JSON Web Token (JWT)
- bcryptjs
- dotenv
- express-async-handler

## Authentication Flow

- User Registration → POST /api/users/register
Creates a new user and returns a JWT token.

- User Login → POST /api/users/login
Validates credentials and returns a JWT token.

- Protected Routes
Add Authorization: Bearer <token> in headers to access note endpoints.

## API Endpoints

- User Routes
Method	     Endpoint	          Description                  Access
 POST	/api/users/signup	  Register a new user	           Public
 POST	/api/users/login	 Log in existing user	           Public

- Notes Routes
Method	     Endpoint	          Description                  Access
 POST	   /api/notes/	       Create a new note               Private
 GET	   /api/notes/  Get all notes for logged-in user       Private
 GET	 /api/notes/:id	         Get note by ID	               Private
 PUT	 /api/notes/:id	        Update note by ID	           Private
DELETE	 /api/notes/:id	        Delete note by ID	           Private

## Error Handling

Global middleware handles:
404 (Not Found)
500 (Internal Server Error)
Custom validation and authentication errors

## Future Enhancements

Pagination and filtering for notes
Search functionality
Role-based access control (Admin)
File upload support (Multer)