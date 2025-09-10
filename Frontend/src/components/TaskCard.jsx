// src/components/Task.jsx
import { useDispatch } from "react-redux";
import { updateTask, deleteTask } from "../features/tasksSlice";
import { useState } from "react";

export default function Task({ task }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);

  const handleUpdate = () => {
    if (title.trim() === "") return;
    dispatch(updateTask({ id: task._id, updates: { title } }));
    setIsEditing(false);
  };

  const handleDelete = () => {
    dispatch(deleteTask(task._id));
  };

  return (
    <div className="bg-white rounded-lg shadow p-3 flex justify-between items-center hover:shadow-md transition">
      {isEditing ? (
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border px-2 py-1 rounded w-full mr-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      ) : (
        <span className="text-gray-800">{task.title}</span>
      )}

      <div className="flex gap-2 ml-3">
        {isEditing ? (
          <button
            onClick={handleUpdate}
            className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Edit
          </button>
        )}

        <button
          onClick={handleDelete}
          className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
