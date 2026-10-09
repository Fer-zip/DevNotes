# 🚀 Plan de Próximas Mejoras (DevNotes v2.0)

Este documento contiene la hoja de ruta para las futuras actualizaciones de la aplicación DevNotes. Estas características están diseñadas para mejorar la experiencia de usuario (UX) y añadir herramientas esenciales para desarrolladores.

---

## 1. Exportación a PDF 📄
**Objetivo:** Permitir al usuario descargar sus apuntes en un formato estándar y fácil de compartir.
**Detalles Técnicos:**
- Utilizar librerías de Frontend como `react-to-print` o `html2pdf.js`.
- Añadir un botón de "Exportar a PDF" en la interfaz.
- Asegurarse de que al exportar, se apliquen estilos específicos de impresión (fondo blanco, texto oscuro) y no se impriman elementos de UI como botones flotantes o menús.

## 2. Refactorización del Título de Subtemas (Pestañas) 🏷️
**Objetivo:** Maximizar el espacio vertical del editor eliminando el título gigante estilo Notion y moviendo la funcionalidad a la barra de pestañas.
**Detalles Técnicos (Opción A - Estilo Navegador):**
- Eliminar el campo `<input>` gigante del componente `Notebook.jsx`.
- Modificar las pestañas superiores en la UI para que detecten un "Doble Clic" (`onDoubleClick`).
- Al hacer doble clic, la pestaña se transformará temporalmente en un pequeño `<input>` para renombrarla en el acto.
- Al presionar *Enter* o hacer clic fuera, guardar el nuevo nombre en la base de datos.

## 3. Resaltado de Sintaxis por Lenguaje (Code Highlighting) 💻
**Objetivo:** Que los bloques de código se adapten al lenguaje específico (Python, React, CSS, etc.) pintando las palabras clave correctamente.
**Detalles Técnicos:**
- Extender la configuración de `CodeBlockLowlight` en Tiptap.
- Agregar un menú desplegable (Select) flotante sobre los bloques de código para que el usuario elija el lenguaje.
- Importar los lenguajes necesarios desde la librería `lowlight` para que el CSS se aplique dinámicamente según la selección.

## 4. Arrastrar y Soltar (Drag & Drop) ✋
**Objetivo:** Permitir al usuario reordenar libremente sus Temas (barra lateral) y Subtemas (pestañas) simplemente arrastrándolos con el ratón.
**Detalles Técnicos (Dificultad Alta):**
- **Frontend:** Implementar una librería como `dnd-kit` o `@hello-pangea/dnd` para manejar las animaciones y la lógica de arrastre en la interfaz.
- **Backend/Base de datos:** Modificar el esquema de MongoDB (Mongoose) para incluir un nuevo campo numérico `order` en Temas y Subtemas.
- Crear nuevas rutas en la API (`PUT /api/notebook/themes/reorder`) que reciban el nuevo arreglo de IDs y actualicen el campo `order` masivamente en la base de datos cada vez que el usuario suelte un elemento.
