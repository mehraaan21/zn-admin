"use client";
import { useState } from "react";
import { X, Upload, RefreshCcw, Save } from "lucide-react";
import { toast } from "@/lib/toast";
import { useRouter } from "next/navigation";

export default function AddTechModal({ caseStudyId, onClose }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", category: "", image: null });
  const [preview, setPreview] = useState(null);

  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm({ ...form, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const submit = async () => {
    if (!form.name || !form.category) return toast("Name and Category required", "error");
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("category", form.category);
      if (form.image) formData.append("image", form.image);

      const res = await fetch(`/api/case-studies/${caseStudyId}/tech-stacks`, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        toast("Tech added successfully! 🚀");
        router.refresh();
        onClose();
      }
    } catch (err) { toast(err.message, "error"); }
    finally { setLoading(false); }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-[2.5rem] w-full max-w-lg p-8 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-black uppercase tracking-tight">Tech-stacks Technology</h2>
          <button onClick={onClose}><X /></button>
        </div>
        <div className="space-y-5">
           <div className="border-2 border-dashed border-gray-100 p-6 rounded-2xl text-center hover:bg-indigo-50 transition relative">
              {preview ? <img src={preview} className="h-20 mx-auto object-contain" /> : <Upload className="mx-auto text-indigo-500" />}
              <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleImage} />
           </div>
           <input placeholder="Tech Name (e.g. React)" className="w-full border-2 border-gray-100 p-4 rounded-2xl outline-none focus:border-indigo-500 font-bold" onChange={e => setForm({...form, name: e.target.value})} />
             <input placeholder="Category (e.g. Frontend , Backend)" className="w-full border-2 border-gray-100 p-4 rounded-2xl outline-none focus:border-indigo-500 font-bold" onChange={e => setForm({...form, category: e.target.value})} />
           <button onClick={submit} disabled={loading}
            className=" w-full cursor-pointer bg-blue-500 hover:bg-blue-600 text-white py-2.5 px-8 rounded-2xl font-black uppercase tracking-widest flex justify-center items-center gap-2">
              {loading ? <RefreshCcw className="animate-spin" />
               :
                <Save size={18} />} Save Tech
           </button>
        </div>
      </div>
    </div>
  );
}