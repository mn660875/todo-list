"use client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function DeleteTask({ id, onDelete }) {
  const router = useRouter();

  const deleteRecord = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (res.ok) {
        // update parent state instead of redirect
        if (onDelete) onDelete(id);

        toast.success("Task deleted successfully");
      } else {
        toast.error(data.error || "Failed to delete task");
      }
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Something went wrong");
    }
  };

  return (
    <button onClick={deleteRecord} className="text-red-500 text-sm">
      ❌
    </button>
  );
}
