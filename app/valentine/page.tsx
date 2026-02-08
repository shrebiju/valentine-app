"use client";

import { useState, useEffect, useRef } from "react";
import Confetti from "react-confetti";
import { motion } from "framer-motion";
import CornerImages from "@/components/CornerImages";

export default function ValentineFull() {
  const [yesClicked, setYesClicked] = useState(false);
  const [noClickCount, setNoClickCount] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const noBtnRef = useRef<HTMLButtonElement>(null);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [fireworks, setFireworks] = useState<
    { id: number; x: number; y: number; emoji: string }[]
  >([]);

  /* ----------------- Helpers ----------------- */
  const clamp = (value: number, min: number, max: number) =>
    Math.min(Math.max(value, min), max);

  /* ----------------- Window Size ----------------- */
  useEffect(() => {
    const updateSize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  /* ----------------- Fireworks ----------------- */
  useEffect(() => {
    if (!yesClicked) return;

    const interval = setInterval(() => {
      const btn = document.getElementById("yes-button");
      if (!btn) return;

      const rect = btn.getBoundingClientRect();

      setFireworks((prev) => [
        ...prev,
        {
          id: Date.now(),
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
          emoji: ["✨", "💥", "🎇", "🎆"][Math.floor(Math.random() * 4)],
        },
      ]);

      setFireworks((prev) =>
        prev.filter((f) => Date.now() - f.id < 1500)
      );
    }, 300);

    return () => clearInterval(interval);
  }, [yesClicked]);

  /* ----------------- No Button Dodge Logic ----------------- */
  useEffect(() => {
    if (noClickCount < 5) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!noBtnRef.current) return;

      const rect = noBtnRef.current.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 120) {
        const maxX = window.innerWidth - rect.width - 20;
        const maxY = window.innerHeight - rect.height - 20;

        setMousePos({
          x: clamp(Math.random() * maxX, 20, maxX),
          y: clamp(Math.random() * maxY, 20, maxY),
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [noClickCount]);

  /* ----------------- Decorations ----------------- */
  const balloons = [
    { left: "10%", delay: 0 },
    { left: "30%", delay: 0.5 },
    { left: "50%", delay: 1 },
    { left: "70%", delay: 1.5 },
    { left: "90%", delay: 2 },
  ];

  const emojis = ["❤️", "💖", "💕", "💘", "💝", "💗"];

  /* ----------------- Render ----------------- */
  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-300 via-pink-500 to-pink-700 animate-gradient-bg z-0" />

      <CornerImages
        images={[
          "/image/image1.jpg",
          "/image/image2.jpg",
          "/image/image3.jpg",
          "/image/image5.jpg",
        ]}
      />

      {/* Confetti */}
      {yesClicked && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          numberOfPieces={600}
        />
      )}

      {/* Fireworks */}
      {fireworks.map((f) => (
        <motion.div
          key={f.id}
          initial={{ opacity: 1, scale: 0 }}
          animate={{ y: -250, scale: 1.2, opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute text-4xl"
          style={{ left: f.x, top: f.y }}
        >
          {f.emoji}
        </motion.div>
      ))}

      <h1 className="relative z-10 text-5xl font-bold mb-12 text-white text-center">
        Will you be my Valentine? ❤️
      </h1>

      {/* Buttons */}
      <div className="relative z-10 flex gap-10">
        {/* YES */}
        <motion.button
          id="yes-button"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setYesClicked(true)}
          className="px-12 py-4 bg-pink-700 text-white rounded-2xl text-3xl shadow-lg"
        >
          Yes ❤️
        </motion.button>

        {/* NO */}
        <motion.button
          ref={noBtnRef}
          onClick={() => noClickCount < 5 && setNoClickCount((c) => c + 1)}
          animate={{ scale: 1 + noClickCount * 0.15 }}
          style={{
            position: noClickCount >= 5 ? "fixed" : "static",
            left: noClickCount >= 5 ? mousePos.x : undefined,
            top: noClickCount >= 5 ? mousePos.y : undefined,
            transformOrigin: "center",
          }}
          className="px-10 py-4 bg-gray-500 text-white rounded-2xl text-3xl shadow-lg"
        >
          No
        </motion.button>
      </div>

      {/* Floating Emojis */}
      {yesClicked &&
        emojis.map((e, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl top-1/2 left-1/2"
            animate={{
              y: [-50, -400],
              opacity: [1, 0],
              x: [(Math.random() - 0.5) * 200],
            }}
            transition={{
              repeat: Infinity,
              duration: 3 + Math.random() * 2,
              delay: Math.random(),
            }}
          >
            {e}
          </motion.div>
        ))}

      {/* Balloons */}
      {yesClicked &&
        balloons.map((b, i) => (
          <motion.div
            key={i}
            className="absolute text-5xl"
            style={{ left: b.left, bottom: "-100px" }}
            animate={{ y: [-100, -800], rotate: [0, 15, -15, 0] }}
            transition={{ repeat: Infinity, duration: 6, delay: b.delay }}
          >
            🎈
          </motion.div>
        ))}

      <style jsx>{`
        @keyframes gradient-bg {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradient-bg {
          background-size: 200% 200%;
          animation: gradient-bg 12s ease infinite;
        }
      `}</style>
    </div>
  );
}
