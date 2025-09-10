// src/components/Column.jsx
import { useDispatch } from "react-redux";
import { addTask } from "../features/tasksSlice";
import Task from "./TaskCard";
import { useState } from "react";

export default function Column({ title, tasks, status }) {
  const dispatch = useDispatch();
  const [newTask, setNewTask] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    dispatch(addTask({ title: newTask, status }));
    setNewTask("");
  };

  return (
    <div className="bg-gray-50 rounded-xl shadow-inner p-4 flex flex-col gap-3 w-full">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-lg text-gray-700">{title}</h2>
        <span className="bg-gray-200 text-gray-700 text-sm px-2 py-1 rounded-full">
          {tasks.length}
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {tasks.map((t) => (
          <Task key={t._id} task={t} />
        ))}
      </div>

      <form onSubmit={handleAdd} className="mt-3 flex gap-2">
        <input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add task..."
          className="flex-grow border px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          +
        </button>
      </form>
    </div>
  );
}
