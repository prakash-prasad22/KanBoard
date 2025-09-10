/*import React, { memo } from 'react';
import { useDraggable } from '@dnd-kit/core';

const TaskCard = memo(({ task, onEdit, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id: task._id });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white p-3 mb-3 rounded-lg shadow-sm border border-gray-200 cursor-grab"
    >
      <div className="flex justify-between items-start gap-2">
        <div>
          <div className="text-sm font-medium text-gray-800">{task.title}</div>
          {task.comments?.length > 0 && (
            <div className="text-xs text-gray-500 mt-1">
              💬 {task.comments.length}
            </div>
          )}
        </div>
        <div className="flex flex-col items-end gap-1 text-xs">
          <button
            onClick={() => {
              const val = prompt('Edit task title', task.title);
              if (val !== null) onEdit(val);
            }}
            className="text-blue-600 hover:underline"
            aria-label={`Edit ${task.title}`}
          >
            Edit
          </button>
          <button
            onClick={() => confirm('Delete task?') && onDelete()}
            className="text-red-600 hover:underline"
            aria-label={`Delete ${task.title}`}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
});

export default TaskCard;*/

import React, { memo } from 'react';
import { useDraggable } from '@dnd-kit/core';

const TaskCard = memo(({ task, onEdit, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id: task._id });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div className="bg-white p-3 mb-3 rounded-lg shadow-sm border border-gray-200">
      {/* Draggable area */}
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        className="cursor-grab select-none"
        style={style}
      >
        <div className="text-gray-800 font-medium">{task.title}</div>
      </div>

      {/* Actions: Edit/Delete outside draggable */}
      <div className="flex gap-2 mt-2 text-xs">
        <button
          onClick={() => {
            const val = prompt('Edit task title', task.title);
            if (val !== null && val.trim() !== '') onEdit(val);
          }}
          className="text-blue-600 hover:underline"
        >
          Edit
        </button>
        <button
          onClick={() => {
            if (confirm('Delete task?')) onDelete();
          }}
          className="text-red-600 hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  );
});

export default TaskCard;
