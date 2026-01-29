


"use client";

import { useState } from "react";
import OpeningForm from "./OpeningForm";
import DeleteConfirm from "./DeleteConfirm";
import { Pencil, Trash2, Plus, Briefcase, Users, Eye } from "lucide-react"; // Icons import karein
import ViewOpening from "./ViewOpening";

export default function OpeningTable({ openings }) {
  const [editJob, setEditJob] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [addOpen, setAddOpen] = useState(false);
  const [viewJob, setViewJob] = useState(null);

  const reload = () => window.location.reload();

  return (
    <div className="w-full bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
      {/* Header with Add Button */}
      <div className="p-4 border-b flex justify-between items-center bg-gray-50/50">
        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <Briefcase className="text-blue-600" size={20} />
          Current Vacancies
        </h2>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all shadow-sm active:scale-95 text-sm font-medium"
          onClick={() => setAddOpen(true)}
        >
          <Plus size={18} />
          Add New Job
        </button>
      </div>

      {/* Responsive Table Wrapper */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs font-semibold">
            <tr>
              <th className="px-6 py-4">Sr.No</th>
              <th className="px-6 py-4">Job Title & Position</th>
              <th className="px-6 py-4 text-center">Openings</th>
              {/* <th className="px-6 py-4 text-center">Status</th> */}
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {openings.map((job, index) => (
              <tr key={job.id} className="hover:bg-blue-50/30 transition-colors group">
                 <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-400">
                      #{index+1}
                    </td>
                
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-800 text-base">{job.title}</span>
                    <span className="text-gray-500 text-xs italic">{job.position}</span>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-center">
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full flex items-center gap-1.5 font-medium">
                      <Users size={14} className="text-gray-400" />
                      {job.opening}
                    </span>
                  </div>
                </td>
{/* 
                <td className="px-6 py-4 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold border transition-all
                      ${job.status === "active" || job.status === true 
                        ? "bg-green-100 text-green-700 border-green-200" 
                        : "bg-red-100 text-red-700 border-red-200"}
                    `}
                  >
                    {job.status === "active" || job.status === true ? "● Active" : "○ Inactive"}
                  </span>
                </td> */}

                <td className="px-6 py-4">
                  <div className="flex justify-center items-center gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                    
                    <button 
  onClick={() => setViewJob(job)}
  className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
  title="View Details"
>
  <Eye size={18} />
</button>
                    <button 
                      onClick={() => setEditJob(job)}
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                      title="Edit Job"
                    >
                      <Pencil size={18} />
                    </button>
                    <button 
                      onClick={() => setDeleteId(job.id)}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                      title="Delete Job"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modals Logic */}
      {addOpen && (
        <OpeningForm onClose={() => setAddOpen(false)} onSuccess={reload} />
      )}

      {editJob && (
        <OpeningForm
          initialData={editJob}
          onClose={() => setEditJob(null)}
          onSuccess={reload}
        />
      )}

      {deleteId && (
        <DeleteConfirm
          id={deleteId}
          onClose={() => setDeleteId(null)}
          onSuccess={reload}
        />
      )}
      {viewJob && (
  <ViewOpening 
    data={viewJob} 
    onClose={() => setViewJob(null)} 
  />
)}
    </div>
  );
}