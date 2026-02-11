"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Phone, User, MessageSquare } from "lucide-react";

export default function ViewContact({ data, onClose }) {
  if (!data) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        initial={{opacity:0}}
        animate={{opacity:1}}
        exit={{opacity:0}}
      >
        <motion.div
          initial={{scale:.9, opacity:0}}
          animate={{scale:1, opacity:1}}
          exit={{scale:.9, opacity:0}}
          className="bg-white w-full max-w-lg rounded-3xl shadow-2xl"
        >

          <div className="p-6 border-b flex justify-between">
            <h2 className="text-xl font-bold">
              Contact Details
            </h2>

            <X onClick={onClose} className="cursor-pointer"/>
          </div>

          <div className="p-8 space-y-6">

            <InfoRow icon={<User size={16}/>} label="Name" value={data.name}/>
            <InfoRow icon={<Mail size={16}/>} label="Email" value={data.email}/>
            <InfoRow icon={<Phone size={16}/>} label="Phone" value={data.phone || "-"}/>
            <InfoRow icon={<MessageSquare size={16}/>} label="Message" value={data.message}/>

          </div>

          <div className="p-6 border-t flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-black text-white rounded-xl"
            >
              Close
            </button>
          </div>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function InfoRow({icon, label, value}) {
  return (
    <div>
      <div className="text-xs text-gray-400 flex gap-1 items-center">
        {icon} {label}
      </div>
      <p className="font-bold">{value}</p>
    </div>
  );
}