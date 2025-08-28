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
import ShinyText from "../components/Shinytext.jsx";
import item2077 from "../assets/item2077.png";
import GlitchGif from "../assets/verticalglitch.gif";
import { IoIosArrowDown } from "react-icons/io";
import "../App.css";
import InteractiveGrid from "../components/InteractiveGrid.jsx";
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

  // const timelineData = [
  //   {
  //     title: "2023 - Now",
  //     job: "Freelance Graphic Designer",
  //     content: <p>Iam Working as a freelance Graphic Designer</p>,
  //   },
  //   {
  //     title: "Changelog",
  //     job: "Portfolio Updates",
  //     content: (
  //       <ul>
  //         <li>Card grid component</li>
  //         <li>Startup template Aceternity</li>
  //         <li>Random file upload</li>
  //       </ul>
  //     ),
  //   },
  // ];

  // Create an array of divs for featured work

  const divs = [];
  for (let i = 0; i < 5; i++) {
    divs.push(
      <div
        key={i}
        className="h-[75vh] border-1 border-neutral-800 rounded-2xl cursor-target transition-all duration-300 ease-in-out hover:rounded-none"
      >
        <div
          className="relative flex items-center justify-center h-8/10 border-0 rounded-t-2xl transition-all duration-300 ease-in-out"
          style={{ backgroundImage: `url(${Mockup})`, backgroundSize: "cover" }}
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

        <div className="flex flex-row items-center justify-between pr-6 pl-6 bg-[#0c0c0c] h-2/10 rounded-b-2xl transition-all duration-300 ease-in-out hover:rounded-none">
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
      <div
        className="relative flex flex-col items-center justify-center text-center cursor-none grain"
        style={{ height: "90vh" }}
      >
        {/* {!isMobile && ( */}
        <div className="absolute inset-0 z-0">
          {/* background at the very back */}
          <div
            className="absolute inset-0 z-0 w-[100vw] h-[90vh]"
            style={{
              backgroundImage: `url(${WhiteBg})`,
              backgroundSize: "cover",
              backgroundPosition: "bottom",
              backgroundAttachment: "fixed",
            }}
          ></div>

          {/* Text sample behind model - disabled for now */}
          {/* <div
            className="space-y-10 absolute inset-0 z-9 h-[100vh] flex flex-col justify-center pb-67 items-center "
            style={{ gap: "2px" }}
          >
            <h1 className="m-0 text-[#060606] abnes font-bold leading-tight text-[6vh] sm:text-[15vh] md:text-[20vh] lg:text-[10vw]">
              ADITYA
            </h1>
            <h1 className="m-0 text-[#060606] abnes font-bold leading-10 md:leading-20 lg:leading-28 text-[6vh] sm:text-[15vh] md:text-[20vh] lg:text-[10vw]">
              SATULURI
            </h1>
          </div> */}

          {/* ModelViewer*/}
          {/* <Suspense
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
          </Suspense> */}

          <div
            className="absolute inset-0 z-15 w-[100vw] h-[90vh]"
            style={{
              backgroundImage: `url(${item2077})`,
              backgroundSize: "cover",
              backgroundPosition: "bottom",
              backgroundAttachment: "",
            }}
          ></div>

          {/* Glitch overlay above everything */}
          <div
            className="absolute inset-0 z-10 w-[100vw] h-[100vh] mix-blend-screen"
            style={{
              backgroundImage: `url(${GlitchGif})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed",
            }}
          ></div>
          <div
            className="absolute inset-0 z-10 w-[100vw] h-[100vh] mix-blend-color-dodge"
            style={{
              backgroundImage: `url(${GlitchGif})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed",
            }}
          ></div>
        </div>
        {/* )} */}

        {/* Hero Text - always above */}
        <div className="gap-4 relative z-20" style={{ gap: "2px" }}>
          {/* drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] */}
          <h1 className="m-0 text-[#f0f0f0]  abnes font-bold text-shadow-md  leading-tight text-[6vh] sm:text-[15vh] md:text-[20vh] lg:text-[10vw]">
            ADITYA
          </h1>
          <h1 className="m-0 text-[#f0f0f0] abnes font-bold text-shadow-md  leading-10 md:leading-20 lg:leading-28 text-[6vh] sm:text-[15vh] md:text-[20vh] lg:text-[10vw] ">
            SATULURI
          </h1>
        </div>

        <h1 className="relative z-20 mt-0 md:mt-15 lg:mt-20 mb-10 text-[#f0f0f0]  tracking-[.50em] font-bold leading-tight text-[2vh] sm:text-[2vh] md:text-[2.5h] lg:text-[2.5vh]">
          WEB & AI DEVELOPER, DESIGNER
        </h1>
        <IoIosArrowDown className="relative z-20 mt-6 text-[#1c1c1c] text-3xl animate-bounce" />
      </div>

      {/* Scrollable Content */}
      <div>
        {/* About me*/}
        <div
          className="w-full h-[100vh] flex items-center mb-30 justify-center text-[#f0f0f0] text-2xl font-normal pb-6 grain"
          style={{
            backgroundImage: `url(${Inspiration})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        >
          {" "}
          <BlurText
            text="I build digital experiences where design meets code and AI adds intelligence."
            delay={50}
            animateBy="words"
            direction="top"
            className="text-2xl mb-8 text-white"
          />
        </div>

        {/* Featured Work Section */}
        <div className="flex flex-col w-full h-full pr-10 pl-10 pb-30 items-start justify-center text-[#f0f0f0] bg-[#030303] text-2xl font-bold">
          <div className="flex flex-row align-bottom justify-between items-end w-full">
            <div className="text-8xl">
              FEATURED <br></br>
              <span className="flex flex-row justify-between">
                WORK{" "}
                <Link
                  to="/projects"
                  className="flex flex-row gap-2 items-end text-white hover:text-red-600 transition-colors duration-300 text-2xl"
                >
                  {/* <span className="flex flex-row items-end cursor-target hover:border-b pb-1">
                    
                  </span> */}
                  <ShinyText
                    text="VIEW ALL"
                    disabled={false}
                    speed={3}
                    className="flex flex-row items-end cursor-target hover:border-b pb-1"
                  />
                </Link>
              </span>
            </div>
            <div className="flex w-[50vw] font-normal text-2xl justify-end">
              Some text about my featured work (it) could be my most favorite
              works or recent works it depends.
            </div>
          </div>
          <Suspense
            fallback={
              <div className="w-full h-full flex items-center justify-center">
                <div>Loading...</div>
              </div>
            }
          >
            <div className="grid grid-cols-2 w-full pt-20 gap-[5vh]">
              {/* Loop that extracts json and display divs */}
              {divs}
            </div>
          </Suspense>
        </div>

        {/* Filler Image Night City*/}
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

        {/* Skills Section */}
        <div className="w-full h-full flex flex-row justify-between pr-10 pl-10 gap-10 text-2xl jura-font bg-[#030303] text-[#f0f0f0] cursor-crosshair">
          <div className="flex flex-col space-y-4">
            <div
              ref={skillsTitleRef}
              className="text-7xl w-[30vw] sticky top-20"
            >
              SKILLS
            </div>
            <div className="text-4xl w-[30vw] sticky top-40 font-normal text-neutral-600">
              {currentCategory}
            </div>
          </div>
          <div className="w-[80vw] pl-10 flex flex-col space-y-20">
            {Object.entries(categories).map(([category, skills], index) => (
              <div
                key={category}
                data-category={category}
                className="w-full"
                onMouseEnter={() => setCurrentCategory(category)}
                onMouseLeave={() => setCurrentCategory("")} // ✅ change title on hover
              >
                <div className="w-[60vw] h-full grid grid-cols-4 space-y-4 gap-4 font-normal">
                  {skills.map((skill) => (
                    <div
                      key={skill}
                      className="h-20 w-full border-2 flex flex-row items-center justify-center gap-4 border-neutral-800
             rounded-4xl hover:rounded-none transition-all duration-500 ease-in-out cursor-target"
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
        <div className="w-full h-full flex flex-row justify-between pt-30 pb-30 pr-10 pl-10 gap-10 text-2xl jura-font cursor-crosshair bg-[#030303] text-[#f0f0f0]">
          <div className="">
            <div className="text-7xl w-[30vw] sticky top-20">EXPERIENCE</div>
            {/* <div className="text-3xl w-[30vw] sticky top-45 font-normal text-neutral-600">
              {currentSkills}
            </div> */}
          </div>
          <div className="w-[80vw] pl-10 space-y-10">
            {experience.map((exp, index) => (
              <div
                className="flex flex-col items-start text-2xl space-y-8"
                key={index}
                onMouseEnter={() => setCurrentSkills(exp.skills)}
                onMouseLeave={() => setCurrentSkills("")}
              >
                <div className=" text-4xl">{exp.place}</div>

                <div className="flex flex-col items-start w-full space-y-4">
                  <div className="flex flex-row justify-between w-full">
                    <div>{exp.title}</div>
                    <div>{exp.date}</div>
                  </div>
                  <div className="text-neutral-600 tracking-normal w-5/8">
                    {exp.description}
                  </div>
                </div>
                {index !== experience.length - 1 && (
                  <hr className="w-full border-neutral-800 mt-5 mb-5" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Filler Image*/}
        <Suspense
          fallback={
            <div className="w-full h-full flex items-center justify-center">
              <div>Loading...</div>
            </div>
          }
        >
          <GridMotion items={items} />
        </Suspense>

        {/* Contact Section */}
        <div className="w-full h-full  mt-30 mb-30 flex items-center justify-center text-[#f0f0f0] text-xl font-bold pr-10">
          <div className="flex flex-col justify-center  space-y-8 items-start">
            <h1 className="text-8xl  mt-none leading-none w-full ">
              LET'S WORK TOGETHER
            </h1>
            <div className="h-full w-full  mt-5 flex flex-col gap-4">
              <input
                type="text"
                placeholder="Name"
                className="bg-white w-full text-black h-15 pl-4 pr-4 placeholder:font-normal placeholder:tracking-widest placeholder:font-sans"
              />
              <input
                type="text"
                placeholder="Email"
                className="bg-white w-full text-black h-15 pl-4 pr-4 placeholder:font-normal placeholder:tracking-widest placeholder:font-sans"
              />
              <textarea
                rows="10"
                placeholder="Message"
                className="bg-white w-full h-34 text-black px-4 py-2 outline-none resize-none placeholder:font-normal placeholder:tracking-widest placeholder:font-sans"
              />

              <button className="bg-[#090909] text-white hover:bg-red-600  hover:font-bold hover:border-black w-full h-15 border-1 border-neutral-400 jura-font text-normal cursor-target">
                SEND
              </button>
            </div>
          </div>
          {/* <div className="w-[75vw] h-full pt-4 ">
            <div className="h-full w-full grain">
              <img
                className="w-[60vw] h-full object-cover "
                src={Aditya}
                alt="Aditya"
              />
            </div>
          </div> */}
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
