// @/components/StatusBadge.jsx
import React from 'react';

export default function StatusBadge({ status }) {
  // Handle both boolean (true/false) and string ("true"/"false") from APIs
  const isActive = status === true || status === "true";

  return (
    <span
      className={`px-3 py-1 text-xs font-bold rounded-full border transition-all ${
        isActive
          ? "bg-green-100 text-green-700 border-green-200"
          : "bg-red-100 text-red-700 border-red-200"
      }`}
    >
      {isActive ? "Active" : "Inactive"}
    </span>
  );
}