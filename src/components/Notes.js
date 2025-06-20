import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Notes() {
  const navigate = useNavigate();
  const [entering, setEntering] = useState(true);
  const [exiting, setExiting] = useState(false);
  const notes = [
    {
      title: "Technical Skills",
      date: "Yesterday",
      tag: "#Techno",
      folder: "Notes",
      content: `<b>LANGUAGES</b><br/>C, C++, Javascript, Java<br/><br/><b>FRAMEWORKS/LIBRARIES</b><br/>Angular, React.js, Serverless<br/><br/><b>TOOLS</b><br/>Git, Github, AWS, VSCode, Postman<br/><br/><b>DATABASES</b><br/>MySQL, MongoDB, DynamoDB<br/><br/><b>OTHERS</b><br/>Data Structures & Algorithms, OOP, Technical Writing`
    },
    {
      title: "Soft Skills",
      date: "Yesterday",
      tag: "#Techno",
      folder: "Notes",
      content: `<b><u>Soft Skills</u></b><br/>Communication Skills, Problem Solving, Optimistic, Leadership, Team Player, Management, Analytical Abilities, Willingness to learn`
    },
    {
      title: "Achievements",
      date: "Yesterday",
      tag: "#Techno",
      folder: "Notes",
      content: "<b>Achievements</b><br/>Winner of XYZ Hackathon, Dean's List 2022, Published 2 research papers"
    },
    {
      title: "Co-Curricular Activities",
      date: "Yesterday",
      tag: "#Techno",
      folder: "Notes",
      content: "<b>Co-Curricular Activities</b><br/>Member of Coding Club, Volunteer at TechFest, Organizer of Workshop Series"
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setEntering(false), 350);
    return () => clearTimeout(timer);
  }, []);

  const handleNoteClick = (i) => {
    setExiting(true);
    setTimeout(() => navigate(`/notes/${i}`), 350);
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
          <button onClick={() => { setExiting(true); setTimeout(() => navigate(-1), 350); }} className="text-2xl text-black font-bold focus:outline-none">&#8592;</button>
          <span className="text-xs font-mono text-black tracking-widest">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
          <div className="flex gap-1 items-center">
            <span className="text-lg">&#9679;</span>
            <span className="text-lg">&#9679;</span>
            <span className="text-lg">&#9679;</span>
          </div>
        </div>
        {/* Title and Search */}
        <div className="px-5 pb-2">
          <div className="text-lg font-semibold text-gray-700 text-left mb-1">Folders</div>
          <div className="text-3xl font-bold text-black mb-2 text-left">All iCloud</div>
          <div className="flex items-center bg-gray-200 rounded-xl px-3 py-2 mb-3">
            <svg width="18" height="18" fill="gray" viewBox="0 0 24 24"><path d="M10 2a8 8 0 105.293 14.293l4.707 4.707a1 1 0 001.414-1.414l-4.707-4.707A8 8 0 0010 2zm0 2a6 6 0 110 12A6 6 0 0110 4z"></path></svg>
            <input className="flex-1 bg-transparent outline-none px-2 text-base text-gray-700" placeholder="Search" />
            <svg width="18" height="18" fill="gray" viewBox="0 0 24 24"><path d="M12 3a9 9 0 100 18 9 9 0 000-18zm0 2a7 7 0 110 14A7 7 0 0112 5zm-1 4a1 1 0 112 0v3a1 1 0 01-2 0V9zm1 7a1.25 1.25 0 110-2.5A1.25 1.25 0 0112 16z"></path></svg>
          </div>
        </div>
        {/* Notes List */}
        <div className="flex-1 overflow-hidden px-3">
          <div className="text-xl font-bold text-black mb-2 text-left">Notes</div>
          <div className="notes-scroll h-full overflow-y-auto pr-2">
            <div className="flex flex-col gap-3">
              {notes.map((note, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-sm p-4 mb-1 cursor-pointer hover:bg-yellow-50 transition" onClick={() => handleNoteClick(i)}>
                  <div className="text-lg font-bold text-black mb-1">{note.title}</div>
                  <div className="text-gray-500 text-xs mb-1">{note.date} <span className="text-gray-400">{note.tag}</span></div>
                  <div className="text-gray-400 text-xs flex items-center">
                    <svg width="14" height="14" fill="gray" viewBox="0 0 24 24"><path d="M4 4h16v16H4z" fill="none"/><path d="M6 6h12v12H6z"/></svg>
                    <span className="ml-1">{note.folder}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Footer */}
        <div className="w-full text-center text-gray-500 text-xs py-2">{notes.length} Notes</div>
      </div>
    </div>
  );
} 