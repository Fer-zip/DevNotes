import React, { useState, useEffect } from "react";
import { Moon, Sun, Palette, Check, Music, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { useMusicSettings } from "../hooks/useMusicSettings";
import "./settings.css";

const Settings = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [brandColor, setBrandColor] = useState(
    localStorage.getItem("brandColor") || "#3b82f6",
  );
  const [activeSection, setActiveSection] = useState("appearance");
  const { playlists, addPlaylist, removePlaylist } = useMusicSettings();
  const [newPlaylist, setNewPlaylist] = useState({
    name: "",
    url: "",
    type: "auto",
  });

  const colors = [
    "#000000", // Black
    "#ffffff", // White
    "#3b82f6", // Blue
    "#6366f1", // Indigo
    "#8b5cf6", // Violet
    "#a855f7", // Purple
    "#ec4899", // Pink
    "#f43f5e", // Rose
    "#ef4444", // Red
    "#f97316", // Orange
    "#f59e0b", // Amber
    "#eab308", // Yellow
    "#84cc16", // Lime
    "#22c55e", // Green
    "#10b981", // Emerald
    "#14b8a6", // Teal
    "#06b6d4", // Cyan
    "#0ea5e9", // Sky
    "#64748b", // Slate
  ];

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.style.setProperty("--brand-color", brandColor);
    localStorage.setItem("brandColor", brandColor);
  }, [brandColor]);

  const sections = [
    {
      id: "appearance",
      icon: <Palette size={20} />,
      title: "Apariencia",
      desc: "Colores y temas",
    },
    {
      id: "music",
      icon: <Music size={20} />,
      title: "Música",
      desc: "Playlists y ambientes",
    },
  ];

  return (
    <div className="settings-view">
      <header className="section-header">
        <div className="title-group">
          <h1>Configuración ⚙️</h1>
          <p>Personaliza tu espacio de aprendizaje inteligente</p>
        </div>
      </header>

      <div className="settings-layout">
        {/* Sidebar */}
        <div className="settings-sidebar">
          {sections.map((s) => (
            <div
              key={s.id}
              className={`soft-card sidebar-item ${activeSection === s.id ? "active" : ""}`}
              onClick={() => setActiveSection(s.id)}
            >
              <div className="sidebar-item-icon">{s.icon}</div>
              <div>
                <h4 className="sidebar-item-title">{s.title}</h4>
                <p className="sidebar-item-desc">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="settings-content">
          {activeSection === "appearance" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="soft-card settings-card"
            >
              <h3>
                <Palette size={20} /> Personalización Visual
              </h3>

              <div className="setting-group">
                <p className="setting-group-title">Modo de Interfaz</p>
                <div className="theme-options">
                  <button
                    className={`theme-card ${theme === "light" ? "active" : ""}`}
                    onClick={() => setTheme("light")}
                  >
                    <Sun />
                    <span>Claro</span>
                  </button>
                  <button
                    className={`theme-card ${theme === "dark" ? "active" : ""}`}
                    onClick={() => setTheme("dark")}
                  >
                    <Moon />
                    <span>Oscuro</span>
                  </button>
                </div>
              </div>

              <div className="setting-group">
                <p className="setting-group-title">Color de Acento</p>
                <div className="color-grid">
                  {colors.map((c) => (
                    <div
                      key={c}
                      onClick={() => setBrandColor(c)}
                      className={`color-circle ${brandColor === c ? "active" : ""}`}
                      style={{ backgroundColor: c, color: c }}
                    >
                      {brandColor === c && (
                        <Check
                          size={20}
                          color={c === "#ffffff" ? "black" : "white"}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === "music" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="soft-card settings-card"
            >
              <h3>
                <Music size={20} /> Gestión de Música
              </h3>

              <div className="add-playlist-container">
                <p className="setting-group-title">Añadir Nueva Playlist</p>
                <div className="playlist-form-grid">
                  <input
                    className="settings-input"
                    type="text"
                    placeholder="Nombre"
                    value={newPlaylist.name}
                    onChange={(e) =>
                      setNewPlaylist({ ...newPlaylist, name: e.target.value })
                    }
                  />
                  <input
                    className="settings-input"
                    type="text"
                    placeholder="URL (Directa, Video o Playlist de YouTube)"
                    value={newPlaylist.url}
                    onChange={(e) =>
                      setNewPlaylist({ ...newPlaylist, url: e.target.value })
                    }
                  />
                  <select
                    className="settings-select"
                    value={newPlaylist.type}
                    onChange={(e) =>
                      setNewPlaylist({ ...newPlaylist, type: e.target.value })
                    }
                  >
                    <option value="auto">Auto-detectar plataforma</option>
                    <option value="audio">Audio MP3 Directo</option>
                    <option value="youtube">YouTube (Video o Playlist)</option>
                    <option value="spotify">
                      Spotify (Video, Track o Playlist)
                    </option>
                    <option value="soundcloud">
                      SoundCloud (Track o Playlist)
                    </option>
                  </select>
                  <button
                    className="add-btn"
                    onClick={() => {
                      if (newPlaylist.name && newPlaylist.url) {
                        addPlaylist(newPlaylist);
                        setNewPlaylist({ name: "", url: "", type: "audio" });
                      }
                    }}
                  >
                    Añadir
                  </button>
                </div>
              </div>

              <div className="playlists-grid">
                <p className="setting-group-title">Tus Listas</p>
                {playlists.map((p) => (
                  <div key={p.id} className="playlist-row">
                    <div className="playlist-info">
                      <div className="playlist-icon-box">
                        <Music size={16} />
                      </div>
                      <div className="playlist-text">
                        <h5>{p.name}</h5>
                        <p style={{ textTransform: "capitalize" }}>{p.type}</p>
                      </div>
                    </div>
                    <button
                      className="delete-btn"
                      onClick={() => removePlaylist(p.id)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
