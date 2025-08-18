import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import "../App.css"; // Ensure styles are applied

export default function InteractiveGrid() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [grid, setGrid] = useState({ cols: 0, rows: 0 });
  const containerRef = useRef(null);

  const spacing = 43; // Distance between grid points
  const baseSize = 3; // Base size of circles

  // Track mouse
  useEffect(() => {
    const updateMouse = (e) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updateMouse);
    return () => window.removeEventListener("mousemove", updateMouse);
  }, []);

  // Grid size based on full viewport including menu area
  useEffect(() => {
    const updateGrid = () => {
      setGrid({
        cols: Math.ceil(window.innerWidth / spacing),
        rows: Math.ceil(window.innerHeight / spacing),
      });
    };
    updateGrid();
    window.addEventListener("resize", updateGrid);
    return () => window.removeEventListener("resize", updateGrid);
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 grid z-0" // Covers menu and hero, behind content
      style={{
        gridTemplateColumns: `repeat(${grid.cols}, ${spacing}px)`,
        gridTemplateRows: `repeat(${grid.rows}, ${spacing}px)`,
      }}
    >
      {[...Array(grid.cols * grid.rows)].map((_, i) => {
        const row = Math.floor(i / grid.cols);
        const col = i % grid.cols;

        const x = col * spacing + spacing / 2;
        const y = row * spacing + spacing / 2;

        const rect = containerRef.current?.getBoundingClientRect();
        const mouseX = mouse.x - (rect?.left ?? 0);
        const mouseY = mouse.y - (rect?.top ?? 0);

        const dist = Math.hypot(mouseX - x, mouseY - y);
        const maxDist = 180;
        const scale = Math.max(1, 5 - Math.min(dist, maxDist) / 40); // Scale effect
        const opacity = Math.max(0, 1 - dist / 400); // Opacity falloff

        return (
          <motion.div
            key={i}
            className="rounded-full bg-red-600"
            style={{ width: baseSize, height: baseSize, position: "absolute", left: x - baseSize / 2, top: y - baseSize / 2 }}
            animate={{ scale, opacity }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          />
        );
      })}
    </div>
  );
}