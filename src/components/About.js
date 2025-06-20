import React, { useState, useEffect } from "react";
import profileImg from "../assets/icons8-scholar-66.png";
import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();
  const [entering, setEntering] = useState(true);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setEntering(false), 350);
    return () => clearTimeout(timer);
  }, []);

  const handleBack = () => {
    setExiting(true);
    setTimeout(() => navigate(-1), 350);
  };

  return (
    <div className={`home-bg${exiting ? ' fade-exit' : ''}`}>
      <style>{`
        .fade-exit .iphone-frame {
          animation: fadeScaleOut 0.35s cubic-bezier(0.4,0,0.2,1) forwards;
        }
        .app-entering {
          animation: fadeScaleIn 0.35s cubic-bezier(0.4,0,0.2,1);
        }
        @keyframes fadeScaleOut {
          0% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(0.85); }
        }
        @keyframes fadeScaleIn {
          0% { opacity: 0; transform: scale(0.85); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
      <div className={`iphone-frame${entering ? ' app-entering' : ''}`} style={{ background: "rgba(245, 246, 250, 0.9)", fontFamily: 'Poppins, Inter, Arial, sans-serif', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
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
        {/* Main Scrollable Content */}
        <div className="about-scroll flex-1 overflow-y-auto px-4" style={{ height: 'calc(100% - 60px)' }}>
          {/* Title */}
          <div className="px-5 pb-2">
            <h2 className="text-xl font-bold text-black mb-2 text-left">About Me</h2>
          </div>
          {/* Profile Image */}
          <div className="flex flex-col items-center px-5 pb-2">
            <img
              src={profileImg}
              alt="Twinshu Parmar"
              className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg mb-2"
              style={{ background: '#fff' }}
            />
            <div className="text-2xl font-bold text-black mt-2 mb-1 text-center">Yash Mhatre</div>
          </div>
          {/* Description */}
          <div className="px-6 text-center text-black text-base font-normal mb-4" style={{ lineHeight: 1.5 }}>
            I'm a <span role="img" aria-label="cap">🎓</span> final year Computer Science Engineering student with a knack for solving real life problems. I'm also a <span role="img" aria-label="laptop">💻</span> Full Stack Developer with 50% Frontend and 50% Backend. I'm always up for a challenge. Let's create <span role="img" aria-label="bulb">💡</span> transformative solutions together! <span role="img" aria-label="sparkles">💖</span>
          </div>
          {/* Social/Profile Buttons */}
          <div className="px-6 pb-4">
            <div className="grid grid-cols-2 gap-3">
              <a href="https://x.com/Yraj25?t=530XyqnS6PBPfCuVicv6ZA&s=09" target="_blank" rel="noopener noreferrer" className="bg-blue-100 text-black rounded-xl py-3 font-semibold text-base shadow text-center transition hover:bg-blue-200">Twitter<br /><span className="text-xs font-normal">Yash_Mhatre</span></a>
              <a href="https://www.linkedin.com/in/yash-mhatre-ba2276239" target="_blank" rel="noopener noreferrer" className="bg-blue-100 text-black rounded-xl py-3 font-semibold text-base shadow text-center transition hover:bg-blue-200">LinkedIn<br /><span className="text-xs font-normal">yash-mhatre</span></a>
            </div>
            <div className="flex justify-center mt-3">
              <a href="https://github.com/Yashxxp" target="_blank" rel="noopener noreferrer" className="bg-blue-100 text-black rounded-xl py-3 px-8 font-semibold text-base shadow text-center transition hover:bg-blue-200">GitHub<br /><span className="text-xs font-normal">Yashxxp</span></a>
              <a href="https://drive.google.com/file/d/1CSCDtsX3uefJffSi57WCrns0tclp-2AZ/view?usp=drive_link" target="_blank" rel="noopener noreferrer" className="bg-green-100 text-black rounded-xl py-3 px-8 font-semibold text-base shadow text-center transition hover:bg-green-200 ml-3">Resume<br /><span className="text-xs font-normal">View PDF</span></a>
            </div>
          </div>
          {/* Contact/Opportunity Text */}
          <div className="px-6 pb-6 text-black text-base font-normal text-left">
            <p className="mb-1 font-semibold">I have a passion for creating innovative products. If you have an exciting idea or are interested in hiring me, please reach out!<br/>(Actively seeking new opportunity)</p>
            <a href="mailto:yashmhatre2583@gmail.com" className="text-blue-600 hover:underline break-all">yashmhatre2583@gmail.com</a>
          </div>
        </div>
      </div>
    </div>
  );
} 