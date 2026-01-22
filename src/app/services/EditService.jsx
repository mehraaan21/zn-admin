

// // "use client";

// // import { useState } from "react";
// // import { toast } from "@/lib/toast";
// // import { useRouter } from "next/navigation";

// // export default function EditService({ service, onClose }) {
// //   const router = useRouter();
// //   const [loading, setLoading] = useState(false);

// //   const [form, setForm] = useState({
// //     title: service.title,
// //     description: service.description,
// //     // ❌ icon removed
// //   });

// //   const submit = async () => {
// //     setLoading(true);

// //     try {
// //       const res = await fetch(`/api/services/${service.id}`, {
// //         method: "PUT",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(form), // icon not sent
// //       });

// //       if (!res.ok) throw new Error("Update failed");

// //       toast("Service updated");
// //       router.refresh();
// //       onClose();
// //     } catch (err) {
// //       toast(err.message, "error");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
// //       <div className="bg-white p-6 rounded w-96">
// //         <h2 className="text-lg font-bold mb-4">Edit Service</h2>

// //         <input
// //           className="border p-2 w-full mb-3"
// //           value={form.title}
// //           onChange={(e) => setForm({ ...form, title: e.target.value })}
// //         />

// //         <textarea
// //           className="border p-2 w-full mb-3"
// //           value={form.description}
// //           onChange={(e) => setForm({ ...form, description: e.target.value })}
// //         />

// //         {/* 🔒 Static Icon Display */}
// //         <div className="mb-4 text-sm text-gray-600">
// //           Icon (not editable): <span className="text-xl">{service.icon}</span>
// //         </div>

// //         <div className="flex justify-end gap-2">
// //           <button onClick={onClose}>Cancel</button>
// //           <button
// //             onClick={submit}
// //             disabled={loading}
// //             className="bg-blue-600 text-white px-4 py-2 rounded"
// //           >
// //             {loading ? "Saving..." : "Save"}
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }


// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { toast } from "@/lib/toast";
// import { X, LayoutGrid, Type, AlignLeft, Info, RefreshCcw } from "lucide-react"; // Icons for consistency

// export default function EditService({ service, onClose }) {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);

//   const [form, setForm] = useState({
//     title: service.title,
//     description: service.description,
//   });

//   const submit = async () => {
//     setLoading(true);

//     try {
//       const res = await fetch(`/api/services/${service.id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });

//       if (!res.ok) throw new Error("Update failed");

//       toast("Service updated successfully");
//       router.refresh();
//       onClose();
//     } catch (err) {
//       toast(err.message, "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        
//         {/* Header - Consistent with previous modern UI updates */}
//         <div className="flex justify-between items-center p-6 border-b bg-white">
//           <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
//             <LayoutGrid className="text-blue-600" size={22} />
//             Edit Service
//           </h2>
//           <button 
//             onClick={onClose}
//             className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
//           >
//             <X size={24} />
//           </button>
//         </div>

//         <div className="p-6 space-y-5">
//           {/* Service Title */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
//               <Type size={14} /> Service Title
//             </label>
//             <input
//               className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm"
//               value={form.title}
//               onChange={(e) => setForm({ ...form, title: e.target.value })}
//             />
//           </div>

//           {/* Description */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
//               <AlignLeft size={14} /> Description
//             </label>
//             <textarea
//               className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm min-h-[120px]"
//               rows={4}
//               value={form.description}
//               onChange={(e) => setForm({ ...form, description: e.target.value })}
//             />
//           </div>

//           {/* Info Box for Static Icon */}
//           <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-center justify-between">
//             <div className="flex items-center gap-2 text-sm text-blue-700 font-medium">
//               <Info size={16} />
//               <span>Current Icon</span>
//             </div>
//             <div className="h-10 w-10 flex items-center justify-center bg-white rounded-lg shadow-sm text-2xl border border-blue-100">
//               {service.icon}
//             </div>
//           </div>

