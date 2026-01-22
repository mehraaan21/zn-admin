"use client";

import { useState } from "react";
import { X, Plus, Trash2, Image as ImageIcon, CheckCircle, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast"; // Agar library use kar rahe hain
import { useRouter } from "next/navigation";

export default function AddCaseStudy() {
   const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "", client_name: "", position: "", description: "", services: "",
    duration: "", team_size: "", banner: null,
    challenges: [{ challenge: "", solution: "" }],
    bullet_points: [""],
    project_images: []
  });

  // Handlers for dynamic arrays
  const addRow = (field, obj) => setForm({...form, [field]: [...form[field], obj]});
  const removeRow = (field, index) => {
    const list = [...form[field]];
    list.splice(index, 1);
    setForm({...form, [field]: list});
  };


  const submit = async () => {
     setLoading(true);
  try {
    const formData = new FormData();
    // Basic Text Fields
    Object.keys(form).forEach(key => {
      if (typeof form[key] === 'string') formData.append(key, form[key]);
    });

    // Files
    if (form.banner) formData.append("banner", form.banner);
    form.project_images.forEach(img => formData.append("project_images[]", img));

    // Flat Arrays for Backend
    form.challenges.forEach(item => {
      formData.append("challenge_texts[]", item.challenge);
      formData.append("solution_texts[]", item.solution);
    });
    form.bullet_points.forEach(point => formData.append("bullet_points[]", point));

    // API Call (Same logic as Services)
     const res = await fetch("/api/case-studies", {
      method: "POST",
      body: formData, // Browser will set boundary automatically
    });

    const result = await res.json();
    if (!res.ok) {
        // console.log(result) yahan check karein backend kya error de raha hai
        throw new Error(result.message || "Validation Error");
    }
    toast("Success!");
        setOpen(false);
        router.refresh();
      } catch  (err) {
        toast(err.message, "error");
      } finally {
        setLoading(false);
      }
  };

  return (
    <>
      <button onClick={() => setOpen(true)} className="bg-blue-600 text-white px-6 py-2 rounded-xl flex items-center gap-2 font-bold shadow-lg hover:bg-blue-700 transition-all"
        >+ Add Case Study</button>

      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div initial={{ y: 50 }} animate={{ y: 0 }} className="bg-white w-full max-w-5xl max-h-[90vh] rounded-3xl overflow-hidden flex flex-col">
              <div className="p-6 border-b flex justify-between bg-gray-50">
                <h2 className="text-xl font-bold">Create New Case Study</h2>
                <X className="cursor-pointer" onClick={() => setOpen(false)} />
              </div>

              <div className="p-8 overflow-y-auto space-y-8">
                {/* 1. Basic Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input className="border p-3 rounded-xl col-span-2" placeholder="Project Title" onChange={e => setForm({...form, title: e.target.value})} />
                  <input type="file" className="border p-2 rounded-xl" onChange={e => setForm({...form, banner: e.target.files[0]})} />
                  <input className="border p-3 rounded-xl" placeholder="Client Name" onChange={e => setForm({...form, client_name: e.target.value})} />
                  <input className="border p-3 rounded-xl" placeholder="Duration (e.g. 3 Months)" onChange={e => setForm({...form, duration: e.target.value})} />
                  <input className="border p-3 rounded-xl" placeholder="Team Size" onChange={e => setForm({...form, team_size: e.target.value})} />
                </div>

                {/* 2. Challenges & Solutions */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b pb-2 text-red-500 font-bold">
                    <div className="flex items-center gap-2"><AlertCircle size={18}/> Challenges & Solutions</div>
                    <button onClick={() => addRow('challenges', {challenge: "", solution: ""})} className="text-xs bg-red-50 px-2 py-1 rounded">+ Add Row</button>
                  </div>
                  {form.challenges.map((item, idx) => (
                    <div key={idx} className="flex gap-4 items-start">
                      <textarea className="flex-1 border p-2 rounded-lg text-sm" placeholder="Challenge" onChange={e => {
                        const list = [...form.challenges]; list[idx].challenge = e.target.value; setForm({...form, challenges: list});
                      }} />
                      <textarea className="flex-1 border p-2 rounded-lg text-sm" placeholder="Solution" onChange={e => {
                        const list = [...form.challenges]; list[idx].solution = e.target.value; setForm({...form, challenges: list});
                      }} />
                      <Trash2 size={18} className="text-red-400 mt-3 cursor-pointer" onClick={() => removeRow('challenges', idx)} />
                    </div>
                  ))}
                </div>

                {/* 3. Results (Bullet Points) */}
                <div className="space-y-4">
                   <div className="flex justify-between items-center border-b pb-2 text-green-600 font-bold">
                    <div className="flex items-center gap-2"><CheckCircle size={18}/> Results / Impact</div>
                    <button onClick={() => addRow('bullet_points', "")} className="text-xs bg-green-50 px-2 py-1 rounded">+ Add Point</button>
                  </div>


                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {form.bullet_points.map((point, idx) => (
                      <div key={idx} className="flex gap-2">
                        <input className="flex-1 border p-2 rounded-lg text-sm" placeholder="Result Point" onChange={e => {
                          const list = [...form.bullet_points]; list[idx] = e.target.value; setForm({...form, bullet_points: list});
                        }} />
                        <X size={16} className="text-gray-400 mt-3 cursor-pointer" onClick={() => removeRow('bullet_points', idx)} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Multiple Images */}
                <div className="space-y-2">
                  <label className="font-bold text-sm block">Project Gallery Images</label>
                  <input type="file" multiple className="border w-full p-2 rounded-xl" onChange={e => setForm({...form, project_images: Array.from(e.target.files)})} />
                  <p className="text-[10px] text-gray-400">Select multiple images at once.</p>
                </div>
              </div>

              <div className="p-6 border-t bg-gray-50 flex justify-end gap-3">
                <button onClick={() => setOpen(false)} className="px-6 py-2 text-gray-500 font-bold">Cancel</button>
                <button onClick={submit} className="bg-blue-600 text-white px-6 py-2 rounded-xl flex items-center gap-2 font-bold shadow-lg hover:bg-blue-700 transition-all">Submit</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}