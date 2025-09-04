"use client";
import { useState } from "react";
import LogoutButton from "../components/LogoutButton";

export default function Filters({ onFilterChange, onCategoryChange }) {
  const [status, setStatus] = useState("All");
  const [category, setCategory] = useState("All");

  const statuses = ["All", "Completed", "Pending"];
  const categories = ["All", "Work", "Personal", "Shopping", "Study"];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 my-4">
      {/* Status Filters */}
      <div className="flex gap-2">
        {statuses.map((f) => (
          <button
            key={f}
            onClick={() => {
              setStatus(f);
              onFilterChange(f);
            }}
            className={`px-3 py-1 rounded cursor-pointer ${
              status === f ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Category Filter */}
      <select
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
          onCategoryChange(e.target.value);
        }}
        className="border rounded px-3 py-1"
      >
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <LogoutButton/>

    </div>
  );
}
