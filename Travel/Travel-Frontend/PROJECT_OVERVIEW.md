# Project Overview

This document provides a comprehensive overview of the current state of the Travel Frontend project.

## Project Structure

The project is a React application built with Vite.

### Root Directory
- **package.json**: Defines project dependencies and scripts.
- **vite.config.js**: Configuration for Vite.
- **eslint.config.js**: Configuration for ESLint.
- **index.html**: Main HTML entry point.
- **src/**: Source code directory.

### Source Code (`src/`)
- **main.jsx**: Application entry point.
- **App.jsx**: Main application component, likely handling routing.
- **index.css**: Global CSS styles.

#### Components (`src/Components/`)
Reusable UI components:
- **Card.jsx**: Likely a generic card component for displaying content.
- **CardNav.jsx**: Navigation component, possibly card-based.
- **Footer.jsx**: Application footer.
- **HotTours.jsx**: Component to display "Hot Tours" or featured items.
- **Navbar.jsx**: Main navigation bar.
- **ScrollFloat.jsx**: Component implementing a floating scroll effect.
- **ScrollStack.jsx**: Component implementing a stacked scroll effect.

#### Pages (`src/Pages/`)
Top-level page components:
- **DetailPage.jsx**: Detailed view for a specific item (e.g., a tour or destination).
- **LandingPage.jsx**: The home/landing page of the application.
- **ProductPage.jsx**: Page displaying a list of products or tours.
- **ProfilePage.jsx**: User profile page.
- **RegSign.jsx**: Registration and Sign-in page.
- **RegSign.jsx.backup**: Backup file for the Registration/Sign-in page.

#### Assets (`src/assets/`)
- Contains static assets like images and icons.

## Dependencies

### Core
- **react**: ^19.2.0
- **react-dom**: ^19.2.0
- **react-router-dom**: ^7.9.6 (Routing)

### Build & Tooling
- **vite**: ^7.2.4
- **eslint**: ^9.39.1
- **@vitejs/plugin-react**: ^5.1.1

### Styling & UI
- **tailwindcss**: ^4.1.17 (Utility-first CSS framework)
- **@tailwindcss/vite**: ^4.1.17
- **lucide-react**: ^0.554.0 (Icons)
- **react-icons**: ^5.5.0 (Icons)

### Animation & Effects
- **gsap**: ^3.13.0 (GreenSock Animation Platform)
- **lenis**: ^1.3.15 (Smooth scrolling)

## Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run lint`: Runs ESLint to check for code quality issues.
- `npm run preview`: Previews the production build locally.
