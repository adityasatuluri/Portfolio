import React, { useEffect, useState, useRef } from "react";
import BlurText from "../components/Blurtext.jsx";
import ShinyText from "../components/Shinytext.jsx";
import TrueFocus from "../components/TrueFocus.jsx";
import { IoIosArrowDown } from "react-icons/io";
import "../App.css";
import InteractiveGrid from "../components/InteractiveGrid.jsx";
import Inspiration from "../assets/cy-yt.png";
import { MdArrowOutward } from "react-icons/md";
import Footer from "../components/Footer.jsx";
import Filler from "../assets/Home_Filler.svg";
import RedBgRev from "../assets/red-bg-rev.png";
import Mockup from "../assets/mockup.jpg";
import Aditya from "../assets/aditya2.jpg";
import City from "../assets/cy-city.png";
import ReactLogo from "../assets/logos/tailwind.png";
import InfiniteCards from "../components/InfiniteCards.jsx";
import { Timeline } from "../components/Timeline";
import SkillTree from "../components/SkillTree.jsx"; // Import SkillTree component
import SkillsTab from "../components/SkillsTab.jsx"; // Import SkillsTab component
import SkillButton from "../components/SkillButton.jsx";

export default function Home() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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
        className="h-[75vh]  border-1 border-neutral-800 rounded-2xl cursor-target"
      >
        <div
          className="flex items-center justify-center h-8/10  border-0 rounded-t-2xl "
          style={{ backgroundImage: `url(${Mockup})`, backgroundSize: "cover" }}
        >
          {i + 1}
        </div>
        <div className="flex flex-row items-center justify-between pr-6 pl-6 bg-[#0c0c0c] h-2/10 rounded-b-2xl">
          <div className="flex flex-col items-start justify-center">
            <div className="text-[#f1f1f1] text-xl">ELECTRIFIND</div>
            <div className="text-[#8c8c8c] text-lg ">UI/UX Design</div>
          </div>
          <div className="border-1 border-[#454545] p-1 pr-4 pl-4 text-[#f1f1f1] text-lg font-light rounded-full">
            2024
          </div>
        </div>
      </div>
    );
  }

  useEffect(() => {
    // ✅ check screen size
    const checkMobile = () => setIsMobile(window.innerWidth < 768); // md breakpoint
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div className="w-full bg-[#030303] relative ">
      {/* Hero Section */}
      <div
        className="relative flex flex-col items-center justify-center text-center overflow-hidden cursor-none grain "
        style={{ height: "100vh", backgroundImage: `url(${RedBgRev})` }}
      >
        {/* ✅ Show InteractiveGrid only on desktop */}
        {!isMobile && <InteractiveGrid />}

        <div className="gap-4" style={{ gap: "2px" }}>
          <h1
            className="relative z-10 m-0 text-[#f0f0f0] jura-font font-bold leading-tight text-[8vh] sm:text-[15vh] md:text-[20vh] lg:text-[25vh]"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            ADITYA
          </h1>

          <h1
            className="relative z-10 m-0 text-[#f0f0f0] jura-font font-bold leading-10 md:leading-20 lg:leading-28 text-[8vh] sm:text-[15vh] md:text-[20vh] lg:text-[25vh]"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            SATULURI
          </h1>
        </div>
        <h1 className="relative z-10 mt-10 md:mt-18 lg:mt-24 mb-10 text-[#f0f0f0] jura-font tracking-[.25em] font-bold leading-tight text-[2vh] sm:text-[2vh] md:text-[2.5h] lg:text-[2.5vh]">
          <TrueFocus
            sentence="WEB & AI DEVELOPER, DESIGNER"
            manualMode={false}
            blurAmount={5}
            borderColor="red"
            animationDuration={1}
            pauseBetweenAnimations={1}
          />
        </h1>
        <IoIosArrowDown className="relative z-10 mt-6 text-[#4d4d4d] text-3xl animate-bounce" />
      </div>

      {/* Scrollable Content */}
      <div>
        {/* About me*/}
        <div
          className="w-full h-[90vh] flex items-center mb-30 justify-center text-[#f0f0f0] text-2xl font-normal pb-6 grain"
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
            delay={150}
            animateBy="words"
            direction="top"
            className="text-2xl mb-8 text-white"
          />
        </div>

        {/* Featured Work Section */}
        <div className="flex flex-col w-full h-full pr-10 pl-10  pt-30 pb-30 items-start justify-center text-[#f0f0f0] bg-[#030303] text-2xl font-bold">
          <div className="flex flex-row align-bottom justify-between items-end w-full">
            <div className="text-8xl">
              FEATURED <br></br>WORK
            </div>
            <div className="w-[50vw] font-normal text-2xl">
              Some text about my featured work (it) could be my most favorite
              works or recent works it depends.
            </div>
          </div>
          <div className="grid grid-cols-2 w-full pt-20 gap-[5vh]">
            {/* Loop that extracts json and display divs */}
            {divs}
          </div>
        </div>

        {/* Filler Image*/}
        <div
          className="w-full h-[90vh] flex items-center mb-30 justify-center text-[#f0f0f0] text-2xl font-normal pb-6 grain"
          style={{
            backgroundImage: `url(${City})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        ></div>

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
                      className="h-20 w-full border-2 flex flex-row items-center justify-center gap-4 border-neutral-800 rounded-full cursor-target"
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

        {/* EXPERIENCE Section */}
        <div className="w-full h-full flex flex-row justify-between pt-30 pb-30 pr-10 pl-10 gap-10 text-2xl jura-font cursor-crosshair bg-[#030303] text-[#f0f0f0]">
          <div className="">
            <div className="text-7xl w-[30vw] sticky top-20">EXPERIENCE</div>
            <div className="text-3xl w-[30vw] sticky top-40 font-normal text-neutral-600">
              {currentSkills}
            </div>
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
        <div className="w-full h-[90vh] flex items-center justify-center text-[#f0f0f0] text-2xl font-bold pb-6">
          <img
            className="w-full h-full object-cover grain"
            src={Filler}
            alt="Filler"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </div>

        {/* Contact Section */}
        <div className="w-full h-[80vh]  mt-20 mb-30 flex items-center justify-between text-[#f0f0f0] text-xl font-bold pr-10">
          <div className="flex flex-col justify-end  space-y-8 items-start">
            <h1 className="text-8xl pl-10 mt-none leading-none w-[40vw]">
              LET'S WORK TOGETHER
            </h1>
            <div className="h-full w-full pl-10 pr-10 flex flex-col gap-4">
              <input
                type="text"
                placeholder="Name"
                className="bg-white w-[37vw] text-black h-15 pl-4 pr-4 placeholder:font-normal placeholder:tracking-widest placeholder:font-sans"
              />
              <input
                type="text"
                placeholder="Email"
                className="bg-white w-[37vw] text-black h-15 pl-4 pr-4 placeholder:font-normal placeholder:tracking-widest placeholder:font-sans"
              />
              <textarea
                rows="10"
                placeholder="Message"
                className="bg-white w-[37vw] h-34 text-black px-4 py-2 outline-none resize-none placeholder:font-normal placeholder:tracking-widest placeholder:font-sans"
              />

              <button className="bg-[#090909] text-white hover:bg-red-600  hover:font-bold hover:border-black w-[37vw] h-15 border-1 border-neutral-400 jura-font text-normal cursor-target">
                SEND
              </button>
            </div>
          </div>
          <div className="w-[75vw] h-full pt-4 ">
            <div className="h-full w-full grain">
              <img
                className="w-[60vw] h-full object-cover "
                src={Aditya}
                alt="Aditya"
              />
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
