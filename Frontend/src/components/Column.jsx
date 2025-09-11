import React, { useState } from 'react';
import TaskCard from './Task';
import { useDroppable } from '@dnd-kit/core';

export default function Column({ title, tasks, onAdd, onEdit, onDelete }) {
  const [input, setInput] = useState('');
  const label = title.charAt(0).toUpperCase() + title.slice(1);

  const { setNodeRef, isOver } = useDroppable({ id: title });

  return (
    <div
      ref={setNodeRef}
      className={`p-4 rounded-lg min-h-[400px] transition-colors ${
        isOver ? 'bg-blue-50' : 'bg-gray-50'
      }`}
    >
      <div className="flex justify-between items-center py-4 mb-3">
        <h3 className="font-bold text-gray-700">{label}</h3>
        <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">
          {tasks.length}
        </span>
      </div>

      <div className="mb-4">
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onEdit={(newTitle) => onEdit(task._id, { title: newTitle })}
            onDelete={() => onDelete(task._id)}
          />
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!input.trim()) return;
          onAdd(input.trim());
          setInput('');
        }}
      >
        <div className="flex gap-2">
          <input
            className="flex-grow p-2 rounded-l-lg border border-gray-300 focus:outline-none"
            placeholder="New task"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="bg-blue-600 text-white px-3 rounded-r-lg">
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
