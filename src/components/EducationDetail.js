import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';

const education = [
  {
    degree: "B.Tech",
    school: "MIT ADT University",
    board: "Autonomous",
    location: "Pune, Maharashtra",
    result: "CGPA 7.56/10"
  },
  {
    degree: "Class XII",
    school: "RJCS Kharghar",
    board: "HSC",
    location: "Kharghar, Navi Mumbai",
    result: "Percentage 94.8%"
  },
  {
    degree: "Class X",
    school: "St Mary's Convent Highj School Uran",
    board: "CBSE",
    location: "Uran, Navi Mumbai",
    result: "Percentage 84.6%"
  }
];

export default function EducationDetail() {
  const navigate = useNavigate();
  const [exiting, setExiting] = useState(false);
  const [entering, setEntering] = useState(true);

  useEffect(() => {
    // Reset entering state after animation
    const timer = setTimeout(() => setEntering(false), 350);
    return () => clearTimeout(timer);
  }, []);

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
      <div className={`iphone-frame${entering ? ' app-entering' : ''}`} style={{ background: "rgba(245, 246, 250, 0.9)", overflow: 'hidden', fontFamily: 'inherit' }}>
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
        {/* Title */}
        <div className="px-5 pb-2">
          <h2 className="text-xl font-bold text-black mb-2 text-left">Education</h2>
        </div>
        {/* Education Cards */}
        <div className="flex-1 overflow-y-auto px-5 pb-4">
          <div className="flex flex-col gap-3">
            {education.map((edu, i) => (
              <div key={i} className="bg-blue-500 rounded-2xl p-4 text-white">
                <div className="font-bold text-lg mb-1">{edu.degree}</div>
                <div className="text-sm opacity-90">{edu.school}</div>
                <div className="text-xs opacity-80 mt-1">{edu.board} • {edu.location}</div>
                <div className="text-sm font-semibold mt-2">{edu.result}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 