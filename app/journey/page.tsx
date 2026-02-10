"use client";

import { memories } from "@/data/memories";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import CornerImages from "@/components/CornerImages";

import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";

export default function JourneyQuiz() {
  const router = useRouter();
  const FULL_SCORE = memories.reduce((acc, m) => acc + m.points, 0);

  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [score, setScore] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [openCalendar, setOpenCalendar] = useState<number | null>(null);

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
        results[i] = { type: "error", message: "Date choose garnu parxa nita baby" };
      } else if (answers[i] !== m.date) {
        results[i] = {
          type: "error",
          message: "I am sorry to say siju baby this one is wrong hai!!!!",
        };
      } else {
        total += m.points;
        results[i] = {
          type: "success",
          message: "congratulation tapai core pati chadai hunxa ❤️",
        };
      }
    });

    setFieldResults(results);

    // ALWAYS show score
    setScore(total);
  };

  const handleNext = () => router.push("/valentine");

  const handleRetry = () => {
    setScore(null);
    setAnswers({});
    setError(null);
  };

  const progress = (Object.keys(answers).length / memories.length) * 100;

  return (
    <div className="min-h-screen flex flex-col items-center py-16 bg-pink-50 px-4">
      <h1 className="text-4xl font-semibold mb-6 text-black">
        Our Journey Quiz ❤️
      </h1>

      {/* Progress Bar */}
      <div className="w-full max-w-xl bg-gray-300 h-3 rounded-full mb-8">
        <div
          className="bg-pink-500 h-3 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="w-full max-w-xl space-y-6">
        {memories.map((m, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow relative">
            <p className="font-semibold mb-2 text-black">{m.title}</p>

            {/* calendar button */}
            <button
              type="button"
              onClick={() =>
                setOpenCalendar(openCalendar === i ? null : i)
              }
              className={`border p-3 rounded-xl w-full text-left text-black
              ${
                fieldResults[i]?.type === "error"
                  ? "border-red-500"
                  : fieldResults[i]?.type === "success"
                  ? "border-green-500"
                  : "border-gray-300"
              }`}
            >
              {answers[i] || "Select date"}
            </button>

            {/* popup calendar */}
            {openCalendar === i && (
              <div className="absolute z-20 bg-white shadow-xl rounded-xl mt-2 p-3">
                <DayPicker
                  mode="single"
                  onSelect={(date) => {
                    if (!date) return;
                    const formatted = format(date, "yyyy-MM-dd");
                    handleChange(i, formatted);
                    setOpenCalendar(null);
                  }}
                  className="text-black"
                  classNames={{
                    day: "text-black font-medium hover:bg-pink-200 rounded-md",
                    caption: "text-black font-semibold",
                    nav_button: "text-black",
                    head_cell: "text-gray-700 font-semibold",
                  }}
                  modifiersClassNames={{
                    selected: "bg-pink-500 text-white",
                  }}
                />
              </div>
            )}

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
          "/image/fourth.JPG",
          "/image/second.JPG",
          "/image/third.JPG",
        ]}
      />
      

      {score !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 flex flex-col items-center gap-4"
        >
        <p className="text-3xl font-bold text-red-500">
          Love Score: {score} / {FULL_SCORE} ❤️
        </p>


          {/* <button
            onClick={handleNext}
            className="px-8 py-3 bg-green-500 text-white rounded-2xl text-lg"
          >
            Next
          </button> */}

  
          {score >= FULL_SCORE ? (
            <>
                  <h6 className="text font-semibold mb-6 text-black">
                La Next part ko lagi next ma click garnu hola ❤️
            </h6>
  
            <button
              onClick={handleNext}
              className="px-8 py-3 bg-green-500 text-white rounded-2xl text-lg"
            >
              NextPart
            </button>
            </>
          ) : (
            <button
              onClick={handleRetry}
              className="px-8 py-3 bg-red-500 text-white rounded-2xl text-lg"
            >
              Retry
            </button>
          )}
        </motion.div>
      )}
    </div>
  );
}
