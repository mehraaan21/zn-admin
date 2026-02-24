// "use client";
// import { useState } from "react";
// import { X, RefreshCcw, Save } from "lucide-react";
// import { toast } from "@/lib/toast";
// import { useRouter } from "next/navigation";

// export default function AddChallengeModal({ caseStudyId, onClose }) {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [form, setForm] = useState({ challenge: "", solution: "" });

//   const submit = async () => {
//     if (!form.challenge || !form.solution) return toast("Both fields are required", "error");
//     try {
//       setLoading(true);
//       const res = await fetch(`/api/case-studies/${caseStudyId}/challenges`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });
//       if (res.ok) {
//         toast("Challenge added! 🚀");
//         router.refresh();
//         onClose();
//       }
//     } catch (err) { toast(err.message, "error"); }
//     finally { setLoading(false); }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8">
//         <div className="flex justify-between mb-6">
//           <h2 className="text-xl font-bold">Add Challenge & Solution</h2>
//           <button onClick={onClose}><X /></button>
//         </div>
//         <div className="space-y-4">
//           <textarea placeholder="The Challenge" rows={4} className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-orange-500 outline-none" value={form.challenge} onChange={e => setForm({...form, challenge: e.target.value})} />
//           <textarea placeholder="The Solution" rows={4} className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-green-500 outline-none" value={form.solution} onChange={e => setForm({...form, solution: e.target.value})} />
//           <button onClick={submit} disabled={loading} className="w-full bg-orange-500 text-white py-3 rounded-xl font-bold flex justify-center gap-2">
//             {loading ? <RefreshCcw className="animate-spin" /> : <Save size={20} />} Save Challenge
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useState } from "react";
import { X, RefreshCcw, Save } from "lucide-react";
import { toast } from "react-hot-toast";
import RichTextEditor from "@/components/RichTextEditor";

export default function AddChallengeModal({ caseStudyId, onClose }) {
  // Router functionality ko simulate karne ke liye local handle
  const router = { refresh: () => console.log("Router refreshed") };

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ challenge: "", solution: "" });

  const submit = async () => {
    if (!form.challenge || !form.solution) {
      return toast.error("Required Challenges and solutions");
    }

    try {
      setLoading(true);

   
      const formData = new FormData();
      formData.append("challenge", form.challenge);
      formData.append("solution", form.solution);
      formData.append("case_study_id", caseStudyId);

      const res = await fetch(`/api/case-studies/${caseStudyId}/challenges`, {
        method: "POST",
        body: formData,
      });

      let result;
      try {
        result = await res.json();
      } catch (e) {
        throw new Error("Server response Invalid");
      }

      if (res.ok) {
        toast.success(" Succesfull Add Challenge! 🚀");
        if (router.refresh) router.refresh();
        onClose();
      } else {
        throw new Error(
          result.message || "Failed to Add challenges",
        );
      }
    } catch (err) {
      toast.error(err.message);
      console.error("Submission Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl max-h-[90vh] overflow-y-auto p-8 auto-flow-y">
        <div className="flex justify-between mb-6">
          <h2 className="text-xl font-bold  text-gray-800">
            {" "}
            Add Challenge or Solution{" "}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase ml-1">
              Challenges
            </label>
           <RichTextEditor
  placeholder="Challenges"
  className="w-full min-h-[150px] border-2 border-gray-100 rounded-xl p-4 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
  value={form.challenge}
  onChange={(value) =>
    setForm((prev) => ({
      ...prev,
      challenge: value,
    }))
  }
/>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase ml-1">
              Solution
            </label>
           <RichTextEditor
  placeholder="Solution"
  rows={4}
  className="w-full border-2 border-gray-100 rounded-xl p-4 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
  value={form.solution}
  onChange={(value) => setForm({ ...form, solution: value })}
/>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              onClick={onClose}
              className="px-6 py-2 border cursor-pointer rounded-lg hover:bg-slate-50 transition"
            >
              Cancel
            </button>

            <button
              onClick={submit}
              disabled={loading}
              className=" bg-blue-500 cursor-pointer hover:bg-blue-600 text-white px-8 py-2.5 rounded-xl font-bold text-md flex justify-center items-center gap-2 disabled:bg-orange-200 transition-all shadow-lg shadow-orange-100"
            >
              {loading ? (
                <RefreshCcw className="animate-spin" size={20} />
              ) : (
                <Save size={20} />
              )}
              {loading ? "Saving..." : " saved"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
