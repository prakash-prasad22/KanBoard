KanBan Board
A dynamic, real-time Kanban board application built to manage tasks with a modern and intuitive user interface. This project features full-stack functionality, including drag-and-drop task management, optimistic UI updates, and real-time synchronization across all connected clients.

Features
Drag-and-Drop: Seamlessly move tasks between columns with a responsive drag-and-drop interface.

Real-time Updates: Tasks are synchronized instantly across all users in real-time using Socket.IO.

Optimistic UI: User interface updates immediately after an action (e.g., adding, updating, deleting a task), providing a smooth user experience. The state is then validated with the server in the background.

CRUD Operations: Fully functional task management, including adding, updating, and deleting tasks.

Clean UI: A modern and minimalist design built with Tailwind CSS.

Tech Stack
Frontend
React: A JavaScript library for building user interfaces.

Redux Toolkit: Official, opinionated, batteries-included toolset for efficient Redux development.

Dnd-kit: A lightweight and flexible drag and drop library for React.

Axios: A promise-based HTTP client for making API requests.

Socket.IO Client: A library for real-time, bidirectional event-based communication.

Tailwind CSS: A utility-first CSS framework for rapid UI development.

Backend
Node.js & Express.js: A robust web framework for building the RESTful API.

Mongoose: An object data modeling (ODM) library for MongoDB and Node.js.

MongoDB: A NoSQL database for storing application data.

Socket.IO: A library for enabling real-time, event-based communication between the server and clients.

Getting Started
1. Backend Setup
Navigate to the backend directory:

cd backend

Install the required dependencies:

npm install

Create a .env file in the backend directory with your MongoDB connection string:

MONGO_URI=mongodb://127.0.0.1:27017/kanban-board
PORT=8080

Start the backend server:

node server.js

The backend will run on http://localhost:8080.

2. Frontend Setup
Navigate to the frontend directory:

cd frontend

Install the required dependencies:

npm install

Create a .env file in the frontend directory and define the backend URLs:

VITE_API_URL=http://localhost:8080/api/tasks
VITE_API_URL_BROADCAST=http://localhost:8080/api/broadcast
VITE_SOCKET_URL=http://localhost:8080

Start the frontend application:

npm run dev

The frontend will be accessible on http://localhost:5173 (or a similar port).

Contributing
Feel free to open issues or submit pull requests. All contributions are welcome.

License
This project is licensed under the MIT License.
