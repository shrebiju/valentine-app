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
  const [error, setError] = useState<string | null>(null);
  const [fieldResults, setFieldResults] = useState<{
    [key: number]: { type: "success" | "error"; message: string };
  }>({});  


  const handleChange = (i: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [i]: value }));
  };

  const calculateScore = () => {
    let total = 0;
    let results: {
      [key: number]: { type: "success" | "error"; message: string };
    } = {};
  
    memories.forEach((m, i) => {
      if (!answers[i]) {
        results[i] = { type: "error", message: "Please select a date" };
      } else if (answers[i] !== m.date) {
        results[i] = { type: "error", message: "I am sorry to say siju baby this one is wrong hai!!!!" };
      } else {
        total += m.points;
        results[i] = { type: "success", message: "congratulation tapai core pati chadai hunxa ❤️" };
      }
    });
  
    setFieldResults(results);
  
    // show score only if all correct
    const hasErrors = Object.values(results).some(r => r.type === "error");
    if (!hasErrors) setScore(total);
    else setScore(null);
  };
  

  const handleNext = () => router.push("/valentine");

  const handleRetry = () => {
    setScore(null);
    setAnswers({});
    setError(null);
  };

  const progress = (Object.keys(answers).length / memories.length) * 100;
  const isComplete = Object.keys(answers).length === memories.length;

  return (
    <div className="min-h-screen flex flex-col items-center py-16 bg-pink-50 px-4">
      <h1 className="text-4xl font-semibold mb-6 text-black">
        Our Journey Quiz ❤️
      </h1>

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
  className={`border p-3 rounded-xl w-full text-black
    ${
      fieldResults[i]?.type === "error"
        ? "border-red-500"
        : fieldResults[i]?.type === "success"
        ? "border-green-500"
        : "border-gray-300"
    }`}
  onChange={(e) => handleChange(i, e.target.value)}
  value={answers[i] || ""}
/>

{fieldResults[i] && (
  <p
    className={`text-sm mt-1 ${
      fieldResults[i].type === "error"
        ? "text-red-500"
        : "text-green-500"
    }`}
  >
    {fieldResults[i].message}
  </p>
)}




          </div>
        ))}
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-red-500 font-medium mt-6">{error}</p>
      )}

      <button
        onClick={calculateScore}
        // disabled={!isComplete}
        className="mt-10 px-8 py-4 bg-pink-500 text-white rounded-2xl text-lg disabled:opacity-50"
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
          <p className="text-3xl font-bold text-black">
            Love Score: {score} / {FULL_SCORE} ❤️
          </p>

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
       <button
            onClick={handleNext}
            className="px-8 py-3 bg-green-500 text-white rounded-2xl text-lg"
          >
            Next
          </button>
    </div>
  );
}
