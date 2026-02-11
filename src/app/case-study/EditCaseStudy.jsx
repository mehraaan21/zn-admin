


"use client";

import React, { useState } from "react";
import { 
  X, Save, Loader2, Trash2, Info, Plus, 
  AlertCircle, CheckCircle, Image as ImageIcon, 
  Briefcase, Quote, Trophy 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Note: standard 'next/navigation' and 'next/image' are replaced with 
 * local equivalents to ensure compatibility with the preview environment.
 */

export default function EditCaseStudy({ data, onClose }) {
  // Mocking router for the preview environment
  const router = { refresh: () => {} };
  const [loading, setLoading] = useState(false);

  // Initial State Mapping: Replicating exactly what is seen in "View"
  const [form, setForm] = useState({
    title: data?.title || "",
    client_name: data?.client_name || "",
    position: data?.position || "",
    description: data?.description || "",
    services: data?.services || "",
    duration: data?.duration || "",
    team_size: data?.team_size || "",
    banner: null, 
      project_images: [] // ✅ ADD THIS
    
    // Tech Stacks: Mapping existing array to comma-separated string for easy editing
    // tech_stacks: data?.TechStacks?.map((t) => t.TechStack?.Name).join(", ") || "",

    // Challenges array mapping
    // challenges: data?.Challenges?.map(ch => ({ 
    //   challenge: ch.challenge, 
    //   solution: ch.solution 
    // })) || [{ challenge: "", solution: "" }],

    // Results mapping
    // result_title: data?.Results?.Title || "Impact",
    // bullet_points: data?.Results?.bullet_points || [""],
    
    // Testimonial mapping
  //   testimonial_feedback: data?.Testimonials?.feedback || "",
  //   project_images: [] // For new uploads
  });

  // Dynamic Handlers
  // const addRow = (field, obj) => setForm({ ...form, [field]: [...form[field], obj] });
  // const removeRow = (field, index) => {
  //   const list = [...form[field]];
  //   list.splice(index, 1);
  //   setForm({ ...form, [field]: list });
  // };

  // Simple toast fallback for preview
  // const showToast = (msg) => {
  //   console.log("Toast:", msg);
  // };

  // --- Update Submit Logic ---
  const PUT = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("_method", "PUT");

      // Basic Fields
      formData.append("title", form.title);
      formData.append("client_name", form.client_name);
      formData.append("position", form.position);
      formData.append("description", form.description);
      formData.append("services", form.services);
      formData.append("duration", form.duration);
      formData.append("team_size", form.team_size);
      // formData.append("result_title", form.result_title);
      // formData.append("testimonial", form.testimonial_feedback);

      if (form.banner) formData.append("banner", form.banner);

      // Mapping Challenges
      // form.challenges.forEach((item) => {
      //   if(item.challenge) formData.append("challenge_texts[]", item.challenge);
      //   if(item.solution) formData.append("solution_texts[]", item.solution);
      // });

      // Mapping Results Bullet Points
      // form.bullet_points.forEach((point) => {
      //   if(point) formData.append("bullet_points[]", point);
      // });

      // Mapping New Project Images
      form.project_images.forEach((img) => {
        formData.append("images[]", img);
      });

      // Tech Stacks String to Array
      // if (form.tech_stacks) {
      //   form.tech_stacks
      //     .split(",")
      //     .map(t => t.trim())
      //     .filter(Boolean)
      //     .forEach(stack => formData.append("tech_stacks[]", stack));
      // }

      const res = await fetch(`/api/case-studies/${data.id}`, {
        method: "PUT", 
        body: formData,
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Update Failed");

      showToast("Case Study Updated Successfully!");
      onClose();
      router.refresh();
    } catch (err) {
      showToast(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }} 
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="bg-white w-full max-w-6xl max-h-[95vh] rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl"
        >
          {/* Header */}
          <div className="p-6 border-b flex justify-between items-center bg-purple-50/50">
            <div className="flex items-center gap-4">
               <div className="p-3 bg-purple-600 rounded-2xl text-white">
                  <Briefcase size={24} />
               </div>
               <div>
                  <h2 className="text-2xl font-black text-gray-800">Edit Case Study</h2>
                  <p className="text-sm text-purple-600 font-bold">Currently Editing: {data.title}</p>
               </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-red-100 text-red-500 rounded-full transition-all">
              <X size={28} />
            </button>
          </div>

          {/* Scrollable Body */}
          <div className="p-8 overflow-y-auto space-y-12 bg-white">
            
            {/* 1. Basic Project Meta */}
            <section className="space-y-6">
              <div className="text-sm font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                <Info size={18}/> 01. Basic Information
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2 lg:col-span-2">
                  <label className="text-xs font-bold text-gray-500 ml-1">PROJECT TITLE</label>
                  <input className="w-full border-2 border-gray-100 p-4 rounded-2xl outline-none focus:border-purple-500 transition-all font-semibold" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 ml-1 text-red-500">UPDATE BANNER</label>
                  <div className="relative group border-2 border-dashed border-gray-200 rounded-2xl p-2 hover:border-purple-400 transition-all bg-gray-50">
                    <input type="file" className="text-xs w-full cursor-pointer" onChange={e => setForm({...form, banner: e.target.files[0]})} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 ml-1">CLIENT NAME</label>
                  <input className="w-full border-2 border-gray-100 p-4 rounded-2xl outline-none focus:border-purple-500 font-semibold" value={form.client_name} onChange={e => setForm({...form, client_name: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 ml-1">POSITION</label>
                  <input className="w-full border-2 border-gray-100 p-4 rounded-2xl outline-none focus:border-purple-500 font-semibold" value={form.position} onChange={e => setForm({...form, position: e.target.value})} />
                </div>
                {/* <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 ml-1 text-blue-500">TECH STACKS (COMMA SEPARATED)</label>
                  <input className="w-full border-2 border-blue-100 p-4 rounded-2xl outline-none focus:border-blue-500 font-semibold" value={form.tech_stacks} placeholder="React, Nextjs, Tailwind..." onChange={e => setForm({...form, tech_stacks: e.target.value})} />
                </div> */}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 ml-1">SERVICES</label>
                  <input className="w-full border-2 border-gray-100 p-4 rounded-2xl outline-none focus:border-purple-500" value={form.services} onChange={e => setForm({...form, services: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 ml-1">DURATION</label>
                  <input className="w-full border-2 border-gray-100 p-4 rounded-2xl outline-none focus:border-purple-500" value={form.duration} onChange={e => setForm({...form, duration: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 ml-1">TEAM SIZE</label>
                  <input className="w-full border-2 border-gray-100 p-4 rounded-2xl outline-none focus:border-purple-500" value={form.team_size} onChange={e => setForm({...form, team_size: e.target.value})} />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 ml-1 text-purple-500">FULL DESCRIPTION</label>
                <textarea className="w-full border-2 border-purple-50 p-4 rounded-2xl outline-none focus:border-purple-500 font-medium" rows={4} value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
              </div>
            </section>

            {/* 2. Challenges & Solutions */}
            {/* <section className="space-y-6">
              <div className="flex justify-between items-center border-b-2 border-gray-50 pb-4">
                <div className="text-sm font-black text-red-500 uppercase tracking-[0.2em] flex items-center gap-2">
                  <AlertCircle size={18}/> 02. Challenges & Solutions
                </div>
                <button onClick={() => addRow('challenges', {challenge: "", solution: ""})} className="text-xs bg-red-500 text-white px-4 py-2 rounded-xl font-black hover:bg-red-600 transition-colors flex items-center gap-2 uppercase">
                  <Plus size={14}/> Add New Row
                </button>
              </div>
              
              <div className="space-y-4">
                {form.challenges.map((item, idx) => (
                  <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-red-50/30 p-6 rounded-[2rem] relative border border-red-100/50">
                    <button onClick={() => removeRow('challenges', idx)} className="absolute -top-3 -right-3 bg-white shadow-xl rounded-full p-2 text-red-500 hover:scale-110 transition-transform border border-red-100">
                      <Trash2 size={18}/>
                    </button>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-red-400 uppercase ml-1">Challenge</label>
                       <textarea className="w-full border-0 p-4 rounded-2xl text-sm font-medium focus:ring-2 ring-red-200 outline-none" placeholder="What was the problem?" value={item.challenge} onChange={e => {
                        const list = [...form.challenges]; list[idx].challenge = e.target.value; setForm({...form, challenges: list});
                      }} />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-green-500 uppercase ml-1">Solution</label>
                       <textarea className="w-full border-0 p-4 rounded-2xl text-sm font-medium focus:ring-2 ring-green-200 outline-none" placeholder="How did you solve it?" value={item.solution} onChange={e => {
                        const list = [...form.challenges]; list[idx].solution = e.target.value; setForm({...form, challenges: list});
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </section> */}

            {/* 3. Results/Impact */}
            {/* <section className="space-y-6">
               <div className="flex justify-between items-center border-b-2 border-gray-50 pb-4">
                <div className="text-sm font-black text-green-600 uppercase tracking-[0.2em] flex items-center gap-2">
                  <Trophy size={18}/> 03. Results & Impact
                </div>
                <button onClick={() => addRow('bullet_points', "")} className="text-xs bg-green-600 text-white px-4 py-2 rounded-xl font-black hover:bg-green-700 transition-colors uppercase flex items-center gap-2">
                  <Plus size={14}/> Add Bullet Point
                </button>
              </div>
              
              <div className="bg-gray-900 p-8 rounded-[2.5rem] space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-yellow-500 uppercase ml-1">Results Title</label>
                  <input className="w-full bg-gray-800 border-0 p-4 rounded-2xl text-white font-bold outline-none focus:ring-2 ring-yellow-500" value={form.result_title} onChange={e => setForm({...form, result_title: e.target.value})} />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {form.bullet_points.map((point, idx) => (
                    <div key={idx} className="flex items-center gap-3 group">
                      <div className="flex-1 relative">
                        <input className="w-full bg-gray-800 border-0 p-4 rounded-2xl text-sm text-gray-300 outline-none focus:ring-2 ring-green-500" value={point} placeholder="Describe the achievement..." onChange={e => {
                          const list = [...form.bullet_points]; list[idx] = e.target.value; setForm({...form, bullet_points: list});
                        }} />
                      </div>
                      <button onClick={() => removeRow('bullet_points', idx)} className="text-gray-600 hover:text-red-400 transition-colors"><Trash2 size={20}/></button>
                    </div>
                  ))}
                </div>
              </div>
            </section> */}

            {/* 4. Testimonial & Gallery */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
               {/* Testimonial */}
               {/* <section className="space-y-4">
                  <div className="text-sm font-black text-blue-500 uppercase tracking-widest flex items-center gap-2">
                    <Quote size={18}/> 04. Client Feedback
                  </div>
                  <div className="bg-blue-50/50 p-6 rounded-[2rem] border-2 border-blue-100 border-dashed">
                     <textarea className="w-full bg-white border-0 p-6 rounded-2xl italic font-medium text-gray-700 outline-none focus:ring-2 ring-blue-300" rows={5} placeholder="Client's feedback message..." value={form.testimonial_feedback} onChange={e => setForm({...form, testimonial_feedback: e.target.value})} />
                  </div>
               </section> */}

               {/* Gallery */}
               <section className="space-y-4">
                  <div className="text-sm font-black text-orange-500 uppercase tracking-widest flex items-center gap-2">
                    <ImageIcon size={18}/> 05. Project Screenshots
                  </div>
                  
                  <div className="grid grid-cols-4 gap-3 p-2 bg-gray-50 rounded-2xl border-2 border-gray-100 min-h-[100px]">
                    {/* Using standard img for compatibility */}
                    {data.Images?.map(img => (
                      <div key={img.id} className="relative h-16 w-full rounded-xl overflow-hidden border-2 border-white shadow-sm group">
                        <img 
                          src={img.image_url} 
                          alt="existing" 
                          className="object-cover w-full h-full opacity-60 group-hover:opacity-100 transition-opacity" 
                        />
                      </div>
                    ))}
                  </div>

                  {/* <div className="border-2 border-dashed border-purple-200 p-8 rounded-[2rem] bg-purple-50/20 text-center hover:bg-purple-50 transition-colors cursor-pointer group">
                     <input type="file" multiple className="hidden" id="edit-gallery-update" onChange={e => setForm({...form, project_images: Array.from(e.target.files)})} />
                     <label htmlFor="edit-gallery-update" className="cursor-pointer flex flex-col items-center gap-2">
                        <div className="p-3 bg-purple-100 rounded-full text-purple-600 group-hover:scale-110 transition-transform">
                          <Plus size={24}/>
                        </div>
                        <span className="text-purple-700 font-black text-xs uppercase tracking-tighter">
                          {form.project_images.length > 0 ? `${form.project_images.length} new images selected` : "Upload New Screenshots"}
                        </span>
                     </label>
                  </div> */}
               </section>
            </div>
          </div>

          {/* Footer */}
          <div className="p-8 border-t bg-gray-50 flex justify-end gap-4">
            <button onClick={onClose} className="px-8 py-3 font-black text-gray-400 hover:text-gray-600 uppercase tracking-widest text-xs">Discard Changes</button>
            <button onClick={PUT} disabled={loading} className="bg-purple-600 cursor-pointer hover:bg-purple-700 text-white px-12 py-4 rounded-2xl font-black flex items-center gap-3 disabled:bg-purple-300 shadow-xl shadow-purple-200 transition-all hover:-translate-y-1 active:translate-y-0">
              {loading ? <Loader2 className="animate-spin" /> : <Save size={20} />}
              {loading ? "SAVING..." : "UPDATE CASE STUDY"}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}