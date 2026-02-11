"use client";

import { useState, useEffect } from "react";
import { X, RefreshCcw, Save, AlertTriangle, CheckCircle2 } from "lucide-react";
import { toast } from "@/lib/toast";
import { useRouter } from "next/navigation";

export default function EditChallengeModal({ item, onClose }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    challenge: "",
    solution: ""
  });

  useEffect(() => {
    if (item) {
      setForm({
        challenge: item.challenge || "",
        solution: item.solution || ""
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
      const res = await fetch(`/api/case-studies/${item.case_study_id || item.CaseStudyID}/challenges/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-2xl overflow-hidden">
        {/* HEADER */}
        <div className="p-8 border-b bg-slate-50 flex justify-between items-center">
          <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Edit Challenge</h2>
          <button onClick={onClose} className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-red-500 uppercase tracking-widest ml-1 flex items-center gap-1">
              <AlertTriangle size={12} /> The Challenge
            </label>
            <textarea
              rows={5}
              value={form.challenge}
              onChange={(e) => setForm({ ...form, challenge: e.target.value })}
              className="w-full border-2 border-slate-100 p-5 rounded-2xl focus:border-red-400 focus:ring-0 outline-none font-medium text-slate-600 transition-all bg-slate-50/50"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-green-600 uppercase tracking-widest ml-1 flex items-center gap-1">
              <CheckCircle2 size={12} /> The Solution
            </label>
            <textarea
              rows={5}
              value={form.solution}
              onChange={(e) => setForm({ ...form, solution: e.target.value })}
              className="w-full border-2 border-slate-100 p-5 rounded-2xl focus:border-green-500 focus:ring-0 outline-none font-medium text-slate-600 transition-all bg-slate-50/50"
            />
          </div>

          {/* FOOTER */}
          <div className="flex justify-end gap-3 pt-6 border-t">
            <button onClick={onClose} className="px-6 py-3 font-bold text-slate-400 hover:text-slate-600">
              Cancel
            </button>
            <button
              onClick={submit}
              disabled={loading}
              className="px-10 py-3 bg-orange-500 text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] flex items-center gap-2 shadow-lg shadow-orange-100 hover:bg-orange-600 transition-all active:scale-95"
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