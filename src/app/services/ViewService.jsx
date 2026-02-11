

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
           {/* BODY */}
          <div className="p-8 overflow-y-auto space-y-12 custom-scrollbar bg-white">
            <div className="grid lg:grid-cols-2 gap-10">
              
              {/* LEFT CONTENT AREA (2/3) */}
              <div className="lg:col-span-2 space-y-12">
                
                {/* 1. OVERVIEW & SUBTITLE */}
                <section>
                  <h3 className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Layers size={12} /> Service Core
                  </h3>
                  <div className="space-y-4 px-4 flex flex-row gap-10 justify-between flex-wrap">
                    <p className="text-2xl font-black text-slate-900 leading-tight whitespace-pre-line">
                        {data.sub_title}
                    </p>

                   <div className="flex">
                    <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest flex items-center gap-2">
                        <Globe size={12} /> slugs
                    </p>
                    <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl font-mono text-xs text-gray-700 backdrop-blur-md">
                      <span>/{data.slug}</span>
                      {/* <CheckCircle2 size={14} className="text-green-400" /> */}
                    </div>
                  </div>
                
                    <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 italic text-slate-600 leading-relaxed text-lg">
                      "{data.description}"
                    </div>
                  </div>


                  {/* <div className="w-full md:w-1/2 relative aspect-video rounded-[2rem] overflow-hidden border-4 border-white shadow-2xl bg-slate-100 group">
                          {icon_url ? (
                            <Image src={icon_url} alt={data.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                          ) : (
                             <div className="w-full h-full flex items-center justify-center bg-purple-50 text-purple-200 font-black">IMAGE ASSET</div>
                          )}
                  </div> */}

                </section>

                {/* faq */}
                

                {/* FAQS ACCORDION STYLE */}
                <section className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-xl">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <HelpCircle size={14} /> Service FAQ Support
                  </h3>
                  <div className="space-y-8">
                    {data.faqs?.map((faq) => (
                      <div key={faq.id} className="group cursor-default">
                        <div className="flex items-start gap-3">
                            <span className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-500 group-hover:scale-150 transition-transform" />
                            <p className="font-black text-sm text-slate-800 leading-snug group-hover:text-blue-600 transition-colors">
                            {faq.title}
                            </p>
                        </div>
                        <p className="text-xs text-slate-500 mt-3 leading-relaxed border-l-2 border-slate-100 pl-4 py-1">
                          {faq.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
            


                {/* 2. PROCESS STEPS WITH MEDIA */}
                <section>
                  <h3 className="text-[10px] font-black text-orange-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <GitMerge size={12} /> Product Engineering Roadmap
                  </h3>
                  <div className="bg-orange-50/30 rounded-[2.5rem] p-8 border border-orange-100 space-y-8">
                    <div className="flex flex-col md:flex-row justify-between gap-6">
                        <div className="flex-1">
                            <h4 className="text-2xl font-black text-slate-800 mb-2">{data.process_title}</h4>
                            {data.process_sub_title && <p className="text-orange-600 font-bold mb-2">{data.process_sub_title}</p>}
                            <p className="text-slate-500 leading-relaxed">{data.process_description}</p>
                        </div>
                        {data.process_media_url && (
                            <div className="w-full md:w-48 h-32 rounded-2xl overflow-hidden bg-white shadow-sm border border-orange-100 shrink-0">
                                <Image src={data.process_media_url} alt="process" width={200} height={150} className="object-cover w-full h-full" />
                            </div>
                        )}
                    </div>

                    <div className="grid sm:grid-cols-1 gap-4">
                      {data.process?.map((step, idx) => (
                        <div key={step.id} className="flex gap-5 p-5 bg-white rounded-2xl border border-orange-100 shadow-sm group hover:border-orange-400 transition-colors">
                          <div className="shrink-0 bg-orange-500 text-white w-10 h-10 flex items-center justify-center rounded-xl text-sm font-black shadow-lg shadow-orange-100 group-hover:scale-110 transition-transform">
                            {idx + 1}
                          </div>
                          <div>
                            <p className="font-black text-slate-800 text-base">{step.key}</p>
                            <p className="text-sm text-slate-500 mt-1 leading-relaxed">{step.value}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* 3. ABOUT SERVICE MEDIA SECTIONS */}
                <section>
                  <h3 className="text-[10px] font-black text-purple-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <FileText size={12} /> Feature Deep-Dive
                  </h3>
                  <div className="space-y-12">
                    {data.about_service?.map((about, idx) => (
                      <div key={about.id} className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-start`}>
                        
                        <div className="w-full md:w-1/2 pt-2">
                          <div className="inline-block px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-[10px] font-black uppercase mb-3">Module 0{idx+1}</div>
                          <h4 className="font-black text-slate-900 text-2xl leading-tight mb-4">{about.title}</h4>
                          <p className="text-slate-600 text-sm leading-loose whitespace-pre-line bg-slate-50 p-6 rounded-2xl border border-slate-100">
                            {about.description}
                          </p>
                        </div>

                        <div className="w-full md:w-1/2 relative aspect-video rounded-[2rem] overflow-hidden border-4 border-white shadow-2xl bg-slate-100 group">
                          {about.media_url ? (
                            <Image src={about.media_url} alt={about.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                          ) : (
                             <div className="w-full h-full flex items-center justify-center bg-purple-50 text-purple-200 font-black">IMAGE ASSET</div>
                          )}
                        </div>

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






























// "use client";

// import { X, Info, HelpCircle, GitMerge, FileText, LayoutGrid, Calendar, Globe, Layers, CheckCircle2, Clock } from "lucide-react";
// import Lottie from "lottie-react";
// import Image from "next/image";
// import { motion, AnimatePresence } from "framer-motion";

// export default function ViewService({ data, onClose }) {
//   if (!data) return null;

//   // Helper to format dates from API
//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
//     return new Date(dateString).toLocaleDateString('en-US', {
//       month: 'short', day: 'numeric', year: 'numeric'
//     });
//   };

//   return (
//     <AnimatePresence>
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
//       >
//         <motion.div
//           initial={{ scale: 0.95, opacity: 0, y: 20 }}
//           animate={{ scale: 1, opacity: 1, y: 0 }}
//           exit={{ scale: 0.95, opacity: 0, y: 20 }}
//           className="bg-white rounded-3xl w-full max-w-6xl max-h-[94vh] overflow-hidden flex flex-col shadow-2xl border border-slate-200 custom-scrollbar"
//         >
//           {/* STYLISH HEADER */}
//           <div className="relative p-8 border-b bg-gradient-to-r from-slate-50 to-white flex justify-between items-center overflow-hidden shrink-0">
//             <div className="absolute top-[-20px] left-[-20px] w-40 h-40 bg-blue-50 rounded-full blur-3xl opacity-60" />
            
//             <div className="flex items-center gap-5 relative z-10">
//               <div className="p-1 bg-blue-600 rounded-2xl shadow-lg shadow-blue-200 text-white flex items-center justify-center overflow-hidden h-16 w-16">
//                 {data.icon_url?.endsWith('.json') ? (
//                   <Lottie animationData={data.icon} loop={true} className="w-full h-full scale-110" />
//                 ) : (
//                   <LayoutGrid size={28} />
//                 )}
//               </div>
//               <div>
//                 <h2 className="text-3xl font-black text-slate-800 tracking-tight">
//                   {data.title}
//                 </h2>
//                 <div className="flex items-center gap-3 mt-1">
//                   <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-[10px] font-black uppercase tracking-wider border border-blue-100">
//                     ID: #{data.id}
//                   </span>
//                   <span className="flex items-center gap-1 text-slate-400 text-[10px] font-bold uppercase">
//                     <Clock size={12} /> Updated {formatDate(data.updated_at)}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             <button
//               onClick={onClose}
//               className="p-2 hover:bg-red-50 rounded-full transition-colors text-slate-400 hover:text-red-500 cursor-pointer border border-transparent hover:border-red-100"
//             >
//               <X size={28} />
//             </button>
//           </div>

        

//           {/* FOOTER */}
//           <div className="p-6 border-t bg-slate-50/80 backdrop-blur-md flex justify-end px-10 shrink-0">
//             <button
//               onClick={onClose}
//               className="px-12 py-4 bg-slate-900 hover:bg-black text-white rounded-2xl font-black shadow-xl shadow-slate-200 transition-all active:scale-95 cursor-pointer uppercase tracking-widest text-xs"
//             >
//               Exit View
//             </button>
//           </div>
//         </motion.div>
//       </motion.div>

//       <style jsx global>{`
//         .custom-scrollbar::-webkit-scrollbar { width: 6px; }
//         .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
//         .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
//       `}</style>
//     </AnimatePresence>
//   );
// }