//           {/* Footer Actions */}
//           <div className="flex justify-end gap-3 pt-4 border-t">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-6 py-2 border rounded-lg font-medium hover:bg-gray-50 transition-colors text-gray-600 cursor-pointer"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={submit}
//               disabled={loading}
//               className="px-8 py-2 bg-blue-600 text-white rounded-lg font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 disabled:bg-blue-300 transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
//             >
//               {loading ? (
//                 <>
//                   <RefreshCcw size={18} className="animate-spin" />
//                   Saving...
//                 </>
//               ) : (
//                 "Save Changes"
//               )}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/lib/toast";
import { X, Save, Loader2, Trash2, Plus, Info, GitMerge, HelpCircle, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function EditService({ service, onClose }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // 1. Initial State Setup (Existing data ko form mein bhar rahe hain)
  const [form, setForm] = useState({
    title: service?.title || "",
    sub_title: service?.sub_title || "",
    slug: service?.slug || "",
    description: service?.description || "",
    icon: null, // New file upload ke liye
    process_title: service?.process_section?.title || "",
    process_description: service?.process_section?.description || "",
    // Backend se aaye huye steps ko key/value format mein map kar rahe hain
    steps: service?.process_section?.steps?.map(s => ({ key: s.key, value: s.value })) || [{ key: "", value: "" }],
    faqs: service?.faqs?.map(f => ({ title: f.title, description: f.description })) || [{ title: "", description: "" }],
    about_service: service?.about_service?.map(a => ({ title: a.title, description: a.description, media: null })) || [{ title: "", description: "", media: null }]
  });

  // Dynamic Add/Remove Handlers (Same as AddService)
  const addField = (field) => {
    const newItems = field === 'steps' ? { key: "", value: "" } : 
                     field === 'faqs' ? { title: "", description: "" } : 
                     { title: "", description: "", media: null };
    setForm({ ...form, [field]: [...form[field], newItems] });
  };

  const removeField = (field, index) => {
    const list = [...form[field]];
    list.splice(index, 1);
    setForm({ ...form, [field]: list });
  };

  const handleDynamicChange = (field, index, key, val) => {
    const list = [...form[field]];
    list[index][key] = val;
    setForm({ ...form, [field]: list });
  };

  // --- Update Logic ---
  const update = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("_method", "PUT"); // Kai backends (Laravel) PUT request ke liye ye maangte hain multipart mein
      
      formData.append("title", form.title);
      formData.append("sub_title", form.sub_title);
      formData.append("slug", form.slug);
      formData.append("description", form.description);
      if (form.icon) formData.append("icon", form.icon);

      // Process Steps (Flat Array Format as per your backend)
      form.steps.forEach((step) => {
        formData.append("process_titles[]", step.key);
        formData.append("process_descriptions[]", step.value);
      });

      // FAQs (Flat Array Format)
      form.faqs.forEach((faq) => {
        formData.append("faq_titles[]", faq.title);
        formData.append("faq_descriptions[]", faq.description);
      });

      // About Service
      form.about_service.forEach((item, index) => {
        formData.append("about_titles[]", item.title);
        formData.append("about_descriptions[]", item.description);
        if (item.media) {
          formData.append("about_medias[]", item.media);
        }
      });

      const res = await fetch(`/api/services/${service.id}`, {
        method: "POST", // Method override bypass ke liye POST use kar rahe hain
        body: formData,
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Update Failed");

      toast("Service Updated Successfully!");
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
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white w-full max-w-5xl max-h-[90vh] rounded-3xl overflow-hidden flex flex-col shadow-2xl"
        >
          {/* Header */}
          <div className="p-6 border-b flex justify-between items-center bg-blue-50">
            <div>
              <h2 className="text-2xl font-black text-gray-800">Edit Service</h2>
              <p className="text-sm text-blue-600 font-medium">Editing: {service.title}</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-red-100 text-red-500 rounded-full transition-all">
              <X size={24} />
            </button>
          </div>

          {/* Form Body (Scrollable) */}
          <div className="p-8 overflow-y-auto space-y-10">
            {/* Sections (Basic, Process, FAQs, About) - Same UI as AddService but with 'value={form.xxx}' */}
            
            {/* Basic Info */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 text-blue-600 font-bold border-b pb-2"><Info size={20} /> Basic Info</div>
              <div className="grid grid-cols-2 gap-4">
                <input className="border p-3 rounded-xl outline-none focus:ring-2 ring-blue-500" value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} placeholder="Title" />
                <input className="border p-3 rounded-xl outline-none focus:ring-2 ring-blue-500" value={form.slug} onChange={(e) => setForm({...form, slug: e.target.value})} placeholder="Slug" />
              </div>
            </section>

            {/* Process Steps */}
            <section className="space-y-4">
              <div className="flex justify-between border-b pb-2">
                <div className="flex items-center gap-2 text-orange-600 font-bold"><GitMerge size={20} /> Process Section</div>
                <button onClick={() => addField('steps')} className="text-xs bg-orange-100 text-orange-600 px-3 py-1 rounded-lg font-bold">+ Add Step</button>
              </div>
              {form.steps.map((step, index) => (
                <div key={index} className="flex gap-3">
                  <input className="flex-1 border p-2 rounded-lg" value={step.key} onChange={(e) => handleDynamicChange('steps', index, 'key', e.target.value)} placeholder="Key" />
                  <input className="flex-[2] border p-2 rounded-lg" value={step.value} onChange={(e) => handleDynamicChange('steps', index, 'value', e.target.value)} placeholder="Value" />
                  <button onClick={() => removeField('steps', index)} className="text-red-400 hover:text-red-600"><Trash2 size={20} /></button>
                </div>
              ))}
            </section>

            {/* FAQs */}
            <section className="space-y-4">
              <div className="flex justify-between border-b pb-2">
                <div className="flex items-center gap-2 text-green-600 font-bold"><HelpCircle size={20} /> FAQs</div>
                <button onClick={() => addField('faqs')} className="text-xs bg-green-100 text-green-600 px-3 py-1 rounded-lg font-bold">+ Add FAQ</button>
              </div>
              {form.faqs.map((faq, index) => (
                <div key={index} className="space-y-2 bg-gray-50 p-4 rounded-xl relative">
                  <button onClick={() => removeField('faqs', index)} className="absolute top-2 right-2 text-red-400"><X size={16} /></button>
                  <input className="w-full border p-2 rounded-lg font-semibold" value={faq.title} onChange={(e) => handleDynamicChange('faqs', index, 'title', e.target.value)} placeholder="Question" />
                  <textarea className="w-full border p-2 rounded-lg text-sm" value={faq.description} onChange={(e) => handleDynamicChange('faqs', index, 'description', e.target.value)} placeholder="Answer" />
                </div>
              ))}
            </section>
          </div>

          {/* Footer */}
          <div className="p-6 border-t bg-gray-50 flex justify-end gap-4">
            <button onClick={onClose} className="px-6 py-2 font-bold text-gray-500">Cancel</button>
            <button onClick={update} disabled={loading} className="bg-blue-600 text-white px-10 py-2 rounded-xl font-bold shadow-lg flex items-center gap-2">
              {loading ? <Loader2 className="animate-spin" /> : <Save size={20} />}
              {loading ? "Updating..." : "Save Changes"}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}