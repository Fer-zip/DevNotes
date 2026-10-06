import React, { useState, useEffect } from "react";
import MainLayout from "./layouts/MainLayout";
import Notebook from "./features/notebook/Notebook";
import Settings from "./pages/Settings";
import MusicPlayer from "./features/study/MusicPlayer";
import { Music, Plus } from "lucide-react";
import * as notebookApi from "./services/notebookApi";
import PromptModal from "./components/PromptModal";
import ConfirmModal from "./components/ConfirmModal";
import GuideModal from "./components/GuideModal";

function App() {
  const [view, setView] = useState("home"); // 'home' | 'library' | 'analytics' | 'settings' | 'wizard' | 'study'

  // Estado para el Nuevo Diseño
  const [isCreating, setIsCreating] = useState(false);

  // Estado global del Notebook
  const [themes, setThemes] = useState([]);
  const [activeThemeId, setActiveThemeId] = useState(null);
  const [activeTabId, setActiveTabId] = useState(null);
  const [isMusicOpen, setIsMusicOpen] = useState(false);

  // Modal State
  const [promptModal, setPromptModal] = useState({
    isOpen: false,
    type: "",
    title: "",
    placeholder: "",
  });
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: null,
  });
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  useEffect(() => {
    // Aplicar tema y color guardados al iniciar
    const savedTheme = localStorage.getItem("theme") || "light";
    const savedColor = localStorage.getItem("brandColor") || "#3b82f6";

    document.documentElement.setAttribute("data-theme", savedTheme);
    document.documentElement.style.setProperty("--brand-color", savedColor);

    // Cargar los temas desde el Backend
    loadThemes();
  }, []);

  const loadThemes = async () => {
    try {
      const data = await notebookApi.getThemes();
      setThemes(data);
      if (data.length > 0) {
        setActiveThemeId(data[0].id);
        if (data[0].tabs.length > 0) {
          setActiveTabId(data[0].tabs[0].id);
        }
      }
    } catch (error) {
      console.error("Error al cargar los temas:", error);
    }
  };

  const handleAddTheme = async (name) => {
    try {
      const newTheme = await notebookApi.createTheme(name);
      setThemes([...themes, newTheme]);
      setActiveThemeId(newTheme.id);
      setActiveTabId(newTheme.tabs[0]?.id);
      setView("home");
    } catch (error) {
      console.error("Error al crear tema:", error);
    }
  };

  const handleUpdateTheme = async (themeId, newName) => {
    setThemes(
      themes.map((t) => (t.id === themeId ? { ...t, name: newName } : t)),
    );
    try {
      await notebookApi.updateTheme(themeId, newName);
    } catch (error) {
      console.error("Error al renombrar tema:", error);
    }
  };

  const requestDeleteTheme = (themeId) => {
    setConfirmModal({
      isOpen: true,
      title: "Eliminar Tema",
      message:
        "¿Estás seguro de eliminar este tema y todas sus notas? Esta acción no se puede deshacer.",
      onConfirm: () => handleDeleteTheme(themeId),
    });
  };

  const handleDeleteTheme = async (themeId) => {
    setThemes(themes.filter((t) => t.id !== themeId));
    if (activeThemeId === themeId) {
      setActiveThemeId(null);
      setActiveTabId(null);
    }
    try {
      await notebookApi.deleteTheme(themeId);
    } catch (error) {
      console.error("Error al eliminar tema:", error);
    }
  };

  const handleAddTab = async (themeId) => {
    if (!themeId) return;
    try {
      const newTab = await notebookApi.createTab(themeId, ""); // Crear con nombre vacío
      setThemes(
        themes.map((t) => {
          if (t.id === themeId) {
            return { ...t, tabs: [...t.tabs, newTab] };
          }
          return t;
        }),
      );
      setActiveTabId(newTab.id);
    } catch (error) {
      console.error("Error al crear nota:", error);
    }
  };

  const requestDeleteTab = (themeId, tabId) => {
    setConfirmModal({
      isOpen: true,
      title: "Eliminar Nota",
      message: "¿Estás seguro de eliminar esta nota permanentemente?",
      onConfirm: () => handleDeleteTab(themeId, tabId),
    });
  };

  const handleDeleteTab = async (themeId, tabId) => {
    setThemes(
      themes.map((t) => {
        if (t.id === themeId) {
          return { ...t, tabs: t.tabs.filter((tab) => tab.id !== tabId) };
        }
        return t;
      }),
    );

    if (activeTabId === tabId) {
      const theme = themes.find((t) => t.id === themeId);
      const remainingTabs = theme.tabs.filter((t) => t.id !== tabId);
      setActiveTabId(remainingTabs.length > 0 ? remainingTabs[0].id : null);
    }

    try {
      await notebookApi.deleteTab(tabId);
    } catch (error) {
      console.error("Error al eliminar nota:", error);
    }
  };

  const handlePromptSubmit = async (value) => {
    // Actualmente solo usado si algo más necesita el PromptModal.
    // tab y theme ya no lo usan, pero lo dejamos por si acaso.
  };

  const handleUpdateTab = async (themeId, tabId, name, content) => {
    // Actualización optimista local
    setThemes((prev) =>
      prev.map((t) => {
        if (t.id === themeId) {
          return {
            ...t,
            tabs: t.tabs.map((tab) =>
              tab.id === tabId ? { ...tab, name, content } : tab,
            ),
          };
        }
        return t;
      }),
    );

    // Llamada al backend
    try {
      await notebookApi.updateTab(tabId, name, content);
    } catch (error) {
      console.error("Error al guardar la nota:", error);
    }
  };

  const handleNavigate = (newView) => {
    setView(newView);
    // Podríamos añadir lógica para cerrar paneles abiertos aquí
  };

  // Removido generador de planes antiguo

  // Helper to determine active tab for MainLayout
  const getActiveTab = () => {
    if (["home", "wizard", "study"].includes(view)) return "home";
    return view;
  };

  return (
    <>
      <MainLayout
        activeTab={getActiveTab()}
        onNavigate={handleNavigate}
        themes={themes}
        activeThemeId={activeThemeId}
        setActiveThemeId={setActiveThemeId}
        setActiveTabId={setActiveTabId}
        onAddTheme={handleAddTheme}
        onUpdateTheme={handleUpdateTheme}
        onDeleteTheme={requestDeleteTheme}
        onOpenGuide={() => setIsGuideOpen(true)}
        isCreating={isCreating}
        setIsCreating={setIsCreating}
      >
        {view === "home" && (
          <Notebook
            onNavigate={handleNavigate}
            themes={themes}
            activeThemeId={activeThemeId}
            activeTabId={activeTabId}
            setActiveTabId={setActiveTabId}
            onAddTab={() => handleAddTab(activeThemeId)}
            onUpdateTab={(tabId, name, content) =>
              handleUpdateTab(activeThemeId, tabId, name, content)
            }
            onDeleteTab={(tabId) => requestDeleteTab(activeThemeId, tabId)}
          />
        )}
        {view === "settings" && <Settings />}
      </MainLayout>

      {/* Global Floating Toolbar (Solo Música) */}
      <div className="bottom-toolbar">
        <div
          className={`toolbar-item ${isMusicOpen ? "active" : ""}`}
          title="Música para estudiar"
          onClick={() => setIsMusicOpen(!isMusicOpen)}
        >
          <Music size={20} />
        </div>

        <div
          className="toolbar-item"
          title="Añadir Tema"
          onClick={() => setIsCreating(true)}
        >
          <Plus size={20} />
        </div>
      </div>

      {/* Global Floating Panels */}
      <MusicPlayer isOpen={isMusicOpen} onClose={() => setIsMusicOpen(false)} />

      {/* Prompts Modals */}
      <PromptModal
        isOpen={promptModal.isOpen}
        title={promptModal.title}
        placeholder={promptModal.placeholder}
        onClose={() => setPromptModal({ ...promptModal, isOpen: false })}
        onSubmit={handlePromptSubmit}
      />

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        title={confirmModal.title}
        message={confirmModal.message}
        onClose={() => setConfirmModal({ ...confirmModal, isOpen: false })}
        onConfirm={() => {
          if (confirmModal.onConfirm) confirmModal.onConfirm();
        }}
      />

      {/* Guide Modal */}
      <GuideModal isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />
    </>
  );
}

export default App;
