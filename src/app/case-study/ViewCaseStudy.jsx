import { X, Trophy, AlertCircle, Quote, Rocket, Briefcase } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function ViewCaseStudy({ data, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center overflow-hidden justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-white rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
      >
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-center bg-gray-50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Briefcase className="text-purple-600" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{data.title}</h2>
              <p className="text-sm text-gray-500">
                Client: {data.client_name}
              </p>
              <p className="text-sm text-gray-500">Position: {data.position}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="p-8 overflow-y-auto space-y-10">
          {/* 1. Project Overview */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-3">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Rocket size={20} className="text-purple-500" /> Project
                Description
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                {data.description}
              </p>
            </div>
            <div className="bg-purple-50 p-5 rounded-2xl space-y-4">
              <div className="text-xs font-bold text-purple-400 uppercase">
                Project Stats
              </div>
              <div>
                <p className="text-xs text-gray-500">Services</p>
                <p className="font-bold text-sm">{data.services}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Team Size</p>
                <p className="font-bold text-sm">{data.team_size}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Duration</p>
                <p className="font-bold text-sm">{data.duration}</p>
              </div>
            </div>
          </section>

          {/* <section className=" pt-4">
            <div>
              <p className="text-xs text-gray-500">Tech Stacks</p>
              <p className="font-bold text-sm">
                {data.TechStacks?.map((t) => t.TechStack?.Name).join(", ") ||
                  "N/A"}
              </p>
            </div>
          </section> */}


           
          {/* Project Banner */}
          <section className="space-y-4">
            <h3 className="text-lg font-bold">Project Banner</h3>

            {data?.banner_url ? (
              <div className="relative h-48 w-full rounded-xl overflow-hidden border group">
                <Image
                  src={data.banner_url}
                  alt={data.title || "Project Banner"}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                  priority
                />
              </div>
            ) : (
              <p className="text-sm text-gray-400">No banner available</p>
            )}
          </section>



          {/* 2. Challenges & Solution */}
          {/* <section className="space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2 text-red-500">
              <AlertCircle size={20} /> Challenges & Solutions
            </h3>
            {data.Challenges?.map((ch) => (
              <div
                key={ch.id}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <div className="bg-red-50 p-4 rounded-xl border border-red-100">
                  <p className="text-xs font-bold text-red-400 mb-1">
                    CHALLENGE
                  </p>
                  <p className="text-sm text-gray-700">{ch.challenge}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                  <p className="text-xs font-bold text-green-400 mb-1">
                    SOLUTION
                  </p>
                  <p className="text-sm text-gray-700">{ch.solution}</p>
                </div>
              </div>
            ))}
          </section> */}

          {/* 3. Results (Impact) */}
          {/* <section className="space-y-4 bg-gray-900 text-white p-8 rounded-3xl">
            <div className="flex items-center gap-2 text-yellow-400 font-bold text-lg">
              <Trophy size={20} /> {data.Results?.Title || "Impact"}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.Results?.bullet_points?.map((point, idx) => (
                <div key={idx} className="flex items-start gap-3 text-sm">
                  <div className="h-2 w-2 bg-yellow-400 rounded-full mt-1.5 shrink-0" />
                  <p className="text-gray-300">{point}</p>
                </div>
              ))}
            </div>
          </section> */}

          {/* 4. Project Images */}
          <section className="space-y-4">
            <h3 className="text-lg font-bold">Project Screenshots</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {data.Images?.map((img) => (
                <div
                  key={img.id}
                  className="relative h-32 rounded-xl overflow-hidden border group"
                >
                  <Image
                    src={img.image_url}
                    alt="work"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* 5. Testimonial */}
          {/* {data.Testimonials && (
            <section className="bg-blue-50 p-6 rounded-2xl border-l-4 border-blue-500">
              <Quote className="text-blue-200 mb-2" size={40} />
              <p className="italic text-gray-700 mb-4">
                "{data.Testimonials.feedback}"
              </p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-blue-200 rounded-full flex items-center justify-center font-bold text-blue-600">
                  {data.client_name[0]}
                </div>
                <div>
                  <p className="font-bold text-sm">{data.client_name}</p>
                  <p className="text-xs text-gray-500">{data.position}</p>
                </div>
              </div>
            </section>
          )} */}
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-gray-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-8 py-2 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-colors"
          >
            Done
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}


