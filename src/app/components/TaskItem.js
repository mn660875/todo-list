"use client";
import { useState } from "react";
import CategoryBadge from "./CategoryBadge";

import DeleteTask from "@/lib/DeleteTask";

export default function TaskItem({ task, onUpdate, onDelete }) {
  const [completed, setCompleted] = useState(task.completed);

  // Toggle completed
  const toggleComplete = async () => {
    try {
      const res = await fetch(`/api/tasks/${task._id}`, {
        method: "PUT",
        body: JSON.stringify({ completed: !completed }),
      });
      const updated = await res.json();
      setCompleted(updated.completed);
      onUpdate(updated);
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  

  return (
    <div className="flex items-center mt-3 justify-between border p-3 rounded-lg shadow-sm bg-white">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={completed}
          onChange={toggleComplete}
          className="h-4 w-4"
        />
        <span
          className={`${
            completed ? "line-through text-gray-400" : "text-gray-800"
          }`}
        >
          {task.title}
        </span>
        <CategoryBadge category={task.category} />
      </div>

      <div className="flex items-center gap-3">
        <span className="text-xs text-gray-500">
          {new Date(task.createdAt).toLocaleString()}
        </span>
        <DeleteTask id={task._id} onDelete={onDelete} />
      </div>
    </div>
  );
}
