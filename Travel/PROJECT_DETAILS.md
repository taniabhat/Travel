# Way.Farer Travel Project Details

## Overview
**Way.Farer** is a modern, full-stack web application designed for browsing, customizing, and booking luxury and adventure travel packages. The project is split into two distinct repositories/folders:
1. **Travel-Frontend**: A dynamic, interactive user interface built with React.
2. **Travel-Backend**: A robust REST API built with Node.js and Express that handles data, authentication, and emailing.

---

## 🎨 Frontend Details (Travel-Frontend)
The frontend is built to deliver a premium, smooth, and highly interactive user experience.

### Core Technologies
- **React 19**: The core library used for building the component-based user interface.
- **Vite 7**: A blazing-fast modern build tool that replaces Create React App, providing rapid hot module replacement (HMR).
- **React Router DOM (v7)**: Handles client-side routing, allowing users to navigate between the Landing Page, Product Listing, Tour Details, Profile, and Authentication pages without page reloads.

### Styling & UI
- **Tailwind CSS 4**: A utility-first CSS framework used for rapid UI development and ensuring the site is fully responsive across all devices (mobile, tablet, desktop).
- **Lucide React & React Icons**: Modern, crisp SVG icon libraries used throughout the UI for menus, buttons, and features.

### Animation & User Experience (UX)
- **GSAP (GreenSock Animation Platform)**: The industry standard for high-performance JavaScript animations. It powers the complex page transitions, reveal animations, and the smooth sliding authentication modal.
- **Lenis**: A lightweight library used for smooth scrolling, giving the entire site a fluid, premium feel as users scroll down pages.

---

## ⚙️ Backend Details (Travel-Backend)
The backend provides secure data storage, user authentication, and business logic for the travel platform.

### Core Technologies
- **Node.js**: The JavaScript runtime executing the server code.
- **Express.js**: A fast, unopinionated web framework for Node.js used to build the RESTful API endpoints (Routes for Users, Tours, Bookings, and Payments).

### Database & Data Modeling
- **MongoDB**: A NoSQL database used for storing flexible JSON-like documents.
- **Mongoose**: An Object Data Modeling (ODM) library for MongoDB and Node.js. It manages relationships between data, provides schema validation, and translates between objects in code and the representation of those objects in MongoDB.

### Security & Authentication
- **JSON Web Tokens (JWT)**: Used for secure, stateless user authentication. Tokens are generated upon login/registration, expire automatically, and are passed in HTTP headers for protected routes.
- **Bcrypt.js**: Used to securely hash and salt user passwords before saving them to the database.
- **Helmet**: Secures the Express apps by setting various HTTP headers to protect against common web vulnerabilities.
- **CORS**: Middleware that allows the frontend (running on port 5173/5174) to securely request data from the backend (running on port 5000).

### Utilities
- **Nodemailer**: A module utilized to automatically send rich HTML booking confirmation emails to users once a payment is successfully processed.
- **Dotenv**: Manages environment variables, keeping sensitive information like database URIs, JWT secrets, and SMTP email credentials secure and out of the source code.
- **Morgan**: HTTP request logger middleware used in development to trace API calls.

---

## 🛠 Project Architecture Flow
1. **User visits site**: The Vite/React frontend loads, presenting the UI.
2. **Browsing**: React fetches tour data from the Express backend (`/api/tours`) via Axios and displays it using Tailwind and GSAP animations.
3. **Authentication**: User logs in/registers. Frontend sends credentials to backend (`/api/auth`), which verifies with MongoDB and returns a JWT. The frontend stores this JWT and passes it in subsequent requests. If the JWT expires, the frontend's Axios interceptor detects it and forces a re-login.
4. **Booking / Checkout**: User selects a tour, dates, and extras. Data is sent to the backend (`/api/bookings`).
5. **Payment Mocking & Confirmation**: Payment details are sent to (`/api/payment/process`). Upon success, the backend updates the booking status in MongoDB and triggers Nodemailer to send a booking confirmation email to the user.
