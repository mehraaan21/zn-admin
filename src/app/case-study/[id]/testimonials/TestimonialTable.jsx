"use client";

import { useState } from "react";
import Image from "next/image";
import { MessageCircle, Plus, Eye, Pencil, Trash2 } from "lucide-react";

// Assuming you will create these similar to the Results ones
import AddTestimonialModal from "./AddTestimonialModal";
import EditTestimonialModal from "./EditTestimonialModal";
import ViewTestimonialModal from "./ViewTestimonialModal";
import DeleteTestimonialModal from "./DeleteTestimonialModal";

export default function TestimonialTable({ data, caseStudyId }) {
  const [openAdd, setOpenAdd] = useState(false);
  const [viewItem, setViewItem] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  return (
    <div className="max-w-7xl mx-auto py-12 px-6">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold flex gap-3 items-center text-slate-900">
          <MessageCircle className="text-blue-600" size={32} />
          Client Testimonials
        </h1>

        <button
          onClick={() => setOpenAdd(true)}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-8 py-2.5 rounded-xl shadow active:scale-95 cursor-pointer transition font-semibold"
        >
          <Plus size={18} />
          Add Testimonial
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-xs font-bold tracking-wider">
              <tr>
                <th className="p-5">Client</th>
                <th className="p-5">Feedback</th>
                <th className="p-5">Date</th>
                <th className="p-5 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {data?.length > 0 ? (
                data.map((item) => {
                  const testimonial = item.Testimonials || item;
                  const hasImage = testimonial.image_url && !testimonial.image_url.endsWith("/storage/");

                  return (
                    <tr key={item.id} className="group hover:bg-slate-50/50 transition-colors">
                      {/* IMAGE/AVATAR */}
                      <td className="p-5">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-full overflow-hidden bg-blue-50 flex items-center justify-center border border-blue-100">
                            {hasImage ? (
                              <Image
                                src={testimonial.image_url}
                                fill
                                alt="client"
                                className="object-cover"
                              />
                            ) : (
                              <span className="text-blue-600 text-xl">💬</span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* FEEDBACK PREVIEW */}
                      <td className="p-5 max-w-md">
                        <p className="text-slate-700 line-clamp-2 text-sm leading-relaxed">
                          {testimonial.feedback}
                        </p>
                      </td>

                      {/* DATE */}
                      <td className="p-5">
                        <span className="text-slate-400 text-sm font-medium">
                          {new Date(testimonial.created_at).toLocaleDateString()}
                        </span>
                      </td>

                      {/* ACTIONS */}
                      <td className="p-5">
                        <div className="flex justify-center items-center gap-2">
                          <button
                            onClick={() => setViewItem(testimonial)}
                            className="p-2 text-slate-400 bg-slate-100 hover:text-slate-400 cursor-pointer hover:bg-green-50 rounded-full transition-colors"
                            title="View Details"
                          >
                            <Eye size={18} />
                          </button>
                          
                          <button
                            onClick={() => setEditItem(testimonial)}
                            className="p-2 text-blue-400 cursor-pointer bg-blue-100 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                            title="Edit"
                          >
                            <Pencil size={18} />
                          </button>
                          
                          <button
                            onClick={() => setDeleteId(item.id)}
                            className="p-2 text-red-400 cursor-pointer bg-red-100 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="4" className="p-10 text-center text-slate-400 italic">
                    No testimonials found for this project.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL PLACEHOLDERS - These follow your existing Result modal pattern */}
      {openAdd && <AddTestimonialModal caseStudyId={caseStudyId} onClose={() => setOpenAdd(false)} />}
        {viewItem && <ViewTestimonialModal testimonial={viewItem} onClose={() => setViewItem(null)} />}
        {editItem && <EditTestimonialModal testimonial={editItem} onClose={() => setEditItem(null)} />}
        {deleteId && <DeleteTestimonialModal id={deleteId} onClose={() => setDeleteId(null)} />}
     
    </div>
  );
}