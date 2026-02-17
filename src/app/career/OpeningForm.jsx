"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/lib/toast";
import {
  X,
  Briefcase,
  Users,
  FileText,
  CheckCircle2,
  RefreshCcw,
  Type,
} from "lucide-react"; // Icons for consistency
import RichTextEditor from "@/components/RichTextEditor";

export default function OpeningForm({ initialData, onClose, onSuccess }) {
  const router = useRouter();
  const isEdit = !!initialData;
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: initialData?.title || "",
    position: initialData?.position || "",
    description: initialData?.description || "",
    opening: initialData?.opening || 1,
    status: initialData?.status || "active",
  });

  const submit = async () => {
    // Basic Validation
    if (!form.title || !form.position) {
      toast("Title and Position are required", "error");
      return;
    }

    setLoading(true);
    const url = isEdit ? `/api/openings/${initialData.id}` : `/api/openings`;

    try {
      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Operation failed");
      }

      toast(isEdit ? "Job updated successfully" : "Job added successfully");
      router.refresh();
      onSuccess();
      onClose();
    } catch (error) {
      toast(error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
            {/* Header */}
        <div className="flex justify-between items-center p-6 border-b bg-white">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Briefcase className="text-blue-600" size={22} />
            {isEdit ? "Edit Career Opening" : "Add New Opening"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Main Content Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1 items-center gap-1">
                <Type size={14} /> Job Title
              </label>
              <input
                placeholder="e.g. Frontend Developer"
                className="   w-full   border border-gray-300   rounded-xl   p-3   shadow-sm   outline-none   resize-none  transition-all  focus:ring-2  focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 text-gray-700"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1 items-center gap-1">
                <Briefcase size={14} /> Position
              </label>
              <input
                placeholder="e.g. Senior"
                className="   w-full   border border-gray-300   rounded-xl   p-3   shadow-sm   outline-none   resize-none  transition-all  focus:ring-2  focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 text-gray-700"
                value={form.position}
                onChange={(e) => setForm({ ...form, position: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1 items-center gap-1">
              <FileText size={14} /> Job Description
            </label>
           <RichTextEditor
                placeholder="Tell us about the role..."
                className="w-full border border-gray-300 rounded-xl shadow-sm outline-none transition-all focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 text-gray-700"
                value={form.description || ""}
                onChange={(content) =>
                  setForm((prev) => ({
                    ...prev,
                    description: content,
                  }))
                }
              />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1 items-center gap-1">
                <Users size={14} /> No. of Openings
              </label>
              <input
                type="number"
                min="1"
                className="   w-full   border border-gray-300   rounded-xl   p-3   shadow-sm   outline-none   resize-none  transition-all  focus:ring-2  focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 text-gray-700"
                value={form.opening}
                onChange={(e) =>
                  setForm({ ...form, opening: Number(e.target.value) })
                }
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-8 py-2.5 cursor-pointer border rounded-lg font-medium hover:bg-gray-50 transition-colors text-gray-600"
            >
              Cancel
            </button>
            <button
              onClick={submit}
              disabled={loading}
              className="px-8 py-2.5 cursor-pointer bg-blue-600 text-white rounded-lg font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 disabled:bg-blue-300 transition-all flex items-center gap-2 active:scale-95"
            >
              {loading ? (
                <>
                  <RefreshCcw size={18} className="animate-spin" />
                  Saving...
                </>
              ) : isEdit ? (
                "Update Opening"
              ) : (
                "Publish Opening"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
