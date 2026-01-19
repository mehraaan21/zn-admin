// "use client";

// import { useEffect, useRef, useState } from "react";
// import { useRouter, useParams } from "next/navigation";
// import { toast } from "@/lib/toast";

// export default function CaseStudyEdit() {
//   const router = useRouter();
//   const { id } = useParams();

//   const bannerRef = useRef(null);
//   const imagesRef = useRef(null);

//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});

//   const [form, setForm] = useState({
//     title: "",
//     client_name: "",
//     position: "",
//     services: "",
//     duration: "",
//     team_size: "",
//     description: "",
//     banner: null,
//     images: [],
//   });

//   /* ---------------- FETCH EXISTING DATA ---------------- */
//   useEffect(() => {
//     const fetchCaseStudy = async () => {
//       try {
//         const res = await fetch(`/api/case-studies-challenge/${id}`);
//         const data = await res.json();

//         if (!res.ok) throw new Error("Failed to load case study");

//         setForm((prev) => ({
//           ...prev,
//           title: data.title || "",
//           client_name: data.client_name || "",
//           position: data.position || "",
//           services: data.services || "",
//           duration: data.duration || "",
//           team_size: data.team_size || "",
//           description: data.description || "",
//         }));
//       } catch (err) {
//         toast(err.message, "error");
//       }
//     };

//     fetchCaseStudy();
//   }, [id]);

//   /* ---------------- SUBMIT ---------------- */
//   const submit = async () => {
//     if (loading) return;

//     const fd = new FormData();
//     fd.append("title", form.title);
//     fd.append("client_name", form.client_name);
//     fd.append("position", form.position);
//     fd.append("services", form.services);
//     fd.append("duration", form.duration);
//     fd.append("team_size", form.team_size);
//     fd.append("description", form.description);

//     if (form.banner) fd.append("banner", form.banner);

//     form.images.forEach((img) => {
//       fd.append("images[]", img);
//     });

//     try {
//       setLoading(true);
//       setErrors({});

//       const res = await fetch(`/api/case-studies/${id}`, {
//         method: "PUT",
//         body: fd,
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         if (data?.errors) {
//           setErrors(data.errors);
//           return;
//         }
//         throw new Error("Update failed");
//       }

//       toast("Case study updated");
//       router.push("/case-studies");
//       router.refresh();
//     } catch (err) {
//       toast(err.message || "Something went wrong", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 max-w-3xl mx-auto">
//       <h1 className="text-2xl font-bold mb-6">Edit Case Study</h1>

//       {/* TITLE */}
//       <input
//         className="border p-2 w-full mb-1"
//         placeholder="Title"
//         value={form.title}
//         onChange={(e) => setForm({ ...form, title: e.target.value })}
//       />

//       {/* CLIENT */}
//       <input
//         className="border p-2 w-full mb-1"
//         placeholder="Client Name"
//         value={form.client_name}
//         onChange={(e) =>
//           setForm({ ...form, client_name: e.target.value })
//         }
//       />

//       {/* POSITION */}
//       <input
//         className={`border p-2 w-full mb-1 ${
//           errors.position ? "border-red-500" : ""
//         }`}
//         placeholder="Position"
//         value={form.position}
//         onChange={(e) =>
//           setForm({ ...form, position: e.target.value })
//         }
//       />
//       {errors.position?.required && (
//         <p className="text-red-500 text-xs mb-2">
//           {errors.position.required}
//         </p>
//       )}

//       {/* SERVICES */}
//       <input
//         className="border p-2 w-full mb-3"
//         placeholder="Services"
//         value={form.services}
//         onChange={(e) =>
//           setForm({ ...form, services: e.target.value })
//         }
//       />

//       {/* DURATION + TEAM */}
//       <div className="flex gap-2 mb-3">
//         <input
//           className="border p-2 w-full"
//           placeholder="Duration"
//           value={form.duration}
//           onChange={(e) =>
//             setForm({ ...form, duration: e.target.value })
//           }
//         />
//         <input
//           className="border p-2 w-full"
//           placeholder="Team Size"
//           value={form.team_size}
//           onChange={(e) =>
//             setForm({ ...form, team_size: e.target.value })
//           }
//         />
//       </div>

//       {/* DESCRIPTION */}
//       <textarea
//         className="border p-2 w-full mb-3"
//         rows={4}
//         placeholder="Description"
//         value={form.description}
//         onChange={(e) =>
//           setForm({ ...form, description: e.target.value })
//         }
//       />

//       {/* BANNER */}
//       <label className="text-sm font-medium">Replace Banner</label>
//       <input
//         ref={bannerRef}
//         type="file"
//         className="border p-2 w-full mb-3"
//         onChange={(e) =>
//           setForm({ ...form, banner: e.target.files?.[0] })
//         }
//       />

//       {/* IMAGES */}
//       <label className="text-sm font-medium">Add Images</label>
//       <input
//         ref={imagesRef}
//         type="file"
//         multiple
//         className={`border p-2 w-full mb-1 ${
//           errors.images ? "border-red-500" : ""
//         }`}
//         onChange={(e) =>
//           setForm({
//             ...form,
//             images: Array.from(e.target.files),
//           })
//         }
//       />

//       {errors.images?.required && (
//         <p className="text-red-500 text-xs mb-3">
//           {errors.images.required}
//         </p>
//       )}

//       {/* ACTIONS */}
//       <div className="flex justify-end gap-3 mt-6">
//         <button
//           onClick={() => router.back()}
//           className="px-4 py-2 border rounded"
//         >
//           Cancel
//         </button>

//         <button
//           onClick={submit}
//           disabled={loading}
//           className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-60"
//         >
//           {loading ? "Updating..." : "Update"}
//         </button>
//       </div>
//     </div>
//   );
// }
