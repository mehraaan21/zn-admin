"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Cpu, Plus, Eye, Pencil, Trash2, Layers } from "lucide-react";
import AddTechModal from "./AddTechModal";
import EditTechModal from "./EditTechModal";
import ViewTechModal from "./ViewTechModal";
import DeleteTechModal from "./DeleteTechModal";

export default function TechStackTable({ data, caseStudyId }) {
  const [items, setItems] = useState(data);
  const [openAdd, setOpenAdd] = useState(false);
  const [viewItem, setViewItem] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => { setItems(data); }, [data]);

  return (
    <div className="max-w-7xl mx-auto py-12 px-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black flex gap-3 items-center tracking-tighter uppercase">
          <div className="p-2 bg-indigo-600 rounded-xl text-white">
            <Cpu size={28} />
          </div>
          Tech Stacks
        </h1>
        <button
          onClick={() => setOpenAdd(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-2xl font-black hover:bg-indigo-700 transition-all shadow-lg uppercase tracking-widest text-xs"
        >
          <Plus size={18} /> Add Tech-stacks
        </button>
      </div>

      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50/50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Technology</th>
              <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Category</th>
              <th className="px-6 py-5 text-center text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {items.map((item) => {
              const tech = item.TechStack;
              return (
                <tr key={item.id} className="group hover:bg-indigo-50/30 transition-all duration-300">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-2xl border-2 border-white shadow-sm overflow-hidden bg-white p-2">
                        <Image src={tech?.image_url || "/placeholder.png"} alt={tech?.Name} width={48} height={48} className="object-contain" />
                      </div>
                      <span className="font-black text-gray-800 tracking-tight">{tech?.Name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-4 py-1 bg-white border border-gray-100 text-gray-600 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
                      <Layers size={10} className="text-indigo-500" />
                      {tech?.Category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center items-center gap-2">
                      <button onClick={() => setViewItem(tech)} className="p-3 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all"><Eye size={18} /></button>
                      <button onClick={() => setEditItem(item)} className="p-3 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"><Pencil size={18} /></button>
                      <button onClick={() => setDeleteId(item.id)} className="p-3 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {openAdd && <AddTechModal caseStudyId={caseStudyId} onClose={() => setOpenAdd(false)} />}
      {viewItem && <ViewTechModal tech={viewItem} onClose={() => setViewItem(null)} />}
      {editItem && <EditTechModal item={editItem} onClose={() => setEditItem(null)} />}
      {deleteId && <DeleteTechModal id={deleteId} onClose={() => setDeleteId(null)} />}
    </div>
  );
}