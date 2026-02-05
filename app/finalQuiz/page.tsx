"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function FinalQuiz() {
  const FULL_SCORE = 100; // replace with your full points
  const [score, setScore] = useState(0); // this should come from previous page
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-pink-50 p-6">
      <h1 className="text-4xl font-bold mb-8">Your Love Score ❤️</h1>
      <p className="text-2xl mb-6">Score: {score} / {FULL_SCORE}</p>

      {score >= FULL_SCORE ? (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="px-10 py-4 bg-pink-500 text-white rounded-2xl text-xl"
          onClick={() => router.push("/valentine")}
        >
          Next
        </motion.button>
      ) : (
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="px-10 py-4 bg-gray-400 text-white rounded-2xl text-xl"
          onClick={() => setScore(0)}
        >
          Retry
        </motion.button>
      )}
    </div>
  );
}
