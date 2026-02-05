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
  const [fireworks, setFireworks] = useState<{ id: number; x: number; y: number; emoji: string }[]>([]);

  // Window size
  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fireworks from Yes button
  useEffect(() => {
    if (!yesClicked) return;
    const interval = setInterval(() => {
      const button = document.getElementById("yes-button");
      if (!button) return;
      const rect = button.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      setFireworks((prev) => [
        ...prev,
        {
          id: Date.now(),
          x,
          y,
          emoji: ["✨", "💥", "🎇", "🎆"][Math.floor(Math.random() * 4)],
        },
      ]);

      // Remove old fireworks after 1.5s
      setFireworks((prev) => prev.filter((f) => Date.now() - f.id < 1500));
    }, 300);

    return () => clearInterval(interval);
  }, [yesClicked]);

  // No button playful behavior
  useEffect(() => {
    if (noClickCount >= 5) {
      const handleMouseMove = (e: MouseEvent) => {
        if (!noBtnRef.current) return;
        const rect = noBtnRef.current.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 100) {
          setMousePos({
            x: Math.random() * (window.innerWidth - rect.width),
            y: Math.random() * (window.innerHeight - rect.height),
          });
        }
      };
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, [noClickCount]);

  // Balloons positions
  const balloons = [
    { left: "10%", delay: 0 },
    { left: "30%", delay: 0.5 },
    { left: "50%", delay: 1 },
    { left: "70%", delay: 1.5 },
    { left: "90%", delay: 2 },
  ];

  // Floating emojis
  const emojis = ["❤️", "💖", "💕", "💘", "💝", "💗"];

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center">
      {/* Background gradient animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-300 via-pink-500 to-pink-700 animate-gradient-bg z-0"></div>
        <CornerImages
              images={[
                "/image/image1.jpg",
                "/image/image2.jpg",
                "/image/image3.jpg",
                "/image/image5.jpg",
              ]}
        />
      {/* Confetti */}
      {yesClicked && <Confetti width={windowSize.width} height={windowSize.height} numberOfPieces={600} />}

      {/* Fireworks from Yes button */}
      {fireworks.map((f) => (
        <motion.div
          key={f.id}
          initial={{ opacity: 1, y: 0, scale: 0 }}
          animate={{ y: -200 + Math.random() * -100, scale: 1.2, opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute text-4xl"
          style={{ left: f.x, top: f.y }}
        >
          {f.emoji}
        </motion.div>
      ))}

      <h1 className="relative z-10 text-5xl font-bold mb-12 text-center text-white">
        Will you be my Valentine? ❤️
      </h1>

      <div className="flex gap-10 relative z-10">
        {/* YES BUTTON */}
        <motion.button
          id="yes-button"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.95 }}
          className="px-12 py-4 bg-pink-700 text-white rounded-2xl text-3xl shadow-lg z-10"
          onClick={() => setYesClicked(true)}
        >
          Yes ❤️
        </motion.button>

        {/* NO BUTTON */}
        <motion.button
          ref={noBtnRef}
          style={{
            position: noClickCount >= 5 ? "absolute" : "static",
            left: noClickCount >= 5 ? mousePos.x : undefined,
            top: noClickCount >= 5 ? mousePos.y : undefined,
          }}
          onClick={() => {
            if (noClickCount < 5) setNoClickCount(noClickCount + 1);
          }}
          animate={{ scale: noClickCount > 0 ? 1 + noClickCount * 0.15 : 1 }}
          className="px-10 py-4 bg-gray-500 text-white rounded-2xl text-3xl shadow-lg"
        >
          No
        </motion.button>
      </div>

      {/* Floating emojis */}
      {yesClicked &&
        emojis.map((e, idx) => (
          <motion.div
            key={idx}
            animate={{
              y: [-50, -400],
              opacity: [1, 0],
              x: [0, (Math.random() - 0.5) * 200],
            }}
            transition={{ repeat: Infinity, duration: 3 + Math.random() * 2, delay: Math.random() }}
            className="absolute text-4xl top-1/2 left-[20%]"
          >
            {e}
          </motion.div>
        ))}

      {/* Balloons */}
      {yesClicked &&
        balloons.map((b, idx) => (
          <motion.div
            key={idx}
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
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-bg {
          background-size: 200% 200%;
          animation: gradient-bg 12s ease infinite;
        }
      `}</style>
    </div>
  );
}
