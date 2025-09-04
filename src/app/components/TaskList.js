"use client";
import { useEffect, useState } from "react";
import TaskItem from "./TaskItem";

export default function TaskList({ filter, categoryFilter, reload }) {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await fetch("/api/tasks");
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, [reload]); // 🔑 refetch whenever reload changes

  // filters
  let filtered = tasks;
  if (filter === "Completed") filtered = tasks.filter((t) => t.completed);
  if (filter === "Pending") filtered = tasks.filter((t) => !t.completed);
  if (categoryFilter !== "All")
    filtered = filtered.filter((t) => t.category === categoryFilter);

  return (
    <div>
      {filtered.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onUpdate={(u) =>
            setTasks(tasks.map((t) => (t._id === u._id ? u : t)))
          }
          onDelete={(id) => setTasks(tasks.filter((t) => t._id !== id))}
        />
      ))}
    </div>
  );
}
