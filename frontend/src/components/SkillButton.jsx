import React from "react";
import ReactLogo from "../assets/logos/react.png";

const SkillButton = () => {
  return (
    <div className="relative h-20 w-64 flex items-center justify-center gap-4 rounded-2xl  border border-neutral-800 bg-[#070707] group">
      {/* Animated gradient overlay */}
      <div className="absolute inset-0">
        <div className="w-[200%] h-[200%] bg-gradient-to-r from-[#00ffcc] via-transparent to-[#00ffcc] opacity-70 animate-glowMove" />
      </div>

      {/* Content */}
      <img src={ReactLogo} alt="React Logo" className="w-8 z-10" />
      <span className="z-10 text-white text-lg font-medium">REACT JS</span>

      {/* CSS Animations */}
      <style>
        {`
          @keyframes glowMove {
            0% { transform: translateX(-50%) rotate(25deg); }
            100% { transform: translateX(50%) rotate(25deg); }
          }
          .animate-glowMove {
            animation: glowMove 4s linear infinite;
          }
          .group:hover .animate-glowMove {
            opacity: 1;
          }
        `}
      </style>
    </div>
  );
};

export default SkillButton;
