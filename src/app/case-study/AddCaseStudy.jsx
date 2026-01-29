// "use client";

// import { useState } from "react";
// import { X, Plus, Trash2, Image as ImageIcon, CheckCircle, AlertCircle } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { toast } from "react-hot-toast"; // Agar library use kar rahe hain
// import { useRouter } from "next/navigation";

// export default function AddCaseStudy() {
//    const router = useRouter();
//   const [open, setOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [form, setForm] = useState({
//     title: "", client_name: "", position: "", description: "", services: "",
//     duration: "", team_size: "", banner: null,
//     challenges: [{ challenge: "", solution: "" }],
//     bullet_points: [""],
//     images: []
//   });

//   // Handlers for dynamic arrays
//   const addRow = (field, obj) => setForm({...form, [field]: [...form[field], obj]});
//   const removeRow = (field, index) => {
//     const list = [...form[field]];
//     list.splice(index, 1);
//     setForm({...form, [field]: list});
//   };


//   const submit = async () => {
//      setLoading(true);
//   try {
//     const formData = new FormData();
//     // Basic Text Fields
//     Object.keys(form).forEach(key => {
//       if (typeof form[key] === 'string') formData.append(key, form[key]);
//     });

//     // Files
//     if (form.banner) formData.append("banner", form.banner);
//     form.images.forEach(img => formData.append("images[]", img));

//     // Flat Arrays for Backend
//     form.challenges.forEach(item => {
//       formData.append("challenge_texts[]", item.challenge);
//       formData.append("solution_texts[]", item.solution);
//     });
//     form.bullet_points.forEach(point => formData.append("bullet_points[]", point));

//     // API Call (Same logic as Services)
//      const res = await fetch("/api/case-studies", {
//       method: "POST",
//       body: formData, // Browser will set boundary automatically
//     });

//     const result = await res.json();
//     if (!res.ok) {
//         // console.log(result) yahan check karein backend kya error de raha hai
//         throw new Error(result.message || "Validation Error");
//     }
//     toast("Success!");
//         setOpen(false);
//         router.refresh();
//       } catch  (err) {
//         toast(err.message, "error");
//       } finally {
//         setLoading(false);
//       }
//   };

//   return (
//     <>
//       <button onClick={() => setOpen(true)} className="bg-blue-600 text-white px-6 py-2 rounded-xl flex items-center gap-2 font-bold shadow-lg hover:bg-blue-700 transition-all"
//         >+ Add Case Study</button>

//       <AnimatePresence>
//         {open && (
//           <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
//             <motion.div initial={{ y: 50 }} animate={{ y: 0 }} className="bg-white w-full max-w-5xl max-h-[90vh] rounded-3xl overflow-hidden flex flex-col">
//               <div className="p-6 border-b flex justify-between bg-gray-50">
//                 <h2 className="text-xl font-bold">Create New Case Study</h2>
//                 <X className="cursor-pointer" onClick={() => setOpen(false)} />
//               </div>

//               <div className="p-8 overflow-y-auto space-y-8">
//                 {/* 1. Basic Details */}
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   <input className="border p-3 rounded-xl col-span-2" placeholder="Project Title" onChange={e => setForm({...form, title: e.target.value})} />
//                   <input type="file" className="border p-2 rounded-xl" onChange={e => setForm({...form, banner: e.target.files[0]})} />
//                   <input className="border p-3 rounded-xl" placeholder="Client Name" onChange={e => setForm({...form, client_name: e.target.value})} />
//                   <input className="border p-3 rounded-xl" placeholder="Position (e.g. CEO)" onChange={e => setForm({...form, position: e.target.value})} />
//                   <input className="border p-3 rounded-xl" placeholder="Duration (e.g. 3 Months)" onChange={e => setForm({...form, duration: e.target.value})} />
//                   <input className="border p-3 rounded-xl" placeholder="Team Size" onChange={e => setForm({...form, team_size: e.target.value})} />
//                   <input className="border p-3 rounded-xl col-span-2" placeholder="Services Provided" onChange={e => setForm({...form, services: e.target.value})} />
//                    <textarea className="border p-3 rounded-xl col-span-3" placeholder="Project Description" onChange={e => setForm({...form, description: e.target.value})} />

