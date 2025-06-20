import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CLIENT_ID = '3cf96eadc3c14314bca13e8cf9f26911';
const CLIENT_SECRET = '6387ee17ee634e8da42c6e336f74cdf8';
const PLAYLIST_ID = '5AL80cCNqcadodJ119cquA';

export default function MusicPlayer() {
  const navigate = useNavigate();
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = React.useRef(null);
  const [exiting, setExiting] = useState(false);
  const [entering, setEntering] = useState(true);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        // Get access token
        const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
          },
          body: 'grant_type=client_credentials'
        });

        const tokenData = await tokenResponse.json();
        
        if (!tokenResponse.ok) {
          throw new Error('Failed to get access token');
        }

        // Fetch playlist data
        const playlistResponse = await fetch(`https://api.spotify.com/v1/playlists/${PLAYLIST_ID}`, {
          headers: {
            'Authorization': 'Bearer ' + tokenData.access_token
          }
        });

        const playlistData = await playlistResponse.json();
        
        if (!playlistResponse.ok) {
          throw new Error('Failed to fetch playlist');
        }

        setPlaylist(playlistData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPlaylist();
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack]);

  useEffect(() => {
    // Reset entering state after animation
    const timer = setTimeout(() => setEntering(false), 350);
    return () => clearTimeout(timer);
  }, []);

  const handlePlayPause = () => {
    if (!currentTrack) {
      // Play the first track with a preview_url
      const firstPreview = playlist.tracks.items.find(item => item.track.preview_url);
      if (firstPreview) {
        setCurrentTrack(firstPreview.track);
        setIsPlaying(true);
      }
    } else if (isPlaying) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  };

  const handleTrackClick = (track) => {
    if (track.preview_url) {
      setCurrentTrack(track);
      setIsPlaying(true);
    }
  };

  const handleBack = () => {
    setExiting(true);
    setTimeout(() => navigate(-1), 350);
  };

  if (loading) {
    return (
      <div className="home-bg" style={{ fontFamily: 'Poppins, Inter, Arial, sans-serif' }}>
        <div className="iphone-frame" style={{ background: "#181818", overflow: 'hidden' }}>
          <div className="flex items-center justify-center h-full">
            <div className="text-white">Loading playlist...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home-bg" style={{ fontFamily: 'Poppins, Inter, Arial, sans-serif' }}>
        <div className="iphone-frame" style={{ background: "#181818", overflow: 'hidden' }}>
          <div className="flex items-center justify-center h-full">
            <div className="text-white">Error: {error}</div>
          </div>
        </div>
      </div>
    );
  }

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
      <div className={`iphone-frame${entering ? ' app-entering' : ''}`} style={{ background: "rgba(18, 18, 18, 0.9)", overflow: 'hidden', fontFamily: 'inherit' }}>
        {/* Status Bar & Back Arrow */}
        <div className="flex items-center justify-between px-4 pt-4 pb-2">
          <button onClick={handleBack} className="text-2xl text-white font-bold focus:outline-none">&#8592;</button>
          <span className="text-xs font-mono text-white tracking-widest">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
          <div className="flex gap-1 items-center">
            <span className="text-lg">&#9679;</span>
            <span className="text-lg">&#9679;</span>
            <span className="text-lg">&#9679;</span>
          </div>
        </div>
        {/* Title */}
        <div className="px-5 pb-2">
          <h2 className="text-xl font-bold text-white mb-2 text-left">Music</h2>
        </div>
        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 pb-4">
          {/* Your music player content here */}
          {playlist && (
            <>
              <div className="px-5 pb-2">
                <div className="bg-[#232323] rounded-2xl p-4 flex gap-4 items-center relative">
                  <img 
                    src={playlist.images[0]?.url} 
                    alt={playlist.name} 
                    className="w-20 h-20 rounded-xl object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-white text-lg font-bold truncate">{playlist.name}</div>
                    <div className="text-white/70 text-xs font-semibold mb-1 truncate">
                      {playlist.owner.display_name}
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <button className="w-7 h-7 flex items-center justify-center rounded-full bg-white/10">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="#1DB954">
                          <circle cx="12" cy="12" r="12"/>
                          <path d="M9 8l6 4-6 4V8z" fill="#fff"/>
                        </svg>
                      </button>
                      <span className="text-white/80 text-xs font-semibold">Save on Spotify</span>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="12" fill="#1DB954"/>
                        <path d="M7 15c2.5-1.5 7.5-1.5 10 0" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
                        <path d="M8.5 12.5c2-1 5-1 7 0" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
                        <path d="M10 10c1.5-.5 3.5-.5 5 0" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Player Controls */}
              <div className="px-5 pb-2 flex flex-wrap items-center gap-3 sm:gap-4">
                <button className="bg-[#232323] rounded-full px-4 py-2 text-xs sm:text-sm text-white/80 font-semibold flex-1 min-w-[90px] max-w-xs transition hover:bg-[#1DB954]/80 active:scale-95">
                  Preview
                </button>
                <button
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 active:scale-95 transition"
                  onClick={handlePlayPause}
                  disabled={playlist.tracks.items.length === 0 || (currentTrack && !currentTrack.preview_url)}
                  title={currentTrack && !currentTrack.preview_url ? 'No preview available' : 'Play/Pause'}
                >
                  {isPlaying ? (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                      <path d="M8 18V6M16 18V6"/>
                    </svg>
                  ) : (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                      <path d="M6 4l12 8-12 8V4z"/>
                    </svg>
                  )}
                </button>
                <audio ref={audioRef} src={currentTrack?.preview_url || ''} onEnded={() => setIsPlaying(false)} />
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 active:scale-95 transition" disabled>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                    <circle cx="12" cy="12" r="8"/>
                    <polygon points="10,8 16,12 10,16" fill="#fff"/>
                  </svg>
                </button>
              </div>

              {/* Song List */}
              <div className="flex-1 overflow-y-auto px-5 pb-4" style={{ height: 'calc(100% - 260px)' }}>
                <div className="flex flex-col gap-2">
                  {playlist.tracks.items.map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-1 border-b border-white/10 cursor-pointer hover:bg-white/5 rounded-lg px-2"
                      onClick={() => handleTrackClick(item.track)}
                    >
                      <div className="flex flex-col min-w-0">
                        <div className="text-white text-sm font-semibold truncate">
                          {i+1}. {item.track.name}
                        </div>
                        <div className="text-white/60 text-xs truncate">
                          {item.track.artists.map(artist => artist.name).join(', ')}
                        </div>
                      </div>
                      <div className="text-white/70 text-xs font-mono ml-2">
                        {Math.floor(item.track.duration_ms / 60000)}:
                        {String(Math.floor((item.track.duration_ms % 60000) / 1000)).padStart(2, '0')}
                      </div>
                    </div>
                  ))}
                </div>
                {currentTrack && !currentTrack.preview_url && (
                  <div className="text-red-400 text-xs mt-2">No preview available for this track.</div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
} 