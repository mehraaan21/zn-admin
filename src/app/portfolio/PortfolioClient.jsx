"use client";

import { useState } from "react";
import Image from "next/image";
import { Pencil, Trash2, Briefcase, Plus, Layers, Eye } from "lucide-react";
import AddPortfolio from "./AddPortfolio";
import EditPortfolio from "./EditPortfolio";
import DeletePortfolio from "./DeletePortfolio";
import ViewPortfolio from "./ViewPortfolio"; // Import the new View component
import { truncateDescription } from "@/lib/wordcut";

export default function PortfolioClient({ portfolios = [] }) {
  const [editItem, setEditItem] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [viewItem, setViewItem] = useState(null);

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-2">
            <Briefcase className="text-blue-600" />
            Portfolio
          </h1>
          <p className="text-gray-500 mt-1">
            Manage your work showcase and project categories.
          </p>
        </div>
        <AddPortfolio />
      </div>

      {/* TABLE CONTAINER */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Sr.No
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Project
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-100">
              {portfolios.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <Briefcase size={40} className="mb-2 opacity-20" />
                      <p>
                        No portfolio items found. Click "Add Portfolio" to
                        start.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                portfolios.map((item, index) => (
                  <tr
                    key={item.id || index}
                    className="hover:bg-gray-50/50 transition-colors group"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-400">
                      #{index + 1}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 shrink-0 border rounded-lg overflow-hidden bg-gray-50 shadow-sm relative">
                          <Image
                            src={item.image_url || "/placeholder.png"}
                            alt={item.title || "Project"}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-gray-900">
                            {item.title}
                          </span>
                          <span className="text-[10px] text-gray-500 font-mono uppercase tracking-tighter">
                            {item.slug}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold border border-blue-100 uppercase tracking-wide">
                        <Layers size={12} />
                        {item.category}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div
                        className="text-sm text-gray-500 line-clamp-2 max-w-[250px]"
                        title={item.description?.replace(/<[^>]*>/g, "")}
                      >
                        {truncateDescription(item.description, 40)}
                      </div>
                    </td>

                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center items-center gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                        {/* VIEW BUTTON */}
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
                          title="Edit Portfolio"
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          onClick={() => setDeleteId(item.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                          title="Delete Portfolio"
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
      {viewItem && (
        <ViewPortfolio data={viewItem} onClose={() => setViewItem(null)} />
      )}

      {editItem && (
        <EditPortfolio portfolio={editItem} onClose={() => setEditItem(null)} />
      )}

      {deleteId && (
        <DeletePortfolio id={deleteId} onClose={() => setDeleteId(null)} />
      )}
    </div>
  );
}
