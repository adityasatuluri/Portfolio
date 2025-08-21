import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { BiSolidMessageAltEdit } from "react-icons/bi";
import TargetCursor from "./components/TargetCursor.jsx";

import "./App.css";
import Home from "./pages/home.jsx";
import MySpace from "./pages/Myspace.jsx";
import UXGraphic from "./pages/ux.jsx";
import Soft from "./pages/soft.jsx";
import logo from "./assets/logo.svg";
import logoRed from "./assets/logored.svg";
import cursorSvg from "./assets/cursor.svg";
import Resume from "./pages/Resume.jsx";
import CustomCursor from "./components/CustomCursor.jsx";

function App() {
  const location = useLocation();
  const [menuItem, setMenuItem] = useState("");

  useEffect(() => {
    document.title = "Portfolio";
  }, []);

  useEffect(() => {
    document.body.style.cursor = `url(${cursorSvg}) 10 10, auto`;
  }, []);

  return (
    <>
      {/* <CustomCursor /> */}
      <TargetCursor spinDuration={2} hideDefaultCursor={true} />

      <div className="flex flex-col hover:">
        <div className="w-full min-h-screen flex flex-col bg-[#080808] font-sans relative">
          {/* Navigation */}
          <header
            id="navbar"
            className="w-full flex items-center justify-center gap-6 p-4 text-white sticky top-0 z-50 bg-black/85 backdrop-blur-lg hover:bg-black/90 transition-colors duration-300 custom-border"
          >
            {/* <img src={logo} className="w-10 h-10" alt="Logo" /> */}
            <div className="flex items-center gap-6 text-sm md:text-base tracking-widest">
              <Link to="/" className="hover:text-red-500">
                Home
              </Link>
              {}
              <Link to="/projects" className="hover:text-red-500">
                Projects
              </Link>
              <Link to="/uxgraphic" className="hover:text-red-500">
                UX & Graphic
              </Link>
              <Link to="/myspace" className="hover:text-red-500">
                MySpace
              </Link>
              <Link to="/resume" className="hover:text-red-500">
                Resume
              </Link>
            </div>
          </header>

          {/* Main Content with Page Transition */}
          <main className="flex-1 bg-black  scrollbar-hide">
            {/* 👆 `mt-[72px]` = height of navbar (auto spacing instead of padding everywhere) */}
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
              >
                <Routes location={location} key={location.pathname}>
                  <Route path="/" element={<Home />} />
                  <Route path="/projects" element={<Soft />} />
                  <Route path="/uxgraphic" element={<UXGraphic />} />
                  <Route path="/myspace" element={<MySpace />} />
                  <Route path="/resume" element={<Resume />} />
                </Routes>
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </>
  );
}

export default App;
