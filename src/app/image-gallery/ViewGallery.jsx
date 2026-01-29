// "use client";

// import { X, LucideImage, Hash, Calendar, Layers, Eye, Maximize2 } from "lucide-react";
// import Image from "next/image";
// import { motion, AnimatePresence } from "framer-motion";

// export default function ViewGallery({ data, onClose }) {
//   if (!data) return null;

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
//           className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden flex flex-col shadow-2xl border border-slate-200"
//         >
//           {/* STYLISH HEADER */}
//           <div className="relative p-6 border-b bg-gradient-to-r from-slate-50 to-white flex justify-between items-center overflow-hidden">
//             {/* Background Decoration */}
//             <div className="absolute top-[-20px] left-[-20px] w-32 h-32 bg-blue-50 rounded-full blur-3xl opacity-60" />
            
//             <div className="flex items-center gap-3 relative z-10">
//               <div className="p-2.5 bg-blue-600 rounded-xl shadow-lg shadow-blue-200 text-white">
//                 <LucideImage size={22} />
//               </div>
//               <div>
//                 <h2 className="text-xl font-bold text-slate-800 tracking-tight">
//                   Gallery Asset Preview
//                 </h2>
//                 <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
//                   Asset ID: #{data.id}
//                 </p>
//               </div>
//             </div>

//             <button
//               onClick={onClose}
//               className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600 cursor-pointer border border-transparent hover:border-slate-200"
//             >
//               <X size={20} />
//             </button>
//           </div>

//           {/* BODY */}
//           <div className="p-8 space-y-8">
//             {/* High-Resolution Preview Card */}
//             <div className="relative group aspect-square md:aspect-video w-full bg-slate-100 rounded-3xl overflow-hidden border-4 border-white shadow-xl">
//                <Image 
//                  src={data.image_url || "/placeholder.png"} 
//                  alt="Gallery Large Preview" 
//                  fill 
//                  className="object-cover group-hover:scale-105 transition-transform duration-700"
//                />
//                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
//                   <Maximize2 className="text-white drop-shadow-md" size={48} />
//                </div>
//             </div>

//             {/* Info Grid */}
//             <div className="grid grid-cols-2 gap-4">
//                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-4">
//                   <div className="h-12 w-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-sm text-blue-600">
//                     <Hash size={24} />
//                   </div>
//                   <div>
//                     <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Display Order</span>
//                     <p className="text-lg font-black text-slate-700">Sequence {data.sequence ?? "0"}</p>
//                   </div>
//                </div>
               
//                {/* <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-4">
//                   <div className="h-12 w-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-sm text-slate-400">
//                     <Calendar size={24} />
//                   </div>
//                   <div>
//                     <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Upload Date</span>
//                     <p className="text-lg font-black text-slate-700">Jan 27, 2026</p>
//                   </div>
//                </div> */}
//             </div>

//             {/* Meta System Card */}
//             {/* <div className="bg-slate-900 rounded-2xl p-5 flex items-center justify-between text-white/70">
//                 <div className="flex items-center gap-3">
//                    <Layers size={14} className="opacity-50" />
//                    <span className="text-xs font-medium">Placement: Primary Gallery</span>
//                 </div>
//                 <div className="flex items-center gap-2 px-3 py-1 bg-green-500/20 rounded-full text-[10px] font-black text-green-400 uppercase tracking-widest border border-green-500/30">
//                    ● Published
//                 </div>
//             </div> */}
//           </div>

//           {/* ACTION FOOTER */}
//           <div className="p-6 border-t bg-slate-50/50 flex justify-end px-8">
//             <button
//               onClick={onClose}
//               className="px-10 py-3 bg-slate-900 hover:bg-black text-white rounded-xl font-bold shadow-lg shadow-slate-200 transition-all active:scale-95 cursor-pointer"
//             >
//               Close Preview
//             </button>
//           </div>
//         </motion.div>
//       </motion.div>
//     </AnimatePresence>
//   );
// }

"use client";

import { X, LucideImage, Hash, Maximize2 } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function ViewGallery({ data, onClose }) {
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
          /* Added max-h and overflow-y-auto for scrolling */
          className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col shadow-2xl border border-slate-200 custom-scrollbar"
        >
          {/* STYLISH HEADER - Sticky so it stays visible while scrolling */}
          <div className="sticky top-0 z-20 relative p-6 border-b bg-white/80 backdrop-blur-md flex justify-between items-center overflow-hidden">
            <div className="absolute top-[-20px] left-[-20px] w-32 h-32 bg-blue-50 rounded-full blur-3xl opacity-60" />
            
            <div className="flex items-center gap-3 relative z-10">
              <div className="p-2.5 bg-blue-600 rounded-xl shadow-lg shadow-blue-200 text-white">
                <LucideImage size={22} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-800 tracking-tight">
                  Gallery Asset Preview
                </h2>
                <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                  Asset ID: #{data.id}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600 cursor-pointer border border-transparent hover:border-slate-200 relative z-10"
            >
              <X size={20} />
            </button>
          </div>

          {/* BODY */}
          <div className="p-6 md:p-8 space-y-8 flex-grow">
            {/* High-Resolution Preview Card */}
            <div className="relative group aspect-square md:aspect-video w-full bg-slate-100 rounded-3xl overflow-hidden border-4 border-white shadow-xl">
               <Image 
                 src={data.image_url || "/placeholder.png"} 
                 alt="Gallery Large Preview" 
                 fill 
                 className="object-cover group-hover:scale-105 transition-transform duration-700"
                 priority
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Maximize2 className="text-white drop-shadow-md" size={48} />
               </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-sm text-blue-600">
                    <Hash size={24} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Display Order</span>
                    <p className="text-lg font-black text-slate-700">Sequence {data.sequence ?? "0"}</p>
                  </div>
               </div>
            </div>
          </div>

          {/* ACTION FOOTER - Sticky at the bottom */}
          <div className="sticky bottom-0 z-20 p-6 border-t bg-slate-50/80 backdrop-blur-md flex justify-end px-8">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-10 py-3 bg-slate-900 hover:bg-black text-white rounded-xl font-bold shadow-lg shadow-slate-200 transition-all active:scale-95 cursor-pointer"
            >
              Close Preview
            </button>
          </div>
        </motion.div>

        {/* Custom Scrollbar Styles */}
        <style jsx global>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #e2e8f0;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #cbd5e1;
          }
        `}</style>
      </motion.div>
    </AnimatePresence>
  );
}