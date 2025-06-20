import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import projectImg from "../assets/Moni.jpg";

const projects = [
  {
    title: "Cropify",
    desc: "Live web-app for analyzing test metrics using dynamic charts.",
    img: projectImg,
    about: [
      "An interactive live web-app for analyzing test metrics with dynamic charts.",
      "Implemented a competitive leaderboard feature to benchmark performance and track rankings.",
      "Engaged and impacted over 600 engineering students from 31 colleges nationwide."
    ],
    tech: "React.js, Node.js, Express.js, MongoDB, Tailwind CSS, ML",
    learnings: [
      "Acquired proficiency in Git and Github during this project.",
      "Learned to build scalable web apps with real-time data visualization."
    ]
  },
  {
    title: "Email Assistant",
    desc: "Generate email reply automatically.",
    img: projectImg,
    about: [
      "A simple web-app for generating email reply automatically.",
      "It is a simple web-app for effective email usage and management."
    ],
    tech: "React.js, Spring Boot, Spring, Gemini API",
    learnings: [
      "Improved UX for quick email reply.",
      "Handled local data persistence."
    ]
  },
  {
    title: "Doro Pizza",
    desc: "Order pizza online with real-time tracking.",
    img: projectImg,
    about: [
      "Online pizza ordering platform with live order tracking.",
      "Integrated payment gateway and delivery notifications."
    ],
    tech: "React.js, Node.js, Socket.io",
    learnings: [
      "Built real-time features with websockets.",
      "Integrated third-party APIs."
    ]
  },
  {
    title: "Portfolio Builder",
    desc: "Create and customize your own portfolio website easily.",
    img: projectImg,
    about: [
      "Drag-and-drop portfolio builder for developers.",
      "Export static sites for easy deployment."
    ],
    tech: "React.js, Redux",
    learnings: [
      "Worked with state management.",
      "Enhanced UI/UX for customization."
    ]
  },
  {
    title: "Task Tracker",
    desc: "Track your daily tasks and boost productivity.",
    img: projectImg,
    about: [
      "Task management app with reminders and analytics.",
      "Visualize productivity trends over time."
    ],
    tech: "React.js, Chart.js",
    learnings: [
      "Implemented notification systems.",
      "Analyzed user engagement data."
    ]
  }
];

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exiting, setExiting] = useState(false);
  const project = projects[id] || projects[0];

  const handleBack = () => {
    setExiting(true);
    setTimeout(() => navigate(-1), 350);
  };

  return (
    <div className={`home-bg${exiting ? ' fade-exit' : ''}`} style={{ fontFamily: 'Poppins, Inter, Arial, sans-serif', transition: 'background 0.3s' }}>
      <style>{`
        .fade-exit .iphone-frame {
          animation: fadeScaleOut 0.35s cubic-bezier(0.4,0,0.2,1) forwards;
        }
        @keyframes fadeScaleOut {
          0% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(0.85); }
        }
      `}</style>
      <div className="iphone-frame" style={{ background: "rgba(245, 246, 250, 0.9)", overflow: 'hidden', fontFamily: 'inherit' }}>
        {/* Status Bar & Back Arrow */}
        <div className="flex items-center justify-between px-4 pt-4 pb-2">
          <button onClick={handleBack} className="text-2xl text-black font-bold focus:outline-none">&#8592;</button>
          <span className="text-xs font-mono text-black tracking-widest">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
          <div className="flex gap-1 items-center">
            <span className="text-lg">&#9679;</span>
            <span className="text-lg">&#9679;</span>
            <span className="text-lg">&#9679;</span>
          </div>
        </div>
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-0 pb-4" style={{ height: 'calc(100% - 60px)' }}>
          <div className="relative">
            <img src={project.img} alt={project.title} className="w-full h-36 object-cover rounded-t-2xl" />
            <div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem', background: 'rgba(0,0,0,0.45)'}}></div>
            <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-end px-4 pb-2" style={{zIndex: 2}}>
              <div className="text-xs text-white/80 mb-1 font-semibold tracking-wide" style={{letterSpacing: '0.04em'}}>PROJECT</div>
              <div className="text-2xl font-extrabold text-white mb-1 leading-tight" style={{color: '#fff', fontWeight: 800}}>{project.title}</div>
              <div className="text-base text-white mb-2 font-medium" style={{color: '#fff'}}>{project.desc}</div>
              <div className="flex gap-3 mb-3">
                <a href="#" className="text-white text-xl" aria-label="GitHub"><i className="fab fa-github"></i></a>
                <a href="#" className="text-white text-xl" aria-label="External Link"><i className="fas fa-external-link-alt"></i></a>
              </div>
            </div>
          </div>
          <div className="px-0 pt-0 pb-2">
            <div className="bg-white rounded-2xl shadow p-5 mx-0 mt-2 mb-3" style={{marginLeft: 0, marginRight: 0}}>
              <div className="text-xl font-extrabold mb-3 text-black" style={{fontWeight: 700}}>What is it about</div>
              <ul className="list-disc pl-5 text-black text-base mb-4 space-y-2">
                {project.about.map((item, idx) => <li key={idx}>{item}</li>)}
              </ul>
              <hr className="my-2 border-gray-200" />
              <div className="text-xl font-extrabold mb-1 text-black" style={{fontWeight: 700}}>TechStack</div>
              <div className="text-black text-base mb-4 font-medium">{project.tech}</div>
              <div className="text-xl font-extrabold mb-1 text-black" style={{fontWeight: 700}}>Learnings</div>
              <ul className="list-disc pl-5 text-black text-base space-y-2">
                {project.learnings.map((item, idx) => <li key={idx}>{item}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 