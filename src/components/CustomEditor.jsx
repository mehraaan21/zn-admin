"use client";
import { useState } from "react";

export default function EditableText() {
  const [text, setText] = useState("This is some default text.");
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    // Here you can also call API to save data
  };

  return (
    <div>
      {isEditing ? (
        <>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            className="border p-2 w-full"
          />
          <button onClick={handleSave} className="mt-2 bg-blue-500 text-white px-4 py-1">
            Save
          </button>
        </>
      ) : (
        <>
          <p>{text}</p>
          <button
            onClick={() => setIsEditing(true)}
            className="mt-2 bg-gray-500 text-white px-4 py-1"
          >
            Edit
          </button>
        </>
      )}
    </div>
  );
}