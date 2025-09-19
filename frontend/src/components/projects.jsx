import React from "react";

const projects = () => {
  const projects = {
    projects: [
      {
        id: 1,
        title: "ELECTRIFIND",
        category: "UI/UX Design",
        description: "UI design for a EV charging station finder app",
        year: "2024",
        image: "/public/projects/electrifind.jpg",
        repo_link: null,
        live_link: [
          "https://www.behance.net/gallery/200227953/ElectriFind-EV-Charging-Station-Finder-UI-Design",
          "Behance",
        ],
      },
      {
        id: 2,
        title: "Project Two",
        category: "MERN",
        description: "Description for project two.",
        year: "2025",
        image: "mockup.jpg",
        repo_link: null,
        live_link: ["https://live.example.com/project-one", "Website"],
      },
      {
        id: 3,
        title: "Project Three",
        category: "UI/UX Design",
        description: "Description for project three.",
        year: "2026",
        image: "aditya.jpg",
        repo_link: "https://live.example.com/project-one",
        live_link: ["https://live.example.com/project-one", "Website"],
      },
      {
        id: 4,
        title: "Project Two",
        category: "MERN",
        description: "Description for project two.",
        year: "2025",
        image: "mockup.jpg",
        repo_link: null,
        live_link: ["https://live.example.com/project-one", "Website"],
      },
      {
        id: 5,
        title: "Project Three",
        category: "UI/UX Design",
        description: "Description for project three.",
        year: "2026",
        image: "aditya.jpg",
        repo_link: "https://live.example.com/project-one",
        live_link: null,
      },
    ],
  };

  return <div>projects</div>;
};

export default projects;
