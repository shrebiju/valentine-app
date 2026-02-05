"use client";

export default function Heart({ onClick, style }: any) {
  return (
    <div
      onClick={onClick}
      style={style}
      className="absolute cursor-pointer text-3xl select-none animate-bounce"
    >
      ❤️
    </div>
  );
}
