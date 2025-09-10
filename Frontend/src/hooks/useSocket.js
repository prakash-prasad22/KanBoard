import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { fetchTasks } from '../features/tasksSlice';
import { useDispatch } from 'react-redux';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

export default function useSocket() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!SOCKET_URL) {
      console.warn('No SOCKET_URL provided in env variables');
      return;
    }

    const socket = io(SOCKET_URL, {
      transports: ['websocket', 'polling'], // fallback included
      reconnectionAttempts: 5,
      timeout: 20000,
    });

    socket.on('connect', () => console.log('Socket connected:', socket.id));

    socket.on('tasks:refresh', () => {
      dispatch(fetchTasks());
    });

    // Optional fallback: refresh every 15s only in development
    let ping;
    if (import.meta.env.DEV) {
      ping = setInterval(() => dispatch(fetchTasks()), 15000);
    }

    return () => {
      if (ping) clearInterval(ping);
      socket.disconnect();
    };
  }, [dispatch]);
}
