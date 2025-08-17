import { useState, useEffect } from "react";
import "./App.css";
import Home from "./pages/home.jsx";
import MySpace from "./pages/Myspace.jsx";
import UXGraphic from "./pages/ux.jsx";
import Soft from "./pages/soft.jsx";
import logo from "./assets/logo.svg";

function App() {
  const [menuItem, setMenuItem] = useState("Home");

  useEffect(() => {
    document.title = "Portfolio";
  }, []);

  const renderComponent = () => {
    switch (menuItem) {
      case "Home":
        return <Home />;
      case "MySpace":
        return <MySpace />;
      case "UX":
        return <UXGraphic />;
      case "Soft":
        return <Soft />;
      default:
        return <Home />;
    }
  };

  return (
    <>
      <div className="w-full min-h-screen flex flex-col bg-[#080808] font-sans relative">
        {/* Navigation */}
        <div className="w-full flex items-center justify-between gap-6 p-4 text-white fixed top-0 z-50 bg-black/85 backdrop-blur-md">
          <img className="max-w-10" src={logo} alt="Logo" />
          <div className="flex items-center gap-6 text-sm">
            <p
              onClick={() => setMenuItem("Home")}
              className="cursor-pointer hover:text-blue-400"
            >
              Home
            </p>
            <p
              onClick={() => setMenuItem("Soft")}
              className="cursor-pointer hover:text-blue-400"
            >
              Projects
            </p>
            <p
              onClick={() => setMenuItem("UX")}
              className="cursor-pointer hover:text-blue-400"
            >
              UX & Graphic
            </p>
            <p
              onClick={() => setMenuItem("MySpace")}
              className="cursor-pointer hover:text-blue-400"
            >
              MySpace
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="pt-20 flex-1 bg-black overflow-y-auto scrollbar-hide">
          {renderComponent()}
        </div>
      </div>
    </>
  );
}

export default App;
