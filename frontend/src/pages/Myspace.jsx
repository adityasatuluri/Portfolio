import React from "react";
import "../App.css";

import Dock from "../components/Dock";
import { MdArrowBack } from "react-icons/md";
import Footer from "../components/Footer";

export default function Myspace() {
  return (
    <>
      <div className="flex flex-col justify-center items-center w-full">
        <iframe
          data-testid="embed-iframe"
          src="https://open.spotify.com/embed/playlist/7GubD71PHEb2ho29uzsYCM?utm_source=generator&theme=0"
          className="h-[70vh] w-[100vw] px-10 my-10"
        ></iframe>
      </div>
      <Footer />
    </>
  );
}
