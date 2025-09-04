export default function CategoryBadge({ category }) {
    const colors = {
      Work: "bg-blue-200 text-blue-800",
      Personal: "bg-green-200 text-green-800",
      Shopping: "bg-yellow-200 text-yellow-800",
      Study: "bg-purple-200 text-purple-800",
    };
  
    return (
      <span className={`px-2 py-0.5 text-xs rounded ${colors[category] || "bg-gray-200"}`}>
        {category}
      </span>
    );
  }
  