import React, { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { FloatingMenu, BubbleMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { Underline } from "@tiptap/extension-underline";
import { TextAlign } from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { Highlight } from "@tiptap/extension-highlight";
import { Image } from "@tiptap/extension-image";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { all, createLowlight } from "lowlight";
import {
  Folder,
  FileText,
  Plus,
  ChevronRight,
  Hash,
  Settings,
  Hexagon,
  Code,
  Image as ImageIcon,
  Sparkles,
  Bold,
  Italic,
  Underline as UnderlineIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Highlighter,
  Palette,
  Type,
  Heading1,
  Heading2,
  Heading3,
  X,
  Table as TableIcon,
  ArrowUpToLine,
  ArrowDownToLine,
  ArrowLeftToLine,
  ArrowRightToLine,
  Trash2,
  SplitSquareHorizontal,
  Workflow,
} from "lucide-react";
import { Mermaid } from "./extensions/MermaidExtension";
import "./notebook.css";

const lowlight = createLowlight(all);

const MenuBar = ({ editor, onAddImage }) => {
  if (!editor) return null;

  return (
    <div className="editor-toolbar">
      {/* Estilos básicos */}
      <div className="toolbar-group">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is-active" : ""}
        >
          <Bold size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is-active" : ""}
        >
          <Italic size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive("underline") ? "is-active" : ""}
        >
          <UnderlineIcon size={16} />
        </button>
      </div>

      <div className="toolbar-divider" />

      {/* Títulos (Tamaños) */}
      <div className="toolbar-group">
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive("paragraph") ? "is-active" : ""}
        >
          <Type size={16} />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive("heading", { level: 1 }) ? "is-active" : ""
          }
        >
          <Heading1 size={16} />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive("heading", { level: 2 }) ? "is-active" : ""
          }
        >
          <Heading2 size={16} />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive("heading", { level: 3 }) ? "is-active" : ""
          }
        >
          <Heading3 size={16} />
        </button>
      </div>

      <div className="toolbar-divider" />

      {/* Listas y Código */}
      <div className="toolbar-group">
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is-active" : ""}
        >
          <List size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "is-active" : ""}
        >
          <ListOrdered size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive("codeBlock") ? "is-active" : ""}
        >
          <Code size={16} />
        </button>
      </div>

      <div className="toolbar-divider" />

      {/* Alineación */}
      <div className="toolbar-group">
        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={editor.isActive({ textAlign: "left" }) ? "is-active" : ""}
        >
          <AlignLeft size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={
            editor.isActive({ textAlign: "center" }) ? "is-active" : ""
          }
        >
          <AlignCenter size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={editor.isActive({ textAlign: "right" }) ? "is-active" : ""}
        >
          <AlignRight size={16} />
        </button>
      </div>

      <div className="toolbar-divider" />

      {/* Color e Imagen */}
      <div className="toolbar-group">
        <input
          type="color"
          onInput={(event) =>
            editor.chain().focus().setColor(event.target.value).run()
          }
          value={editor.getAttributes("textStyle").color || "#ffffff"}
          className="color-picker"
          title="Color del texto"
        />
        <button
          onClick={() =>
            editor.chain().focus().toggleHighlight({ color: "#ffc078" }).run()
          }
          className={editor.isActive("highlight") ? "is-active" : ""}
        >
          <Highlighter size={16} />
        </button>
        <button
          onClick={() =>
            editor
              .chain()
              .focus()
              .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
              .run()
          }
          title="Insertar Tabla"
        >
          <TableIcon size={16} />
        </button>
        <button onClick={onAddImage} title="Insertar Imagen (URL)">
          <ImageIcon size={16} />
        </button>
      </div>

      {/* Menú Dinámico de Tablas */}
      {editor.isActive("table") && (
        <>
          <div className="toolbar-divider" />
          <div className="toolbar-group table-actions">
            <button
              onClick={() => editor.chain().focus().addColumnBefore().run()}
              title="Añadir Columna Antes"
            >
              <ArrowLeftToLine size={16} />
            </button>
            <button
              onClick={() => editor.chain().focus().addColumnAfter().run()}
              title="Añadir Columna Después"
            >
              <ArrowRightToLine size={16} />
            </button>
            <button
              onClick={() => editor.chain().focus().deleteColumn().run()}
              title="Borrar Columna"
              className="danger-btn"
            >
              <Trash2 size={16} color="#ef4444" />
            </button>

            <button
              onClick={() => editor.chain().focus().addRowBefore().run()}
              title="Añadir Fila Antes"
            >
              <ArrowUpToLine size={16} />
            </button>
            <button
              onClick={() => editor.chain().focus().addRowAfter().run()}
              title="Añadir Fila Después"
            >
              <ArrowDownToLine size={16} />
            </button>
            <button
              onClick={() => editor.chain().focus().deleteRow().run()}
              title="Borrar Fila"
              className="danger-btn"
            >
              <Trash2 size={16} color="#ef4444" />
            </button>

            <button
              onClick={() => editor.chain().focus().mergeCells().run()}
              title="Combinar Celdas"
            >
              <SplitSquareHorizontal size={16} />
            </button>
            <button
              onClick={() => editor.chain().focus().deleteTable().run()}
              title="Borrar Tabla"
              style={{ color: "#ef4444", fontWeight: "bold" }}
            >
              Borrar Tabla
            </button>
          </div>
        </>
      )}
    </div>
  );
};

