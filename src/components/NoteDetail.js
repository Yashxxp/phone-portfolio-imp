import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const notes = [
  {
    title: "Technical Skills",
    content: `<b>LANGUAGES</b><br/>C, C++, Javascript, Java<br/><br/><b>FRAMEWORKS/LIBRARIES</b><br/>Angular, React.js, Serverless<br/><br/><b>TOOLS</b><br/>Git, Github, AWS, VSCode, Postman<br/><br/><b>DATABASES</b><br/>MySQL, MongoDB, DynamoDB<br/><br/><b>OTHERS</b><br/>Data Structures & Algorithms, OOP, Technical Writing`
  },
  {
    title: "Soft Skills",
    content: `<b><u>Soft Skills</u></b><br/>Communication Skills, Problem Solving, Optimistic, Leadership, Team Player, Management, Analytical Abilities, Willingness to learn`
  },
  {
    title: "Achievements",
    content: "<b>Achievements</b><br/>Winner of XYZ Hackathon, Dean's List 2022, Published 2 research papers"
  },
  {
    title: "Co-Curricular Activities",
    content: "<b>Co-Curricular Activities</b><br/>Member of Coding Club, Volunteer at TechFest, Organizer of Workshop Series"
  }
];

function getTime() {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

export default function NoteDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const note = notes[id] || notes[0];
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
    <div className={`home-bg${exiting ? ' fade-exit' : ''}`} style={{ fontFamily: 'Poppins, Inter, Arial, sans-serif' }}>
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
      <div className={`iphone-frame${entering ? ' app-entering' : ''}`} style={{ background: '#fff', minHeight: 600, display: 'flex', flexDirection: 'column', overflow: 'hidden', border: '2px solid #222' }}>
        {/* Status Bar */}
        <div style={{ height: 32, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 18px 0 18px', background: 'transparent', fontSize: 15, color: '#222', fontFamily: 'monospace', position: 'relative' }}>
          <span>{getTime()}</span>
          {/* Notch */}
          <div style={{ position: 'absolute', left: '50%', top: 2, transform: 'translateX(-50%)', width: 80, height: 20, background: '#111', borderRadius: 12 }}></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ fontSize: 15 }}>📶</span>
            <span style={{ fontSize: 15 }}>📡</span>
            <span style={{ fontSize: 15 }}>🔋</span>
          </div>
        </div>
        {/* Top Bar */}
        <div style={{ background: '#fff', borderBottom: '1px solid #f3e7b3', display: 'flex', alignItems: 'center', height: 44, padding: '0 12px 0 8px' }}>
          <button onClick={handleBack} style={{ background: 'none', border: 'none', fontSize: 22, color: '#222', fontWeight: 'bold', cursor: 'pointer', marginRight: 8, marginLeft: 2, padding: 0, lineHeight: 1 }}>&#8592;</button>
          <span style={{ fontWeight: 700, fontSize: 19, color: '#222', letterSpacing: 0.5, flex: 1, textAlign: 'left', marginLeft: 2 }}>Notes</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 20, color: '#f7b801', cursor: 'pointer', marginRight: 2 }} title="Share">&#128228;</span>
            <span style={{
              width: 26,
              height: 26,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              border: '1.5px solid #f7b801',
              cursor: 'pointer',
              boxSizing: 'border-box',
              marginRight: 2
            }} title="More">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="9" cy="9" r="8" fill="none" />
                <circle cx="5.25" cy="9" r="1.2" fill="#f7b801" />
                <circle cx="9" cy="9" r="1.2" fill="#f7b801" />
                <circle cx="12.75" cy="9" r="1.2" fill="#f7b801" />
              </svg>
            </span>
          </div>
        </div>
        {/* Content */}
        <div style={{
          flex: 1,
          background: '#fff',
          padding: '18px 18px 18px 18px',
          color: '#111',
          fontSize: 18,
          fontFamily: 'inherit',
          overflowY: 'auto',
          textAlign: 'left',
          letterSpacing: 0,
          lineHeight: 1.5
        }}>
          <div dangerouslySetInnerHTML={{ __html: note.content }} />
        </div>
        {/* Bottom Bar */}
        <div style={{
          height: 48,
          background: '#fff',
          borderTop: '1px solid #f3e7b3',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          padding: '0 10px',
          position: 'relative'
        }}>
          <span style={{ color: '#f7b801', fontSize: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>&#9776;</span>
          <span style={{ color: '#f7b801', fontSize: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>&#128247;</span>
          <span style={{ color: '#f7b801', fontSize: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>&#9410;</span>
          <span style={{ color: '#f7b801', fontSize: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>&#9998;</span>
          {/* Home indicator */}
          <div style={{ position: 'absolute', left: '50%', bottom: 4, transform: 'translateX(-50%)', width: 60, height: 5, background: '#111', borderRadius: 3, opacity: 0.15 }}></div>
        </div>
      </div>
    </div>
  );
} 