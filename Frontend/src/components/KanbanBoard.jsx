import React, { useEffect, useState } from 'react';
import { DndContext, closestCorners } from '@dnd-kit/core';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, addTask, updateTask, deleteTask } from '../features/tasksSlice';
import Column from './Column';
import useSocket from '../hooks/useSocket';

const STATUSES = ['pending', 'ongoing', 'completed'];

export default function KanbanBoard() {
  const dispatch = useDispatch();
  const tasks = useSelector((s) => s.tasks.items || []);
  const loading = useSelector((s) => s.tasks.loading);

  const [backendReady, setBackendReady] = useState(false);

  useSocket(); // real-time socket updates

  useEffect(() => {
    // Try fetching tasks
    dispatch(fetchTasks()).then((res) => {
      // Once first response comes back, mark backend as ready
      if (!res.error) {
        setBackendReady(true);
      }
    });
  }, [dispatch]);

  const tasksByStatus = (status) =>
    tasks.filter((t) => (t.status || 'pending') === status);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id;
    const newStatus = over.id;

    const task = tasks.find((t) => t._id === taskId);
    if (task && task.status !== newStatus) {
      dispatch(updateTask({ id: taskId, updates: { status: newStatus } }));
    }
  };

  const handleAdd = (title, column) => {
    dispatch(addTask({ title, status: column }));
  };

  const handleEdit = (id, updates) => {
    dispatch(updateTask({ id, updates }));
  };

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="mb-6 text-center">
        <h1 className="text-3xl font-extrabold">Kanban Board</h1>
        <p className="text-gray-600">
          Drag tasks between columns. Optimistic UI + realtime sync.
        </p>
      </header>

      <div className="mb-4 flex justify-center gap-3">
        {!backendReady ? (
          <div className="px-4 py-2 rounded bg-gray-300 text-gray-700 animate-pulse">
            ⏳ Backend waking up, please wait...
          </div>
        ) : (
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:cursor-pointer"
            onClick={() => handleAdd('Quick Task', 'pending')}
          >
            Add Quick Task
          </button>
        )}
      </div>

      <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STATUSES.map((status) => (
            <Column
              key={status}
              title={status}
              tasks={tasksByStatus(status)}
              onAdd={(title) => handleAdd(title, status)}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </DndContext>

      {loading && (
        <div className="text-center mt-4 text-gray-500">Loading tasks...</div>
      )}
    </div>
  );
}
