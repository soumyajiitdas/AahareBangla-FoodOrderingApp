# AahareBangla-FoodOrderingApp

A full-stack food ordering application built with the MERN stack (MongoDB, Express, React, Node.js). This application allows users to browse a menu, add items to their cart, and place orders. It also features user authentication and order history.

## Features

*   **User Authentication:**
    *   New users can register for an account.
    *   Existing users can log in with their credentials.
    *   Authenticated users have access to protected routes and features.
    *   JSON Web Tokens (JWT) are used for secure authentication.

*   **Menu:**
    *   Browse a list of available food items.
    *   Each food item is displayed with its name, description, price, and image.

*   **Shopping Cart:**
    *   Add and remove items from the shopping cart.
    *   The cart displays the items, quantities, and the total price.
    *   The cart data is persisted in the backend.

*   **Orders:**
    *   Place an order from the items in the cart.
    *   Users can view their order history.
    *   Each order includes the items, total price, and the date of the order.

*   **PDF Invoices:**
    *   Generate a PDF invoice for any order.
    *   The invoice includes the order details, customer information, and a breakdown of the costs.

## Screenshots

| Login Page | Home Page |
| --- | --- |
| ![Login Page](https://i.imgur.com/8bS4i2s.png) | ![Home Page](https://i.imgur.com/L1O7l79.png) |
| **Menu Page** | **Cart Page** |
| ![Menu Page](https://i.imgur.com/I7k4s5c.png) | ![Cart Page](https://i.imgur.com/sY7v5g7.png) |

## Tech Stack

### Frontend (Client)

*   **React:** A JavaScript library for building user interfaces.
*   **Vite:** A fast build tool and development server for modern web projects.
*   **React Router:** For declarative routing in the React application.
*   **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
*   **html2canvas & jsPDF:** Used to generate PDF invoices from the client-side.
*   **lucide-react:** A library of simply designed icons.

### Backend (Server)

*   **Node.js:** A JavaScript runtime environment for executing server-side code.
*   **Express:** A minimal and flexible Node.js web application framework.
*   **MongoDB:** A NoSQL database for storing application data.
*   **Mongoose:** An ODM (Object Data Modeling) library for MongoDB and Node.js.
*   **JWT (JSON Web Tokens):** For secure user authentication.
*   **bcryptjs:** A library for hashing passwords.
*   **CORS:** A middleware for enabling Cross-Origin Resource Sharing.
*   **pdfkit:** Used for generating PDF invoices on the server-side.

## Project Structure

The project is divided into two main directories:

*   `client/`: Contains the React frontend application.
*   `server/`: Contains the Node.js/Express backend application.

## Getting Started

### Prerequisites

*   Node.js and npm (or yarn) installed on your machine.
*   A running instance of MongoDB.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/AahareBangla-FoodOrderingApp.git
    cd AahareBangla-FoodOrderingApp
    ```

2.  **Install backend dependencies:**
    ```bash
    cd server
    npm install
    ```

3.  **Install frontend dependencies:**
    ```bash
    cd ../client
    npm install
    ```

### Configuration

1.  **Backend Environment Variables:**
    Create a `.env` file in the `server/` directory and add the following variables:
    ```
    PORT=5000
    MONGO_URI=<your_mongodb_connection_string>
    JWT_SECRET=<your_jwt_secret>
    ```

### Running the Application

1.  **Start the backend server:**
    ```bash
    cd server
    npm start
    ```
    The server will start on `http://localhost:5000`.

2.  **Start the frontend development server:**
    ```bash
    cd ../client
    npm run dev
    ```
    The frontend will be accessible at `http://localhost:3000` (or another port if 3000 is in use).

## API Endpoints

The backend provides the following API endpoints:

### Auth

*   `POST /api/auth/register`
    *   **Description:** Register a new user.
    *   **Request Body:** `{ "name": "John Doe", "email": "john@example.com", "password": "password123" }`
    *   **Response:** `{ "token": "..." }`

*   `POST /api/auth/login`
    *   **Description:** Log in an existing user.
    *   **Request Body:** `{ "email": "john@example.com", "password": "password123" }`
    *   **Response:** `{ "token": "..." }`

### Food

*   `GET /api/food`
    *   **Description:** Get a list of all food items.
    *   **Response:** `[{ "_id": "...", "name": "...", "description": "...", "price": "...", "imageUrl": "..." }]`

### Cart

*   `GET /api/cart`
    *   **Description:** Get the user's shopping cart.
    *   **Headers:** `{ "Authorization": "Bearer <token>" }`
    *   **Response:** `[{ "_id": "...", "food": { ... }, "quantity": "..." }]`

*   `POST /api/cart`
    *   **Description:** Add an item to the cart.
    *   **Headers:** `{ "Authorization": "Bearer <token>" }`
    *   **Request Body:** `{ "foodId": "...", "quantity": "..." }`
    *   **Response:** The updated cart.

*   `DELETE /api/cart/:id`
    *   **Description:** Remove an item from the cart.
    *   **Headers:** `{ "Authorization": "Bearer <token>" }`
    *   **Response:** `{ "message": "Item removed from cart" }`

### Orders

*   `GET /api/orders`
    *   **Description:** Get the user's order history.
    *   **Headers:** `{ "Authorization": "Bearer <token>" }`
    *   **Response:** `[{ "_id": "...", "items": [ ... ], "total": "...", "date": "..." }]`

*   `POST /api/orders`
    *   **Description:** Place a new order.
    *   **Headers:** `{ "Authorization": "Bearer <token>" }`
    *   **Response:** The newly created order.

*   `GET /api/orders/:id/invoice`
    *   **Description:** Generate a PDF invoice for a specific order.
    *   **Headers:** `{ "Authorization": "Bearer <token>" }`
    *   **Response:** A PDF file.

## Deployment

This application can be deployed to any platform that supports Node.js and React applications. Here are some general steps:

1.  **Build the frontend:**
    ```bash
    cd client
    npm run build
    ```
    This will create a `dist` directory with the production-ready static files.

2.  **Deploy the backend:**
    *   Upload the `server` directory to your hosting provider.
    *   Make sure to set the environment variables in your hosting provider's configuration.

3.  **Serve the frontend:**
    *   You can serve the static files from the `client/dist` directory using a static file server like Nginx or by configuring your Express server to serve them.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1.  Fork the repository.
2.  Create a new branch: `git checkout -b my-new-feature`
3.  Make your changes and commit them: `git commit -am 'Add some feature'`
4.  Push to the branch: `git push origin my-new-feature`
5.  Submit a pull request.

## License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.
