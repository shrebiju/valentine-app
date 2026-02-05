"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Heart from "@/components/Heart";

export default function Game() {
  const [score, setScore] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (score >= 10) router.push("/proposal");
  }, [score]);

  const hearts = Array.from({ length: 6 });

  return (
    <div className="h-screen relative overflow-hidden flex items-center justify-center">
      <h1 className="absolute top-10 text-3xl">Score: {score}/10</h1>

      {hearts.map((_, i) => (
        <Heart
          key={i}
          onClick={() => setScore(score + 1)}
          style={{
            left: `${Math.random() * 90}%`,
            top: `${Math.random() * 90}%`
          }}
        />
      ))}
    </div>
  );
}
