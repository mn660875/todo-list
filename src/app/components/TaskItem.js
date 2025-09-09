"use client";
import { useState } from "react";
import CategoryBadge from "./CategoryBadge";
import DeleteTask from "@/lib/DeleteTask";
import { Pencil, Check, X } from "lucide-react"; // icons for edit/save/cancel

export default function TaskItem({ task, onUpdate, onDelete }) {
  const [completed, setCompleted] = useState(task.completed);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  // Toggle completed
  const toggleComplete = async () => {
    try {
      const res = await fetch(`/api/tasks/${task._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !completed }),
      });
      const updated = await res.json();
      setCompleted(updated.completed);
      onUpdate(updated);
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  // Save updated title
  const saveEdit = async () => {
    try {
      const res = await fetch(`/api/tasks/${task._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle }),
      });
      const updated = await res.json();
      setIsEditing(false);
      onUpdate(updated);
    } catch (err) {
      console.error("Error updating task title:", err);
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

        {isEditing ? (
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="border rounded px-2 py-1 text-sm"
          />
        ) : (
          <span
            className={`${
              completed ? "line-through text-gray-400" : "text-gray-800"
            }`}
          >
            {task.title}
          </span>
        )}

        <CategoryBadge category={task.category} />
      </div>

      <div className="flex items-center gap-3">
        <span className="text-xs text-gray-500">
          {new Date(task.createdAt).toLocaleString()}
        </span>

        {isEditing ? (
          <>
            <Check
              className="w-4 h-4 text-green-500 cursor-pointer"
              onClick={saveEdit}
            />
            <X
              className="w-4 h-4 text-red-500 cursor-pointer"
              onClick={() => {
                setNewTitle(task.title);
                setIsEditing(false);
              }}
            />
          </>
        ) : (
          <Pencil
            className="w-4 h-4 text-blue-500 cursor-pointer"
            onClick={() => setIsEditing(true)}
          />
        )}

        <DeleteTask id={task._id} onDelete={onDelete} />
      </div>
    </div>
  );
}
