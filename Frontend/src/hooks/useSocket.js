import { useEffect } from 'react';
import io from 'socket.io-client';
import { fetchTasks } from '../features/tasksSlice';
import { useDispatch } from 'react-redux';

const SOCKET_URL = import.meta.env.REACT_APP_SOCKET_URL;

export default function useSocket() {
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = io(SOCKET_URL);
    socket.on('connect', () => console.log('socket connected', socket.id));
    socket.on('tasks:refresh', () => {
      // server asked clients to refresh
      dispatch(fetchTasks());
    });

    // Optionally auto-refresh every 10s as fallback:
    const ping = setInterval(() => dispatch(fetchTasks()), 10000);

    return () => {
      clearInterval(ping);
      socket.disconnect();
    };
  }, [dispatch]);
}
