import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import "../App.css";
import InteractiveGrid from "../components/InteractiveGrid.jsx";
import Inspiration from "../assets/Inspiration.png";
import { MdArrowOutward } from "react-icons/md";

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
    <div className="w-full bg-black relative overflow-y-auto">
      {/* Hero Section */}
      <div
        className="relative flex flex-col items-center justify-center text-center overflow-hidden cursor-none"
        style={{ height: "90vh" }}
      >
        {/* ✅ Show InteractiveGrid only on desktop */}
        {!isMobile && <InteractiveGrid />}

        <div className="gap-4" style={{ gap: "2px" }}>
          <h1
            className="relative z-10 m-0 text-[#f0f0f0] jura-font font-bold leading-tight text-[8vh] sm:text-[15vh] md:text-[20vh] lg:text-[25vh]"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            ADITYA
          </h1>

          <h1
            className="relative z-10 m-0 text-[#f0f0f0] jura-font font-bold leading-10 md:leading-20 lg:leading-28 text-[8vh] sm:text-[15vh] md:text-[20vh] lg:text-[25vh]"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            SATULURI
          </h1>
        </div>
        <h1 className="relative z-10 mt-10 md:mt-18 lg:mt-24 mb-10 text-[#f0f0f0] jura-font tracking-[.25em] font-bold leading-tight text-[2vh] sm:text-[2vh] md:text-[2.5h] lg:text-[2.5vh]">
          WEB & AI DEVELOPER, DESIGNER
        </h1>
        <IoIosArrowDown className="relative z-10 mt-6 text-[#f0f0f0] text-3xl animate-bounce" />
      </div>

      {/* Scrollable Content */}
      <div className="space-y-4">
        <div
          className="w-full h-[50vh] flex items-center justify-center text-[#f0f0f0] text-2xl "
          style={{
            backgroundImage: `url(${Inspiration})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            fontFamily: "poppins, sans-serif",
            backgroundAttachment: "fixed",
          }}
        >
          "I build digital experiences where design meets code and AI adds
          intelligence."
        </div>
        <div className="w-full h-full pt-5 pb-5 flex items-center justify-center text-[#f0f0f0] text-2xl font-bold">
          FEATURED WORK
        </div>
        <div className="w-full h-full pt-5 pb-5 flex items-center justify-center text-[#f0f0f0] text-2xl font-bold">
          MY EXPERTISE
        </div>
        <div className="w-full h-full pt-5 pb-5 flex items-center justify-center text-[#f0f0f0] text-2xl font-bold">
          EXPERIENCE
        </div>
        <div className="w-full h-full pt-5 pb-5 flex items-center justify-center text-[#f0f0f0] text-2xl font-bold">
          WORK TOGETHER FORM
        </div>

        {/* FOOTER */}
        <div className=" w-full h-full pt-5 pb-5 flex flex-col  items-center justify-center text-[#f0f0f0]  jura-font font-bold">
          <div className="flex items-center justify-center text-9xl tracking-wide">
            ADITYA SATULURI
          </div>
          <div className="w-full pl-41 pr-43 pt-4 flex flex-row justify-between items-center">
            <div className="flex flex-row gap-4">
              <a
                className="flex flex-row text-white hover:text-red-600 transition-colors duration-300 cursor-pointer"
                href="https://www.linkedin.com/in/aditya-satuluri-a250a31a0/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="hover:border-b">LINKEDIN</span>
                <MdArrowOutward className="h-full w-full" />
              </a>{" "}
              <a
                className="flex flex-row text-white hover:text-red-600 transition-colors duration-300 cursor-pointer"
                href="https://www.behance.net/adityasatuluri"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="hover:border-b">BEHANCE</span>
                <MdArrowOutward className="h-full w-full" />
              </a>{" "}
              <a
                className="flex flex-row text-white hover:text-red-600 transition-colors duration-300 cursor-pointer"
                href="https://www.instagram.com/aditya.satuluri/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="hover:border-b">INSTAGRAM</span>
                <MdArrowOutward className="h-full w-full" />
              </a>
            </div>
            <a
              className="flex flex-row text-white hover:text-red-600 transition-colors duration-300 cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <span className="hover:border-b">BACK TO TOP</span>
            </a>
          </div>
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
