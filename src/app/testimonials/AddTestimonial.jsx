

"use client";

import { useState } from "react";
import { toast } from "@/lib/toast";
import { useRouter } from "next/navigation";

export default function AddTestimonial() {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    
    // Fixed state keys to match your input fields
    const [form, setForm] = useState({
        name: "",
        designation: "",
        company: "",
        message: "",
        status: "active",
        image: null // Store the file object here
    });

    const submit = async () => {
        if (!form.name || !form.message) {
            toast("Name & Message are required", "error");
            return;
        }

        try {
            setLoading(true);

            // Create FormData to handle the image and text fields
            const data = new FormData();
            data.append("client_name", form.name);
            data.append("designation", form.designation);
            data.append("company", form.company);
            data.append("quote", form.message);
            data.append("status", form.status);
            if (form.image) {
                data.append("photo", form.image); // Field name must match backend expectations
            }

            const res = await fetch("/api/testimonials", {
                method: "POST",
                // Note: No 'Content-Type' header needed for FormData
                body: data,
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.message || "Failed to add testimonial");
            }

            toast("Testimonial added successfully");
            setOpen(false);
            
            // Reset Form
            setForm({
                name: "",
                designation: "",
                company: "",
                message: "",
                status: "active",
                image: null
            });

            router.refresh();
        } catch (error) {
            toast(error.message, "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <button onClick={() => setOpen(true)} className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-4 py-2 rounded">
                + Add Testimonial
            </button>

            {open && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white w-full max-w-md rounded p-5 shadow-xl">
                        <h2 className="text-lg font-semibold mb-4 text-gray-800">Add Testimonial</h2>

                        <input className="border p-2 w-full mb-3 rounded" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                        <input className="border p-2 w-full mb-3 rounded" placeholder="Designation" value={form.designation} onChange={(e) => setForm({ ...form, designation: e.target.value })} />
                        <input className="border p-2 w-full mb-3 rounded" placeholder="Company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
                        <textarea className="border p-2 w-full mb-3 rounded" placeholder="Message" rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />

                        <div className="mb-3">
                            <label className="text-sm text-gray-500 mb-1 block">Client Picture</label>
                            <input 
                                type="file" 
                                accept="image/*" 
                                className="border p-1 w-full text-sm" 
                                onChange={(e) => setForm({ ...form, image: e.target.files[0] })} 
                            />
                            {form.image && <p className="text-green-600 text-xs mt-1">Image selected: {form.image.name}</p>}
                        </div>

                        <select className="border p-2 w-full mb-4 rounded" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>

                        <div className="flex justify-end gap-2">
                            <button onClick={() => setOpen(false)} className="px-3 py-1 border cursor-pointer rounded hover:bg-gray-100">Cancel</button>
                            <button onClick={submit} disabled={loading} className="bg-blue-500 cursor-pointer hover:bg-blue-700  text-white px-4 py-1 rounded disabled:bg-blue-300">
                                {loading ? "Saving..." : "Save"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}