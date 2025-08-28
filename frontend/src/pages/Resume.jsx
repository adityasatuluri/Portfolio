import React from "react";
import resume from "../assets/documents/Aditya_Resume.pdf";
import UXresume from "../assets/documents/Aditya_UX_Resume.pdf";
import Matrix from "../assets/matrix.jpg";

export default function Resume() {
  return (
    <div
      style={{
        backgroundImage: `url(${Matrix})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
      className="text-white h-[92vh] w-full flex flex-row gap-10 align-middle justify-center items-center grain bg-black"
    >
      <a
        href={resume}
        target="blank"
        className="border-1 border-neutral-800 w-40 flex mt-30 backdrop-blur-md mr-18 px-8 py-5 justify-center rounded-3xl cursor-target hover:rounded-none hover:bg-red-700 transition-all duration-400 ease-in-out"
      >
        Development
      </a>
      <a
        href={UXresume}
        target="blank"
        className="border-1 border-neutral-800 w-40 flex mt-30 backdrop-blur-md ml-18 px-8 py-5 justify-center rounded-3xl cursor-target hover:rounded-none hover:bg-blue-700 transition-all duration-400 ease-in-out"
      >
        Design
      </a>
    </div>
  );
}
