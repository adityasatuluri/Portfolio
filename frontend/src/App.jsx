import { useEffect, useRef, useState, lazy, Suspense } from "react";
import { motion, AnimatePresence, easeInOut } from "framer-motion";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import {
  Database,
  Music2,
  Play,
  Pause,
  SkipForward,
  SkipBackIcon,
  PauseCircleIcon,
} from "lucide-react";
import TargetCursor from "./components/TargetCursor.jsx";

import "./App.css";
import Home from "./pages/Home.jsx";
import MySpace from "./pages/Myspace.jsx";
import Artworks from "./pages/Artworks.jsx";
import Soft from "./pages/Soft.jsx";
import Resume from "./pages/Resume.jsx";

// assets
import cursorSvg from "./assets/cursor.svg";
import resume from "./assets/documents/Aditya_Resume.pdf";
import Glitch1 from "./assets/glitchgif.gif";
import Glitch2 from "./assets/minimalglitch.gif";
import WhiteBg from "./assets/WhiteBg2.jpg";
import LoadingBg from "./assets/loading_bg.jpg";
import logo from "./assets/logo.png";
import { CgMenuGridO } from "react-icons/cg";

// songs
import V from "./assets/sound/V.mp3";
import RetroWave from "./assets/sound/retrowave.mp3";
import NeverFadeAway from "./assets/sound/NeverFadeAway.mp3";
import ParadiseCity from "./assets/sound/paradise_city.mp3";
import ComeAsYouAre from "./assets/sound/come_as_you_are.mp3";
import LivinOnAPrayer from "./assets/sound/livin_on_a_prayer.mp3";
import ModelViewer from "./components/ModelViewer.jsx";
import { MdRestartAlt } from "react-icons/md";

