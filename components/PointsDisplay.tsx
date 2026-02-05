"use client";

export default function PointsDisplay({ points }: { points:number }) {
  return (
    <div className="text-3xl font-bold mt-6">
      Total Love Points: {points} ❤️
    </div>
  );
}