//                 </div>

//                 {/* 2. Challenges & Solutions */}
//                 <div className="space-y-4">
//                   <div className="flex justify-between items-center border-b pb-2 text-red-500 font-bold">
//                     <div className="flex items-center gap-2"><AlertCircle size={18}/> Challenges & Solutions</div>
//                     <button onClick={() => addRow('challenges', {challenge: "", solution: ""})} className="text-xs bg-red-50 px-2 py-1 rounded">+ Add Row</button>
//                   </div>
//                   {form.challenges.map((item, idx) => (
//                     <div key={idx} className="flex gap-4 items-start">
//                       <textarea className="flex-1 border p-2 rounded-lg text-sm" placeholder="Challenge" onChange={e => {
//                         const list = [...form.challenges]; list[idx].challenge = e.target.value; setForm({...form, challenges: list});
//                       }} />
//                       <textarea className="flex-1 border p-2 rounded-lg text-sm" placeholder="Solution" onChange={e => {
//                         const list = [...form.challenges]; list[idx].solution = e.target.value; setForm({...form, challenges: list});
//                       }} />
//                       <Trash2 size={18} className="text-red-400 mt-3 cursor-pointer" onClick={() => removeRow('challenges', idx)} />
//                     </div>
//                   ))}
//                 </div>

//                 {/* 3. Results (Bullet Points) */}
//                 <div className="space-y-4">
//                    <div className="flex justify-between items-center border-b pb-2 text-green-600 font-bold">
//                     <div className="flex items-center gap-2"><CheckCircle size={18}/> Results / Impact</div>
//                     <button onClick={() => addRow('bullet_points', "")} className="text-xs bg-green-50 px-2 py-1 rounded">+ Add Point</button>
//                   </div>

