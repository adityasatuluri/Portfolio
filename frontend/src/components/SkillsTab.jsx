import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const skills = {
  Frontend: [
    { name: "HTML", logo: "https://via.placeholder.com/80?text=HTML" },
    { name: "CSS", logo: "https://via.placeholder.com/80?text=CSS" },
    { name: "JavaScript", logo: "https://via.placeholder.com/80?text=JS" },
    { name: "React", logo: "https://via.placeholder.com/80?text=React" },
    {
      name: "Tailwind CSS",
      logo: "https://via.placeholder.com/80?text=Tailwind",
    },
  ],
  Backend: [
    { name: "Node.js", logo: "https://via.placeholder.com/80?text=Node" },
    { name: "Express.js", logo: "https://via.placeholder.com/80?text=Express" },
    { name: "MongoDB", logo: "https://via.placeholder.com/80?text=Mongo" },
  ],
  Design: [
    { name: "Figma", logo: "https://via.placeholder.com/80?text=Figma" },
    { name: "Photoshop", logo: "https://via.placeholder.com/80?text=PS" },
  ],
  Tools: [
    { name: "Git", logo: "https://via.placeholder.com/80?text=Git" },
    {
      name: "Framer Motion",
      logo: "https://via.placeholder.com/80?text=Framer",
    },
  ],
  AI: [
    { name: "Generative AI", logo: "https://via.placeholder.com/80?text=AI" },
  ],
};

export default function SkillsTabs() {
  const categories = Object.keys(skills);
  const [active, setActive] = useState(categories[0]);

  return (
    <div className="w-full max-w-5xl mx-auto text-white">
      {/* Tabs */}
      <div className="flex justify-center gap-6 mb-15">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              active === cat
                ? "text[#f0f0f0] text-5xl"
                : "text-neutral-800 hover:text-neutral-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Skills Grid with animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2"
        >
          {skills[active].map((skill, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center bg-[#0b0b0b] border border-neutral-700 w-40 h-40 rounded-xl p-4 shadow-md"
            >
              <img
                src={skill.logo}
                alt={skill.name}
                className="w-16 h-16 mb-3"
              />
              <span className="text-sm">{skill.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
