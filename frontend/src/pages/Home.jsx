import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import InteractiveGrid from "../components/InteractiveGrid.jsx";

export default function Home() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // ✅ check screen size
    const checkMobile = () => setIsMobile(window.innerWidth < 768); // md breakpoint
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div className="w-full bg-black relative overflow-hidden">
      {/* Hero Section */}
      <div
        className="relative flex flex-col items-center justify-center text-center overflow-hidden cursor-none"
        style={{ height: "90vh" }}
      >
        {/* ✅ Show InteractiveGrid only on desktop */}
        {!isMobile && <InteractiveGrid />}

        <div className="gap-4" style={{ gap: "2px" }}>
          <h1
            className="relative z-10 m-0 text-[#f0f0f0] font-bold leading-tight text-[8vh] sm:text-[15vh] md:text-[20vh] lg:text-[25vh]"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            ADITYA
          </h1>

          <h1
            className="relative z-10 m-0 text-[#f0f0f0] font-bold leading-10 md:leading-20 lg:leading-28 text-[8vh] sm:text-[15vh] md:text-[20vh] lg:text-[25vh]"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            SATULURI
          </h1>
        </div>
        <h1 className="relative z-10 mt-10 md:mt-26 lg:mt-32 mb-10 text-[#f0f0f0] tracking-[.25em] font-bold leading-tight text-[2vh] sm:text-[2vh] md:text-[2.5h] lg:text-[2.5vh]">
          DEVELOPER, DESIGNER
        </h1>
        <IoIosArrowDown className="relative z-10 mt-6 text-[#f0f0f0] text-3xl animate-bounce" />
      </div>

      {/* Scrollable Content */}
      <div className="space-y-4">
        <div className="w-full p-4 bg-green-800 text-white text-center">
          <p>© 2025 My Portfolio</p>
        </div>
        <div className="w-full p-4 bg-green-800 text-white text-center">
          <p>More Footer Content</p>
        </div>
        <div className="w-full p-4 bg-green-800 text-white text-center">
          <p>More Footer Content</p>
        </div>
        <div className="w-full p-4 bg-green-800 text-white text-center">
          <p>© 2025 My Portfolio</p>
        </div>
        <div className="w-full p-4 bg-green-800 text-white text-center">
          <p>© 2025 My Portfolio</p>
        </div>
        <div className="w-full p-4 bg-green-800 text-white text-center">
          <p>More Footer Content</p>
        </div>
        <div className="w-full p-4 bg-green-800 text-white text-center">
          <p>More Footer Content</p>
        </div>
        <div className="w-full p-4 bg-green-800 text-white text-center">
          <p>© 2025 My Portfolio</p>
        </div>
        <div className="w-full p-4 bg-green-800 text-white text-center">
          <p>© 2025 My Portfolio</p>
        </div>
        <div className="w-full p-4 bg-green-800 text-white text-center">
          <p>More Footer Content</p>
        </div>
        <div className="w-full p-4 bg-green-800 text-white text-center">
          <p>More Footer Content</p>
        </div>
        <div className="w-full p-4 bg-green-800 text-white text-center">
          <p>© 2025 My Portfolio</p>
        </div>
        <div className="w-full p-4 bg-green-800 text-white text-center">
          <p>© 2025 My Portfolio</p>
        </div>
        <div className="w-full p-4 bg-green-800 text-white text-center">
          <p>More Footer Content</p>
        </div>
        <div className="w-full p-4 bg-green-800 text-white text-center">
          <p>More Footer Content</p>
        </div>
        <div className="w-full p-4 bg-green-800 text-white text-center">
          <p>© 2025 My Portfolio</p>
        </div>
        <div className="w-full p-4 bg-green-800 text-white text-center">
          <p>© 2025 My Portfolio</p>
        </div>
        <div className="w-full p-4 bg-green-800 text-white text-center">
          <p>More Footer Content</p>
        </div>
        <div className="w-full p-4 bg-green-800 text-white text-center">
          <p>More Footer Content</p>
        </div>
        <div className="w-full p-4 bg-green-800 text-white text-center">
          <p>© 2025 My Portfolio</p>
        </div>
        <div className="w-full p-4 bg-green-800 text-white text-center">
          <p>© 2025 My Portfolio</p>
        </div>
        <div className="w-full p-4 bg-green-800 text-white text-center">
          <p>More Footer Content</p>
        </div>
        <div className="w-full p-4 bg-green-800 text-white text-center">
          <p>More Footer Content</p>
        </div>
        <div className="w-full p-4 bg-green-800 text-white text-center">
          <p>© 2025 My Portfolio</p>
        </div>
        <div className="w-full p-4 bg-green-800 text-white text-center">
          <p>© 2025 My Portfolio</p>
        </div>
        <div className="w-full p-4 bg-green-800 text-white text-center">
          <p>More Footer Content</p>
        </div>
        <div className="w-full p-4 bg-green-800 text-white text-center">
          <p>More Footer Content</p>
        </div>
        <div className="w-full p-4 bg-green-800 text-white text-center">
          <p>© 2025 My Portfolio</p>
        </div>
      </div>

      {/* Cursor Circle */}
      {!isMobile && (
        <div
          className="fixed top-0 left-0 w-5 h-5 rounded-full pointer-events-none bg-red-600 mix-blend-difference z-50 transition-transform duration-600 ease-out"
          style={{
            transform: `translate(${pos.x - 10}px, ${pos.y - 10}px) scale(${
              pos.x === 0 && pos.y === 0 ? 0 : hovering ? 13 : 0
            })`,
          }}
        ></div>
      )}
    </div>
  );
}
