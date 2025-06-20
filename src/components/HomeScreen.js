import React, { useState, useEffect } from 'react';
import './HomeScreen.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEnvelope, 
  faMusic, 
  faStickyNote, 
  faGraduationCap,
  faFileAlt,
  faBriefcase,
  faCode,
  faUser,
  faGithub,
  faLinkedin,
  faBookOpen
} from '@fortawesome/free-solid-svg-icons';
import { faGithub as faGithubBrand, faLinkedin as faLinkedinBrand } from '@fortawesome/free-brands-svg-icons';
import bgVideo from "../assets/vecteezy_colorful-candy-rainbow-bright-blurry-gradient-abstract_28301464.mp4";

const HomeScreen = ({ wallpaper, onAppOpen }) => {
  const [time, setTime] = useState(() => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const apps = [
    { id: 'mail', icon: faEnvelope, name: 'Mail', link: 'mailto:your.email@example.com' },
    { id: 'music', icon: faMusic, name: 'Music', link: '/music' },
    { id: 'notes', icon: faStickyNote, name: 'Notes', link: '/notes' },
    { id: 'education', icon: faGraduationCap, name: 'Education', link: '/education' },
    { id: 'resume', icon: faFileAlt, name: 'Resume', link: 'https://drive.google.com/file/d/1CSCDtsX3uefJffSi57WCrns0tclp-2AZ/view?usp=drive_link' },
    { id: 'experience', icon: faBriefcase, name: 'Experience', link: '/experience' },
    { id: 'projects', icon: faCode, name: 'Projects', link: '/projects' },
    { id: 'about', icon: faUser, name: 'About', link: '/about' }
  ];

  const dockApps = [
    { id: 'github', icon: faGithubBrand, name: 'GitHub', link: 'https://github.com/Yashxxp' },
    { id: 'linkedin', icon: faLinkedinBrand, name: 'LinkedIn', link: 'https://www.linkedin.com/in/yash-mhatre-ba2276239' },
    { id: 'resume', icon: faBookOpen, name: 'Resume', link: 'https://drive.google.com/file/d/1CSCDtsX3uefJffSi57WCrns0tclp-2AZ/view?usp=drive_link' },
    { id: 'about', icon: faUser, name: 'About', link: '/about' }
  ];

  const appBgColors = {
    mail: '#007AFF', // blue
    music: '#FF375F', // music pink
    notes: '#FFD60A', // yellow
    education: '#30D158', // green
    resume: '#8E8E93', // gray
    experience: '#A2845E', // brown
    projects: '#BF5AF2', // purple
    about: '#64D2FF', // light blue
  };
  const dockBgColors = {
    github: '#fff',
    linkedin: '#0077B5',
    resume: '#30B0C7',
    about: '#64D2FF',
  };
  const iconFgColor = (bg) => {
    // Use white for dark backgrounds, black for yellow/white
    if (bg === '#FFD60A' || bg === '#fff' || bg === '#FFD700' || bg === '#fffbe7') return '#222';
    return '#fff';
  };

  const handleAppClick = (app) => {
    if (app.link.startsWith('http') || app.link.startsWith('mailto')) {
      window.open(app.link, '_blank');
    } else {
      onAppOpen(app.id);
    }
  };

  return (
    <div className="home-bg" style={{position: 'relative', overflow: 'hidden'}}>
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
      <div className="iphone-frame" style={{ backgroundImage: `url(${wallpaper})`, position: 'relative', zIndex: 1 }}>
        {/* Status Bar */}
        <div className="status-bar">
          <span className="time">{time}</span>
          <div className="status-icons">
            <span className="signal">📶</span>
            <span className="wifi">📡</span>
            <span className="battery">🔋</span>
          </div>
        </div>

        {/* App Grid */}
        <div className="app-grid">
          {apps.map((app) => (
            <div key={app.id} className="app-icon" onClick={() => handleAppClick(app)}>
              <div style={{
                background: appBgColors[app.id] || '#eee',
                borderRadius: 16,
                width: 56,
                height: 56,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 4,
                boxShadow: '0 2px 8px 0 rgba(0,0,0,0.10)'
              }}>
                <FontAwesomeIcon icon={app.icon} size="lg" style={{ color: iconFgColor(appBgColors[app.id]) }} />
              </div>
              <span className="app-name">{app.name}</span>
            </div>
          ))}
        </div>

        {/* Dock */}
        <div className="dock">
          {dockApps.map((app) => (
            <div key={app.id} className="dock-icon" onClick={() => handleAppClick(app)}>
              <div style={{
                background: dockBgColors[app.id] || '#eee',
                borderRadius: 16,
                width: 48,
                height: 48,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 2,
                boxShadow: '0 2px 8px 0 rgba(0,0,0,0.10)'
              }}>
                <FontAwesomeIcon icon={app.icon} size="lg" style={{ color: iconFgColor(dockBgColors[app.id]) }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeScreen; 