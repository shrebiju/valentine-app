"use client";

import { motion } from "framer-motion";

export default function TimelineCard({ title, description, date }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white p-6 rounded-2xl shadow-xl max-w-md w-full"
    >
      <p className="text-sm text-gray-400">{date}</p>
      <h2 className="text-2xl font-bold mt-2">{title}</h2>
      <p className="mt-2">{description}</p>
    </motion.div>
  );
}
