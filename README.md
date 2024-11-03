
# E-Cars NextJS Client

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## Overview

A Next.js application with Tailwind CSS for styling, Redux for state management, and JWT authentication using HTTP-only cookies. This setup prioritizes both user experience and security, making it suitable for applications with user authentication and secure data handling.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
- [Folder Structure](#folder-structure)
- [API Structure](#api-structure)
- [Screenshots](#screenshots)
- [License](#license)

## Features

- **Next.js** for server-side rendering and static site generation.
- **Tailwind CSS** for responsive and customizable UI styling.
- **Redux** for state management across the application.
- **JWT Authentication** using HTTP-only cookies for secure session management

## Technologies

- **Next.js** - Framework for React applications
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Redux** - State management library
- **JWT** - JSON Web Token for secure authentication
- **Fetch** - For making API requests

## Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ali-adam7/E-Cars-Frontend.git
   cd E-Cars-Frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```


3. Run the development server:

   ```bash
   npm run dev
   ```

4. Visit `http://localhost` to see the app in action.

## Folder Structure

The project structure follows Next.js conventions and includes the following folders:

```
├── api               # API functions for data fetching
├── app               # Pages and layouts (Next.js routing)
├── components        # Reusable UI components (e.g., Navbar, Footer)
├── DTO               # Data Transfer Objects for strict typing
├── lib               # Utilities and helper functions
├── providers         # Context providers (e.g., Redux)
├── public            # Public assets (e.g., images)
├── store             # Redux store and slices (order, cart, user)
├── styles            # Global CSS and Tailwind configurations
└── README.md
```

### Key Directories

- **api**: Contains API routes such as `auth.ts`, `cart.ts`, `catalog.ts`, and `order.ts` for backend interactions.
- **app**: Handles Next.js page routing, including layouts and component structure.
- **components**: Reusable UI components, including `Navbar.tsx`, `Footer.tsx`, `Cart.tsx`, etc.
- **store**: Redux slices for state management, including `userSlice.ts`, `cartSlice.ts`, and `orderSlice.ts`.
- **DTO**: Defines Data Transfer Objects like `Car.ts`, `Order.ts`, and `User.ts` for consistent typing across the app.

## API Structure

The `api` folder contains functions that interact with different API endpoints for managing authentication, user information, orders, and the catalog.

- **auth.ts**: Manages user authentication with login, logout, and registration functions.
- **cart.ts**: Handles cart functionality including adding, removing, and updating items.
- **order.ts**: Manages order-related API calls, including placing and viewing orders.
- **catalog.ts**: Fetches and manages data for product catalogs.

## State Management (Redux)

The application uses Redux to manage global state, with slices organized as follows:

- **userSlice**: Stores and manages user authentication and profile data.
- **cartSlice**: Manages the items in the user's shopping cart.
- **orderSlice**: Keeps track of order history and current order details.

### JWT Authentication

The application uses HTTP-only cookies to store JWT tokens, ensuring secure handling of user sessions. Authentication API routes in `api/auth.ts` set and validate these cookies. 

## Screenshots

<!-- Place your screenshots here with appropriate descriptions. Example: -->

![image](https://github.com/user-attachments/assets/4eaa2508-d89a-4ede-aaba-d8b2f293bc19)

*Landing Page*

![image](https://github.com/user-attachments/assets/34a5f566-3651-41b1-9d1a-03e4927533e1)

*Catalog Page with filters*

![image](https://github.com/user-attachments/assets/1cd14553-79a0-469f-92a0-8a71b8d3fb12)
*Car Details and add to cart*


![image](https://github.com/user-attachments/assets/4894c533-9841-46e4-8964-a5f099956d82)
*Shopping Cart*

![image](https://github.com/user-attachments/assets/868f23e7-09ee-47cf-932c-d7093b27cff0)
*Order History*

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
