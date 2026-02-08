"use client";

import { memories } from "@/data/memories";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import CornerImages from "@/components/CornerImages";

export default function JourneyQuiz() {
  const router = useRouter();
  const FULL_SCORE = memories.reduce((acc, m) => acc + m.points, 0);

  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [score, setScore] = useState<number | null>(null);

  const handleChange = (i: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [i]: value }));
  };

  const calculateScore = () => {
    let total = 0;
    memories.forEach((m, i) => {
      if (answers[i] === m.date) total += m.points;
    });
    setScore(total);
  };

  const handleNext = () => router.push("/valentine");
  const handleRetry = () => {
    setScore(null);
    setAnswers({});
  };

  const progress = (Object.keys(answers).length / memories.length) * 100;

  return (
    <div className="min-h-screen flex flex-col items-center py-16 bg-pink-50 px-4">
      <h1 className="text-4xl font-semibold mb-6 text-black">Our Journey Quiz ❤️</h1>

      <CornerImages
        images={[
          "/image/image2.jpg",
          "/image/image2.jpg",
          "/image/image2.jpg",
          "/image/image2.jpg",
        ]}
      />
      {/* Progress Bar */}
      <div className="w-full max-w-xl bg-gray-300 h-3 rounded-full mb-8">
        <div
          className="bg-pink-500 h-3 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="w-full max-w-xl space-y-6">
        {memories.map((m, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow">
            <p className="font-semibold mb-2 text-black">{m.title}</p>
            <input
              type="date"
              className="border p-3 rounded-xl w-full text-black"
              onChange={(e) => handleChange(i, e.target.value)}
              value={answers[i] || ""}
            />
          </div>
        ))}
      </div>

      <button
        onClick={calculateScore}
        className="mt-10 px-8 py-4 bg-pink-500 text-white rounded-2xl text-lg"
      >
        Reveal Our Love Score
      </button>
      <CornerImages
        container="fullimage"
        images={[
          "/image/image1.jpg",
          "/image/image2.jpg",
          "/image/image3.jpg",
          "/image/image5.jpg",
          "/image/image6.jpg",
          "/image/image7.jpg",
        ]}
      />

      {score !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 flex flex-col items-center gap-4"
        >
          <p className="text-3xl font-bold text-black">Love Score: {score} ❤️</p>


            <button
              onClick={handleNext}
              className="px-8 py-3 bg-green-500 text-white rounded-2xl text-lg"
            >
              Next
            </button>
        
            <button
              onClick={handleRetry}
              className="px-8 py-3 bg-red-500 text-white rounded-2xl text-lg"
            >
              Retry
            </button>
        
        </motion.div>
      )}
      
      
    </div>
  );
}
