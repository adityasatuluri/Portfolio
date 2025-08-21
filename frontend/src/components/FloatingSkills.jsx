import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, Html, Environment } from "@react-three/drei";

const skills = [
  {
    name: "HTML",
    logo: "https://via.placeholder.com/80?text=HTML",
    position: [-2, 1, 0],
  },
  {
    name: "CSS",
    logo: "https://via.placeholder.com/80?text=CSS",
    position: [2, 1, 0],
  },
  {
    name: "JavaScript",
    logo: "https://via.placeholder.com/80?text=JS",
    position: [0, -2, 0],
  },
  {
    name: "React",
    logo: "https://via.placeholder.com/80?text=React",
    position: [3, -1, 0],
  },
  {
    name: "Node.js",
    logo: "https://via.placeholder.com/80?text=Node",
    position: [-3, -1, 0],
  },
];

function SkillIcon({ skill }) {
  return (
    <Float speed={3} rotationIntensity={1} floatIntensity={2}>
      {/* Skill logo as a flat plane */}
      <mesh>
        <circleGeometry args={[1, 64]} />
        <meshBasicMaterial>
          <Html distanceFactor={15}>
            <div
              className="rounded-full overflow-hidden border border-neutral-700 shadow-lg cursor-pointer hover:scale-110 transition-transform"
              style={{ width: "80px", height: "80px", background: "#111" }}
              onClick={() => alert(`Clicked on ${skill.name}`)}
            >
              <img
                src={skill.logo}
                alt={skill.name}
                className="w-full h-full object-contain"
              />
            </div>
          </Html>
        </meshBasicMaterial>
      </mesh>
    </Float>
  );
}

export default function FloatingSkills() {
  return (
    <div className="h-screen w-full bg-black">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <Suspense fallback={null}>
          {/* Background lights */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />

          {/* Floating icons */}
          {skills.map((skill, i) => (
            <SkillIcon key={i} skill={skill} />
          ))}

          {/* Environment + Controls */}
          <Environment preset="city" />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.5} />
        </Suspense>
      </Canvas>
    </div>
  );
}
