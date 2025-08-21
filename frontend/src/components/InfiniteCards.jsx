import { useState } from "react";
import { motion } from "framer-motion";

// Sample cards with placeholder logo URLs
const cards = [
  { name: "CSS", logo: "https://via.placeholder.com/100?text=CSS" },
  { name: "HTML", logo: "https://via.placeholder.com/100?text=HTML" },
  { name: "Javascript", logo: "https://via.placeholder.com/100?text=JS" },
  { name: "React", logo: "https://via.placeholder.com/100?text=React" },
  { name: "Node.js", logo: "https://via.placeholder.com/100?text=Node" },
  { name: "Tailwind CSS", logo: "https://via.placeholder.com/100?text=Tailwind" },
  { name: "Framer Motion", logo: "https://via.placeholder.com/100?text=Framer" },
  { name: "Git", logo: "https://via.placeholder.com/100?text=Git" },
  { name: "Figma", logo: "https://via.placeholder.com/100?text=Figma" },
  { name: "Photoshop", logo: "https://via.placeholder.com/100?text=PS" },
  { name: "Generative AI", logo: "https://via.placeholder.com/100?text=AI" },
];

export default function InfiniteCards() {
  // State to control animation pause
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate list for seamless scrolling
  const duplicated = [...cards, ...cards, ...cards]; // Tripled for smoother looping

  return (
    <div className="relative overflow-hidden w-full">
      {/* Left gradient overlay */}
      <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-[#030303] to-transparent z-10" />
      
      {/* Card container */}
      <motion.div
        className="flex"
        animate={{ x: ["0%", "-66.67%"] }} // Adjusted for tripled cards
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "mirror",
            ease: "linear",
            duration: cards.length * 1, // Adjust speed for smooth scroll
            paused: isPaused, // Pause animation when isPaused is true
          },
        }}
      >
        {duplicated.map((card, idx) => (
          <div
            key={`${card.name}-${idx}`}
            className="flex-none w-60 h-60 ml-5 mr-5 bg-[#0b0b0b] border border-neutral-800 text-white flex items-center justify-center rounded-lg relative group"
            onMouseEnter={() => setIsPaused(true)} // Pause on hover
            onMouseLeave={() => setIsPaused(false)} // Resume on mouse leave
          >
            <img
              src={card.logo}
              alt={card.name}
              className="w-24 h-24 object-contain"
            />
            {/* Card name shown on hover */}
            <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {card.name}
            </div>
          </div>
        ))}
      </motion.div>
      
      {/* Right gradient overlay */}
      <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-[#030303] to-transparent z-10" />
    </div>
  );
}