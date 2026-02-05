"use client";
import { useEffect, useRef } from "react";

export default function GlobalMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const shouldPlay = localStorage.getItem("playMusic");

    if (shouldPlay === "true") {
      audioRef.current?.play().catch(() => {});
    }
  }, []);

  return (
    <audio ref={audioRef} loop>
      <source src="/music/love.mp3" type="audio/mpeg" />
    </audio>
  );
}
