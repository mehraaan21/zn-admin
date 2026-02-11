"use client";

import { useState, useEffect } from "react";
import { X, RefreshCcw, Save, Upload, Layers, Tag } from "lucide-react";
import { toast } from "@/lib/toast";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function EditTechModal({ item, onClose }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  
  const [form, setForm] = useState({
    name: "",
    category: "",
    image: null,
  });

  useEffect(() => {
    if (item?.TechStack) {
      setForm({
        name: item.TechStack.Name || "",
        category: item.TechStack.Category || "",
        image: null,
      });
      setPreview(item.TechStack.image_url);
    }
  }, [item]);

  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm({ ...form, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const submit = async () => {
    if (!form.name || !form.category) {
      toast("Name and Category are required", "error");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("category", form.category);
      if (form.image) formData.append("image", form.image);

      const res = await fetch(`/api/case-studies/${item.CaseStudyID}/tech-stacks/${item.id}`, {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) throw new Error("Update failed");

      toast("Technology updated ✨");
      router.refresh();
      onClose();
    } catch (err) {
      toast(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-xl overflow-hidden">
        {/* HEADER */}
        <div className="p-8 border-b bg-slate-50 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Edit Technology</h2>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Refining Stack Component</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-8 space-y-6">
          {/* IMAGE UPLOAD */}
          <div className="space-y-3">
            <label className="text-[10px] font-black text-indigo-500 uppercase tracking-widest ml-1 flex items-center gap-1">
              <Upload size={12} /> Tech Logo
            </label>
            <div className="relative border-2 border-dashed border-slate-200 rounded-[2rem] p-8 flex flex-col items-center justify-center bg-slate-50 hover:bg-indigo-50/50 hover:border-indigo-300 transition-all group">
              {preview ? (
                <div className="relative h-20 w-20">
                  <Image src={preview} alt="preview" fill className="object-contain" />
                </div>
              ) : (
                <Upload className="text-slate-300 group-hover:text-indigo-400 transition-colors" size={32} />
              )}
              <p className="mt-2 text-[10px] font-bold text-slate-400">Click to replace image</p>
              <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleImage} />
            </div>
          </div>

          {/* NAME */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1">
              <Tag size={12} /> Tech Name
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border-2 border-slate-100 p-4 rounded-2xl focus:border-indigo-500 focus:ring-0 outline-none font-bold text-slate-700 transition-all bg-slate-50/50"
              placeholder="e.g. Next.js"
            />
          </div>

          {/* CATEGORY */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1">
              <Layers size={12} /> Category
            </label>
             <input
              type="text"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full border-2 border-slate-100 p-4 rounded-2xl focus:border-indigo-500 focus:ring-0 outline-none font-bold text-slate-700 transition-all bg-slate-50/50"
              placeholder="e.g. Frontend , Backend"
            />
          </div>

          {/* FOOTER */}
          <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
            <button onClick={onClose} className="px-6 py-3 font-bold text-slate-400 hover:text-slate-600 transition-colors">
              Cancel
            </button>
            <button
              onClick={submit}
              disabled={loading}
              className="px-10 py-3 bg-indigo-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] flex items-center gap-2 shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95"
            >
              {loading ? (
                <>
                  <RefreshCcw size={16} className="animate-spin" /> Updating...
                </>
              ) : (
                <>
                  <Save size={16} /> Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}