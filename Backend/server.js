const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const { Server } = require('socket.io');
const tasksRoutes = require('./routes/tasks');

const app = express();
const server = http.createServer(app);

const io = new Server(server, { cors: { origin: '*' } });

app.use(cors());
app.use(express.json());
app.use('/api/tasks', tasksRoutes);

const MONGO = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/kanban-board';
mongoose.connect(MONGO)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Mongo connect error', err));

// Socket.io: broadcast refresh event after REST updates (we will emit from restful endpoints here via mongoose middlewares or simpler: not mutate from sockets)
io.on('connection', socket => {
  console.log('Socket connected', socket.id);
  socket.on('disconnect', () => console.log('Socket disconnected', socket.id));
});

// Provide a simple route to broadcast (used by server when it mutates resources)
app.post('/api/broadcast', (req, res) => {
  io.emit('tasks:refresh');
  res.json({ ok: true });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`Backend listening on ${PORT}`));
