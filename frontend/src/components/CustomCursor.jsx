import React, { useEffect, useState } from "react";
import { PiNavigationArrowFill } from "react-icons/pi";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveHandler = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", moveHandler);
    return () => {
      window.removeEventListener("mousemove", moveHandler);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
        zIndex: 9999,
      }}
    >
      <PiNavigationArrowFill
        size={20}
        color="white"
        style={{
          filter: "drop-shadow(0 0 1px black) drop-shadow(0 0 1px black)",
        }}
      />
    </div>
  );
};

export default CustomCursor;
