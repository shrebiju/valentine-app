"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import CornerImages from "@/components/CornerImages";
import ValentineNoteModal from "@/components/ValentineNoteModal";



export default function Home() {

  const handleEnter = () => {
    const audio = new Audio("/music/love.mp3");
    audio.loop = true;
    audio.play().catch(() => {});

    // store globally so next pages know music already started
    (window as any).globalAudio = audio;
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center text-center">

<ValentineNoteModal 
  note="hello its me i hope you remember me like this"
/>

        <CornerImages
              images={[
                "/image/image1.jpg",
                "/image/image2.jpg",
                "/image/image3.jpg",
                "/image/second.JPG",
              ]}
        />
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-5xl font-bold"
      >
       Hope you will like it  ❤️
      </motion.h1>

      <Link
        href="/journey"
        onClick={handleEnter}
        className="mt-12 px-8 py-4 bg-pink-500 text-white rounded-2xl"
      >
        Siju 
      </Link>
      
    </div>
  );
}
