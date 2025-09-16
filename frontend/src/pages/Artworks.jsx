import React from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import WhiteBg from "../assets/WhiteBg3.jpg";
import item2077 from "../assets/screenshot_aug21.png";
import Footer from "../components/Footer";

export default function Ux() {
  const images = [WhiteBg, item2077];

  return (
    <div className="my-10 mx-10">
      <div className="text-white h-full  border-1 w-[100vw-20] flex align-middle justify-center items-center">
        Filter Section
      </div>

      {/* Responsive Masonry */}
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
        <Masonry gutter="10px">
          {images.map((image, i) => (
            <img
              key={i}
              src={image}
              alt={`Artwork ${i}`}
              style={{ width: "100%", display: "block", borderRadius: "8px" }}
            />
          ))}
        </Masonry>
      </ResponsiveMasonry>
      <Footer />
    </div>
  );
}
