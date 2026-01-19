"use client";

import Image from "next/image";
import { useState } from "react";
import AddTechStack from "./AddTechStack";
import EditTechStack from "./EditTechStack";
import DeleteTechStack from "./Deletetech";

export default function TechStacksClient({ techStacks = [] }) {

  const [editItem, setEditItem] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Tech Stacks</h1>
        <AddTechStack />
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Image</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {techStacks.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  No tech stacks found
                </td>
              </tr>
            ) : (
              techStacks.map((item) => {
                const imagePath = item.Image
                  ?.replace(/\\/g, "/")
                  .replace(/^public\//, "");

                return (
                  <tr key={item.id} className="text-center">
                    <td className="border p-2">{item.id}</td>

                    <td className="border p-2 text-center">
                      <Image
                        src={item.image_url || "/placeholder.png"}
                        alt={item.title}
                        width={56}
                        height={56}
                        className="h-14 w-14 rounded mx-auto object-cover"
                      />
                    </td>
                    

                    <td className="border p-2 font-semibold">
                      {item.Name}
                    </td>

                    <td className="border p-2 capitalize">
                      {item.Category}
                    </td>

                    <td className="border p-2">
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => setEditItem(item)}
                          className="text-blue-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setDeleteId(item.id)}
                          className="text-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* MODALS */}
      {editItem && (
        <EditTechStack
          tech={editItem}
          onClose={() => setEditItem(null)}
        />
      )}

      {deleteId && (
        <DeleteTechStack
          id={deleteId}
          onClose={() => setDeleteId(null)}
        />
      )}
    </div>
  );
}