//                   <input className="border p-3 text-bold rounded-xl col-span-2" placeholder="Results Title" onChange={e => setForm({...form, result: e.target.value})} />
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                     {form.bullet_points.map((point, idx) => (
//                       <div key={idx} className="flex gap-2">
//                         <input className="flex-1 border p-2 rounded-lg text-sm" placeholder="Result Point" onChange={e => {
//                           const list = [...form.bullet_points]; list[idx] = e.target.value; setForm({...form, bullet_points: list});
//                         }} />
//                         <X size={16} className="text-gray-400 mt-3 cursor-pointer" onClick={() => removeRow('bullet_points', idx)} />
//                       </div>
//                     ))}
//                   </div>
//                 </div>


//                 {/* testimonials */}
//                 <div className="space-y-2"></div>
//                   <label className="font-bold text-sm block">Client Testimonial</label>
//                   <textarea className="border p-3 rounded-xl w-full" placeholder="Client Testimonial" onChange={e => setForm({...form, testimonial: e.target.value})} />

//                     {/* tech-stacks */}
//                 <div className="space-y-2">
//                   <label className="font-bold text-sm block">Tech Stacks (Comma Separated)</label>
//                   <input className="border p-3 rounded-xl w-full" placeholder="e.g. React, Node.js, MongoDB" onChange={e => setForm({...form, tech_stacks: e.target.value})} />
//                 </div>


//                 {/* 4. Multiple Images */}
//                 <div className="space-y-2">
//                   <label className="font-bold text-sm block">Project Gallery Images</label>
//                   <input type="file" multiple className="border w-full p-2 rounded-xl" onChange={e => setForm({...form, images: Array.from(e.target.files)})} />
//                   <p className="text-[10px] text-gray-400">Select multiple images at once.</p>
//                 </div>
//               </div>

//               <div className="p-6 border-t bg-gray-50 flex justify-end gap-3">
//                 <button onClick={() => setOpen(false)} className="px-6 py-2 text-gray-500 font-bold">Cancel</button>
//                 <button onClick={submit} className="bg-blue-600 text-white px-6 py-2 rounded-xl flex items-center gap-2 font-bold shadow-lg hover:bg-blue-700 transition-all">Submit</button>
//               </div>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }


"use client";

import { useState } from "react";
import { X, Plus, Trash2, Image as ImageIcon, CheckCircle, AlertCircle, RefreshCcw, Upload, Type, Briefcase, Code2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast"; 
import { useRouter } from "next/navigation";

export default function AddCaseStudy() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "", client_name: "", position: "", description: "", services: "",
    duration: "", team_size: "", banner: null, // Fixed: banner null rakhein array nahi
    challenges: [{ challenge: "", solution: "" }],
    bullet_points: [""],
    images: [],
    testimonial: "",
    tech_stacks: "",
    result: ""
  });

  const addRow = (field, obj) => setForm({...form, [field]: [...form[field], obj]});
  const removeRow = (field, index) => {
    const list = [...form[field]];
    list.splice(index, 1);
    setForm({...form, [field]: list});
  };

  const submit = async () => {
    if (loading) return;
    setLoading(true);
    
    try {
      const formData = new FormData();
      
      // 1. Basic Text Fields: Explicitly append karein taaki miss na ho
      formData.append("title", form.title);
      formData.append("client_name", form.client_name);
      formData.append("position", form.position);
      formData.append("description", form.description);
      formData.append("services", form.services);
      formData.append("duration", form.duration);
      formData.append("team_size", form.team_size);
      formData.append("testimonial", form.testimonial);
      formData.append("tech_stacks", form.tech_stacks);
      formData.append("result", form.result);

      // 2. Banner File
      if (form.banner) formData.append("banner", form.banner);

      // 3. Multiple Gallery Images: Key "images[]" honi chahiye array ke liye
      form.images.forEach(img => formData.append("images", img));

      // 4. Challenges & Solutions
      form.challenges.forEach(item => {
        formData.append("challenge_texts[]", item.challenge);
        formData.append("solution_texts[]", item.solution);
      });

      // 5. Bullet Points
      form.bullet_points.forEach(point => formData.append("bullet_points[]", point));

      const res = await fetch("/api/case-studies", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Validation Error");

      toast.success("Case Study added successfully!");
      setOpen(false);
      router.refresh();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button onClick={() => setOpen(true)} className="bg-blue-600 text-white px-6 py-2.5 rounded-xl flex items-center gap-2 font-bold shadow-lg hover:bg-blue-700 transition-all active:scale-95">
        <Plus size={20} /> Add Case Study
      </button>

      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white w-full max-w-5xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-slate-200">
              
              {/* Header */}
              <div className="p-6 border-b flex justify-between bg-slate-50 sticky top-0 z-10">
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                   <Briefcase className="text-blue-600" size={22} /> Create New Case Study
                </h2>
                <X className="cursor-pointer text-slate-400 hover:text-slate-600" onClick={() => setOpen(false)} />
              </div>

              <div className="p-8 overflow-y-auto space-y-8 custom-scrollbar">
                
                {/* 1. Basic Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-semibold flex items-center gap-1"><Type size={14}/> Project Title</label>
                    <input className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none shadow-sm" placeholder="Project Title" onChange={e => setForm({...form, title: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold flex items-center gap-1"><Upload size={14}/> Banner Image</label>
                    <input type="file" className="w-full border p-2 rounded-xl text-xs" onChange={e => setForm({...form, banner: e.target.files[0]})} />
                  </div>
                  <input className="border p-3 rounded-xl shadow-sm" placeholder="Client Name" onChange={e => setForm({...form, client_name: e.target.value})} />
                  <input className="border p-3 rounded-xl shadow-sm" placeholder="Position (e.g. CEO)" onChange={e => setForm({...form, position: e.target.value})} />
                  <input className="border p-3 rounded-xl shadow-sm" placeholder="Duration (e.g. 3 Months)" onChange={e => setForm({...form, duration: e.target.value})} />
                  <input className="border p-3 rounded-xl shadow-sm" placeholder="Team Size" onChange={e => setForm({...form, team_size: e.target.value})} />
                  <div className="md:col-span-2">
                    <input className="w-full border p-3 rounded-xl shadow-sm" placeholder="Services Provided (Comma Separated)" onChange={e => setForm({...form, services: e.target.value})} />
                  </div>
                  <textarea className="border p-3 rounded-xl col-span-3 min-h-[100px] shadow-sm" placeholder="Project Description" onChange={e => setForm({...form, description: e.target.value})} />
                </div>

                {/* 2. Challenges & Solutions */}
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-200 pb-2 text-red-500 font-bold">
                    <div className="flex items-center gap-2"><AlertCircle size={18}/> Challenges & Solutions</div>
                    <button onClick={() => addRow('challenges', {challenge: "", solution: ""})} className="text-xs bg-red-100 hover:bg-red-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer">+ Add Row</button>
                  </div>
                  {form.challenges.map((item, idx) => (
                    <div key={idx} className="flex gap-4 items-start animate-in fade-in zoom-in duration-200">
                      <textarea className="flex-1 border p-3 rounded-xl text-sm shadow-sm" placeholder="Challenge" onChange={e => {
                        const list = [...form.challenges]; list[idx].challenge = e.target.value; setForm({...form, challenges: list});
                      }} />
                      <textarea className="flex-1 border p-3 rounded-xl text-sm shadow-sm" placeholder="Solution" onChange={e => {
                        const list = [...form.challenges]; list[idx].solution = e.target.value; setForm({...form, challenges: list});
                      }} />
                      <Trash2 size={20} className="text-red-400 mt-4 cursor-pointer hover:text-red-600 transition-colors" onClick={() => removeRow('challenges', idx)} />
                    </div>
                  ))}
                </div>

                {/* 3. Results */}
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-200 pb-2 text-green-600 font-bold">
                    <div className="flex items-center gap-2"><CheckCircle size={18}/> Results / Impact</div>
                    <button onClick={() => addRow('bullet_points', "")} className="text-xs bg-green-100 hover:bg-green-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer">+ Add Point</button>
                  </div>
                  <input className="w-full border p-3 rounded-xl shadow-sm font-bold" placeholder="Results Section Title (e.g. Key Achievements)" onChange={e => setForm({...form, result: e.target.value})} />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {form.bullet_points.map((point, idx) => (
                      <div key={idx} className="flex gap-2 animate-in slide-in-from-left duration-200">
                        <input className="flex-1 border p-3 rounded-xl text-sm shadow-sm" placeholder="Result Point" onChange={e => {
                          const list = [...form.bullet_points]; list[idx] = e.target.value; setForm({...form, bullet_points: list});
                        }} />
                        <X size={18} className="text-slate-400 mt-4 cursor-pointer hover:text-red-500" onClick={() => removeRow('bullet_points', idx)} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Fixed: Testimonials & Tech Stack (Yahan aapka div galat closed tha) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-bold text-sm text-slate-700 block">Client Testimonial</label>
                    <textarea className="border p-3 rounded-xl w-full min-h-[100px] shadow-sm" placeholder="Client feedback..." onChange={e => setForm({...form, testimonial: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="font-bold text-sm text-slate-700 flex items-center gap-1 block">
                      <Code2 size={16}/> Tech Stacks
                    </label>
                    <input className="border p-3 rounded-xl w-full shadow-sm" placeholder="React, Node.js, MongoDB" onChange={e => setForm({...form, tech_stacks: e.target.value})} />
                  </div>
                </div>

                {/* 4. Multiple Images */}
                <div className="space-y-3 bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
                  <label className="font-bold text-sm text-slate-700 flex items-center gap-2">
                    <ImageIcon size={18} className="text-blue-600"/> Project Gallery Images
                  </label>
                  <input type="file" multiple className="w-full border border-slate-200 bg-white p-3 rounded-xl text-sm" onChange={e => setForm({...form, images: Array.from(e.target.files)})} />
                  <p className="text-[11px] text-slate-500 font-medium">Tip: Use Ctrl or Shift to select multiple images.</p>
                </div>
              </div>

              {/* Sticky Footer */}
              <div className="p-6 border-t bg-slate-50 flex justify-end gap-3 sticky bottom-0">
                <button onClick={() => setOpen(false)} className="px-8 py-2.5 text-slate-600 font-bold hover:bg-slate-100 rounded-xl transition-colors cursor-pointer">Cancel</button>
                <button onClick={submit} disabled={loading} className="bg-blue-600 text-white px-10 py-2.5 rounded-xl flex items-center gap-2 font-bold shadow-lg hover:bg-blue-700 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed">
                  {loading ? <><RefreshCcw className="animate-spin" size={18} /> Processing...</> : "Publish Case Study"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
      `}</style>
    </>
  );
}