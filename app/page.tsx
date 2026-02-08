"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {

  const handleEnter = () => {
    const audio = new Audio("/music/love.mp3");
    audio.loop = true;
    audio.play();

    // store globally so next pages know music already started
    window.globalAudio = audio;
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center text-center">

      <motion.h1
        initial={{ opacity: 0, scale: .8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-5xl font-bold"
      >
        I Built Something For You ❤️
      </motion.h1>

      <Link
        href="/journey"
        onClick={handleEnter}
        className="mt-12 px-8 py-4 bg-pink-500 text-white rounded-2xl"
      >
        Enter
      </Link>
    </div>
  );
}
