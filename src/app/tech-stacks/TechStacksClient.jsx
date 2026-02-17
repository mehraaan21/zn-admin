"use client";

import Image from "next/image";
import { useState } from "react";
import { Pencil, Trash2, Plus, Layout, Layers, Eye } from "lucide-react"; // Icons
import AddTechStack from "./AddTechStack";
import EditTechStack from "./EditTechStack";
import DeleteTechStack from "./Deletetech";
import ViewTechStack from "./ViewTechStack";

export default function TechStacksClient({ techStacks = [] }) {
  const [editItem, setEditItem] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [viewItem, setViewItem] = useState(null);

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-2">
            <Layout className="text-blue-600" />
            Tech Stacks
          </h1>
          <p className="text-gray-500 mt-1">
            Manage the technologies and tools used in your projects.
          </p>
        </div>
        <AddTechStack />
      </div>

      {/* TABLE CONTAINER */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Sr.NO
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Technology
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-100">
              {techStacks.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-10 text-center text-gray-400"
                  >
                    No tech stacks found. Click "Add Tech Stack" to create one.
                  </td>
                </tr>
              ) : (
                techStacks.map((item, index) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50/50 transition-colors group"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-400">
                      #{index + 1}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 shrink-0 border rounded-lg overflow-hidden bg-gray-50 shadow-sm">
                          <Image
                            src={item.image_url || "/placeholder.png"}
                            alt={item.Name}
                            width={48}
                            height={48}
                            className="h-full w-full object-contain p-1"
                          />
                        </div>
                        <span className="font-bold text-gray-900">
                          {item.Name}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold border border-blue-100 uppercase tracking-wide">
                        <Layers size={12} />
                        {item.Category}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-center items-center gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => setViewItem(item)}
                          className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-full transition-colors"
                          title="View Details"
                        >
                          <Eye size={18} />
                        </button>

                        <button
                          onClick={() => setEditItem(item)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                          title="Edit Technology"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => setDeleteId(item.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                          title="Delete Technology"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODALS */}
      {editItem && (
        <EditTechStack tech={editItem} onClose={() => setEditItem(null)} />
      )}

      {viewItem && (
        <ViewTechStack data={viewItem} onClose={() => setViewItem(null)} />
      )}

      {deleteId && (
        <DeleteTechStack id={deleteId} onClose={() => setDeleteId(null)} />
      )}
    </div>
  );
}
