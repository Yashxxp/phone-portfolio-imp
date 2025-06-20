import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import LockScreen from "./components/LockScreen";
import HomeScreen from "./components/HomeScreen";
import Projects from "./components/Projects";
import ProjectDetail from "./components/ProjectDetail";
import EducationDetail from "./components/EducationDetail";
import MusicPlayer from "./components/MusicPlayer";
import About from "./components/About";
import Notes from "./components/Notes";
import NoteDetail from "./components/NoteDetail";
// import your wallpaper image
import wallpaper from "./assets/Op.jpg";
import bgVideo from "./assets/vecteezy_colorful-candy-rainbow-bright-blurry-gradient-abstract_28301464.mp4";

function AppRoutes({ unlocked, wallpaper, handleUnlock }) {
  const navigate = useNavigate();

  const handleAppOpen = (app) => {
    if (app === "projects") {
      navigate("/projects");
    } else if (app === "education") {
      navigate("/education");
    } else if (app === "music") {
      navigate("/music");
    } else if (app === "about") {
      navigate("/about");
    } else if (app === "notes") {
      navigate("/notes");
    } else {
      // Add more app navigation as needed
    }
  };

  return (
    <>
      {!unlocked ? (
        <LockScreen onUnlock={handleUnlock} wallpaper={wallpaper} />
      ) : (
        <div className="app-container" style={{ position: 'relative', overflow: 'hidden' }}>
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
          <Routes>
            <Route path="/" element={<HomeScreen wallpaper={wallpaper} onAppOpen={handleAppOpen} />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/education" element={<EducationDetail />} />
            <Route path="/music" element={<MusicPlayer />} />
            <Route path="/about" element={<About />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/notes/:id" element={<NoteDetail />} />
          </Routes>
        </div>
      )}
    </>
  );
}

function App() {
  const [unlocked, setUnlocked] = useState(false);
  const handleUnlock = () => setUnlocked(true);

  return (
    <div className="App">
      <Router>
        <AppRoutes unlocked={unlocked} wallpaper={wallpaper} handleUnlock={handleUnlock} />
      </Router>
    </div>
  );
}

export default App;
