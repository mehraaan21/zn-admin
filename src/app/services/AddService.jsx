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

export default function AddService() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // 1. Full State Structure
  const [form, setForm] = useState({
    title: "",
    sub_title: "",
    slug: "",
    description: "",
    icon: null,
    process_title: "",
    process_description: "",
    steps: [{ key: "", value: "" }], // Array for Steps
    faqs: [{ title: "", description: "" }], // Array for FAQs
    about_service: [{ title: "", description: "", media: null }], // Array for About
  });

  // --- Dynamic Handlers ---
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

  const submit = async () => {
  if (loading) return;
  setLoading(true);

  try {
    const formData = new FormData();

    // 1. BASIC FIELDS
    formData.append("title", form.title);
    formData.append("sub_title", form.sub_title);
    formData.append("slug", form.slug);
    formData.append("description", form.description);
    if (form.icon) formData.append("icon", form.icon);

    // 2. PROCESS SECTION (Fixed Keys & Media)
    formData.append("process_title", form.process_title); // This is the section title
    formData.append("process_sub_title", form.process_sub_title); // This is the section sub-title
    formData.append("process_description", form.process_description); // This is section desc
    if (form.process_images) formData.append("process_media", form.process_images);

    // 3. PROCESS STEPS (Mandatory Bracket Notation [])
    form.steps.forEach((step) => {
      formData.append("process_steps_keys[]", step.key);
      formData.append("process_steps_values[]", step.value);
    });

    // 4. FAQS (Mandatory Bracket Notation [])
    form.faqs.forEach((faq) => {
      formData.append("faq_titles[]", faq.title);
      formData.append("faq_descriptions[]", faq.description);
    });

    // 5. ABOUT SERVICE (Indexed Notation for Multi-Part)
    form.about_service.forEach((item, index) => {
      formData.append(`about_titles[]`, item.title);
      formData.append(`about_descriptions[]`, item.description);
      if (item.media) {
        formData.append(`about_media[]`, item.media);
      }
    });

    // DEBUG: Ensure no null values are being sent
    console.log("---- DISPATCHING FORM DATA ----");
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1] instanceof File ? pair[1].name : pair[1]}`);
    }

    const res = await fetch("/api/services", {
      method: "POST",
      body: formData,
    });

    const result = await res.json();

    const text = await res.text();
console.log(text);


    if (!res.ok) {
      throw new Error(result.message || "Server rejected the request (500)");
    }

    toast("Service added successfully!", "success");
    setOpen(false);
    router.refresh();
  } catch (err) {
    console.error("Critical Error:", err);
    toast(err.message, "error");
  } finally {
    setLoading(false);
  }
};

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-blue-600 text-white px-8 cursor-pointer py-2.5 rounded-xl flex items-center gap-2 font-bold shadow-lg"
      >
        <Plus size={20} /> Add New Service
      </button>

      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="bg-white w-full max-w-5xl max-h-[90vh] rounded-3xl overflow-hidden flex flex-col shadow-2xl"
            >
              {/* Header */}
              <div className="p-6 border-b flex justify-between items-center bg-gray-50">
                <h2 className="text-2xl font-black text-gray-800">
                  Create New Service
                </h2>
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 hover:bg-gray-100 text-black-400 rounded-full transition-all"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Body (Scrollable Form) */}
              <div className="p-8 overflow-y-auto space-y-10">
                {/* Section 1: Basic Info */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-blue-600 font-bold border-b pb-2 text-lg">
                    <Info size={20} /> Basic Information
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      className="   w-full   border border-gray-300   rounded-xl   p-3   shadow-sm   outline-none   resize-none  transition-all  focus:ring-2  focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 text-gray-700"

                      placeholder="Service Title"
                      onChange={(e) =>
                        setForm({ ...form, title: e.target.value })
                      }
                    />
                    <input
                      className="   w-full   border border-gray-300   rounded-xl   p-3   shadow-sm   outline-none   resize-none  transition-all  focus:ring-2  focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 text-gray-700"

                      placeholder="Sub Title"
                      onChange={(e) =>
                        setForm({ ...form, sub_title: e.target.value })
                      }
                    />
                    <input
                      className="   w-full   border border-gray-300   rounded-xl   p-3   shadow-sm   outline-none   resize-none  transition-all  focus:ring-2  focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 text-gray-700"
                      placeholder="slug-url-here"
                      onChange={(e) =>
                        setForm({ ...form, slug: e.target.value })
                      }
                    />
                    <input
                      type="file"
                              className="   w-full   border border-gray-300   rounded-xl   p-3   shadow-sm   outline-none   resize-none  transition-all  focus:ring-2  focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 text-gray-700"
                      onChange={(e) =>
                        setForm({ ...form, icon: e.target.files[0] })
                      }
                    />
                  </div>
                  <textarea
                      className="   w-full   border border-gray-300   rounded-xl   p-3   shadow-sm   outline-none   resize-none  transition-all  focus:ring-2  focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 text-gray-700"
                    rows={3}
                    placeholder="Full Description..."
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                  />
                </div>

                {/* Section 2: Process Steps */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b pb-2">
                    <div className="flex items-center gap-2 text-orange-600 font-bold text-lg">
                      <GitMerge size={20} /> Process Section
                    </div>
                    <button
                      onClick={() => addField("steps")}
                      className="text-xs bg-orange-100 text-orange-600 px-3 py-1 rounded-lg font-bold hover:bg-orange-200"
                    >
                      + Add Step
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <input
                       className="   w-full   border border-gray-300   rounded-xl   p-3   shadow-sm   outline-none   resize-none  transition-all  focus:ring-2  focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 text-gray-700"

                      placeholder="Process Title"
                      onChange={(e) =>
                        setForm({ ...form, process_title: e.target.value })
                      }
                    />
                    <input
                      className="   w-full   border border-gray-300   rounded-xl   p-3   shadow-sm   outline-none   resize-none  transition-all  focus:ring-2  focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 text-gray-700"

                      placeholder="Process sub-Title"
                      onChange={(e) =>
                        setForm({ ...form, process_sub_title: e.target.value })
                      }
                    />
                    <textarea
                       className="   w-full   border border-gray-300   rounded-xl   p-3   shadow-sm   outline-none   resize-none  transition-all  focus:ring-2  focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 text-gray-700"
                      rows={3}
                      placeholder="Process Description..."
                      onChange={(e) =>
                        setForm({
                          ...form,
                          process_description: e.target.value,
                        })
                      }
                    />
                    <input
                      type="file"
                        className="   w-full   border border-gray-300   rounded-xl   p-3   shadow-sm   outline-none   resize-none  transition-all  focus:ring-2  focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 text-gray-700"
                      onChange={(e) =>
                        setForm({ ...form, process_images: e.target.files[0] })
                      }
                    />
                  </div>

                  {form.steps.map((step, index) => (
                    <div
                      key={index}
                      className="flex gap-3 animate-in fade-in zoom-in duration-300"
                    >
                      <input
                    className="   w-full   border border-gray-300   rounded-xl   p-3   shadow-sm   outline-none   resize-none  transition-all  focus:ring-2  focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 text-gray-700"
                        placeholder="Step Key (e.g. Planning)"
                        value={step.key}
                        onChange={(e) =>
                          handleDynamicChange(
                            "steps",
                            index,
                            "key",
                            e.target.value,
                          )
                        }
                      />
                      <input
                          className="   w-full   border border-gray-300   rounded-xl   p-3   shadow-sm   outline-none   resize-none  transition-all  focus:ring-2  focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 text-gray-700"
                        placeholder="Step Value"
                        value={step.value}
                        onChange={(e) =>
                          handleDynamicChange(
                            "steps",
                            index,
                            "value",
                            e.target.value,
                          )
                        }
                      />
                      <button
                        onClick={() => removeField("steps", index)}
                        className="text-red-400 hover:text-red-600"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Section 3: FAQs */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b pb-2">
                    <div className="flex items-center gap-2 text-green-600 font-bold text-lg">
                      <HelpCircle size={20} /> FAQs
                    </div>
                    <button
                      onClick={() => addField("faqs")}
                      className="text-xs bg-green-100 text-green-600 px-3 py-1 rounded-lg font-bold hover:bg-green-200"
                    >
                      + Add FAQ
                    </button>
                  </div>
                  {form.faqs.map((faq, index) => (
                    <div
                      key={index}
                      className="space-y-2 bg-gray-50 p-4 rounded-xl relative group"
                    >
                      <button
                        onClick={() => removeField("faqs", index)}
                        className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                      >
                        <X size={16} />
                      </button>
                      <input
                          className="   w-full   border border-gray-300   rounded-xl   p-3   shadow-sm   outline-none   resize-none  transition-all  focus:ring-2  focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 text-gray-700"
                        placeholder="Question"
                        value={faq.title}
                        onChange={(e) =>
                          handleDynamicChange(
                            "faqs",
                            index,
                            "title",
                            e.target.value,
                          )
                        }
                      />
                      <textarea
                      className="   w-full   border border-gray-300   rounded-xl   p-3   shadow-sm   outline-none   resize-none  transition-all  focus:ring-2  focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 text-gray-700"
                        placeholder="Answer"
                        value={faq.description}
                        onChange={(e) =>
                          handleDynamicChange(
                            "faqs",
                            index,
                            "description",
                            e.target.value,
                          )
                        }
                      />
                    </div>
                  ))}
                </div>

                {/* service about */}
                {/* Section 4: About Service */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b pb-2">
                    <div className="flex items-center gap-2 text-purple-600 font-bold text-lg">
                      <FileText size={20} /> About Service
                    </div>
                    <button
                      onClick={() => addField("about_service")}
                      className="text-xs bg-purple-100 text-purple-600 px-3 py-1 rounded-lg font-bold hover:bg-purple-200"
                    >
                      + Add Content
                    </button>
                  </div>

                  {form.about_service.map((about, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-purple-50/50 p-5 rounded-2xl relative border border-purple-100"
                    >
                      {/* Remove Button */}
                      <button
                        onClick={() => removeField("about_service", index)}
                        className="absolute -top-2 -right-2 bg-white text-red-500 shadow-md p-1 rounded-full hover:bg-red-50"
                      >
                        <X size={16} />
                      </button>

                      <div className="space-y-3">
                        <input
                     className="   w-full   border border-gray-300   rounded-xl   p-3   shadow-sm   outline-none   resize-none  transition-all  focus:ring-2  focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 text-gray-700"
                          placeholder="Section Title (e.g. Why choose us?)"
                          value={about.title}
                          onChange={(e) =>
                            handleDynamicChange(
                              "about_service",
                              index,
                              "title",
                              e.target.value,
                            )
                          }
                        />
                        <textarea
                           className="   w-full   border border-gray-300   rounded-xl   p-3   shadow-sm   outline-none   resize-none  transition-all  focus:ring-2  focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 text-gray-700"
                          rows={3}
                          placeholder="Detailed description..."
                          value={about.description}
                          onChange={(e) =>
                            handleDynamicChange(
                              "about_service",
                              index,
                              "description",
                              e.target.value,
                            )
                          }
                        />
                      </div>

                      <div className="flex flex-col justify-center items-center border-2 border-dashed border-purple-200 rounded-xl bg-white p-4">
                        <input
                          type="file"
                          id={`about-media-${index}`}
                          className="hidden"
                          onChange={(e) => {
                            const list = [...form.about_service];
                            list[index].media = e.target.files[0];
                            setForm({ ...form, about_service: list });
                          }}
                        />
                        <label
                          htmlFor={`about-media-${index}`}
                          className="cursor-pointer flex flex-col items-center gap-2"
                        >
                          {about.media ? (
                            <div className="text-center">
                              <div className="text-xs text-green-600 font-bold truncate max-w-[150px]">
                                {about.media.name}
                              </div>
                              <span className="text-[10px] text-gray-400">
                                Click to change
                              </span>
                            </div>
                          ) : (
                            <>
                              <ImageIcon
                                size={24}
                                className="text-purple-400"
                              />
                              <span className="text-xs text-purple-600 font-medium">
                                Upload Section Image
                              </span>
                            </>
                          )}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t bg-white flex justify-end gap-4">
                <button
                  onClick={() => setOpen(false)}
                  className="px-6 py-2 font-bold text-gray-500 hover:bg-gray-100 rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={submit}
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-xl font-bold shadow-lg flex items-center gap-2 disabled:bg-blue-300"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <Save size={20} />
                  )}
                  {loading ? "Saving..." : "Publish Service"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