function App() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playerIcon, setPlayerIcon] = useState("Pause");
  const [menuItem, setMenuItem] = useState("Home");
  const [volume, setVolume] = useState(0.3);
  const [isMobile, setIsMobile] = useState(false);

  // playlist with names
  const playlist = [
    { src: V, name: "V" },
    // { src: NeverFadeAway, name: "Never Fade Away" },
    // { src: ParadiseCity, name: "Paradise City" },
    // { src: ComeAsYouAre, name: "Come As You Are" },
    // { src: LivinOnAPrayer, name: "Livin' On A Prayer" },
  ];

  // audio ref
  const audioRef = useRef(new Audio(playlist[0].src));

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // auto-update src when track changes
  useEffect(() => {
    audioRef.current.src = playlist[currentTrack].src;
    if (isPlaying) {
      audioRef.current
        .play()
        .catch((err) => console.log("Autoplay blocked:", err));
    }
  }, [currentTrack]);

  // track progress
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768); // md breakpoint
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const audio = audioRef.current;

    const updateProgress = () => {
      setProgress(audio.currentTime);
      if (audio.currentTime >= audio.duration - 0.1) {
        setPlayerIcon("Restart");
        setIsPlaying(false);
      }

      setDuration(audio.duration || 0);
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", updateProgress);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", updateProgress);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // handle play/pause toggle
  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current
        .play()
        .catch((err) => console.log("Autoplay blocked:", err));
    }
    setIsPlaying(!isPlaying);
  };

  // next track
  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % playlist.length);
    setIsPlaying(true);
  };

  // next track
  const previousTrack = () => {
    setCurrentTrack((prev) => {
      return (prev - 1 + playlist.length) % playlist.length;
    });
    setIsPlaying(true);
  };

  // seek
  const handleSeek = (e) => {
    const time = e.target.value;
    audioRef.current.currentTime = time;
    setProgress(time);
  };

  // format time
  const formatTime = (secs) => {
    if (isNaN(secs)) return "0:00";
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  useEffect(() => {}, [playerIcon]);

  useEffect(() => {
    document.title = "Aditya Satuluri";
    document.body.style.cursor = `url(${cursorSvg}) 10 10, auto`;
  }, []);

  return (
    <>
      {/* <TargetCursor spinDuration={2} hideDefaultCursor={true} /> */}

      {isLoading ? (
        <motion.div
          className="text-white w-full min-h-screen flex flex-col justify-center align-middle items-center space-y-10 grain cursor-crosshair"
          initial={{ background: "#090909" }}
          animate={{ backgroundImage: `url(${LoadingBg})` }}
          transition={{ duration: 1 }}
        >
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: easeInOut }}
            onClick={() => {
              setIsLoading(false);
              // setIsPlayerOpen(true);
              setIsPlaying(true);
              // audioRef.current
              //   .play()
              //   .catch((err) => console.log("Autoplay blocked:", err));
            }}
            className="relative glitch-button z-30 w-[20vh] py-3 px-6 font-bold uppercase tracking-wider rounded overflow-hidden group transition-all duration-600 cursor-target
             sm:text-sm"
            data-text="ENTER"
          >
            {/* Background layers */}
            <div className="absolute inset-0">
              {/* Image texture layer */}
              <div
                className="absolute inset-0 opacity-100 bg-cover bg-bottom z-20"
                style={{ backgroundImage: `url(${WhiteBg})` }}
              />
              {/* Solid red background */}
              <div className="absolute inset-0 bg-red-600 group-hover:bg-white transition-all duration-600 z-10" />
            </div>

            {/* Text with glitch effect */}
            <span
              className="relative z-70 text-black abnes group-hover:text-white transform transition-all duration-600"
              data-text="ENTER"
            >
              ENTER
            </span>

            {/* Bottom bar hover effect */}
            <div className="absolute bottom-0 left-0 w-0 h-1.5 bg-white group-hover:w-full transition-all duration-1000 z-80" />

            {/* Gradient shine hover effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-red-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.button>

          {/* ModelViewer */}
          {/* <motion.div
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 3, ease: easeInOut }}
            className="w-full h-full absolute inset-0 z-22"
          >
            <ModelViewer url={Johnny} width={"100vw"} height={"100vh"} environmentPreset={"night"} />
          </motion.div> */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 100 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-20 w-[100vw] h-[100vh] bg-red-600 mix-blend-overlay"
            style={{
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed",
            }}
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 100 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-11 w-[100vw] h-[100vh] mix-blend-lighten"
            style={{
              backgroundImage: `url(${Glitch2})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed",
            }}
          />
          <motion.div
            initial={{ opacity: 100 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-11 w-[100vw] h-[100vh] mix-blend-lighten"
            style={{
              backgroundImage: `url(${Glitch1})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed",
            }}
          />
        </motion.div>
      ) : (
        <div>
          {/* Main Content */}
          <div className="w-full min-h-screen flex flex-col bg-[#080808] font-sans relative cursor-crosshair">
            {!isMobile ? (
              <header
                id="navbar"
                className="w-full uppercase flex items-center justify-center gap-6 p-4 text-white sticky top-0 z-50 bg-black/85 backdrop-blur-lg hover:bg-black/90 transition-colors duration-300 custom-border inset-shadow-sm"
              >
                <div className="flex items-center gap-6 text-sm md:text-base tracking-widest">
                  <Link
                    to="/"
                    onClick={() => setMenuItem("Home")}
                    className={`hover:text-red-500 cursor-target ${
                      menuItem === "Home"
                        ? "line-through decoration-red-500 hover:decoration-white"
                        : "text-[#f0f0f0]"
                    }`}
                  >
                    Home
                  </Link>

                  {/* <Link
                    to="/projects"
                    onClick={() => setMenuItem("Projects")}
                    className={`hover:text-red-500 cursor-target ${
                      menuItem === "Projects"
                        ? "text-shadow-lg text-shadow-red-600"
                        : "text-[#f0f0f0]"
                    }`}
                  >
                    Projects
                  </Link> */}

                  <Link
                    to="/artworks"
                    onClick={() => setMenuItem("Artworks")}
                    className={`hover:text-red-500 cursor-target ${
                      menuItem === "Artworks"
                        ? "line-through decoration-red-500 hover:decoration-white"
                        : "text-[#f0f0f0]"
                    }`}
                  >
                    Artworks
                  </Link>

                  {/* <Link
                    to="/myspace"
                    onClick={() => setMenuItem("Myspace")}
                    className={`hover:text-red-500 cursor-target ${
                      menuItem === "Myspace"
                        ? "text-shadow-lg text-shadow-red-600"
                        : "text-[#f0f0f0]"
                    }`}
                  >
                    MySpace
                  </Link> */}

                  <a
                    className="hover:text-red-500 cursor-target"
                    href={resume}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Resume
                  </a>
                </div>
              </header>
            ) : (
              <header
                id="navbar"
                className="w-full flex items-center justify-between gap-6 p-4 text-white sticky top-0 z-50 bg-black/85 backdrop-blur-lg hover:bg-black/90 transition-colors duration-300 custom-border inset-shadow-sm"
              >
                <Link
                  to="/"
                  onClick={() => setMenuItem("Home")}
                  className={`hover:text-red-500 cursor-target ${
                    menuItem === "Home"
                      ? "text-shadow-lg text-shadow-red-600"
                      : "text-[#f0f0f0]"
                  }`}
                >
                  <img
                    src={logo}
                    alt="Logo"
                    className="h-8 w-8 object-contain"
                  />
                </Link>
                <Link
                  to="/"
                  onClick={() => setMenuItem("Home")}
                  className={`hover:text-red-500 cursor-target ${
                    menuItem === "Home"
                      ? "text-shadow-lg text-shadow-red-600"
                      : "text-[#f0f0f0]"
                  }`}
                >
                  <CgMenuGridO className="h-8 w-8" />
                </Link>
              </header>
            )}

            <main className="flex-1 bg-black scrollbar-hide">
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

          {/* Floating Music Icon */}
          {/* <div className="fixed bottom-15 right-6 z-50">
            <button
              onClick={() => setIsPlayerOpen(!isPlayerOpen)}
              className="p-4 bg-red-600 mix-blend-luminosity text-white rounded-full shadow-lg hover:bg-red-500  cursor-target hover:rounded-sm transform transition-all duration-100 transition-ease-in-out"
            >
              <Music2 className="w-6 h-6" />
            </button>
          </div> */}

          {/* Expanded Player */}
          {isPlayerOpen && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-20 right-6 bg-black/90 backdrop-blur-md text-white p-4 rounded-xl shadow-lg w-72 z-0"
            >
              <p className="font-mono text-sm mb-2">
                Now Playing: {playlist[currentTrack].name}
              </p>

              {/* Progress bar */}
              <input
                type="range"
                min="0"
                max={duration}
                value={progress}
                onChange={handleSeek}
                className="w-full accent-red-600"
              />
              <div className="flex justify-between text-xs font-mono">
                <span>{formatTime(progress)}</span>
                <span>{formatTime(duration)}</span>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-4 mt-3 align-middle justify-left flex-row ">
                {/* <button
                  onClick={previousTrack}
                  className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 cursor-target hover:rounded-sm transform transition-all duration-100 transition-ease-in-out"
                >
                  <SkipBackIcon className="w-5 h-5" />
                </button> */}
                {playerIcon === "Pause" ? (
                  <button
                    onClick={togglePlay}
                    className="p-2 bg-red-600 rounded-full hover:bg-red-500 cursor-target hover:rounded-sm transform transition-all duration-100 transition-ease-in-out"
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5" />
                    ) : (
                      <Play className="w-5 h-5" />
                    )}
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      audioRef.current.currentTime = 0; // restart from beginning
                      audioRef.current.play();
                      setIsPlaying(true);
                      setPlayerIcon("Pause");
                    }}
                    className="p-2 bg-red-600 rounded-full hover:bg-red-500 ..."
                  >
                    <MdRestartAlt className="w-5 h-5" />
                  </button>
                )}

                {/* Volume slider */}
                <div className="w-30">
                  <label className="text-xs font-mono">Volume</label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="w-full accent-red-600"
                  />
                </div>
                {/* <button
                  onClick={nextTrack}
                  className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 cursor-target hover:rounded-sm transform transition-all duration-100 transition-ease-in-out"
                >
                  <SkipForward className="w-5 h-5" />
                </button> */}
              </div>
            </motion.div>
          )}
        </div>
      )}
    </>
  );
}

export default App;
