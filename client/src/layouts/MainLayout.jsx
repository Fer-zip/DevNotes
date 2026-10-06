import React, { useState } from "react";
import {
  Home,
  LayoutDashboard,
  BarChart3,
  Settings,
  Search,
  Bell,
  UserCircle,
  LogOut,
  Folder,
  Plus,
  Hexagon,
  MoreVertical,
  Edit2,
  Trash,
  HelpCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "./mainLayout.css";

const MainLayout = ({
  children,
  activeTab = "home",
  onNavigate,
  themes,
  activeThemeId,
  setActiveThemeId,
  setActiveTabId,
  onAddTheme,
  onUpdateTheme,
  onDeleteTheme,
  onOpenGuide,
  isCreating,
  setIsCreating,
}) => {
  const [newThemeName, setNewThemeName] = useState("");
  const [editingThemeId, setEditingThemeId] = useState(null);
  const [editName, setEditName] = useState("");
  const [menuOpenId, setMenuOpenId] = useState(null);

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (newThemeName.trim()) {
      onAddTheme(newThemeName.trim());
    }
    setIsCreating(false);
    setNewThemeName("");
  };

  const handleEditSubmit = (e, themeId) => {
    e.preventDefault();
    if (editName.trim()) {
      onUpdateTheme(themeId, editName.trim());
    }
    setEditingThemeId(null);
  };

  const handleDelete = (themeId) => {
    onDeleteTheme(themeId);
    setMenuOpenId(null);
  };
  return (
    <div className="main-layout-container">
      {/* GLOBAL SIDEBAR (Notebook Navigation) */}
      <aside className="notebook-sidebar">
        {/* LOGO AREA */}
        <div
          className="sidebar-brand"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            padding: "0.5rem 1rem 2rem 1rem",
            cursor: "pointer",
          }}
          onClick={() => onNavigate("home")}
        >
          <div
            style={{
              background: "var(--brand-color, #3b82f6)",
              color: "white",
              padding: "0.4rem",
              borderRadius: "8px",
              display: "flex",
            }}
          >
            <Hexagon size={24} />
          </div>
          <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", margin: 0 }}>
            DevNotes
          </h2>
        </div>

        <div className="theme-list" style={{ flex: 1 }}>
          {themes &&
            themes.map((theme) => (
              <div
                key={theme.id}
                className={`theme-item ${theme.id === activeThemeId ? "active" : ""}`}
                onClick={() => {
                  if (editingThemeId !== theme.id) {
                    setActiveThemeId(theme.id);
                    if (setActiveTabId && theme.tabs?.length > 0)
                      setActiveTabId(theme.tabs[0].id);
                    onNavigate("home");
                  }
                }}
              >
                <Folder size={18} className="theme-icon" />

                {editingThemeId === theme.id ? (
                  <form
                    onSubmit={(e) => handleEditSubmit(e, theme.id)}
                    style={{ flex: 1, margin: 0 }}
                  >
                    <input
                      autoFocus
                      className="inline-theme-input"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      onBlur={(e) => handleEditSubmit(e, theme.id)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </form>
                ) : (
                  <span style={{ flex: 1 }}>{theme.name}</span>
                )}

                {/* Menú de Opciones */}
                <div className="theme-options">
                  <button
                    className="theme-more-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setMenuOpenId(menuOpenId === theme.id ? null : theme.id);
                    }}
                  >
                    <MoreVertical size={14} />
                  </button>
                  <AnimatePresence>
                    {menuOpenId === theme.id && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="theme-dropdown"
                      >
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditName(theme.name);
                            setEditingThemeId(theme.id);
                            setMenuOpenId(null);
                          }}
                        >
                          <Edit2 size={12} /> Renombrar
                        </button>
                        <button
                          className="danger"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(theme.id);
                          }}
                        >
                          <Trash size={12} /> Eliminar
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ))}

          {isCreating && (
            <div className="theme-item active">
              <Folder size={18} className="theme-icon" />
              <form
                onSubmit={handleCreateSubmit}
                style={{ flex: 1, margin: 0 }}
              >
                <input
                  autoFocus
                  className="inline-theme-input"
                  value={newThemeName}
                  onChange={(e) => setNewThemeName(e.target.value)}
                  onBlur={handleCreateSubmit}
                  placeholder="Nombre..."
                />
              </form>
            </div>
          )}

          {!isCreating && (
            <button
              className="add-theme-btn"
              onClick={() => setIsCreating(true)}
            >
              <Plus size={16} /> Añadir Tema
            </button>
          )}
        </div>

        {/* SETTINGS AREA */}
        <div
          className="sidebar-footer"
          style={{
            marginTop: "auto",
            paddingTop: "1rem",
            borderTop: "1px solid var(--border-color)",
            display: "flex",
            flexDirection: "column",
            gap: "0.25rem",
          }}
        >
          <div
            className="theme-item"
            onClick={() => onOpenGuide && onOpenGuide()}
            style={{ color: "var(--brand-color)" }}
          >
            <HelpCircle size={18} className="theme-icon" />
            <span>Guía de Uso</span>
          </div>

          <div
            className={`theme-item ${activeTab === "settings" ? "active" : ""}`}
            onClick={() => onNavigate && onNavigate("settings")}
            style={{ color: "var(--text-muted)" }}
          >
            <Settings size={18} className="theme-icon" />
            <span>Configuración</span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="main-wrapper">
        <main className="page-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
