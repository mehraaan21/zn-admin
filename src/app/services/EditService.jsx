
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/lib/toast";
import {
  X,
  Plus,
  Trash2,
  Save,
  Loader2,
  Info,
  HelpCircle,
  GitMerge,
  FileText,
  ImageIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";


export default function EditService({ service, onClose }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  

  // 1. Initial State Setup (Mapping existing API data into the form)
  const [form, setForm] = useState({
    title: service?.title || "",
    sub_title: service?.sub_title || "",
    slug: service?.slug || "",
    description: service?.description || "",
    icon: null, // New file upload
    process_title: service?.process_title || "",
    process_sub_title: service?.process_sub_title || "",
    process_description: service?.process_description || "",
    process_images: null, // New file upload
    // Mapping existing nested arrays
    steps: service?.process?.map((s) => ({ key: s.key, value: s.value })) || [
      { key: "", value: "" }, 
    ],
    faqs: service?.faqs?.map((f) => ({
      title: f.title,
      description: f.description,
    })) || [{ title: "", description: "" }],
    about_service: service?.about_service?.map((a) => ({
      title: a.title,
      description: a.description,
      media: null, // Placeholder for new file uploads
    })) || [{ title: "", description: "", media: null }],
  });

  // Dynamic Add/Remove Handlers
  const addField = (field) => {
    const newItems =
      field === "steps"
        ? { key: "", value: "" }
        : field === "faqs"
          ? { title: "", description: "" }
          : { title: "", description: "", media: null };
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
//   const update = async () => {
//     if (loading) return;
//     setLoading(true);

//     try {
//       const formData = new FormData();
//       // Laravel/PHP backends require _method PUT for multipart form updates
//       formData.append("_method", "PUT");

//       // BASIC INFO
//       formData.append("title", form.title);
//       formData.append("sub_title", form.sub_title);
//       formData.append("slug", form.slug);
//       formData.append("description", form.description);
//       if (form.icon) formData.append("icon", form.icon);

//       // PROCESS SECTION);
//       formData.append("process_title", form.process_title);
//       formData.append("process_sub_title", form.process_sub_title);
//       formData.append("process_description", form.process_description);
//       if (form.process_images) formData.append("process_media", form.process_images);

//       // DYNAMIC STEPS (Flat Array Format)
//       form.steps.forEach((step) => {
//         formData.append("process_steps_keys[]", step.key);
//         formData.append("process_steps_values[]", step.value);
//       });

//       // FAQS (Flat Array Format)
//       form.faqs.forEach((faq) => {
//         formData.append("faq_titles[]", faq.title);
//         formData.append("faq_descriptions[]", faq.description);
//       });

//       // ABOUT SERVICE (Indexed for multi-part handling)
//       form.about_service.forEach((item, index) => {
//         formData.append(`about_service[${index}][title]`, item.title);
//         formData.append(`about_service[${index}][description]`, item.description);
//         if (item.media) {
//           formData.append(`about_service[${index}][media]`, item.media);
//         }
//       });

//       // const res = await fetch(`/api/services/${service.id}`, {
//       //   method: "PUT",
//       //     cache: "no-store", // Using POST with _method PUT to avoid boundary issues
//       //   body: formData,
//       // });

// const res = await fetch(`/api/services/${service.id}`, {
//   method: "PUT", // ✅ VERY IMPORTANT
//   body: formData,
// });

//       const result = await res.json();
//       console.log("Update Result:", result);
//       if (!res.ok) throw new Error(result.message || "Update Failed");

//       toast("Service Updated Successfully!", "success");
//     router.refresh();
// onClose();


//     } catch (err) {
//       toast(err.message, "error");
//     } finally {
//       setLoading(false);
//     }
//   };

// const update = async () => {
//   if (loading) return;
//   setLoading(true);

//   try {
//     const formData = new FormData();
    
//     // 1. Method Tunneling: Force the backend to treat this POST as a PUT
//     formData.append("_method", "PUT");

//     // 2. Append standard fields
//     formData.append("title", form.title);
//     formData.append("sub_title", form.sub_title);
//     formData.append("slug", form.slug);
//     formData.append("description", form.description);
//     if (form.icon) formData.append("icon", form.icon);

//     formData.append("process_title", form.process_title);
//     formData.append("process_sub_title", form.process_sub_title);
//     formData.append("process_description", form.process_description);
//     if (form.process_images) formData.append("process_media", form.process_images);

//     // 3. Flat Arrays (Laravel style)
//     form.steps.forEach((step) => {
//       formData.append("process_steps_keys[]", step.key || "");
//       formData.append("process_steps_values[]", step.value || "");
//     });

//     form.faqs.forEach((faq) => {
//       formData.append("faq_titles[]", faq.title || "");
//       formData.append("faq_descriptions[]", faq.description || "");
//     });

//     // 4. Nested Objects with Media
//     form.about_service.forEach((item, index) => {
//       formData.append(`about_service[${index}][title]`, item.title || "");
//       formData.append(`about_service[${index}][description]`, item.description || "");
//       if (item.media) {
//         formData.append(`about_service[${index}][media]`, item.media);
//       }
//     });

//     // 5. SEND AS POST (Crucial for multipart data with _method PUT)
//     const res = await fetch(`/api/services/${service.id}`, {
//       method: "PUT", 
//       body: formData,
//     });

//     const result = await res.json();
//     if (!res.ok) throw new Error(result.message || "Update Failed");

//     toast("Service Updated Successfully!", "success");
//     router.refresh();
//     onClose();

//   } catch (err) {
//     toast(err.message, "error");
//   } finally {
//     setLoading(false);
//   }
// };

const update = async () => {
  if (loading) return;
  setLoading(true);

  try {
    const formData = new FormData();
    
    /**
     * DEBUG STEP 1: METHOD TUNNELING
     * Goravel/Laravel backends often see empty $_POST when receiving native PUT with files.
     * We send a POST request but tell the framework to treat it as a PUT.
     */
    formData.append("_method", "PUT");

    /**
     * DEBUG STEP 2: SECURE APPENDING
     * We use (val || "") to prevent 'undefined' or 'null' from being sent as strings.
     */
    formData.append("title", form.title || "");
    formData.append("sub_title", form.sub_title || "");
    formData.append("slug", form.slug || "");
    formData.append("description", form.description || "");
    
    // Only append files if the user actually selected a new one
    if (form.icon instanceof File) {
      formData.append("icon", form.icon);
    }

    formData.append("process_title", form.process_title || "");
    formData.append("process_sub_title", form.process_sub_title || "");
    formData.append("process_description", form.process_description || "");
    
    if (form.process_images instanceof File) {
      formData.append("process_media", form.process_images);
    }

    /**
     * DEBUG STEP 3: ARRAY MAPPING
     * Backends expect 'key[]' syntax for arrays. 
     * We ensure every index has a value to keep array lengths consistent.
     */
    form.steps.forEach((step) => {
      formData.append("process_steps_keys[]", step.key || "");
      formData.append("process_steps_values[]", step.value || "");
    });

    form.faqs.forEach((faq) => {
      formData.append("faq_titles[]", faq.title || "");
      formData.append("faq_descriptions[]", faq.description || "");
    });

    /**
     * DEBUG STEP 4: NESTED OBJECTS & DYNAMIC MEDIA
     * We use the index [i] to help the backend map titles to their specific descriptions/images.
     */
    form.about_service.forEach((item, index) => {
      formData.append(`about_service[${index}][title]`, item.title || "");
      formData.append(`about_service[${index}][description]`, item.description || "");
      if (item.media instanceof File) {
        formData.append(`about_service[${index}][media]`, item.media);
      }
    });

    /**
     * DEBUG STEP 5: THE FETCH CALL
     * We change the method to POST because we are using _method tunneling.
     */
    const res = await fetch(`/api/services/${service.id}`, {
      method: "PUT", // Changed from PUT to POST
      body: formData,
      // IMPORTANT: Do NOT set Content-Type header manually
    });

    const result = await res.json();
    
    if (!res.ok) {
      console.error("Server Validation Error:", result);
      throw new Error(result.message || "Update Failed");
    }

    toast("Service Updated Successfully!", "success");
    router.refresh();
    onClose();

  } catch (err) {
    console.error("Update Debug Info:", err);
    toast(err.message, "error");
  } finally {
    setLoading(false);
  }
};

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="flex flex-col w-full bg-white shadow-2xl max-w-5xl max-h-[90vh] rounded-3xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 bg-blue-50 border-b">
            <div>
              <h2 className="text-2xl font-black text-gray-800 tracking-tight">Edit Service</h2>
              <p className="text-sm font-medium text-blue-600">ID: #{service.id} • {service.title}</p>
            </div>
            <button onClick={onClose} className="p-2 text-red-500 transition-all rounded-full hover:bg-red-100">
              <X size={24} />
            </button>
          </div>

          {/* Form Body (Scrollable) */}
          <div className="p-8 space-y-10 overflow-y-auto custom-scrollbar">
            
            {/* 1. Basic Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 text-lg font-bold text-blue-600 border-b">
                <Info size={20} /> Basic Information
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 ml-1">TITLE</label>
                  <input className="w-full p-3 border outline-none rounded-xl focus:ring-2 ring-blue-500" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 ml-1">SUB TITLE</label>
                  <input className="w-full p-3 border outline-none rounded-xl focus:ring-2 ring-blue-500" value={form.sub_title} onChange={(e) => setForm({ ...form, sub_title: e.target.value })} />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 ml-1">SLUG (URL)</label>
                  <input className="w-full p-3 font-mono border outline-none rounded-xl focus:ring-2 ring-blue-500" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 ml-1">UPDATE ICON (OPTIONAL)</label>
                  <input type="file" className="w-full p-2 border rounded-xl" onChange={(e) => setForm({ ...form, icon: e.target.files[0] })} />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 ml-1">FULL DESCRIPTION</label>
                <textarea className="w-full p-3 border outline-none rounded-xl focus:ring-2 ring-blue-500" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </div>
            </div>

            {/* 2. Process Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b">
                <div className="flex items-center gap-2 text-lg font-bold text-orange-600"><GitMerge size={20} /> Process Section</div>
                <button onClick={() => addField("steps")} className="px-3 py-1 text-xs font-bold text-orange-600 bg-orange-100 rounded-lg hover:bg-orange-200">+ Add Step</button>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <input className="p-3 border rounded-xl" placeholder="Process Title" value={form.process_title} onChange={(e) => setForm({ ...form, process_title: e.target.value })} />
                <input className="p-3 border rounded-xl" placeholder="Process Sub-title" value={form.process_sub_title} onChange={(e) => setForm({ ...form, process_sub_title: e.target.value })} />
                <textarea className="w-full p-3 border outline-none rounded-xl focus:ring-2 ring-blue-500" rows={3} placeholder="Process Description" value={form.process_description} onChange={(e) => setForm({ ...form, process_description: e.target.value })} />
                <div className="space-y-1">
                   <label className="text-xs font-bold text-orange-400 ml-1 uppercase">Update Process Image</label>
                   <input type="file" className="w-full p-2 border rounded-xl" onChange={(e) => setForm({ ...form, process_images: e.target.files[0] })} />
                </div>
              </div>

              <div className="space-y-3">
                {form.steps.map((step, index) => (
                  <div key={index} className="flex gap-3 p-3 bg-orange-50/50 rounded-2xl border border-orange-100 animate-in fade-in zoom-in duration-300">
                    <input className="flex-1 p-2 border rounded-lg bg-white" placeholder="Step Key" value={step.key} onChange={(e) => handleDynamicChange("steps", index, "key", e.target.value)} />
                    <input className="flex-[2] p-2 border rounded-lg bg-white" placeholder="Step Value" value={step.value} onChange={(e) => handleDynamicChange("steps", index, "value", e.target.value)} />
                    <button onClick={() => removeField("steps", index)} className="text-red-400 hover:text-red-600"><Trash2 size={20} /></button>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. About Service Sections */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b">
                <div className="flex items-center gap-2 text-lg font-bold text-purple-600"><FileText size={20} /> Feature Sections</div>
                <button onClick={() => addField("about_service")} className="px-3 py-1 text-xs font-bold text-purple-600 bg-purple-100 rounded-lg hover:bg-purple-200">+ Add Content</button>
              </div>
              {form.about_service.map((about, index) => (
                <div key={index} className="relative grid grid-cols-1 gap-4 p-6 border bg-purple-50/30 md:grid-cols-2 rounded-3xl border-purple-100">
                  <button onClick={() => removeField("about_service", index)} className="absolute p-1 text-red-500 bg-white border border-red-100 rounded-full shadow-md -top-2 -right-2 hover:bg-red-50"><X size={16} /></button>
                  <div className="space-y-3">
                    <input className="w-full p-3 border outline-none rounded-xl focus:ring-2 ring-purple-500" placeholder="Section Title" value={about.title} onChange={(e) => handleDynamicChange("about_service", index, "title", e.target.value)} />
                    <textarea className="w-full p-3 border outline-none rounded-xl focus:ring-2 ring-purple-500" rows={4} placeholder="Description" value={about.description} onChange={(e) => handleDynamicChange("about_service", index, "description", e.target.value)} />
                  </div>
                  <div className="flex flex-col items-center justify-center p-4 bg-white border-2 border-dashed rounded-xl border-purple-200">
                    <input type="file" id={`edit-about-media-${index}`} className="hidden" onChange={(e) => {
                      const list = [...form.about_service];
                      list[index].media = e.target.files[0];
                      setForm({ ...form, about_service: list });
                    }} />
                    <label htmlFor={`edit-about-media-${index}`} className="flex flex-col items-center gap-2 cursor-pointer">
                      {about.media ? (
                        <span className="text-xs font-bold text-green-600 truncate max-w-[150px]">{about.media.name}</span>
                      ) : (
                        <><ImageIcon size={24} className="text-purple-400" /><span className="text-xs font-medium text-purple-600">Change Media</span></>
                      )}
                    </label>
                  </div>
                </div>
              ))}
            </div>

            {/* 4. FAQs Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b">
                <div className="flex items-center gap-2 text-lg font-bold text-green-600"><HelpCircle size={20} /> FAQs</div>
                <button onClick={() => addField("faqs")} className="px-3 py-1 text-xs font-bold text-green-600 bg-green-100 rounded-lg hover:bg-green-200">+ Add FAQ</button>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {form.faqs.map((faq, index) => (
                  <div key={index} className="relative p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <button onClick={() => removeField("faqs", index)} className="absolute text-gray-400 top-2 right-2 hover:text-red-500"><X size={16} /></button>
                    <input className="w-full p-2 mb-2 font-semibold border rounded-lg" placeholder="Question" value={faq.title} onChange={(e) => handleDynamicChange("faqs", index, "title", e.target.value)} />
                    <textarea className="w-full p-2 text-sm border rounded-lg" placeholder="Answer" value={faq.description} onChange={(e) => handleDynamicChange("faqs", index, "description", e.target.value)} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-4 p-6 bg-gray-50 border-t">
            <button onClick={onClose} className="px-6 py-2 font-bold text-gray-500 transition-all rounded-xl hover:bg-gray-200">Cancel</button>
            <button onClick={update} disabled={loading} className="flex items-center gap-2 px-10 py-2 font-bold text-white bg-blue-600 shadow-lg rounded-xl hover:bg-blue-700 disabled:bg-blue-300">
              {loading ? <Loader2 className="animate-spin" /> : <Save size={20} />}
              {loading ? "Updating..." : "Save Changes"}
            </button>
          </div>
        </motion.div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
      `}</style>
    </AnimatePresence>
  );
}