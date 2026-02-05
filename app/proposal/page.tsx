"use client";

import { useState } from "react";
import Confetti from "react-confetti";

export default function Proposal() {
  const [yes, setYes] = useState(false);

  return (
    <div className="h-screen flex flex-col items-center justify-center text-center">
      {yes && <Confetti />}

      <h1 className="text-5xl font-bold mb-12">
        Will You Be My Valentine?
      </h1>

      <div className="flex gap-6">
        <button
          onClick={() => setYes(true)}
          className="px-8 py-4 bg-pink-500 text-white rounded-2xl"
        >
          Yes ❤️
        </button>

        <button
          onClick={() => setYes(true)}
          className="px-8 py-4 bg-pink-400 text-white rounded-2xl"
        >
          Definitely Yes
        </button>
      </div>
    </div>
  );
}
