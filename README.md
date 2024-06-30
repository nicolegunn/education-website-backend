# Education Website - Backend

![Node](https://img.shields.io/badge/Node.js-16.0.0-green)
![Express](https://img.shields.io/badge/Express-4.17.1-blue)
![MySQL](https://img.shields.io/badge/MySQL-8.0.25-blue)

This is the backend of the Education Website project, built with Node.js, Express, and MySQL.

## Demo Website

The Level Up Works Website is deployed on GitHub Pages. You can access it [here](https://nicolegunn.github.io/education-website-frontend/).

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Authentication](#authentication)
- [Project Library](#project-library)
- [User Profile Pages](#user-profile-pages)
- [Student Dashboard](#student-dashboard)
- [Teacher Dashboard](#teacher-dashboard)
- [License](#license)

## Introduction

The Level Up Works Website is a Learning Management System that enables school students to get their lesson instructions, request help, and submit work. School teachers can track student progress and manage help requests.

## Features

- User Authentication and Authorization
- Project Library with Filtering Options
- Profile Viewing for Students and Teachers
- Learning Objectives and Progress Tracking
- Interactive Tutorials and Instructions
- Real-time Data Fetching with Axios

## Technologies Used

- **Frontend:**
  - ![React](https://img.shields.io/badge/React-v17.0.2-blue.svg)
  - ![Vite](https://img.shields.io/badge/Vite-v2.6.4-yellow.svg)
  - ![Axios](https://img.shields.io/badge/Axios-v0.21.1-lightblue.svg)
- **Backend:**
  - ![Node.js](https://img.shields.io/badge/Node.js-v20.12.2-green.svg)
  - ![Express](https://img.shields.io/badge/Express-v4.19.2-lightgrey.svg)
- **Database:**
  - ![MySQL](https://img.shields.io/badge/MySQL-v3.9.4-orange.svg)
- **Other:**
  - Context API for state management
  - React Router for routing
  - CSS Modules for styling

## Authentication

### Login Process

The login process includes field validation, making an API call to the `/login` endpoint, and handling the server response.

**Note:** For demo purposes, the student is automatically logged in with the following credentials:

- Email: a_andrews@missionx.school.nz
- Password: AA1234

### Registering a New User

The signup process includes field validation, preparing user data, making an API call to the `/signup` endpoint, and handling the server response.

**Note:** This functionality has been disabled for demo purposes.

### Protected Routes

Protected routes ensure that only authenticated users can access certain routes. If an unauthenticated user tries to access a protected route, they are redirected to the home page.

**Note:** This functionality has been disabled for demo purposes.

## Project Library

The Project Library allows students to select a project which takes them to the relevant Student Dashboard page.

**For demo purposes, only the Introduction project has this functionality.**

Teachers can also access the Project Library.  
Available projects are stored in a MySQL database.

### Navigation

Students are directed to the Project Library page upon login. Teachers can navigate to the Project Library from the sidebar within the Teacher Dashboard page or the navigation bar at the top of their Profile Viewer Page or the Home Page.

### Filter Logic

Users can filter projects by various criteria such as subscription type, activity type, year level, subject matter, and course level.

## User Profile Pages

The Profile Pages display information about the logged-in user sourced from the student or teacher table in the MySQL database.

## Student Dashboard

### Learning Objectives

Students can navigate to the Learning Objectives page for a selected project from the Project Library. The main content of this page is stored as HTML in the project table of the MySQL database.

### Instructions

This page shows instructions for the selected project from the database.

### Video Tutorial

This page shows a video corresponding to the selected project. The URL of the YouTube video link is stored in the project table of the MySQL database.

### Make Project

This static page shows a screenshot stored in the image folder.

### Submit Project

Students can submit a screenshot of their project using the 'Send Photo' button. The submission uses FileStack to store the image URLs, which then get updated in the database.frontend.

## Teacher Dashboard

**Note:** The Teacher Dashboard has been disabled for demo purposes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
