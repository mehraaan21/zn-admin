"use client";

import { useState, useEffect } from "react";
import { X, RefreshCcw, Save, AlertTriangle, CheckCircle2 } from "lucide-react";
import { toast } from "@/lib/toast";
import { useRouter } from "next/navigation";
import RichTextEditor from "@/components/RichTextEditor";

export default function EditChallengeModal({ item, onClose }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    challenge: "",
    solution: "",
  });

  useEffect(() => {
    if (item) {
      setForm({
        challenge: item.challenge || "",
        solution: item.solution || "",
      });
    }
  }, [item]);

  const submit = async () => {
    if (!form.challenge || !form.solution) {
      toast("Fields cannot be empty", "error");
      return;
    }

    try {
      setLoading(true);
      // Ensure the endpoint matches your folder structure: /api/case-studies/[id]/challenges/[challenge_id]
      const res = await fetch(
        `/api/case-studies/${item.case_study_id || item.CaseStudyID}/challenges/${item.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        },
      );

      if (!res.ok) throw new Error("Update failed");

      toast("Challenge updated successfully ✨");
      router.refresh(); // Triggers Server Component refresh
      onClose();
    } catch (err) {
      toast(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* HEADER */}
        <div className="p-8 border-b bg-slate-50 flex justify-between items-center">
          <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">
            Edit Challenge
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-red-500 uppercase tracking-widest ml-1 flex items-center gap-1">
              <AlertTriangle size={12} /> The Challenge
            </label>
            <RichTextEditor
              rows={5}
              value={form.challenge || ""}
              onChange={(content) =>
                setForm((prev) => ({
                  ...prev,
                  challenge: content,
                }))
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-green-600 uppercase tracking-widest ml-1 flex items-center gap-1">
              <CheckCircle2 size={12} /> The Solution
            </label>
            <RichTextEditor
              rows={5}
              value={form.solution || ""}
              onChange={(value) =>
                setForm((prev) => ({
                  ...prev,
                  solution: value,
                }))
              }
            />
          </div>

          {/* FOOTER */}
          <div className="flex justify-end gap-3 pt-6 border-t">
            <button
              onClick={onClose}
              className="px-6 py-2.5 font-bold text-slate-400 cursor-pointer rounded-2xl border-2 hover:text-slate-600"
            >
              Cancel
            </button>
            <button
              onClick={submit}
              disabled={loading}
              className="px-8 py-2.5 bg-blue-500 text-white cursor-pointer rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] flex items-center gap-2 shadow-lg shadow-orange-100 hover:bg-blue-600 transition-all active:scale-95"
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
