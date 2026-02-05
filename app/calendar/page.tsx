"use client";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { memories } from "@/data/memories";
import { format } from "date-fns";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoveCalendar() {
  const [selectedMessage, setSelectedMessage] = useState<string>("");

  const getMemory = (date: Date) => {
    const formatted = format(date, "yyyy-MM-dd");
    return memories.find((m) => m.date === formatted);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-pink-50">
        
      <h1 className="text-4xl font-bold mb-6">Our Love Calendar ❤️</h1>

      <Calendar
        onClickDay={(date) => {
          const found = getMemory(date);
          if (found) setSelectedMessage(`${found.title} — ${found.description}`);
          else setSelectedMessage("No special memory on this day");
        }}
        tileContent={({ date, view }) => {
          if (view === "month") {
            const found = getMemory(date);
            return found ? (
              <div className="text-[10px] text-pink-700 font-bold mt-1 text-center">
                {found.title}
              </div>
            ) : null;
          }
        }}
        tileClassName={({ date, view }) => {
          if (view === "month") {
            const found = getMemory(date);
            return found ? "bg-pink-100 rounded-lg" : "";
          }
        }}
      />

      <AnimatePresence>
        {selectedMessage && (
          <motion.div
            key={selectedMessage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-6 p-4 bg-white rounded-xl shadow-lg text-center text-pink-700 font-semibold"
          >
            {selectedMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
