import React from "react";
import "../App.css";
import { MdArrowOutward } from "react-icons/md";
import LogoBg from "../assets/logo_bg.svg";
import RedBg from "../assets/red-bg.png";

export default function Footer() {
  return (
    <div
      className="w-full h-[50vh] flex flex-col items-center justify-center custom-border text-[#f0f0f0] jura-font font-bold bg-cover bg-center bg-no-repeat relative z-0"
      style={{
        backgroundImage: `url(${RedBg})`,
      }}
    >
      <div className="relative flex flex-col items-center justify-center text-center  grain w-full h-[90vh]">
        {/* Image in background */}
        <img
          src={LogoBg}
          alt="Filler"
          className="absolute inset-0 w-[40vh] h-[40vh] m-auto opacity-20 z-0"
        />

        {/* Text in front */}
        <div className="flex items-center justify-center text-9xl tracking-wide relative z-10">
          ADITYA SATULURI
        </div>

        <div className="w-full pl-43 pr-46 pt-4 flex flex-row justify-between items-center">
          <div className="flex flex-row gap-4">
            <a
              className="flex flex-row text-white hover:text-red-600 transition-colors duration-300 cursor-target"
              href="https://www.linkedin.com/in/aditya-satuluri-a250a31a0/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="hover:border-b">LINKEDIN</span>
              <MdArrowOutward className="h-full w-full" />
            </a>{" "}
            <a
              className="flex flex-row text-white hover:text-red-600 transition-colors duration-300 cursor-target"
              href="https://www.behance.net/adityasatuluri"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="hover:border-b">BEHANCE</span>
              <MdArrowOutward className="h-full w-full" />
            </a>{" "}
            <a
              className="flex flex-row text-white hover:text-red-600 transition-colors duration-300 cursor-target"
              href="https://www.instagram.com/aditya.satuluri/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="hover:border-b">INSTAGRAM</span>
              <MdArrowOutward className="h-full w-full" />
            </a>
            <a
              className="flex flex-row text-white hover:text-red-600 transition-colors duration-300 cursor-target"
              href="mailto:s.aditya.in@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="hover:border-b">EMAIL</span>
              <MdArrowOutward className="h-full w-full" />
            </a>
          </div>
          <a
            className="flex flex-row text-white hover:text-red-600 transition-colors duration-300 cursor-target"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <span className="hover:border-b">BACK TO TOP</span>
          </a>
        </div>
      </div>
    </div>
  );
}
