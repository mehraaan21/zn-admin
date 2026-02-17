

"use client";

import { useState } from "react";
import {
  X,
  Layout,
  Layers,
  CheckCircle2,
  Image as ImageIcon,
  Save,
  Plus,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function EditResults({ result, onClose }) {
  const [title, setTitle] = useState(result?.Title || "");
  const [bulletPoints, setBulletPoints] = useState(
    result?.bullet_points || []
  );
  const [image, setImage] = useState(result?.image_url || "");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  if (!result) return null;

  // ADD BULLET
  const addBullet = () => {
    setBulletPoints((prev) => [...prev, ""]);
  };

  // UPDATE BULLET
  const updateBullet = (value, index) => {
    setBulletPoints((prev) =>
      prev.map((p, i) => (i === index ? value : p))
    );
  };

  // REMOVE BULLET
  const removeBullet = (index) => {
    setBulletPoints((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  // IMAGE
  const handleImage = (e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    setFile(selected);
    setImage(URL.createObjectURL(selected));
  };

  // SAVE
  const handleSubmit = async () => {
    try {
      setLoading(true);

      const formData = new FormData();

      // formData.append("Title", title);
      // formData.append("CaseStudyID", result.CaseStudyID);
      formData.append("title", title.trim());
formData.append("case_study_id", result.CaseStudyID);

   
      bulletPoints
  .map(p => p.trim())
  .filter(Boolean)
  .forEach(point => {
    formData.append("bullet_points[]", point);
  });

      if (file) formData.append("image", file);

      const res = await fetch(`/api/case-studies/${result.CaseStudyID}/results/${result.id}`, {
        method: "PUT",
        body: formData,
      });
     const data = await res.json();
console.log("UPDATED DATA:", data);
      if (!res.ok) throw new Error("Update failed");

onClose();
router.refresh();
    } catch (err) {
      console.error(err);
      alert("Failed to update result");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="bg-white rounded-3xl w-full max-w-5xl max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200"
        >
          {/* HEADER */}
          <div className="p-8 border-b flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-600 rounded-2xl">
                <Layout className="text-white" />
              </div>

              <div>
                <h2 className="text-2xl font-extrabold">
                  Edit Results
                </h2>
                <span className="text-xs text-slate-400">
                  Record ID: #{result.id}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-full"
            >
              <X />
            </button>
          </div>

          {/* BODY */}
          <div className="grid lg:grid-cols-3 gap-10 p-8">
            
            {/* LEFT */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* TITLE */}
              <div>
                <label className="text-xs font-bold text-blue-500 uppercase flex gap-2 mb-2">
                  <Layers size={14} /> Title
                </label>

                <input
                  value={title}
                  onChange={(e) =>
                    setTitle(e.target.value)
                  }
                  className="w-full border p-4 rounded-2xl focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* BULLETS */}
              <div>
                <div className="flex justify-between mb-3">
                  <label className="text-xs font-bold text-slate-400 uppercase flex gap-2">
                    <CheckCircle2 size={14} /> Bullet Points
                  </label>

                  <button
                    onClick={addBullet}
                    className="flex items-center cursor-pointer gap-1 text-blue-600 font-semibold"
                  >
                    <Plus size={16} />
                    Add
                  </button>
                </div>

                <div className="space-y-3">
                  {bulletPoints.map((point, i) => (
                    <div key={i} className="flex gap-2">
                      <input
                        value={point}
                        onChange={(e) =>
                          updateBullet(e.target.value, i)
                        }
                        className="flex-1 border p-3 rounded-xl"
                      />

                      <button
                        onClick={() =>
                          removeBullet(i)
                        }
                        className="p-2 cursor-pointer bg-red-50 rounded-lg"
                      >
                        <Trash2
                          size={16}
                          className="text-red-500"
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* IMAGE */}
            <div className="space-y-4">
              <label className="text-xs font-bold text-slate-400 uppercase flex gap-2">
                <ImageIcon size={14} /> Result Image
              </label>

              <div className="relative aspect-video rounded-2xl overflow-hidden border">
                {image ? (
                  <Image
                    src={image}
                    alt="preview"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full bg-slate-50">
                    No Image
                  </div>
                )}
              </div>

              <input
                type="file"
                onChange={handleImage}
                className="w-full border p-3 rounded-xl"
              />
            </div>
          </div>

          {/* FOOTER */}
          <div className="p-6 border-t flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex items-center cursor-pointer gap-2 px-8 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-xl"
            >
              <Save size={16} />
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}