// INITIAL_DATA movido a App.jsx

const Notebook = ({
  themes,
  activeThemeId,
  activeTabId,
  setActiveTabId,
  onAddTab,
  onUpdateTab,
  onDeleteTab,
}) => {
  const activeTheme =
    themes?.find((t) => t.id === activeThemeId) || themes?.[0];
  const activeTab =
    activeTheme?.tabs?.find((t) => t.id === activeTabId) ||
    activeTheme?.tabs?.[0];

  const activeTabRef = React.useRef(activeTab);
  const timeoutRef = React.useRef(null);

  React.useEffect(() => {
    activeTabRef.current = activeTab;
  }, [activeTab]);

  const editor = useEditor({
    extensions: [
      StarterKit,
      CodeBlockLowlight.configure({ lowlight }),
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      Image,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Mermaid,
    ],
    editorProps: {
      handlePaste: (view, event, slice) => {
        const items = (event.clipboardData || event.originalEvent.clipboardData)
          .items;
        for (const item of items) {
          if (item.type.indexOf("image") === 0) {
            event.preventDefault();
            const file = item.getAsFile();
            const reader = new FileReader();
            reader.onload = (e) => {
              // Convertir a base64 e insertar
              view.dispatch(
                view.state.tr.replaceSelectionWith(
                  view.state.schema.nodes.image.create({
                    src: e.target.result,
                  }),
                ),
              );
            };
            reader.readAsDataURL(file);
            return true;
          }
        }
        return false;
      },
    },
    content: activeTab?.content || "",
    onUpdate: ({ editor }) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        if (activeTabRef.current && onUpdateTab) {
          onUpdateTab(
            activeTabRef.current.id,
            activeTabRef.current.name,
            editor.getHTML(),
          );
        }
      }, 1000);
    },
  });

  // Update editor content when active tab changes
  React.useEffect(() => {
    if (editor && activeTab && editor.getHTML() !== activeTab.content) {
      editor.commands.setContent(activeTab.content);
    }
  }, [activeTabId, editor]);

  const [isAILoading, setIsAILoading] = useState(false);

  const fileInputRef = React.useRef(null);

  const handleExplainWithAI = async () => {
    if (!editor) return;
    const { from, to } = editor.state.selection;
    const selectedText = editor.state.doc.textBetween(from, to, " ");
    if (!selectedText) return;

    setIsAILoading(true);

    // Añadimos un feedback visual temporal (opcional)
    editor
      .chain()
      .focus()
      .insertContent(
        '<p style="color: var(--brand-color); font-style: italic;">✨ La IA está analizando este texto...</p>',
      )
      .run();

    try {
      const aiUrl = import.meta.env.AI_URL || "http://localhost:8000";
      const response = await fetch(`${aiUrl}/api/chat/general`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              content: `Eres un asistente educativo integrado en un bloc de notas. Explica brevemente, de manera clara y didáctica el siguiente texto seleccionado por el usuario. Responde estrictamente usando formato HTML básico (usa etiquetas como <b>, <i>, <br>, <ul>, <li>) para que se vea bien, y NO uses sintaxis markdown (como ** o *). Responde directamente con la explicación HTML:\n\n"${selectedText}"`,
            },
          ],
          model: "gemini-3.5-flash",
          tone: "didactico",
        }),
      });

      const data = await response.json();

      // Deshacemos el mensaje de carga
      editor.commands.undo();

      if (data && data.response) {
        // Insertamos la respuesta en un bloque bonito debajo de la selección
        editor
          .chain()
          .focus()
          .insertContent(
            `<blockquote><strong>✨ Explicación de IA:</strong><br/>${data.response}</blockquote><p></p>`,
          )
          .run();
      }
    } catch (error) {
      console.error(error);
      editor.commands.undo();
      alert("Hubo un error al conectar con la IA.");
    } finally {
      setIsAILoading(false);
    }
  };

  const handleAddImage = () => {
    // Abrir selector de archivos nativo
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && editor) {
      const reader = new FileReader();
      reader.onload = (event) => {
        editor.chain().focus().setImage({ src: event.target.result }).run();
      };
      reader.readAsDataURL(file);
    }
    // Limpiar input
    e.target.value = "";
  };

  if (!editor || !themes || themes.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          color: "var(--text-muted)",
        }}
      >
        Cargando bloc de notas o no hay temas creados... Crea un tema en la
        barra lateral.
      </div>
    );
  }

  return (
    <div className="notebook-layout">
      {/* MAIN CONTENT AREA */}
      <div className="notebook-main">
        {/* TOP BAR: Sub-pestañas */}
        <div className="notebook-topbar">
          <div className="tabs-container">
            {activeTheme.tabs.map((tab) => (
              <div
                key={tab.id}
                className={`tab-item ${tab.id === activeTabId ? "active" : ""}`}
                onClick={() => setActiveTabId(tab.id)}
              >
                <Hash size={14} />
                <span>{tab.name || "\u00A0\u00A0\u00A0\u00A0"}</span>
                {tab.id === activeTabId && (
                  <button
                    className="delete-tab-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteTab(tab.id);
                    }}
                  >
                    <X size={12} />
                  </button>
                )}
              </div>
            ))}
            <button className="add-tab-btn" onClick={onAddTab}>
              <Plus size={14} />
            </button>
          </div>
        </div>

        {/* EDITOR AREA */}
        <div className="notebook-editor-container">
          <header className="notebook-header">
            <input
              type="text"
              className="notebook-title-input"
              placeholder="Título de la página"
              value={activeTab?.name || ""}
              onChange={(e) => {
                if (onUpdateTab && activeTab) {
                  onUpdateTab(activeTab.id, e.target.value, activeTab.content);
                }
              }}
            />
          </header>

          <MenuBar editor={editor} onAddImage={handleAddImage} />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            style={{ display: "none" }}
          />

          <div className="editor-wrapper">
            {editor && (
              <>
                <FloatingMenu
                  editor={editor}
                  tippyOptions={{ duration: 100 }}
                  className="floating-menu"
                >
                  <button
                    onClick={() =>
                      editor.chain().focus().toggleCodeBlock().run()
                    }
                    className={editor.isActive("codeBlock") ? "is-active" : ""}
                    title="Bloque de Código"
                  >
                    <Code size={16} /> Código
                  </button>
                  <button
                    onClick={() =>
                      editor.commands.insertContent(
                        "<mermaid-node></mermaid-node>",
                      )
                    }
                    title="Diagrama Mermaid"
                  >
                    <Workflow size={16} /> Diagrama
                  </button>
                  <button onClick={handleAddImage} title="Subir Imagen">
                    <ImageIcon size={16} /> Imagen
                  </button>
                </FloatingMenu>

                {/* Menú de Selección de Texto (Explicar con IA) */}
                <BubbleMenu
                  editor={editor}
                  tippyOptions={{ duration: 100, placement: "top" }}
                  className="floating-menu"
                  shouldShow={({ editor, state }) => {
                    const { selection } = state;
                    const { empty } = selection;
                    return (
                      !empty &&
                      !editor.isActive("image") &&
                      !editor.isActive("table") &&
                      !editor.isActive("codeBlock")
                    );
                  }}
                  style={{ display: "flex", gap: "0.2rem", padding: "0.3rem" }}
                >
                  <button
                    onClick={handleExplainWithAI}
                    style={{ color: "var(--brand-color)", fontWeight: "bold" }}
                    disabled={isAILoading}
                  >
                    <Sparkles size={16} />{" "}
                    {isAILoading ? "Pensando..." : "Explicar con IA"}
                  </button>
                </BubbleMenu>
              </>
            )}
            <EditorContent editor={editor} className="tiptap-editor" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notebook;
