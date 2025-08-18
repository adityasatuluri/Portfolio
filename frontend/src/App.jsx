import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";
import Home from "./pages/home.jsx";
import MySpace from "./pages/Myspace.jsx";
import UXGraphic from "./pages/ux.jsx";
import Soft from "./pages/soft.jsx";
import logo from "./assets/logo.svg";
import logoRed from "./assets/logored.svg";

function App() {
  const [menuItem, setMenuItem] = useState("Home");
  const [currentLogo, setCurrentLogo] = useState(logo);

  useEffect(() => {
    document.title = "Portfolio";
  }, []);

  const renderComponent = () => {
    switch (menuItem) {
      case "Home":
        return <Home key="home" />;
      case "MySpace":
        return <MySpace key="myspace" />;
      case "UX":
        return <UXGraphic key="ux" />;
      case "Soft":
        return <Soft key="soft" />;
      default:
        return <Home key="home" />;
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#080808] font-sans relative overflow-y-auto">
      {/* Navigation */}
      <div className="w-full flex items-center justify-center gap-6 p-4 text-white fixed top-0 z-50 bg-black/90 backdrop-blur-lg hover:bg-black/80 transition-colors duration-300 custom-border">
        {/* Logo */}
        {/* <img
          className="max-w-10 cursor-pointer"
          src={currentLogo}
          alt="Logo"
          onMouseEnter={() => setCurrentLogo(logoRed)}
          onMouseLeave={() => setCurrentLogo(logo)}
          onClick={() => setMenuItem("Home")}
        /> */}
        <div className="flex items-center gap-6 text-sm md:text-base tracking-widest">
          {["Home", "Soft", "UX", "MySpace"].map((item) => (
            <p
              key={item}
              onClick={() => setMenuItem(item)}
              className={`cursor-pointer transition-colors duration-300 ${
                menuItem === item
                  ? "text-white drop-shadow-[0_0_4px_rgba(255,255,255,1)] hover:border-b-1 hover:drop-shadow-sm hover:border-red-600 hover:text-red-600"
                  : "text-white border-transparent border-b-1 hover:border-red-600 hover:text-red-600"
              }`}
            >
              {item === "Soft"
                ? "Projects"
                : item === "UX"
                ? "UX & Graphic"
                : item}
            </p>
          ))}
        </div>
      </div>

      {/* Main Content with Page Transition */}
      <div className="pt-20 flex-1 bg-black overflow-y-auto scrollbar-hide">
        <AnimatePresence exitBeforeEnter>
          <motion.div
            key={menuItem} // important for Framer Motion
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
          >
            {renderComponent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
