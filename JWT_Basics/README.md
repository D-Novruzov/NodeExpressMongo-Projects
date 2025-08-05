# Project: Simple Jobs API

This is a basic, practice-oriented API for handling user authentication and a protected dashboard route. The project uses a straightforward folder structure and key libraries to demonstrate core concepts like middleware, routing, and JSON Web Tokens (JWT) for authentication.

---

## Getting Started

### Prerequisites

Make sure you have **Node.js** and **npm** installed on your system.

### Installation

1.  Clone the repository:
    ```bash
    git clone [your-repo-url]
    cd jobs
    ```
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  Create a **.env** file in the project's root directory and add your JWT secret:
    ```env
    JWT_SECRET=your_super_secret_key
    ```
    **Note:** Replace `your_super_secret_key` with a strong, random string.

---

## Scripts

-   **`npm start`**: Starts the server using **nodemon**, which automatically restarts the server when a file changes. This is ideal for development.

---

## API Endpoints

### `POST /api/v1/login`

This endpoint authenticates a user and returns a JSON Web Token (JWT).

-   **Request Body:**
    ```json
    {
      "username": "exampleUser",
      "password": "password123"
    }
    ```

-   **Success Response (200 OK):**
    ```json
    {
      "msg": "user created",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    ```

### `GET /api/v1/dashboard`

This is a protected route that requires a valid JWT. Include the token in the `Authorization` header.

-   **Request Headers:**
    ```
    Authorization: Bearer <token>
    ```

-   **Success Response (200 OK):**
    ```json
    {
      "msg": "hello exampleUser",
      "secret": 42
    }
    ```
    The `secret` field contains a randomly generated lucky number.
