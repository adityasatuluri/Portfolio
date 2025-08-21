import React from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
} from "reactflow";
import "reactflow/dist/style.css";

// Skill data
const nodes = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    data: { label: "Aditya Satuluri" },
    style: { background: "#111", color: "#fff", padding: 10, borderRadius: 8, border: "1px solid #444" }
  },

  // Categories
  {
    id: "2",
    position: { x: -250, y: -150 },
    data: { label: "Frontend" },
    style: { background: "#1e293b", color: "#fff", padding: 10, borderRadius: 8 }
  },
  {
    id: "3",
    position: { x: 250, y: -150 },
    data: { label: "Backend" },
    style: { background: "#1e293b", color: "#fff", padding: 10, borderRadius: 8 }
  },
  {
    id: "4",
    position: { x: -250, y: 150 },
    data: { label: "Design" },
    style: { background: "#1e293b", color: "#fff", padding: 10, borderRadius: 8 }
  },
  {
    id: "5",
    position: { x: 250, y: 150 },
    data: { label: "AI / Tools" },
    style: { background: "#1e293b", color: "#fff", padding: 10, borderRadius: 8 }
  },

  // Frontend skills
  { id: "6", position: { x: -450, y: -250 }, data: { label: "HTML" }, style: { background: "#0b0b0b", color: "#fff", padding: 8, borderRadius: 6 } },
  { id: "7", position: { x: -250, y: -250 }, data: { label: "CSS" }, style: { background: "#0b0b0b", color: "#fff", padding: 8, borderRadius: 6 } },
  { id: "8", position: { x: -50, y: -250 }, data: { label: "JavaScript" }, style: { background: "#0b0b0b", color: "#fff", padding: 8, borderRadius: 6 } },
  { id: "9", position: { x: -250, y: -350 }, data: { label: "React" }, style: { background: "#0b0b0b", color: "#fff", padding: 8, borderRadius: 6 } },
  { id: "10", position: { x: -450, y: -350 }, data: { label: "Tailwind CSS" }, style: { background: "#0b0b0b", color: "#fff", padding: 8, borderRadius: 6 } },

  // Backend skills
  { id: "11", position: { x: 250, y: -250 }, data: { label: "Node.js" }, style: { background: "#0b0b0b", color: "#fff", padding: 8, borderRadius: 6 } },
  { id: "12", position: { x: 450, y: -250 }, data: { label: "Express.js" }, style: { background: "#0b0b0b", color: "#fff", padding: 8, borderRadius: 6 } },
  { id: "13", position: { x: 250, y: -350 }, data: { label: "MongoDB" }, style: { background: "#0b0b0b", color: "#fff", padding: 8, borderRadius: 6 } },

  // Design skills
  { id: "14", position: { x: -250, y: 250 }, data: { label: "Figma" }, style: { background: "#0b0b0b", color: "#fff", padding: 8, borderRadius: 6 } },
  { id: "15", position: { x: -450, y: 250 }, data: { label: "Photoshop" }, style: { background: "#0b0b0b", color: "#fff", padding: 8, borderRadius: 6 } },

  // AI / Tools
  { id: "16", position: { x: 250, y: 250 }, data: { label: "Generative AI" }, style: { background: "#0b0b0b", color: "#fff", padding: 8, borderRadius: 6 } },
  { id: "17", position: { x: 450, y: 250 }, data: { label: "Framer Motion" }, style: { background: "#0b0b0b", color: "#fff", padding: 8, borderRadius: 6 } },
  { id: "18", position: { x: 250, y: 350 }, data: { label: "Git" }, style: { background: "#0b0b0b", color: "#fff", padding: 8, borderRadius: 6 } },
];

const edges = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e1-3", source: "1", target: "3" },
  { id: "e1-4", source: "1", target: "4" },
  { id: "e1-5", source: "1", target: "5" },

  // frontend edges
  { id: "e2-6", source: "2", target: "6" },
  { id: "e2-7", source: "2", target: "7" },
  { id: "e2-8", source: "2", target: "8" },
  { id: "e2-9", source: "2", target: "9" },
  { id: "e2-10", source: "2", target: "10" },

  // backend edges
  { id: "e3-11", source: "3", target: "11" },
  { id: "e3-12", source: "3", target: "12" },
  { id: "e3-13", source: "3", target: "13" },

  // design edges
  { id: "e4-14", source: "4", target: "14" },
  { id: "e4-15", source: "4", target: "15" },

  // AI/Tools edges
  { id: "e5-16", source: "5", target: "16" },
  { id: "e5-17", source: "5", target: "17" },
  { id: "e5-18", source: "5", target: "18" },
];

export default function SkillTree() {
  return (
    <div style={{ width: "100%", height: "600px", background: "#030303" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        style={{ color: "#fff" }}
      >
        <MiniMap />
        <Controls />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
