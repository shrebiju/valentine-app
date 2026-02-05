"use client";

import { memories } from "@/data/memories";
import TimelineCard from "@/components/TimelineCard";
import Link from "next/link";

export default function TimelinePage() {
  return (
    <div className="min-h-screen flex flex-col items-center py-20 gap-10">
      <h1 className="text-4xl font-bold">Our Journey ❤️</h1>

      {memories.map((m, i) => (
        <TimelineCard
          key={i}
          title={m.title}
          description={m.description}
          date={m.date}
        />
      ))}

      <Link
        href="/calendar"
        className="mt-10 px-8 py-4 bg-pink-500 text-white rounded-2xl"
      >
        Open Love Calendar
      </Link>
    </div>
  );
}
