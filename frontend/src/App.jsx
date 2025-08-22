import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { BiSolidMessageAltEdit } from "react-icons/bi";
import TargetCursor from "./components/TargetCursor.jsx";

import "./App.css";
import Home from "./pages/Home.jsx";
import MySpace from "./pages/Myspace.jsx";
import Artworks from "./pages/Artworks.jsx";
import Soft from "./pages/soft.jsx";
import Skull from "./assets/skull.gif";
import logo from "./assets/logo.svg";
import logoRed from "./assets/logored.svg";
import cursorSvg from "./assets/cursor.svg";
import Resume from "./pages/Resume.jsx";

function App() {
  const location = useLocation();
  const [menuItem, setMenuItem] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, [isLoading]);

  useEffect(() => {
    document.title = "Aditya Satuluri";
  }, []);

  useEffect(() => {
    document.body.style.cursor = `url(${cursorSvg}) 10 10, auto`;
  }, []);

  return (
    <>
      {/* <CustomCursor /> */}
      {isLoading ? (
        <motion.div
          className="text-white w-full h-[100vh] flex flex-col justify-center align-middle items-center space-y-10 grain"
          initial={{ background: "#090909" }}
          transition={{ duration: 1 }}
        >
          <motion.img
            src={logoRed}
            className="h-[10vh] relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 100, scale: 1.3 }}
            transition={{ duration: 3 }}
          ></motion.img>
        </motion.div>
      ) : (
        <div>
          <TargetCursor spinDuration={2} hideDefaultCursor={true} />

          <div className="flex flex-col">
            <div className="w-full min-h-screen flex flex-col bg-[#080808] font-sans relative">
              {/* Navigation */}
              <header
                id="navbar"
                className="w-full flex items-center justify-center gap-6 p-4 text-white sticky top-0 z-50 bg-black/85 backdrop-blur-lg hover:bg-black/90 transition-colors duration-300 custom-border"
              >
                {/* <img src={logo} className="w-10 h-10" alt="Logo" /> */}
                <div className="flex items-center gap-6 text-sm md:text-base tracking-widest">
                  <Link to="/" className="hover:text-red-500 cursor-target">
                    Home
                  </Link>
                  {}
                  <Link
                    to="/projects"
                    className="hover:text-red-500 cursor-target"
                  >
                    Projects
                  </Link>
                  <Link
                    to="/artworks"
                    className="hover:text-red-500 cursor-target"
                  >
                    Artworks
                  </Link>
                  <Link
                    to="/myspace"
                    className="hover:text-red-500 cursor-target"
                  >
                    MySpace
                  </Link>
                  <Link
                    to="/resume"
                    className="hover:text-red-500 cursor-target"
                  >
                    Resume
                  </Link>
                </div>
              </header>

              {/* Main Content with Page Transition */}
              <main className="flex-1 bg-black scrollbar-hide">
                {/* 👆 `mt-[72px]` = height of navbar (auto spacing instead of padding everywhere) */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={location.pathname}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Routes location={location} key={location.pathname}>
                      <Route path="/" element={<Home />} />
                      <Route path="/projects" element={<Soft />} />
                      <Route path="/artworks" element={<Artworks />} />
                      <Route path="/myspace" element={<MySpace />} />
                      <Route path="/resume" element={<Resume />} />
                    </Routes>
                  </motion.div>
                </AnimatePresence>
              </main>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
