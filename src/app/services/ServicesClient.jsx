

"use client";

import { useState } from "react";
// 1. Eye icon add kiya gaya hai
import { Pencil, Trash2, LayoutGrid, Eye } from "lucide-react"; 
import Image from "next/image";
import AddService from "./AddService";
import EditService from "./EditService";
import DeleteService from "./DeleteService";
import ViewService from "./ViewService"; // 2. Naya View component import kiya
import Lottie from "lottie-react";

export default function ServicesClient({ services = [] }) {
  const [editService, setEditService] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  // 3. View state add kiya gaya hai
  const [viewService, setViewService] = useState(null); 

  const servicesList = services?.data || [];

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-2">
            <LayoutGrid className="text-blue-600" strokeWidth={2.5} />
            Our Services
          </h1>
          <p className="text-gray-500 mt-1">Manage {services?.total || 0} core services and solutions.</p>
        </div>
        <AddService />
      </div>

      {/* TABLE CONTAINER */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Service</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Icon</th>
                <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-100">
              {servicesList.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-gray-400">
                    <div className="flex flex-col items-center gap-2">
                      <LayoutGrid size={40} className="opacity-20" />
                      <p>No services found.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                servicesList.map((item) => (
                  <tr key={item.id} className="hover:bg-blue-50/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-900 text-base">{item.title}</span>
                        <span className="text-xs text-blue-500 font-mono">/{item.slug}</span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-600 line-clamp-1 max-w-[300px]">
                        {item.description}
                      </p>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {/* <div className="h-10 w-10 mx-auto flex items-center justify-center bg-white border border-gray-100 rounded-lg shadow-sm">
                        <Image 
                          src={item.icon?.url || "/placeholder.png"} 
                          alt="icon" 
                          width={24} 
                          height={24} 
                          className="object-contain"
                        />
                      </div> */}

                      <div className="h-10 w-10 mx-auto flex items-center justify-center bg-white border border-gray-100 rounded-lg shadow-sm group-hover:border-blue-200 transition-all overflow-hidden">
  {item.icon?.url?.endsWith('.json') ? (
    /* Agar icon JSON hai toh Lottie player chalega */
    <div className="h-8 w-8">
      <Lottie 
        animationData={item.icon?.json_content} // Ensure backend sends JSON object here
        loop={true} 
      />
    </div>
  ) : (
    /* Agar normal image hai (png/jpg/svg) */
    <Image 
      src={item.icon?.url || "/placeholder.png"} 
      alt="icon" 
      width={24} 
      height={24} 
      className="object-contain"
    />
  )}
</div>
                    </td>

                    {/* ACTIONS COLUMN */}
                    <td className="px-6 py-4">
                      <div className="flex justify-center items-center gap-2">
                        {/* 4. VIEW BUTTON ADDED */}
                        <button
                          onClick={() => setViewService(item)}
                          className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all"
                          title="View Details"
                        >
                          <Eye size={18} />
                        </button>

                        <button
                          onClick={() => setEditService(item)}
                          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                        >
                          <Pencil size={18} />
                        </button>
                        
                        <button
                          onClick={() => setDeleteId(item.id)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
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
      {/* 5. View Modal Rendered here */}
      {viewService && <ViewService data={viewService} onClose={() => setViewService(null)} />}
      
      {editService && <EditService service={editService} onClose={() => setEditService(null)} />}
      {deleteId && <DeleteService id={deleteId} onClose={() => setDeleteId(null)} />}
    </div>
  );
}