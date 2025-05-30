# 🚀 Matchably

**Matchably** is a developer-centric social app that lets users discover, connect, and collaborate with fellow developers — similar to how Tinder works, but with meaningful professional connections in mind.

---

## 🤩 Tech Stack Overview

### 💥 Frontend

* **Vite** + **React** for blazing-fast development
* **Tailwind CSS** for utility-first styling
* **React Router DOM** for navigation
* **DaisyUI** for ready-to-use components
* **Redux Toolkit** for state management
* **Axios** for API communication

### 🧺 Backend

* **Node.js** + **Express.js**
* **MongoDB** with **Mongoose**
* **JWT Authentication**
* **CORS**, **Helmet**, and validation middleware
* Clean, secure RESTful APIs

---

## ⚙️ Backend Features

### 👤 User Management

* Secure user registration and login
* JWT-based authentication and session handling
* Password encryption with bcrypt
* Logout and session validation

### 🔄 Connection System

* Express interest or ignore users
* Update connection request statuses
* Prevent duplicates and handle mutual connections
* Track user-to-user interactions

### 🔐 Security & Validation

* JWT middleware for route protection
* MongoDB ObjectId checks
* Request body validation
* Centralized error handling

---

## 🛠️ Backend API Endpoints

### Authentication

| Method | Endpoint       | Description     |
| ------ | -------------- | --------------- |
| POST   | `/auth/signup` | Register a user |
| POST   | `/auth/login`  | Login a user    |
| POST   | `/auth/logout` | Logout a user   |

### Connection Requests

| Method | Endpoint                          | Description                         |
| ------ | --------------------------------- | ----------------------------------- |
| POST   | `/request/send/:status/:toUserId` | Send or update a connection request |

#### Status Options:

* `interested`: Express interest
* `ignored`: Dismiss profile

### User Feed & Connections

| Method | Endpoint                  | Description                       |
| ------ | ------------------------- | --------------------------------- |
| GET    | `/feed`                   | Get feed of potential connections |
| GET    | `/user/requests/received` | View received connection requests |
| GET    | `/user/connections`       | Get accepted connections          |

---

## 🧠 Backend Logic

### Feed Generation

Excludes:

* The logged-in user
* Already connected users
* Users with pending requests
* Ignored users

Includes:

* Pagination (`page`, `limit`)

### Connection Request Rules

* Users can send or update requests
* Duplicate requests are blocked
* Connections tracked for both users

---

## 🗄️ Frontend Features

### 🌐 Landing Page

* Terms & Conditions
* Privacy Policy
* Contact Us

### 🔐 Login Page

* Login form UI and logic
* Redux store setup with `userSlice`
* Conditional rendering based on auth state
* User session persistence using cookies
* Logout functionality
* Error handling and fallback route (`Error Page`)

---

## 🛠️ Frontend Setup

### ⚙️ Initial Setup

* Created with `Vite + React`
* Installed:

  * `tailwindcss` + `postcss`
  * `daisyui` for UI components
  * `react-router-dom` for routing
  * `axios` for API communication
  * `react-redux` & `@reduxjs/toolkit` for state management

### 🛆 State Management (Redux)

* `userSlice`: Handles user data and authentication status
* `appStore`: Central store configuration
* On successful login:

  * Store user data in Redux
  * Set cookie/session
* On reload:

  * If session exists, populate Redux from cookie

---

## ⚠️ Error Handling

* User-friendly error page for unexpected routes or failures
* Validation feedback on login

---

## 📱 Pages Overview

| Page           | Description                             |
| -------------- | --------------------------------------- |
| `/`            | Landing page with static content        |
| `/login`       | Login form with Redux & API integration |
| `/feed`        | Shows user feed (available matches)     |
| `/connections` | Displays connected users                |
| `/requests`    | Shows received connection requests      |
| `/error`       | Error fallback page                     |

---

## ✅ Next Steps & Ideas

* Add real-time chat with Socket.io
* Profile customization (bio, tech stack)
* Match notifications
* Mutual connection suggestions
