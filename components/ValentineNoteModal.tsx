"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";


export default function ValentineNoteModal({ note }: { note: string }) {
  const [open, setOpen] = useState(false);
  

  return (
    <div className="">
      <button
        onClick={() => setOpen(true)}
        className="px-6 py-3 rounded-2xl bg-pink-500 text-white font-semibold shadow-lg hover:scale-105 transition"
      >
        Open Valentine Note 💌
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 40 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md rounded-[32px] bg-white shadow-2xl overflow-hidden"
            >
              {/* Header like iPhone Notes */}
              <div className="flex items-center justify-between px-5 py-4 border-b bg-gradient-to-r from-pink-100 to-rose-100">
                <h2 className="font-semibold text-gray-700">Valentine Note</h2>
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-full hover:bg-white/70 transition"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </div>

              {/* Note area */}
              <div className="p-5">
                <textarea
                  value={note}
                  readOnly
                  className="w-full h-64 resize-none outline-none text-gray-700 leading-7 text-lg placeholder-pink-300"
                />
              </div>

              {/* Footer */}
              <div className="px-5 pb-5 text-right text-xs text-gray-400">
                Made with ❤️
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
