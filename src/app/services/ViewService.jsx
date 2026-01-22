import { X, Info, HelpCircle, GitMerge, FileText } from "lucide-react";
import Lottie from "lottie-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion"; // Add this



export default function ViewService({ data, onClose }) {
  if (!data) return null;
  

  return (

    <AnimatePresence>
        <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
      >

    {/* <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"> */}
        
        {/* Modal Header */}
        <div className="p-6 border-b flex justify-between items-center bg-gray-50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Info className="text-blue-600" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{data.title} Details</h2>
              <p className="text-sm text-gray-500">Service ID: #{data.id}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Modal Body (Scrollable) */}
        <div className="p-6 overflow-y-auto space-y-8">
            {!data.title ? (
    // Skeleton Loader
    <div className="animate-pulse space-y-6">
      <div className="h-8 bg-gray-200 rounded w-1/3"></div>
      <div className="h-32 bg-gray-100 rounded-xl"></div>
      <div className="grid grid-cols-2 gap-4">
        <div className="h-40 bg-gray-100 rounded-xl"></div>
        <div className="h-40 bg-gray-100 rounded-xl"></div>
      </div>
    </div>
  ) : (
    <>
          
          {/* 1. Basic Info */}
          <section>
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl">
              <div>
                <p className="text-xs text-gray-500">Sub Title</p>
                <p className="font-medium">{data.sub_title || "N/A"}</p>
              </div>

              {/* Header mein title ke paas ya basic info mein icon dikhane ke liye */}
<div className="h-16 w-16 mb-4">
  {data.icon?.url?.endsWith('.json') ? (
    <Lottie 
      animationData={data.icon.json_content} // Ensure your API provides the JSON object here
      loop={true} 
    />
  ) : (
    <Image 
      src={data.icon?.url || "/placeholder.png"} 
      alt="icon" 
      width={64} 
      height={64} 
      className="object-contain"
    />
  )}
</div>

              <div>
                <p className="text-xs text-gray-500">Slug</p>
                <p className="font-mono text-blue-600">{data.slug}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-xs text-gray-500">Description</p>
                <p className="text-gray-700 leading-relaxed">{data.description}</p>
              </div>
            </div>
          </section>

          {/* 2. Process Section */}
          <section>
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <GitMerge size={16} /> Process Section
            </h3>
            <div className="border rounded-xl p-4">
              <h4 className="font-bold text-lg">{data.process_section?.title}</h4>
              <p className="text-gray-600 mb-4">{data.process_section?.description}</p>
              <div className="space-y-2">
                {data.process_section?.steps?.map((step) => (
                  <div key={step.id} className="flex items-center gap-3 bg-blue-50 p-3 rounded-lg">
                    <span className="bg-blue-600 text-white w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold">
                      {step.id}
                    </span>
                    <div>
                      <p className="font-bold text-sm">{step.key}</p>
                      <p className="text-sm text-gray-600">{step.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 3. About & FAQs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* FAQs */}
            <section>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <HelpCircle size={16} /> FAQs
              </h3>
              <div className="space-y-3">
                {data.faqs?.map((faq) => (
                  <div key={faq.id} className="border-l-4 border-blue-500 pl-4 py-1">
                    <p className="font-bold text-sm text-gray-900">{faq.title}</p>
                    <p className="text-sm text-gray-600">{faq.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* About Service */}
            <section>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <FileText size={16} /> About Service
              </h3>
              {data.about_service?.map((about) => (
                <div key={about.id} className="space-y-3">
                  <p className="font-bold">{about.title}</p>
                  {about.media?.url && (
                    <div className="relative h-40 w-full rounded-lg overflow-hidden border">
                      <Image src={about.media.url} alt="about" fill className="object-cover" />
                    </div>
                  )}
                  <p className="text-sm text-gray-600">{about.description}</p>
                </div>
              ))}
            </section>
          </div>
          </>
  )}
</div>

        {/* Footer */}
        <div className="p-4 border-t bg-gray-50 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-gray-900 text-white rounded-xl font-medium hover:bg-black transition-colors"
          >
            Close
          </button>
        </div>
      {/* </div>
    </div> */}

    </motion.div>
    </motion.div>
    </AnimatePresence>
  );
}