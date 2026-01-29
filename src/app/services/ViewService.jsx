// import { X, Info, HelpCircle, GitMerge, FileText } from "lucide-react";
// import Lottie from "lottie-react";
// import Image from "next/image";
// import { motion, AnimatePresence } from "framer-motion"; // Add this



// export default function ViewService({ data, onClose }) {
//   if (!data) return null;
  

//   return (

//     <AnimatePresence>
//         <motion.div 
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
//     >
//       <motion.div 
//         initial={{ scale: 0.9, opacity: 0, y: 20 }}
//         animate={{ scale: 1, opacity: 1, y: 0 }}
//         exit={{ scale: 0.9, opacity: 0, y: 20 }}
//         className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
//       >

//     {/* <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
//       <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"> */}
        
//         {/* Modal Header */}
//         <div className="p-6 border-b flex justify-between items-center bg-gray-50">
//           <div className="flex items-center gap-3">
//             <div className="p-2 bg-blue-100 rounded-lg">
//               <Info className="text-blue-600" size={24} />
//             </div>
//             <div>
//               <h2 className="text-xl font-bold text-gray-900">{data.title} Details</h2>
//               <p className="text-sm text-gray-500">Service ID: #{data.id}</p>
//             </div>
//           </div>
//           <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
//             <X size={24} />
//           </button>
//         </div>

//         {/* Modal Body (Scrollable) */}
//         <div className="p-6 overflow-y-auto space-y-8">
//             {!data.title ? (
//     // Skeleton Loader
//     <div className="animate-pulse space-y-6">
//       <div className="h-8 bg-gray-200 rounded w-1/3"></div>
//       <div className="h-32 bg-gray-100 rounded-xl"></div>
//       <div className="grid grid-cols-2 gap-4">
//         <div className="h-40 bg-gray-100 rounded-xl"></div>
//         <div className="h-40 bg-gray-100 rounded-xl"></div>
//       </div>
//     </div>
//   ) : (
//     <>
          
//           {/* 1. Basic Info */}
//           <section>
//             <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Basic Information</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl">
//               <div>
//                 <p className="text-xs text-gray-500">Sub Title</p>
//                 <p className="font-medium">{data.sub_title || "N/A"}</p>
//               </div>

//               {/* Header mein title ke paas ya basic info mein icon dikhane ke liye */}
// <div className="h-16 w-16 mb-4">
//   {data.icon?.url?.endsWith('.json') ? (
//     <Lottie 
//       animationData={data.icon.json_content} // Ensure your API provides the JSON object here
//       loop={true} 
//     />
//   ) : (
//     <Image 
//       src={data.icon?.url || "/placeholder.png"} 
//       alt="icon" 
//       width={64} 
//       height={64} 
//       className="object-contain"
//     />
//   )}
// </div>

//               <div>
//                 <p className="text-xs text-gray-500">Slug</p>
//                 <p className="font-mono text-blue-600">{data.slug}</p>
//               </div>
//               <div className="md:col-span-2">
//                 <p className="text-xs text-gray-500">Description</p>
//                 <p className="text-gray-700 leading-relaxed">{data.description}</p>
//               </div>
//             </div>
//           </section>

//           {/* 2. Process Section */}
//           <section>
//             <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
//               <GitMerge size={16} /> Process Section
//             </h3>
//             <div className="border rounded-xl p-4">
//               <h4 className="font-bold text-lg">{data.process_section?.title}</h4>
//               <p className="text-gray-600 mb-4">{data.process_section?.description}</p>
//               <div className="space-y-2">
//                 {data.process_section?.steps?.map((step) => (
//                   <div key={step.id} className="flex items-center gap-3 bg-blue-50 p-3 rounded-lg">
//                     <span className="bg-blue-600 text-white w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold">
//                       {step.id}
//                     </span>
//                     <div>
//                       <p className="font-bold text-sm">{step.key}</p>
//                       <p className="text-sm text-gray-600">{step.value}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </section>

//           {/* 3. About & FAQs Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             {/* FAQs */}
//             <section>
//               <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
//                 <HelpCircle size={16} /> FAQs
//               </h3>
//               <div className="space-y-3">
//                 {data.faqs?.map((faq) => (
//                   <div key={faq.id} className="border-l-4 border-blue-500 pl-4 py-1">
//                     <p className="font-bold text-sm text-gray-900">{faq.title}</p>
//                     <p className="text-sm text-gray-600">{faq.description}</p>
//                   </div>
//                 ))}
//               </div>
//             </section>

//             {/* About Service */}
//             <section>
//               <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
//                 <FileText size={16} /> About Service
//               </h3>
//               {data.about_service?.map((about) => (
//                 <div key={about.id} className="space-y-3">
//                   <p className="font-bold">{about.title}</p>
//                   {about.media?.url && (
//                     <div className="relative h-40 w-full rounded-lg overflow-hidden border">
//                       <Image src={about.media.url} alt="about" fill className="object-cover" />
//                     </div>
//                   )}
//                   <p className="text-sm text-gray-600">{about.description}</p>
//                 </div>
//               ))}
//             </section>
//           </div>
//           </>
//   )}
// </div>

//         {/* Footer */}
//         <div className="p-4 border-t bg-gray-50 flex justify-end">
//           <button 
//             onClick={onClose}
//             className="px-6 py-2 bg-gray-900 text-white rounded-xl font-medium hover:bg-black transition-colors"
//           >
//             Close
//           </button>
//         </div>
//       {/* </div>
//     </div> */}

//     </motion.div>
//     </motion.div>
//     </AnimatePresence>
//   );
// }


