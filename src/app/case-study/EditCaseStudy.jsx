"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/lib/toast";
import { X, Save, Loader2, Trash2, Info, Plus, AlertCircle, CheckCircle, Image as ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function EditCaseStudy({ data, onClose }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // 1. Initial State Mapping
  const [form, setForm] = useState({
    title: data?.title || "",
    client_name: data?.client_name || "",
    position: data?.position || "",
    description: data?.description || "",
    services: data?.services || "",
    duration: data?.duration || "",
    team_size: data?.team_size || "",
    banner: null, // Nayi file ke liye
    // Challenges array mapping
    challenges: data?.Challenges?.map(ch => ({ 
      challenge: ch.challenge, 
      solution: ch.solution 
    })) || [{ challenge: "", solution: "" }],
    // Results mapping
    result_title: data?.Results?.Title || "Impact",
    bullet_points: data?.Results?.bullet_points || [""],
    // Testimonial mapping
    testimonial_feedback: data?.Testimonials?.feedback || "",
    project_images: [] // Nayi project images ke liye
  });

  // Dynamic Handlers
  const addRow = (field, obj) => setForm({ ...form, [field]: [...form[field], obj] });
  const removeRow = (field, index) => {
    const list = [...form[field]];
    list.splice(index, 1);
    setForm({ ...form, [field]: list });
  };

  // --- Update Submit Logic ---
  const update = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("_method", "PUT"); // Method override for multipart/form-data

      // Basic Fields
      formData.append("title", form.title);
      formData.append("client_name", form.client_name);
      formData.append("position", form.position);
      formData.append("description", form.description);
      formData.append("services", form.services);
      formData.append("duration", form.duration);
      formData.append("team_size", form.team_size);
      formData.append("result_title", form.result_title);
      formData.append("testimonial_feedback", form.testimonial_feedback);

      if (form.banner) formData.append("banner", form.banner);

      // Mapping Challenges to Flat Arrays
      form.challenges.forEach((item) => {
        formData.append("challenge_texts[]", item.challenge);
        formData.append("solution_texts[]", item.solution);
      });

      // Mapping Results Bullet Points
      form.bullet_points.forEach((point) => {
        formData.append("bullet_points[]", point);
      });

      // Mapping New Project Images
      form.project_images.forEach((img) => {
        formData.append("project_images[]", img);
      });

      const res = await fetch(`/api/case-studies/${data.id}`, {
        method: "POST", // Using POST with _method PUT
        body: formData,
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Update Failed");

      toast("Case Study Updated Successfully!", "success");
      onClose();
      router.refresh();
    } catch (err) {
      toast(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white w-full max-w-6xl max-h-[95vh] rounded-3xl overflow-hidden flex flex-col shadow-2xl"
        >
          {/* Header */}
          <div className="p-6 border-b flex justify-between items-center bg-purple-50">
            <div>
              <h2 className="text-2xl font-black text-gray-800">Edit Case Study</h2>
              <p className="text-sm text-purple-600 font-medium font-mono">ID: #{data.id}</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-red-100 text-red-500 rounded-full transition-all">
              <X size={24} />
            </button>
          </div>

          {/* Body */}
          <div className="p-8 overflow-y-auto space-y-10">
            
            {/* 1. Project Info */}
            <section className="space-y-4">
              <div className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <Info size={16}/> Basic Information
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input className="border p-3 rounded-xl col-span-2 outline-none focus:ring-2 ring-purple-500" value={form.title} placeholder="Project Title" onChange={e => setForm({...form, title: e.target.value})} />
                <div className="relative group border rounded-xl p-2 bg-gray-50">
                   <label className="text-[10px] text-gray-400 block mb-1">Banner Image</label>
                   <input type="file" className="text-xs" onChange={e => setForm({...form, banner: e.target.files[0]})} />
                </div>
              </div>
              <textarea className="w-full border p-3 rounded-xl outline-none focus:ring-2 ring-purple-500" rows={3} value={form.description} placeholder="Full Description" onChange={e => setForm({...form, description: e.target.value})} />
            </section>

            {/* 2. Challenges & Solutions */}
            <section className="space-y-4">
              <div className="flex justify-between items-center border-b pb-2">
                <div className="flex items-center gap-2 text-red-500 font-bold"><AlertCircle size={20}/> Challenges & Solutions</div>
                <button onClick={() => addRow('challenges', {challenge: "", solution: ""})} className="text-xs bg-red-50 text-red-600 px-3 py-1 rounded-lg font-bold hover:bg-red-100">+ Add Row</button>
              </div>
              {form.challenges.map((item, idx) => (
                <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-2xl relative">
                  <button onClick={() => removeRow('challenges', idx)} className="absolute -top-2 -right-2 bg-white shadow rounded-full p-1 text-red-500"><X size={14}/></button>
                  <textarea className="border p-3 rounded-xl text-sm" placeholder="Challenge" value={item.challenge} onChange={e => {
                    const list = [...form.challenges]; list[idx].challenge = e.target.value; setForm({...form, challenges: list});
                  }} />
                  <textarea className="border p-3 rounded-xl text-sm" placeholder="Solution" value={item.solution} onChange={e => {
                    const list = [...form.challenges]; list[idx].solution = e.target.value; setForm({...form, challenges: list});
                  }} />
                </div>
              ))}
            </section>

            {/* 3. Impact/Results */}
            <section className="space-y-4">
               <div className="flex justify-between items-center border-b pb-2">
                <div className="flex items-center gap-2 text-green-600 font-bold"><CheckCircle size={20}/> Results & Impact</div>
                <button onClick={() => addRow('bullet_points', "")} className="text-xs bg-green-50 text-green-600 px-3 py-1 rounded-lg font-bold hover:bg-green-100">+ Add Bullet Point</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {form.bullet_points.map((point, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input className="flex-1 border p-2 rounded-xl text-sm" value={point} onChange={e => {
                      const list = [...form.bullet_points]; list[idx] = e.target.value; setForm({...form, bullet_points: list});
                    }} />
                    <button onClick={() => removeRow('bullet_points', idx)} className="text-gray-400 hover:text-red-500"><Trash2 size={16}/></button>
                  </div>
                ))}
              </div>
            </section>

            {/* 4. Project Gallery (Existing & New) */}
            <section className="space-y-4">
              <div className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <ImageIcon size={16}/> Project Images
              </div>
              <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
                {/* Purani Images dikhana */}
                {data.Images?.map(img => (
                  <div key={img.id} className="relative h-16 w-full rounded-lg overflow-hidden border">
                    <Image src={img.image_url} alt="old" fill className="object-cover opacity-50" />
                  </div>
                ))}
              </div>
              <div className="border-2 border-dashed border-purple-200 p-6 rounded-2xl bg-purple-50/30 text-center">
                 <input type="file" multiple className="hidden" id="edit-gallery" onChange={e => setForm({...form, project_images: Array.from(e.target.files)})} />
                 <label htmlFor="edit-gallery" className="cursor-pointer text-purple-600 font-bold text-sm">
                   {form.project_images.length > 0 ? `${form.project_images.length} new images selected` : "+ Upload New Project Screenshots"}
                 </label>
              </div>
            </section>
          </div>

          {/* Footer */}
          <div className="p-6 border-t bg-gray-50 flex justify-end gap-3">
            <button onClick={onClose} className="px-6 py-2 font-bold text-gray-500">Cancel</button>
            <button onClick={update} disabled={loading} className="bg-purple-600 hover:bg-purple-700 text-white px-10 py-2 rounded-xl font-bold flex items-center gap-2 disabled:bg-purple-300">
              {loading ? <Loader2 className="animate-spin" /> : <Save size={18} />}
              {loading ? "Saving Changes..." : "Update Case Study"}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
