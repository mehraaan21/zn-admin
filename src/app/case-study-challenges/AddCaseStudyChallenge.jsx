"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/lib/toast";

export default function AddCaseStudyChallenge({ caseStudyId, onClose }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    challenge: "",
    solution: "",
  });

  const submit = async () => {
    if (!form.challenge || !form.solution) {
      toast("Challenge & Solution are required", "error");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `/admin/case-studies/${caseStudyId}/challenges`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      if (!res.ok) throw new Error("Failed to add challenge");

      toast("Challenge added successfully");
      router.refresh();
      onClose();
    } catch (err) {
      toast(err.message || "Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal title="Add Challenge" onClose={onClose}>
      <textarea
        className="border p-2 w-full mb-3"
        rows={4}
        placeholder="Challenge *"
        value={form.challenge}
        onChange={(e) =>
          setForm({ ...form, challenge: e.target.value })
        }
      />

      <textarea
        className="border p-2 w-full mb-4"
        rows={4}
        placeholder="Solution *"
        value={form.solution}
        onChange={(e) =>
          setForm({ ...form, solution: e.target.value })
        }
      />

      <ModalActions
        loading={loading}
        onClose={onClose}
        onSubmit={submit}
      />
    </Modal>
  );
}

/* ---------- SHARED UI ---------- */

function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-[500px]">
        <h2 className="font-bold text-lg mb-4">{title}</h2>
        {children}
      </div>
    </div>
  );
}

function ModalActions({ loading, onClose, onSubmit }) {
  return (
    <div className="flex justify-end gap-2">
      <button onClick={onClose}>Cancel</button>
      <button
        onClick={onSubmit}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-1 rounded disabled:opacity-60"
      >
        {loading ? "Saving..." : "Save"}
      </button>
    </div>
  );
}
