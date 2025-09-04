"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function TaskForm({ onTaskAdded }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Work");
  const router = useRouter();

  const addTask = async () => {
    if (!title) return;
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" }, // ✅ important
      body: JSON.stringify({ title, category }),
    });

    if (!res.ok) {
      toast.error("Failed to add task");
      return;
    }

    const newTask = await res.json();
    onTaskAdded(newTask);

    setTitle("");
    toast.success("Todo Added");
    router.push("/dashboard");
  };

  return (
    <div className="w-full flex flex-col sm:flex-row gap-2">
      {/* Input */}
      <input
        className="border p-2 rounded flex-1 w-full"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task..."
      />

      {/* Category Select */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-2 rounded w-full sm:w-auto"
      >
        <option>Work</option>
        <option>Personal</option>
        <option>Shopping</option>
        <option>Study</option>
      </select>

      {/* Button */}
      <button
        onClick={addTask}
        className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer w-full sm:w-auto"
      >
        Add
      </button>
    </div>
  );
}
