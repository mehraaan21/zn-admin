// // "use client";

// // import { useState, useRef } from "react";
// // import { useRouter } from "next/navigation";
// // import { toast } from "@/lib/toast";

// // export default function CaseStudyAdd() {
// //   const router = useRouter();
// //   const bannerRef = useRef(null);

// //   const [open, setOpen] = useState(false);
// //   const [loading, setLoading] = useState(false);

// //   const [form, setForm] = useState({
// //     title: "",
// //     client_name: "",
// //     services: "",
// //     duration: "",
// //     team_size: "",
// //     description: "",
// //     banner: null,
// //   });

// //   const resetForm = () => {
// //     setForm({
// //       title: "",
// //       client_name: "",
// //       services: "",
// //       duration: "",
// //       team_size: "",
// //       description: "",
// //       banner: null,
// //     });

// //     if (bannerRef.current) bannerRef.current.value = "";
// //   };

// //   const submit = async () => {
// //     if (loading) return;

// //     if (!form.title || !form.description || !form.banner) {
// //       toast("Title, Description & Banner are required", "error");
// //       return;
// //     }

// //     const fd = new FormData();
// //     fd.append("title", form.title);
// //     fd.append("client_name", form.client_name);
// //     fd.append("services", form.services);
// //     fd.append("duration", form.duration);
// //     fd.append("team_size", form.team_size);
// //     fd.append("description", form.description);
// //     fd.append("banner", form.banner);

// //     try {
// //       setLoading(true);

// //       const res = await fetch("/api/case-studies", {
// //         method: "POST",
// //         body: fd,
// //       });

// //       if (!res.ok) throw new Error("Failed to add case study");

// //       toast("Case study added successfully");
// //       resetForm();
// //       setOpen(false);
// //       router.refresh();
// //     } catch (err) {
// //       toast(err.message || "Something went wrong", "error");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <>
// //       {/* ADD BUTTON */}
// //       <button
// //         onClick={() => setOpen(true)}
// //         className="bg-blue-600 text-white px-4 py-2 rounded"
// //       >
// //         + Add Case Study
// //       </button>

// //       {/* MODAL */}
// //       {open && (
// //         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
// //           <div className="bg-white p-6 rounded w-[500px] max-h-[90vh] overflow-y-auto">
// //             <h2 className="font-bold text-lg mb-4">Add Case Study</h2>

// //             <input
// //               className="border p-2 w-full mb-3"
// //               placeholder="Title *"
// //               value={form.title}
// //               onChange={(e) =>
// //                 setForm({ ...form, title: e.target.value })
// //               }
// //             />

// //             <input
// //               className="border p-2 w-full mb-3"
// //               placeholder="Client Name"
// //               value={form.client_name}
// //               onChange={(e) =>
// //                 setForm({ ...form, client_name: e.target.value })
// //               }
// //             />

// //             <input
// //               className="border p-2 w-full mb-3"
// //               placeholder="Services"
// //               value={form.services}
// //               onChange={(e) =>
// //                 setForm({ ...form, services: e.target.value })
// //               }
// //             />

// //             <div className="flex gap-2 mb-3">
// //               <input
// //                 className="border p-2 w-full"
// //                 placeholder="Duration"
// //                 value={form.duration}
// //                 onChange={(e) =>
// //                   setForm({ ...form, duration: e.target.value })
// //                 }
// //               />

// //               <input
// //                 className="border p-2 w-full"
// //                 placeholder="Team Size"
// //                 value={form.team_size}
// //                 onChange={(e) =>
// //                   setForm({ ...form, team_size: e.target.value })
// //                 }
// //               />
// //             </div>

// //             <textarea
// //               className="border p-2 w-full mb-3"
// //               rows={4}
// //               placeholder="Description *"
// //               value={form.description}
// //               onChange={(e) =>
// //                 setForm({ ...form, description: e.target.value })
// //               }
// //             />

// //             <input
// //               ref={bannerRef}
// //               type="file"
// //               className="border p-2 w-full mb-4"
// //               onChange={(e) =>
// //                 setForm({ ...form, banner: e.target.files?.[0] })
// //               }
// //             />

// //             <div className="flex justify-end gap-2">
// //               <button
// //                 onClick={() => {
// //                   resetForm();
// //                   setOpen(false);
// //                 }}
// //               >
// //                 Cancel
// //               </button>

// //               <button
// //                 onClick={submit}
// //                 disabled={loading}
// //                 className="bg-blue-600 text-white px-4 py-1 rounded disabled:opacity-60"
// //               >
// //                 {loading ? "Saving..." : "Save"}
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </>
// //   );
// // }


// "use client";

// import { useState, useRef } from "react";
// import { useRouter } from "next/navigation";
// import { toast } from "@/lib/toast";