"use client";

import { X, Info, HelpCircle, GitMerge, FileText, LayoutGrid, Calendar, Globe, Layers } from "lucide-react";
import Lottie from "lottie-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function ViewService({ data, onClose }) {
  if (!data) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="bg-white rounded-3xl w-full max-w-5xl max-h-[92vh] overflow-hidden flex flex-col shadow-2xl border border-slate-200 custom-scrollbar"
        >
          {/* STYLISH HEADER */}
          <div className="relative p-8 border-b bg-gradient-to-r from-slate-50 to-white flex justify-between items-center overflow-hidden shrink-0">
            <div className="absolute top-[-20px] left-[-20px] w-40 h-40 bg-blue-50 rounded-full blur-3xl opacity-60" />
            
            <div className="flex items-center gap-4 relative z-10">
              <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-200 text-white flex items-center justify-center overflow-hidden h-14 w-14">
                {data.icon?.url?.endsWith('.json') ? (
                  <Lottie animationData={data.icon.json_content} loop={true} className="w-full h-full scale-150" />
                ) : (
                  <LayoutGrid size={24} />
                )}
              </div>
              <div>
                <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">
                  {data.title}
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded text-[10px] font-bold uppercase tracking-wider border border-slate-200">
                    Service ID: #{data.id}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600 cursor-pointer border border-transparent hover:border-slate-200"
            >
              <X size={24} />
            </button>
          </div>

          {/* BODY */}
          <div className="p-8 overflow-y-auto space-y-10 custom-scrollbar bg-white">
            <div className="grid lg:grid-cols-3 gap-8">
              
              {/* LEFT CONTENT AREA (2/3) */}
              <div className="lg:col-span-2 space-y-10">
                
                {/* 1. OVERVIEW */}
                <section>
                  <h3 className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Layers size={12} /> Service Overview
                  </h3>
                  <div className="space-y-2">
                    <p className="text-xl font-bold text-slate-800">{data.sub_title}</p>
                    <p className="text-slate-600 leading-relaxed text-base">
                      {data.description}
                    </p>
                  </div>
                </section>

                {/* 2. PROCESS STEPS */}
                <section>
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <GitMerge size={12} /> Implementation Process
                  </h3>
                  <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100">
                    <h4 className="font-bold text-slate-800 mb-2">{data.process_section?.title}</h4>
                    <p className="text-sm text-slate-500 mb-6">{data.process_section?.description}</p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {data.process_section?.steps?.map((step, idx) => (
                        <div key={step.id || idx} className="flex gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                          <span className="shrink-0 bg-blue-600 text-white w-8 h-8 flex items-center justify-center rounded-xl text-xs font-black shadow-md shadow-blue-100">
                            {idx + 1}
                          </span>
                          <div>
                            <p className="font-bold text-slate-800 text-sm">{step.key}</p>
                            <p className="text-xs text-slate-500 mt-1 leading-relaxed">{step.value}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* 3. ABOUT SERVICE MEDIA */}
                <section>
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <FileText size={12} /> Visual Deep Dive
                  </h3>
                  <div className="grid gap-6">
                    {data.about_service?.map((about, idx) => (
                      <div key={about.id || idx} className="space-y-4">
                        <div className="relative aspect-video rounded-3xl overflow-hidden border-4 border-white shadow-xl bg-slate-100 group">
                          {about.media?.url && (
                            <Image src={about.media.url} alt="about" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                          )}
                        </div>
                        <div className="px-2">
                          <p className="font-black text-slate-900 text-lg">{about.title}</p>
                          <p className="text-slate-600 text-sm mt-2 leading-relaxed">{about.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              {/* RIGHT SIDEBAR (1/3) */}
              <div className="space-y-6">
                
                {/* STATUS & META */}
                <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 space-y-6">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Service URL</p>
                    <div className="flex items-center gap-2 p-3 bg-white border border-slate-200 rounded-xl font-mono text-xs text-blue-600 shadow-sm">
                      <Globe size={14} /> /{data.slug}
                    </div>
                  </div>

                  {/* <div className="pt-6 border-t border-slate-200 space-y-4">
                    <div className="flex items-center gap-3">
                       <div className="p-2 bg-white rounded-lg shadow-sm border border-slate-100 text-slate-400">
                          <Calendar size={16} />
                       </div>
                       <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Last Modified</p>
                          <p className="text-sm font-bold text-slate-700">Jan 27, 2026</p>
                       </div>
                    </div>
                  </div> */}
                </div>

                {/* FAQS ACCORDION STYLE */}
                <section className="bg-slate-900 rounded-3xl p-6 text-white shadow-2xl">
                  <h3 className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <HelpCircle size={14} /> Service FAQs
                  </h3>
                  <div className="space-y-6">
                    {data.faqs?.map((faq, idx) => (
                      <div key={faq.id || idx} className="group">
                        <p className="font-bold text-sm text-white group-hover:text-blue-400 transition-colors">
                          Q: {faq.title}
                        </p>
                        <p className="text-xs text-slate-400 mt-2 leading-relaxed border-l border-slate-700 pl-3">
                          {faq.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="p-6 border-t bg-slate-50/50 flex justify-end px-8 shrink-0">
            <button
              onClick={onClose}
              className="px-10 py-3 bg-slate-900 hover:bg-black text-white rounded-xl font-bold shadow-lg shadow-slate-200 transition-all active:scale-95 cursor-pointer"
            >
              Close Details
            </button>
          </div>
        </motion.div>
      </motion.div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
      `}</style>
    </AnimatePresence>
  );
}