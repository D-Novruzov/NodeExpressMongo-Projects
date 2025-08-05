# Project: Task Manager API

This is a simple RESTful API for a Task Manager application. It uses Node.js, Express, and MongoDB to provide full CRUD (Create, Read, Update, Delete) functionality for tasks. The project is structured to demonstrate best practices for API development, including asynchronous error handling, custom middleware, and a clear separation of concerns.

---

## Getting Started

### Prerequisites

Make sure you have **Node.js**, **npm**, and a **MongoDB** instance (either local or cloud-based) set up.

### Installation

1.  Clone the repository:
    ```bash
    git clone [your-repo-url]
    cd [your-project-name]
    ```
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  Create a **.env** file in the root directory and add your MongoDB connection string:
    ```env
    MONGO_URI="mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/TaskManager?retryWrites=true&w=majority"
    ```
    **Note:** Replace the placeholder URI with your actual MongoDB connection string.

---

## Scripts

-   **`npm start`**: Starts the server. You'll likely need a script in your `package.json` for this, such as `"start": "node app.js"` or `"start": "nodemon app.js"` for development.

---

## API Endpoints

The API is accessible at the base URL `/api/v1/tasks`.

### `GET /api/v1/tasks`

Retrieves all tasks from the database.

-   **Success Response (200 OK):**
    ```json
    {
      "status": "success",
      "amount": 2,
      "tasks": [
        {
          "_id": "60d0fe4f7d456b001c23f211",
          "name": "Walk the dog",
          "completed": false
        },
        {
          "_id": "60d0fe4f7d456b001c23f212",
          "name": "Buy groceries",
          "completed": true
        }
      ]
    }
    ```

### `POST /api/v1/tasks`

Creates a new task.

-   **Request Body:**
    ```json
    {
      "name": "Write a report"
    }
    ```
-   **Success Response (201 Created):**
    ```json
    {
      "status": "success",
      "task": {
        "name": "Write a report",
        "completed": false,
        "_id": "60d0fe4f7d456b001c23f213"
      }
    }
    ```

### `GET /api/v1/tasks/:id`

Retrieves a single task by its ID.

-   **Success Response (200 OK):**
    ```json
    {
      "status": "success",
      "task": {
        "_id": "60d0fe4f7d456b001c23f211",
        "name": "Walk the dog",
        "completed": false
      }
    }
    ```
-   **Error Response (404 Not Found):**
    ```json
    {
      "msg": "No task with this id"
    }
    ```

### `PATCH /api/v1/tasks/:id`

Updates a task by its ID.

-   **Request Body:**
    ```json
    {
      "name": "Walk the cat"
    }
    ```
-   **Success Response (200 OK):**
    ```json
    {
      "status": "success",
      "task": {
        "_id": "60d0fe4f7d456b001c23f211",
        "name": "Walk the cat",
        "completed": false
      }
    }
    ```

### `DELETE /api/v1/tasks/:id`

Deletes a task by its ID.

-   **Success Response (200 OK):**
    ```json
    {
      "status": "task deleted successfully",
      "task": {
        "_id": "60d0fe4f7d456b001c23f211",
        "name": "Walk the cat",
        "completed": false
      }
    }
    ```

