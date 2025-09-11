/*import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Read env vars (Vite style)
const API = import.meta.env.VITE_API_URL;
const BROADCAST = import.meta.env.VITE_API_URL_BROADCAST;

// fetch all
export const fetchTasks = createAsyncThunk('tasks/fetch', async () => {
  const r = await axios.get(API);
  return r.data;
});

// optimistic add
export const addTask = createAsyncThunk('tasks/add', async (task, { rejectWithValue }) => {
  try {
    const r = await axios.post(`${API}/add`, task);
    // broadcast change (backend route)
    await axios.post(BROADCAST);
    return r.data;
  } catch (err) {
    return rejectWithValue(task);
  }
});

// update
export const updateTask = createAsyncThunk('tasks/update', async ({ id, updates }, { rejectWithValue }) => {
  try {
    const r = await axios.put(`${API}/update/${id}`, updates);
    await axios.post(BROADCAST);
    return r.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

// delete
export const deleteTask = createAsyncThunk('tasks/delete', async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`${API}/delete/${id}`);
    await axios.post(BROADCAST);
    return id;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: { items: [], loading: false, error: null, optimisticQueue: [] },
  reducers: {},
  extraReducers: (b) => {
    b
      .addCase(fetchTasks.pending, (s) => { s.loading = true; })
      .addCase(fetchTasks.fulfilled, (s, a) => { s.loading = false; s.items = a.payload; })
      .addCase(fetchTasks.rejected, (s, a) => { s.loading = false; s.error = a.error.message; })

      .addCase(addTask.pending, (s, a) => {
        // optimistic placeholder with temporary id
        const temp = { ...a.meta.arg, _id: `temp-${Date.now()}` };
        s.items.push(temp);
        s.optimisticQueue.push({ type: 'add', tempId: temp._id, payload: a.meta.arg });
      })
      .addCase(addTask.fulfilled, (s, a) => {
        // replace temp with real
        const idx = s.items.findIndex(t => t._id && t._id.startsWith('temp-'));
        if (idx !== -1) s.items[idx] = a.payload;
        s.optimisticQueue = s.optimisticQueue.filter(q => !(q.type === 'add' && q.payload.title === a.payload.title));
      })
      .addCase(addTask.rejected, (s, a) => {
        // rollback add
        s.items = s.items.filter(t => !(t._id && t._id.startsWith('temp-') && t.title === a.payload.title));
        s.error = 'Failed to add task';
      })

      .addCase(updateTask.fulfilled, (s, a) => {
        const i = s.items.findIndex(t => t._id === a.payload._id);
        if (i !== -1) s.items[i] = a.payload;
      })
      .addCase(deleteTask.fulfilled, (s, a) => {
        s.items = s.items.filter(t => t._id !== a.payload);
      });
  }
});

export default tasksSlice.reducer;*/

//Updated Optimistic UI

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_API_URL; // your backend base URL

// 🔹 Fetch all
export const fetchTasks = createAsyncThunk("tasks/fetch", async () => {
  const res = await axios.get(API);
  return res.data;
});

// 🔹 Add task
export const addTask = createAsyncThunk("tasks/add", async (task) => {
  const res = await axios.post(`${API}/add`, {
    title: task.title,
    status: task.status,
  });
  return { backendTask: res.data, tempId: task.tempId };
});

// 🔹 Update task
export const updateTask = createAsyncThunk(
  "tasks/update",
  async ({ id, updates }) => {
    const res = await axios.put(`${API}/update/${id}`, updates);
    return res.data;
  }
);

// 🔹 Delete task
export const deleteTask = createAsyncThunk("tasks/delete", async (id) => {
  await axios.delete(`${API}/delete/${id}`);
  return id;
});

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    // ---------------- OPTIMISTIC ----------------
    optimisticAdd: (state, action) => {
      state.items.push(action.payload); // push temp task
    },
    optimisticUpdate: (state, action) => {
      const { id, updates } = action.payload;
      const task = state.items.find((t) => t._id === id);
      if (task) Object.assign(task, updates);
    },
    optimisticDelete: (state, action) => {
      state.items = state.items.filter((t) => t._id !== action.payload);
    },
    optimisticUpdateStatus: (state, action) => {
      const { id, status } = action.payload;
      const task = state.items.find((t) => t._id === id);
      if (task) task.status = status;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchTasks.pending, (s) => {
        s.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (s, a) => {
        s.loading = false;
        s.items = a.payload;
      })
      .addCase(fetchTasks.rejected, (s, a) => {
        s.loading = false;
        s.error = a.error.message;
      })

      // Add
      .addCase(addTask.fulfilled, (s, a) => {
        const { backendTask, tempId } = a.payload;
        const idx = s.items.findIndex((t) => t._id === tempId);
        if (idx !== -1) {
          s.items[idx] = backendTask; // replace temp with real
        } else {
          s.items.push(backendTask);
        }
      })

      // Update
      .addCase(updateTask.fulfilled, (s, a) => {
        const idx = s.items.findIndex((t) => t._id === a.payload._id);
        if (idx !== -1) s.items[idx] = a.payload;
      })

      // Delete
      .addCase(deleteTask.fulfilled, (s, a) => {
        s.items = s.items.filter((t) => t._id !== a.payload);
      });
  },
});

export const {
  optimisticAdd,
  optimisticUpdate,
  optimisticDelete,
  optimisticUpdateStatus,
} = tasksSlice.actions;

export default tasksSlice.reducer;


