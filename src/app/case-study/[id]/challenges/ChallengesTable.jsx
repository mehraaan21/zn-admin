"use client";

import { useState, useEffect } from "react";
import { AlertTriangle, Plus, Eye, Pencil, Trash2, CheckCircle2 } from "lucide-react";
import AddChallengeModal from "./AddChallengeModal";
import EditChallengeModal from "./EditChallengeModal";
import ViewChallengeModal from "./ViewChallengeModal";
import DeleteChallengeModal from "./DeleteChallengeModal";

export default function ChallengesTable({ data, caseStudyId }) {
  const [items, setItems] = useState(data);
  const [openAdd, setOpenAdd] = useState(false);
  const [viewItem, setViewItem] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    setItems(data);
  }, [data]);

  return (
    <div className="max-w-7xl mx-auto py-12 px-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold flex gap-3 items-center">
          <AlertTriangle className="text-orange-500" size={32} />
          Challenges & Solutions
        </h1>
        <button
          onClick={() => setOpenAdd(true)}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 rounded-xl shadow transition active:scale-95"
        >
          <Plus size={18} /> Add Challenge
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b text-slate-500 uppercase text-xs font-bold">
            <tr>
              <th className="p-5">Challenge</th>
              <th className="p-5">Solution</th>
              <th className="p-5 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.length > 0 ? (
              items.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition">
                  <td className="p-5 max-w-xs">
                    <p className="text-sm font-medium text-red-600 line-clamp-2">{item.challenge}</p>
                  </td>
                  <td className="p-5 max-w-xs">
                    <p className="text-sm font-medium text-green-700 line-clamp-2">{item.solution}</p>
                  </td>
                  <td className="p-5">
                    <div className="flex justify-center gap-2">
                      <button onClick={() => setViewItem(item)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full"><Eye size={18} /></button>
                      <button onClick={() => setEditItem(item)} className="p-2 text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded-full"><Pencil size={18} /></button>
                      <button onClick={() => setDeleteId(item.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full"><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="3" className="p-10 text-center text-slate-400">No challenges found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {openAdd && <AddChallengeModal caseStudyId={caseStudyId} onClose={() => setOpenAdd(false)} />}
      {viewItem && <ViewChallengeModal item={viewItem} onClose={() => setViewItem(null)} />}
      {editItem && <EditChallengeModal item={editItem} onClose={() => setEditItem(null)} />}
      {/* {deleteId && <DeleteChallengeModal id={deleteId} caseStudyId={caseStudyId} onClose={() => setDeleteId(null)} />} */}
      {deleteId && (
  <DeleteChallengeModal
    id={deleteId}
    caseStudyId={caseStudyId}
    onClose={() => setDeleteId(null)}
    onSuccess={(deletedId) => {
      setItems(prev => prev.filter(item => item.id !== deletedId));
    }}
  />
)}
    </div>
  );
}