"use client";

import { useState } from "react";
import AddPortfolio from "./AddPortfolio";
import EditPortfolio from "./EditPortfolio";
import DeletePortfolio from "./DeletePortfolio";

export default function PortfolioClient({ portfolios }) {
  const [editItem, setEditItem] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Portfolio</h1>
        <AddPortfolio />
      </div>

      <div className="overflow-x-auto border rounded">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Image</th>
              <th className="border p-2">Title</th>
              <th className="border p-2">Slug</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {portfolios.length === 0 ? (
              <tr>
                <td colSpan="7" className="p-4 text-center text-gray-500">
                  No portfolio items found
                </td>
              </tr>
            ) : (
              portfolios.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 text-sm">
                  <td className="border p-2 text-center">{item.id}</td>

                  <td className="border p-2 text-center">
                    {item.image_url ? (
                      <img
                        src={item.image_url}
                        className="w-16 h-16 object-cover rounded mx-auto"
                        alt={item.title}
                      />
                    ) : "-"}
                  </td>

                  <td className="border p-2 font-semibold">{item.title}</td>
                  <td className="border p-2">{item.slug}</td>
                  <td className="border p-2">{item.category}</td>
                  <td className="border p-2 max-w-sm">{item.description}</td>

                  <td className="border p-2 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => setEditItem(item)}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setDeleteId(item.id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {editItem && (
        <EditPortfolio
          portfolio={editItem}
          onClose={() => setEditItem(null)}
        />
      )}

      {deleteId && (
        <DeletePortfolio
          id={deleteId}
          onClose={() => setDeleteId(null)}
        />
      )}
    </div>
  );
}
