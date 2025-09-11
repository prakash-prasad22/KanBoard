# Kanban Board

A dynamic, real-time **Kanban board application** built to manage tasks with a modern and intuitive user interface.  
This project features **full-stack functionality**, including drag-and-drop task management, optimistic UI updates, and real-time synchronization across all connected clients.

---

## ✨ Features

- **Drag-and-Drop** – Seamlessly move tasks between columns with a responsive drag-and-drop interface.  
- **Real-time Updates** – Tasks are synchronized instantly across all users in real-time using **Socket.IO**.  
- **Optimistic UI** – The UI updates immediately after an action (adding, updating, deleting), providing a smooth user experience. The state is then validated with the server in the background.  
- **CRUD Operations** – Fully functional task management: add, update, delete tasks.  
- **Clean UI** – A modern and minimalist design built with **Tailwind CSS**.  

---

## 🛠️ Tech Stack

### Frontend
- **React** – For building the user interface.  
- **Redux Toolkit** – Efficient state management.  
- **Dnd-kit** – Lightweight drag-and-drop library for React.  
- **Axios** – Promise-based HTTP client.  
- **Socket.IO Client** – Real-time communication.  
- **Tailwind CSS** – Utility-first CSS framework.  

### Backend
- **Node.js & Express.js** – RESTful API.  
- **MongoDB & Mongoose** – NoSQL database with ODM for data modeling.  
- **Socket.IO** – Real-time, event-based communication.  

---

## 🚀 Getting Started

### 1. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

#Create a .env file inside the backend/ folder:
MONGO_URI=mongodb://127.0.0.1:27017/kanban-board
PORT=8080

#Run the backend:
node server.js
```

### 2. Backend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

#Create a .env file inside the frontend/ folder:
VITE_API_URL=http://localhost:8080/api/tasks
VITE_API_URL_BROADCAST=http://localhost:8080/api/broadcast
VITE_SOCKET_URL=http://localhost:8080

#Run the frontend:
npm run dev
```
<h2>Live Demo</h2>

<p><a href="https://kanboard-frontend.onrender.com">https://kanboard-frontend.onrender.com</a></p>
