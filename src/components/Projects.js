import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
// Example project images (replace with your own assets)
import projectImg from "../assets/Moni.jpg";

const projects = [
  {
    title: "Cropify",
    desc: "Live web-app aiding farmers to earn maximum profit.",
    img: projectImg,
    link: "#"
  },
  {
    title: "Email Assistant",
    desc: "Generate email reply automatically.",
    img: projectImg,
    link: "#"
  },
  {
    title: "Doro Pizza",
    desc: "Order pizza online with real-time tracking.",
    img: projectImg,
    link: "#"
  },
  {
    title: "Portfolio Builder",
    desc: "Create and customize your own portfolio.",
    img: projectImg,
    link: "#"
  },
  {
    title: "Task Tracker",
    desc: "Track your daily tasks and boost productivity.",
    img: projectImg,
    link: "#"
  }
];

export default function Projects({ wallpaper }) {
  const navigate = useNavigate();
  const [entering, setEntering] = useState(true);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // Reset entering state after animation
    const timer = setTimeout(() => setEntering(false), 350);
    return () => clearTimeout(timer);
  }, []);

  const handleExplore = (id) => {
    setExiting(true);
    setTimeout(() => navigate(`/projects/${id}`), 350);
  };

  return (
    <div className={`home-bg${exiting ? ' fade-exit' : ''}`}>
      <style>{`
        .fade-exit .iphone-frame {
          animation: fadeScaleOut 0.35s cubic-bezier(0.4,0,0.2,1) forwards;
        }
        @keyframes fadeScaleOut {
          0% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(0.85); }
        }
      `}</style>
      <div className={`iphone-frame${entering ? ' app-entering' : ''}`} style={{ background: "rgba(245, 246, 250, 0.9)" }}>
        {/* Status Bar & Back Arrow */}
        <div className="flex items-center justify-between px-4 pt-4 pb-2">
          <button onClick={() => navigate("/")} className="text-2xl text-black font-bold focus:outline-none">
            &#8592;
          </button>
          <span className="text-xs font-mono text-black tracking-widest">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
          <div className="flex gap-1 items-center">
            <span className="text-lg">&#9679;</span>
            <span className="text-lg">&#9679;</span>
            <span className="text-lg">&#9679;</span>
          </div>
        </div>
        {/* Title */}
        <div className="px-5 pb-2">
          <h2 className="text-xl font-bold text-black mb-2">Top Projects</h2>
        </div>
        {/* Project Cards: Top Projects */}
        <div className="flex-1 px-5 pb-2">
          <div className="flex gap-4 overflow-x-auto hide-scrollbar" style={{paddingBottom: 2}}>
            {projects.slice(0, 2).map((p, i) => (
              <div key={i} className="min-w-[180px] max-w-[180px] bg-white rounded-2xl shadow-lg overflow-hidden flex-shrink-0 mr-4 last:mr-0">
                <div className="relative">
                  <img src={p.img} alt={p.title} className="w-full h-72 object-cover rounded-t-2xl" />
                  <div className="absolute left-0 bottom-0 w-full bg-black/80 rounded-b-2xl px-4 pt-3 pb-4 flex flex-col items-start">
                    <div className="text-white font-bold text-base leading-tight mb-1 text-left w-full">{p.title}</div>
                    <div className="text-white text-xs leading-snug mb-2 text-left w-full">{p.desc}</div>
                    <button className="bg-white text-black text-xs px-4 py-1 rounded-full font-semibold mt-1" onClick={() => handleExplore(i)}>Explore</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* More Projects */}
        <div className="px-5 pt-2">
          <h2 className="text-lg font-bold text-black mb-2">More Projects</h2>
        </div>
        <div className="flex-1 overflow-y-auto px-5 pb-4">
          <div className="flex flex-col gap-3">
            {projects.slice(1).map((p, i) => (
              <div key={i+1} className="w-full bg-black/80 rounded-2xl overflow-hidden relative">
                <img src={p.img} alt={p.title} className="w-full h-20 object-cover opacity-60" />
                <div className="absolute left-0 top-0 w-full h-full flex flex-col justify-between p-3">
                  <div className="text-white font-bold text-base leading-tight">{p.title}</div>
                  <div className="text-white text-xs leading-snug">{p.desc}</div>
                  <div className="flex justify-end">
                    <button className="bg-white text-black text-xs px-3 py-1 rounded-full font-semibold" onClick={() => handleExplore(i+1)}>Explore</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 