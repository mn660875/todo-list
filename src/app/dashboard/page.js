"use client";
import { useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import Filters from "../components/Filters";


export default function Dashboard() {
  const [filter, setFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [reload, setReload] = useState(false);

  function formatDateWithDay(date) {
    const day = date.getDate();
    const dayName = date.toLocaleString("en-US", { weekday: "long" });
    const month = date.toLocaleString("en-US", { month: "long" });

    const suffix =
      day % 10 === 1 && day !== 11
        ? "st"
        : day % 10 === 2 && day !== 12
        ? "nd"
        : day % 10 === 3 && day !== 13
        ? "rd"
        : "th";

    const formattedDay = String(day).padStart(2, "0");

    return (
      <>
        {dayName}, {formattedDay}
        {suffix}{" "}
        <span className="text-gray-400">{month}</span>
      </>
    );
  }

  return (
    <div  className="max-w-2xl mx-auto p-4 sm:p-6 space-y-6 w-full overflow-hidden">
      {/* Heading */}
      <h1 className="text-center font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-6">
        {formatDateWithDay(new Date())}
      </h1>

      {/* Task Form */}
      
      <div className="mb-6">
        <TaskForm onTaskAdded={() => setReload(!reload)} />
      </div>

      {/* Filters (responsive flex / stack) */}
      <div className="mb-6">
        <Filters onFilterChange={setFilter} onCategoryChange={setCategoryFilter} />
      </div>
      

      {/* Task List */}
      <div>
        <TaskList
          filter={filter}
          categoryFilter={categoryFilter}
          reload={reload}
        />
      </div>
      
    </div>
  );
}
