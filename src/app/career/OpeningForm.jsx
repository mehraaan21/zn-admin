
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/lib/toast";

export default function OpeningForm({ initialData, onClose, onSuccess }) {
  const router = useRouter();
  const isEdit = !!initialData;
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: initialData?.title || "",
    position: initialData?.position || "",
    description: initialData?.description || "",
    opening: initialData?.opening || 1,
    status: initialData?.status || "active",
  });

  const submit = async () => {
    // Basic Validation
    if (!form.title || !form.position) {
      toast("Title and Position are required", "error");
      return;
    }

    setLoading(true);
    const url = isEdit ? `/api/openings/${initialData.id}` : `/api/openings`;

    try {
      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Operation failed");
      }

      toast(isEdit ? "Job updated" : "Job added");
      router.refresh(); // 🔥 Refreshes data without full reload
      onSuccess();      // Calls reload/refresh logic in parent
      onClose();        // Closes modal
    } catch (error) {
      toast(error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-96">
        <h2 className="text-xl font-bold mb-4">{isEdit ? "Edit Job" : "Add Job"}</h2>

        <div className="space-y-3">
          <input
            placeholder="Job Title"
            className="border p-2 w-full rounded"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <input
            placeholder="Position"
            className="border p-2 w-full rounded"
            value={form.position}
            onChange={(e) => setForm({ ...form, position: e.target.value })}
          />
          <textarea
            placeholder="Description"
            className="border p-2 w-full rounded"
            rows={3}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <div className="flex flex-col">
            <label className="text-xs text-gray-500 mb-1">Number of Openings</label>
            <input
              type="number"
              className="border p-2 w-full rounded"
              value={form.opening}
              onChange={(e) => setForm({ ...form, opening: Number(e.target.value) })}
            />
          </div>
          <select
            className="border p-2 w-full rounded"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option value="active">Active</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button className="px-4 py-2 text-gray-600" onClick={onClose}>Cancel</button>
          <button 
            className="bg-blue-600 text-white px-4 py-2 rounded font-bold disabled:bg-blue-300" 
            onClick={submit}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Job"}
          </button>
        </div>
      </div>
    </div>
  );
}