// export default function CaseStudyAdd() {
//   const router = useRouter();
//   const bannerRef = useRef(null);
//   const imagesRef = useRef(null);

//   const [open, setOpen] = useState(false);
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

//   const resetForm = () => {
//     setForm({
//       title: "",
//       client_name: "",
//       position: "",
//       services: "",
//       duration: "",
//       team_size: "",
//       description: "",
//       banner: null,
//       images: [],
//     });
//     setErrors({});
//     if (bannerRef.current) bannerRef.current.value = "";
//     if (imagesRef.current) imagesRef.current.value = "";
//   };

//   const submit = async () => {
//     if (loading) return;

//     if (!form.title || !form.position || !form.description || !form.banner || form.images.length === 0) {
//       toast("Please fill all required fields", "error");
//       return;
//     }

//     const fd = new FormData();
//     fd.append("title", form.title);
//     fd.append("client_name", form.client_name);
//     fd.append("position", form.position);
//     fd.append("services", form.services);
//     fd.append("duration", form.duration);
//     fd.append("team_size", form.team_size);
//     fd.append("description", form.description);
//     fd.append("banner", form.banner);

//     // form.images.forEach((img) => {
//     //   fd.append("images[]", img);
//     // });

//       form.images.forEach((img) => {
//     fd.append("images[]", img);
//   });

//     try {
//       setLoading(true);
//       setErrors({});

//       const res = await fetch("/api/case-studies-challenge", {
//         method: "POST",
//         body: fd,
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         if (data?.errors) {
//           setErrors(data.errors);
//           toast("Validation error", "error");
//           return;
//         }
//         throw new Error("Failed to add case study");
//       }

//       toast("Case study added successfully");
//       resetForm();
//       setOpen(false);
//       router.refresh();
//     } catch (err) {
//       toast(err.message || "Something went wrong", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <button
//         onClick={() => setOpen(true)}
//         className="bg-blue-600 text-white px-4 py-2 rounded"
//       >
//         + Add Case Study
//       </button>

//       {open && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded w-[520px] max-h-[90vh] overflow-y-auto">
//             <h2 className="font-bold text-lg mb-4">Add Case Study</h2>

//             <input
//               className="border p-2 w-full mb-1"
//               placeholder="Title *"
//               value={form.title}
//               onChange={(e) => setForm({ ...form, title: e.target.value })}
//             />
//             {errors.title && <p className="text-red-500 text-xs mb-2">{errors.title.required}</p>}

//             <input
//               className="border p-2 w-full mb-1"
//               placeholder="Client Name"
//               value={form.client_name}
//               onChange={(e) => setForm({ ...form, client_name: e.target.value })}
//             />

//             <input
//               className="border p-2 w-full mb-1"
//               placeholder="Position *"
//               value={form.position}
//               onChange={(e) => setForm({ ...form, position: e.target.value })}
//             />
//             {errors.position && <p className="text-red-500 text-xs mb-2">{errors.position.required}</p>}

//             <input
//               className="border p-2 w-full mb-3"
//               placeholder="Services"
//               value={form.services}
//               onChange={(e) => setForm({ ...form, services: e.target.value })}
//             />

//             <div className="flex gap-2 mb-3">
//               <input
//                 className="border p-2 w-full"
//                 placeholder="Duration"
//                 value={form.duration}
//                 onChange={(e) => setForm({ ...form, duration: e.target.value })}
//               />
//               <input
//                 className="border p-2 w-full"
//                 placeholder="Team Size"
//                 value={form.team_size}
//                 onChange={(e) => setForm({ ...form, team_size: e.target.value })}
//               />
//             </div>

//             <textarea
//               className="border p-2 w-full mb-3"
//               rows={4}
//               placeholder="Description *"
//               value={form.description}
//               onChange={(e) => setForm({ ...form, description: e.target.value })}
//             />

//             <label className="text-sm font-medium">Banner *</label>
//             <input
//               ref={bannerRef}
//               type="file"
//               className="border p-2 w-full mb-2"
//               onChange={(e) => setForm({ ...form, banner: e.target.files?.[0] })}
//             />

//             <label className="text-sm font-medium">Images *</label>
//             <input
//               ref={imagesRef}
//               type="file"
//               multiple
//               className="border p-2 w-full mb-1"
//               onChange={(e) => setForm({ ...form, images: Array.from(e.target.files) })}
//             />
//             {errors.images && <p className="text-red-500 text-xs mb-2">{errors.images.required}</p>}

//             <div className="flex justify-end gap-2 mt-4">
//               <button onClick={() => { resetForm(); setOpen(false); }}>
//                 Cancel
//               </button>
//               <button
//                 onClick={submit}
//                 disabled={loading}
//                 className="bg-blue-600 text-white px-4 py-1 rounded disabled:opacity-60"
//               >
//                 {loading ? "Saving..." : "Save"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
