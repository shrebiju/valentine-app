"use client";

type Props = {
  images: string[];
  container?: "halfimage" | "fullimage"; // half = 4, full = 6
};

export default function CornerImages({
  images,
  container = "halfimage",
}: Props) {
  if (container === "halfimage" && images.length < 4) return null;
  if (container === "fullimage" && images.length < 6) return null;

  const imgStyle = {
    borderRadius: "100px 20px",
  };

  return (
    <>
      {/* 4 corner images */}
      <img
        src={images[0]}
        width={200}
        height={100}
        style={imgStyle}
        className="absolute top-[50px] left-[50px] border-2 border-pink-500"
        alt=""
      />
      <img
        src={images[1]}
        width={200}
        height={100}
        style={imgStyle}
        className="absolute top-[50px] right-[50px] border-2 border-pink-500"
        alt=""
      />
      <img
        src={images[2]}
        width={200}
        height={100}
        style={imgStyle}
        className="absolute bottom-[50px] left-[50px] border-2 border-pink-500"
        alt=""
      />
      <img
        src={images[3]}
        width={200}
        height={100}
        style={imgStyle}
        className="absolute bottom-[50px] right-[50px] border-2 border-pink-500"
        alt=""
      />

      {/* extra 2 images if fullimage */}
      {container === "fullimage" && (
        <>
          <img
            src={images[4]}
            width={200}
            height={100}
            style={imgStyle}
            className="absolute top-[800px] right-[1200px] border-2 border-pink-500"
            alt=""
          />
          <img
            src={images[5]}
            width={200}
            height={100}
            style={imgStyle}
            className="absolute top-[800px] right-[50px] border-2 border-pink-500"
            alt=""
          />
        </>
      )}
    </>
  );
}
