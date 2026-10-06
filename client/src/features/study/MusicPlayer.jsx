import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Music,
  Play,
  Pause,
  SkipForward,
  Volume2,
  X,
  ListMusic,
  ExternalLink,
  Minimize2,
  Maximize2,
  GripHorizontal,
} from "lucide-react";
import { useMusicSettings } from "../../hooks/useMusicSettings";
import "./musicPlayer.css";

const MusicPlayer = ({ isOpen, onClose }) => {
  const { playlists, activePlaylist, setActivePlaylistId } = useMusicSettings();
  const [isPlaying, setIsPlaying] = useState(false);
  const [showList, setShowList] = useState(false);
  const audioRef = useRef(null);

  // Estados de Minimizado y Posicionamiento
  const [isMinimized, setIsMinimized] = useState(false);
  const [position, setPosition] = useState({ x: null, y: null });
  const [isDragging, setIsDragging] = useState(false);

  const dragStartPos = useRef({ x: 0, y: 0 });
  const dragElementStartPos = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    if (e.target.closest("button") || e.target.closest("svg")) return;
    
    setIsDragging(true);
    
    const panel = e.currentTarget.closest(".music-player-panel");
    if (!panel) return;
    const rect = panel.getBoundingClientRect();
    
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    dragElementStartPos.current = { x: rect.left, y: rect.top };
    
    e.preventDefault();
  };

  useEffect(() => {
    if (!isDragging) return;
    
    const handleMouseMove = (e) => {
      const dx = e.clientX - dragStartPos.current.x;
      const dy = e.clientY - dragStartPos.current.y;
      
      let newX = dragElementStartPos.current.x + dx;
      let newY = dragElementStartPos.current.y + dy;
      
      const panel = document.querySelector(".music-player-panel");
      if (panel) {
        const rect = panel.getBoundingClientRect();
        const maxX = window.innerWidth - rect.width;
        const maxY = window.innerHeight - rect.height;
        newX = Math.max(0, Math.min(newX, maxX));
        newY = Math.max(0, Math.min(newY, maxY));
      }
      
      setPosition({ x: newX, y: newY });
    };
    
    const handleMouseUp = () => {
      setIsDragging(false);
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  const togglePlay = () => {
    if (!audioRef.current || activePlaylist.type !== "audio") return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) => {
        console.error("Error al reproducir audio:", err);
        setIsPlaying(false);
      });
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (isPlaying && activePlaylist.type === "audio" && audioRef.current) {
      audioRef.current.play();
    }
  }, [activePlaylist]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className={`music-player-panel ${isDragging ? "dragging" : ""}`}
          style={
            position.x !== null
              ? {
                  left: position.x,
                  top: position.y,
                  bottom: "auto",
                  transform: "none",
                }
              : {}
          }
        >
          <header
            onMouseDown={handleMouseDown}
            style={{ cursor: isDragging ? "grabbing" : "grab" }}
          >
            <div className="music-brand">
              <GripHorizontal size={16} style={{ marginRight: "6px", opacity: 0.7 }} />
              <span>Modo Enfoque</span>
            </div>
            <div className="music-actions">
              <button
                className="icon-btn"
                title={isMinimized ? "Maximizar" : "Minimizar"}
                onClick={() => setIsMinimized(!isMinimized)}
              >
                {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
              </button>
              <button
                className={`icon-btn ${showList ? "active" : ""}`}
                onClick={() => setShowList(!showList)}
              >
                <ListMusic size={16} />
              </button>
              <button className="icon-btn" onClick={onClose}>
                <X size={16} />
              </button>
            </div>
          </header>

          {!showList ? (
            <div className="player-main-view">
              {activePlaylist.type === "youtube" ||
              activePlaylist.type === "spotify" ||
              activePlaylist.type === "soundcloud" ? (
                <div className="iframe-player-view" style={{ width: "100%" }}>
                  <div
                    className="iframe-container"
                    style={{
                      borderRadius: "12px",
                      overflow: "hidden",
                      height: isMinimized
                        ? activePlaylist.type === "spotify"
                          ? "80px"
                          : "180px"
                        : activePlaylist.type === "spotify"
                          ? "352px"
                          : "180px",
                      background: "black",
                      marginBottom: isMinimized ? "0rem" : "1rem",
                      transition: "height 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  >
                    <iframe
                      width="100%"
                      height="100%"
                      src={activePlaylist.url}
                      title="Music player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen={activePlaylist.type === "youtube"}
                    ></iframe>
                  </div>
                  {!isMinimized && (
                    <>
                      <h4
                        className="track-name"
                        style={{ textAlign: "center", marginTop: "0.5rem" }}
                      >
                        {activePlaylist.name}
                      </h4>
                      <p
                        className="track-artist"
                        style={{
                          textAlign: "center",
                          fontSize: "0.8rem",
                          color: "var(--text-muted)",
                        }}
                      >
                        {activePlaylist.type === "youtube"
                          ? "Playlist de YouTube"
                          : activePlaylist.type === "spotify"
                            ? "Playlist de Spotify"
                            : "Música de SoundCloud"}
                      </p>
                    </>
                  )}
                </div>
              ) : (
                <div className="track-info-container" style={{ padding: isMinimized ? "0.5rem" : "0" }}>
                  {!isMinimized && (
                    <>
                      <div
                        className={`music-icon-bg ${isPlaying ? "playing" : ""}`}
                      >
                        <Music size={30} />
                      </div>
                      <h4 className="track-name">{activePlaylist.name}</h4>
                      <p className="track-artist">Sonido de ambiente</p>
                    </>
                  )}

                  <audio ref={audioRef} src={activePlaylist.url} />

                  <div
                    className="player-controls"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: isMinimized ? "0rem" : "1.5rem",
                    }}
                  >
                    <button className="main-play-btn" onClick={togglePlay}>
                      {isPlaying ? (
                        <Pause size={24} fill="white" />
                      ) : (
                        <Play
                          size={24}
                          fill="white"
                          style={{ marginLeft: "3px" }}
                        />
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>

          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="playlist-selector-container"
            >
              <p>Selecciona tu ambiente:</p>
              {playlists.map((p) => (
                <div
                  key={p.id}
                  className={`playlist-item ${activePlaylist.id === p.id ? "active" : ""}`}
                  onClick={() => {
                    setActivePlaylistId(p.id);
                    setShowList(false);
                  }}
                >
                  <Music size={14} />
                  <span className="playlist-item-name">{p.name}</span>
                </div>
              ))}
              <div className="add-more-link">+ Añadir más en Configuración</div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MusicPlayer;
