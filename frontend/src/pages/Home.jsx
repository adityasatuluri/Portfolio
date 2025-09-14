import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  lazy,
  Suspense,
} from "react";
import { motion, AnimatePresence, easeInOut } from "motion/react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import BlurText from "../components/Blurtext.jsx";
import ModelViewer from "../components/ModelViewer.jsx";
import Johnny from "../assets/johnny.glb";
import WhiteBg from "../assets/WhiteBg2.jpg";
import WhiteBg3 from "../assets/WhiteBg3.jpg";
import ShinyText from "../components/ShinyText.jsx";
import item2077 from "../assets/item2077.png";
import GlitchGif from "../assets/verticalglitch.gif";
import { IoIosArrowDown } from "react-icons/io";
import "../App.css";
import Inspiration from "../assets/cy-bw.png";
import Footer from "../components/Footer.jsx";
import Mockup from "../assets/mockup.jpg";
import morning from "../assets/cy-city-morning.png";
import night from "../assets/cy-city.png";
import GridMotion from "../components/GridMotion.jsx";

const JohnnyModel = lazy(() => import("../assets/johnny.glb"));

export default function Home() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState();
  const [cityBg, setCityBg] = useState(night);
  const cityRef = useRef(null);

  const categories = {
    "Programming Languages": ["HTML", "CSS", "JavaScript", "Python", "Java"],
    "Frameworks/Libraries": ["React", "Express", "Spring Boot", "Streamlit"],
    Databases: ["MongoDB", "Prisma DB", "MySQL"],
    "Cloud & DevOps": [
      "AWS",
      "Docker",
      "Kubernetes",
      "Ansible",
      "Git",
      "CI/CD Pipelines",
    ],
    Design: ["Adobe Suite", "Figma", "Blender", "Unreal Engine"],
  };

  const colors = {
    HTML: "#FF5733",
    CSS: "#2965F1",
    JavaScript: "#F7DF1E",
    Python: "#3776AB",
    Java: "#E34C26",
    React: "#61DAFB",
    Express: "#30C9AA",
    "Spring Boot": "#6DB33F",
    Streamlit: "#FF4B4B",
    MongoDB: "#47A248",
    "Prisma DB": "#0C344B",
    MySQL: "#00758F",
    AWS: "#FF9900",
    Docker: "#2496ED",
    Kubernetes: "#326CE5",
    Ansible: "#EE0000",
    Git: "#F05032",
    "CI/CD Pipelines": "#00C7B7",
  };

  const experience = [
    {
      date: "JUN 2023 - PRESENT",
      place: "FREELANCE",
      title: "GRAPHIC DESIGNER",
      description:
        "Created a range of designs from posters and NFTs to 3D art and animations using Adobe Suite, Blender, and Unreal Engine.",
      skills: "Adobe Suite, Blender, Unreal Engine",
    },
    {
      date: "FEB 2025 - MAY 2025",
      place: "DRDO, IN",
      title: "DEVELOPER INTERN",
      description:
        "Contributed to the development of OIL-AGenT, a real-time testbed for automating On-Board Computer (OBC) software validation in avionics.",
      skills: "Python, PySide6, Prisma DB, C, Express JS",
    },
  ];

  const modules = import.meta.glob("../assets/artworks/*.{png,jpg,jpeg,svg}", {
    eager: true,
  });

  // Extract paths
  const artworks = Object.values(modules).map((mod) => mod.default);

  const items = useMemo(() => {
    const shuffleArray = (arr) => {
      const copy = [...arr];
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      return copy;
    };

    return shuffleArray(artworks);
  }, []);

  const categoryRefs = useRef([]);
  const skillsTitleRef = useRef(null);
  const [currentCategory, setCurrentCategory] = React.useState("");
  const [currentSkills, setCurrentSkills] = React.useState("");

  const divs = [];
  for (let i = 0; i < 5; i++) {
    divs.push(
      <div
        key={i}
        className="h-[40vh] lg:h-[75vh]  m-5 lg:m-0 border-1 border-neutral-800 rounded-2xl cursor-target transition-all duration-300 ease-in-out hover:rounded-none"
      >
        <div
          className="relative flex items-center justify-center h-7/10 lg:h-8/10 border-0 rounded-t-2xl transition-all duration-300 ease-in-out"
          style={{
            backgroundImage: `url(${Mockup})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          onMouseEnter={() => setHoveredIndex(i)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {/* overlay always rendered, opacity animated */}

          <div
            className={`flex w-full h-full bg-[#f0f0f0]/50 text-[#010101] transition-opacity duration-300 backdrop-blur-md items-center justify-center ${
              hoveredIndex === i ? "opacity-100" : "opacity-0"
            }`}
          >
            UI design for a EV charging station finder app
          </div>
        </div>

        <div className="flex flex-row items-center justify-between lg:px-6 px-4 bg-[#0c0c0c] h-3/10 lg:h-2/10 rounded-b-2xl transition-all duration-300 ease-in-out hover:rounded-none">
          <div className="flex flex-col items-start justify-center">
            <div className="text-[#f1f1f1] text-xl">ELECTRIFIND</div>
            <div className="text-[#8c8c8c] text-lg">UI/UX Design</div>
          </div>
          <div className="border-1 border-[#454545] p-1 pr-4 pl-4 text-[#f1f1f1] text-lg font-light rounded-full">
            2024
          </div>
        </div>
      </div>
    );
  }

  useEffect(() => {
    const handleScroll = () => {
      if (!cityRef.current) return;

      const rect = cityRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // ✅ progress: 0 when top enters, 1 when bottom leaves
      const progress = Math.min(
        Math.max((windowHeight - rect.top) / (rect.height + windowHeight), 0),
        1
      );

      // thresholds for swapping backgrounds
      if (progress <= 0.55) setCityBg(night);
      else if (progress > 0.55) setCityBg(morning);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // ✅ check screen size
    const checkMobile = () => setIsMobile(window.innerWidth < 768); // md breakpoint
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  /* De comment if using interactive grid */
  // useEffect(() => {
  //   const move = (e) => setPos({ x: e.clientX, y: e.clientY });
  //   window.addEventListener("mousemove", move);
  //   return () => window.removeEventListener("mousemove", move);
  // }, []);

  return (
    <div className="w-full bg-[#030303] relative">
      {/* Hero Section */}
      <div className="relative flex flex-col items-center justify-center text-center grain min-h-[50vh] sm:min-h-[90vh] md:min-h-[90vh] lg:min-h-[90vh]">
        {/* {!isMobile && ( */}
        <div className="absolute inset-0 z-0">
          {/* background at the very back */}
          <div
            className="absolute inset-0 z-0 w-full h-full"
            style={{
              backgroundImage: !isMobile
                ? `url(${WhiteBg})`
                : `url(${WhiteBg})`,
              backgroundSize: !isMobile ? "cover" : "cover",
              backgroundPosition: isMobile ? "top center" : "bottom",
              backgroundAttachment: isMobile ? "fixed" : "fixed",
            }}
          ></div>

          {/* ModelViewer*/}
          <Suspense
            fallback={
              <div className="w-full h-full flex items-center justify-center">
                <div>Loading...</div>
              </div>
            }
          >
            <motion.div
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 0.6, filter: "blur(0px)" }}
              transition={{ duration: 3, ease: easeInOut }}
              className="w-full h-full relative z-12 mix-blend-darken"
            >
              <ModelViewer url={Johnny} width={"100vw"} height={"100vh"} />
            </motion.div>
          </Suspense>

          <div
            className="absolute inset-0 z-15 w-full h-full "
            style={{
              backgroundImage: `url(${item2077})`,
              backgroundSize: "cover",
              backgroundPosition: "bottom",
              backgroundAttachment: "",
            }}
          ></div>

          {/* Glitch overlay above everything */}
          <div
            className="absolute inset-0 z-10 w-full h-full mix-blend-screen"
            style={{
              backgroundImage: `url(${GlitchGif})`,
              backgroundSize: "auto",
              backgroundPosition: "center",
              backgroundAttachment: "fixed",
            }}
          ></div>
          <div
            className="absolute inset-0 z-10 w-full h-full mix-blend-color-dodge"
            style={{
              backgroundImage: `url(${GlitchGif})`,
              backgroundSize: "auto",
              backgroundPosition: "center",
              backgroundAttachment: "fixed",
            }}
          ></div>
        </div>
        {/* )} */}

        {/* Hero Text - always above */}
        <div className="gap-4 relative z-20 select-none" style={{ gap: "2px" }}>
          {/* drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] */}
          <h1
            className="mt-10 lg:m-0 text-[#f0f0f0]  abnes font-bold text-shadow-md  leading-tight 
          text-[7vh] sm:text-[7vh] md:text-[13vh] lg:text-[10vw]"
          >
            ADITYA
          </h1>
          <h1
            className="m-0 text-[#f0f0f0] abnes font-bold text-shadow-md  leading-10 md:leading-20 lg:leading-28 
          text-[5vh] sm:text-[7vh] md:text-[13vh] lg:text-[10vw] "
          >
            SATULURI
          </h1>
        </div>

        <h1
          className="select-none relative z-20 mt-5 sm:mt-10 md:mt-15 lg:mt-20 mb-10 p-5 text-[#f0f0f0]  tracking-[.20em] lg:tracking-[.50em]  
        font-bold leading-tight text-[1.7vh] sm:text-[2vh] md:text-[2.5h] lg:text-[2.5vh] "
        >
          WEB & AI DEVELOPER, DESIGNER
        </h1>
        <IoIosArrowDown className="relative z-20 lg:mt-6 text-[#1c1c1c] text-3xl animate-bounce" />
      </div>

      {/* Scrollable Content */}
      <div>
        {/* About me*/}
        <div
          className="w-full h-[50vh] lg:h-[100vh] flex items-center mb-30 justify-center text-[#f0f0f0] text-2xl font-normal p-6 grain align-middle"
          style={{
            backgroundImage: `url(${Inspiration})`,
            backgroundSize: "fill",
            backgroundPosition: "center",
            backgroundAttachment: !isMobile ? "fixed" : "fixed",
          }}
        >
          {" "}
          <BlurText
            text="I build digital experiences where design meets code and AI adds intelligence."
            delay={50}
            animateBy="words"
            direction="top"
            className="text-lg lg:text-2xl mb-8 text-white justify-center"
          />
        </div>

        {/* Featured Work Section */}
        {/* <div className="h-[60vh]"> hi</div> */}
        <div className="flex flex-col w-full h-full lg:h-full lg:pr-10 lg:pl-10 lg:pb-30 p-0 m-0 items-center justify-center text-[#f0f0f0] bg-[#030303] text-2xl font-bold">
          <div className="flex lg:flex-row align-bottom lg:justify-between justify-between items-end w-full">
            <div className="text-6xl lg:text-8xl w-full h-full flex flex-col justify-center items-center lg:items-start">
              FEATURED <br></br>
              <span className="flex lg:flex-row lg:justify-between lg:items-end flex-col items-center gap-6 lg:gap-0 w-[30vw]">
                WORK{" "}
                <Link
                  to="/projects"
                  className="flex  text-white hover:text-red-600 transition-colors duration-300 text-2xl"
                >
                  <ShinyText
                    text="VIEW ALL"
                    disabled={false}
                    speed={3}
                    className=" cursor-target hover:border-b pb-1"
                  />
                </Link>
              </span>
            </div>
            {!isMobile ? (
              <div className="flex  font-normal text-2xl justify-end">
                Some text about my featured work (it) could be my most favorite
                works or recent works it depends.
              </div>
            ) : (
              <div className="p-0 m-0 h-0 w-0"></div>
            )}
          </div>

          <Suspense
            fallback={
              <div className="w-full h-full flex items-center justify-center">
                <div>Loading...</div>
              </div>
            }
          >
            <div className="grid lg:grid-cols-2 w-full pt-20 gap-[5vh] justify-center">
              {divs}
            </div>
          </Suspense>
        </div>

        {/* Filler Image Night City*/}
        {!isMobile ? (
          <Suspense
            fallback={
              <div className="w-full h-full flex items-center justify-center">
                <div>Loading...</div>
              </div>
            }
          >
            <div
              ref={cityRef}
              className="w-full h-[100vh] flex items-center mb-30 justify-center text-[#f0f0f0] text-2xl font-normal pb-6 grain transition-all duration-1000"
              style={{
                backgroundImage: `url(${cityBg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed",
              }}
            ></div>
          </Suspense>
        ) : (
          <></>
        )}

        {/* Skills Section */}
        <div className="w-full min-h-[80vh] flex flex-col md:flex-row justify-between px-4 sm:px-6 md:px-10 lg:py-10 py-40 gap-6 md:gap-10 text-lg sm:text-xl jura-font bg-[#030303] text-[#f0f0f0] cursor-crosshair">
          <div className="flex flex-col space-y-4 md:w-1/3 items-start">
            <div
              ref={skillsTitleRef}
              className="text-[55px] sm:text-5xl md:text-6xl lg:text-7xl sticky top-20"
            >
              SKILLS
            </div>
            <div className="text-2xl sm:text-3xl md:text-4xl sticky top-32 md:top-40 font-normal text-neutral-600">
              {currentCategory}
            </div>
          </div>
          <div className="w-full md:w-2/3 flex flex-col space-y-10 md:pl-10">
            {Object.entries(categories).map(([category, skills], index) => (
              <div
                key={category}
                data-category={category}
                className="w-full"
                onMouseEnter={() => setCurrentCategory(category)}
                onMouseLeave={() => setCurrentCategory("")}
              >
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 font-normal">
                  {skills.map((skill) => (
                    <div
                      key={skill}
                      className="h-16 sm:h-20 w-full border-2 flex items-center justify-center gap-2 border-neutral-800 rounded-3xl hover:rounded-none transition-all duration-500 ease-in-out cursor-pointer text-md sm:text-sm lg:text-xl"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
                {index < Object.keys(categories).length - 1 && (
                  <hr className="border-t border-neutral-800 my-4" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* EXPERIENCE Section  SET GROUP HOVERED ON {divs} */}
        <div className="w-full min-full flex flex-col md:flex-row lg:mb-30 mb-10 justify-between pt-10 pb-20 px-4 sm:px-6 md:px-10 lg:py-10 py-20  gap-6 md:gap-10 text-lg sm:text-xl jura-font cursor-crosshair bg-[#030303] text-[#f0f0f0]">
          <div className="flex md:w-1/3 lg:w-1/3 w-full items-start">
            <div className="text-[55px] sm:text-5xl md:text-6xl lg:text-7xl sticky top-20">
              EXPERIENCE
            </div>
          </div>
          <div className="w-full md:w-2/3 md:pl-10 space-y-10">
            {experience.map((exp, index) => (
              <div
                className="flex flex-col items-start text-sm sm:text-base md:text-lg space-y-6"
                key={index}
                onMouseEnter={() => setCurrentSkills(exp.skills)}
                onMouseLeave={() => setCurrentSkills("")}
              >
                <div className="text-3xl sm:text-3xl md:text-4xl">
                  {exp.place}
                </div>
                <div className="flex flex-col items-start w-full space-y-4 text-lg sm:text-lg md:text-xl">
                  <div className="flex flex-col sm:flex-row justify-between w-full gap-2">
                    <div>{exp.title}</div>
                    <div>{exp.date}</div>
                  </div>
                  <div className="text-neutral-600 tracking-normal w-full sm:w-5/6">
                    {exp.description}
                  </div>
                </div>
                {index !== experience.length - 1 && (
                  <hr className="w-full border-neutral-800 mt-5" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Filler Image*/}
        {/* <Suspense
          fallback={
            <div className="w-full h-[full] flex items-center justify-center">
              <div>Loading...</div>
            </div>
          }
        >
          <GridMotion items={items} />
        </Suspense> */}

        {/* Contact Section */}
        <div className="w-full min-h-[80vh] mt-10 mb-20 flex items-center justify-center text-[#f0f0f0] text-lg sm:text-xl font-bold px-4 sm:px-6 md:px-10">
          <div className="flex flex-col justify-center space-y-6 w-full lg:max-w-[80vw]">
            <h1 className="text-6xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
              LET'S WORK TOGETHER
            </h1>
            <div className="w-full flex flex-col gap-4">
              <input
                type="text"
                placeholder="Name"
                className="bg-white w-full text-black h-12 sm:h-14 md:h-15 px-4 placeholder:font-normal placeholder:tracking-widest placeholder:font-sans"
              />
              <input
                type="text"
                placeholder="Email"
                className="bg-white w-full text-black h-12 sm:h-14 md:h-15 px-4 placeholder:font-normal placeholder:tracking-widest placeholder:font-sans"
              />
              <textarea
                rows="6"
                placeholder="Message"
                className="bg-white w-full text-black px-4 py-2 outline-none resize-none placeholder:font-normal placeholder:tracking-widest placeholder:font-sans"
              />
              <button className="bg-[#090909] text-white hover:bg-red-600 hover:font-bold hover:border-black w-full h-12 sm:h-14 md:h-15 border border-neutral-400 jura-font text-base sm:text-lg cursor-pointer">
                SEND
              </button>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <Footer />
      </div>

      {/* Cursor Circle */}
      {!isMobile && (
        <div
          className="fixed top-0 left-0 w-5 h-5 rounded-full pointer-events-none bg-red-600 mix-blend-difference z-50 transition-transform duration-600 ease-out"
          style={{
            transform: `translate(${pos.x - 10}px, ${pos.y - 10}px) scale(${
              pos.x === 0 && pos.y === 0 ? 0 : hovering ? 13 : 0
            })`,
          }}
        ></div>
      )}
    </div>
  );
}
