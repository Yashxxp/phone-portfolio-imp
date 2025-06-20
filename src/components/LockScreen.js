import React, { useRef, useState, useEffect } from "react";
import './LockScreen.css';
import bgVideo from "../assets/vecteezy_colorful-candy-rainbow-bright-blurry-gradient-abstract_28301464.mp4";

export default function LockScreen({ onUnlock, wallpaper }) {
  const [dragY, setDragY] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const startY = useRef(null);
  const threshold = 120;
  const [time, setTime] = useState(() => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  });
  const [date, setDate] = useState(() => {
    const now = new Date();
    return now.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
      setDate(now.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleTouchStart = (e) => {
    setIsSwiping(true);
    startY.current = e.touches ? e.touches[0].clientY : e.clientY;
  };
  const handleTouchMove = (e) => {
    if (!isSwiping) return;
    const y = e.touches ? e.touches[0].clientY : e.clientY;
    setDragY(Math.min(0, y - startY.current));
  };
  const handleTouchEnd = () => {
    setIsSwiping(false);
    if (Math.abs(dragY) > threshold) {
      setUnlocked(true);
      setTimeout(onUnlock, 400);
    }
    setDragY(0);
  };

  return (
    <div className="lock-bg" style={{position: 'relative', overflow: 'hidden'}}>
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="bg-video"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          objectFit: 'cover',
          zIndex: 0,
          pointerEvents: 'none',
        }}
        src={bgVideo}
      />
      <div
        className={`iphone-frame${unlocked ? ' unlock-anim' : ''}`}
        style={{
          backgroundImage: `url(${wallpaper})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `translateY(${dragY}px)`,
          position: 'relative',
          zIndex: 1
        }}
        onMouseDown={handleTouchStart}
        onMouseMove={handleTouchMove}
        onMouseUp={handleTouchEnd}
        onMouseLeave={handleTouchEnd}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Notch */}
        <div className="notch">
          <svg width="120" height="32" viewBox="0 0 120 32">
            <rect x="0" y="0" width="120" height="32" rx="16" fill="#111" />
          </svg>
        </div>
        {/* Status Bar */}
        <div className="status-bar">
          <span className="status-time">{time}</span>
          <span className="status-icons">
            {/* Battery, WiFi, etc. (SVG or placeholder) */}
            <svg width="24" height="24" viewBox="0 0 24 24"><rect x="2" y="8" width="16" height="8" rx="2" fill="#fff"/><rect x="18" y="10" width="2" height="4" rx="1" fill="#fff"/></svg>
          </span>
        </div>
        {/* Main Content */}
        <div className="lock-content">
          <div className="date">{date}</div>
          <div className="clock">{time}</div>
        </div>
        {/* Bottom area: Flashlight, Swipe Up, Camera */}
        <div className="lock-bottom">
          <button className="lock-btn" aria-label="Flashlight">
            {/* Flashlight icon (FontAwesome or SVG) */}
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M6 2h12M9 2v4m6-4v4M7 6h10l-1 7h-8l-1-7zm2 7v7a2 2 0 0 0 4 0v-7"/></svg>
          </button>
          <div className="swipe-up">
            <div className="swipe-chevron">
              <svg viewBox="0 0 32 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6L16 2L28 6" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
            </div>
            <div className="swipe-text">Swipe up to unlock</div>
          </div>
          <button className="lock-btn" aria-label="Camera">
            {/* Camera icon (FontAwesome or SVG) */}
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2"/><circle cx="12" cy="13.5" r="3.5"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
} 