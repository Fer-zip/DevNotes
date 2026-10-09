# DevNotes - Documentación Técnica y Guía de Uso

## 📝 Resumen General

**DevNotes** es una plataforma moderna de toma de apuntes diseñada como un "segundo cerebro" para desarrolladores, estudiantes y creadores. Inspirada en soluciones como Notion, la aplicación combina un editor de texto enriquecido de alto rendimiento con **Inteligencia Artificial Contextual**, permitiendo no solo guardar notas, sino también comprender conceptos complejos al instante y renderizar diagramas profesionales a partir de texto.

---

## 🏗️ Arquitectura del Proyecto

El sistema se divide en tres capas principales que trabajan en conjunto para garantizar velocidad e integración de IA:

1. **Frontend (React + Vite)**: 
   - Interfaz de usuario moderna, rápida y responsiva.
   - Editor avanzado construido sobre **Tiptap**.
   - Animaciones fluidas utilizando **Framer Motion**.
2. **Backend Core (Node.js + Express)**: 
   - Maneja la lógica de almacenamiento (CRUD) de los cuadernos, temas y configuración.
   - Persistencia de datos en base de datos NoSQL (MongoDB).
3. **Microservicio de IA (Python/FastAPI)**: 
   - Sirve como puente hacia los modelos generativos avanzados (Gemini 3.5 Flash).
   - Procesa solicitudes de explicación contextual y formato en HTML para una inyección limpia en el editor.

---

## ✨ Características Principales

### 1. Editor Enriquecido Avanzado (Tiptap)
- **Tablas dinámicas**: Inserción de tablas con acciones integradas en la barra superior (añadir/eliminar filas y columnas).
- **Imágenes Inteligentes**: Soporte para arrastrar y pegar (`Ctrl+V`) capturas de pantalla, renderizadas automáticamente. Zoom inmersivo al hacer clic sostenido en cualquier imagen.
- **Formateo de código**: Soporte para bloques de código para programadores.

### 2. Diagramas Automáticos (Mermaid.js)
- Integración nativa con `mermaid` para crear gráficos visuales escribiendo texto simple.
- Transforma bloques de código en Flujogramas, Gráficos de Pastel y Diagramas de Secuencia con un solo clic.

### 3. Inteligencia Artificial Contextual (AI Explain)
- Selecciona cualquier frase o párrafo de tus apuntes y haz clic en el botón flotante **"✨ Explicar con IA"**.
- La Inteligencia Artificial analizará el contexto exacto y añadirá una explicación didáctica, elegante y formateada justo debajo de tu selección original.

### 4. Personalización y UX
- **Temas**: Soporte nativo para Modo Claro y Modo Oscuro.
- **Paleta de Colores**: Extensa gama de colores de acento inspirados en Tailwind (Slate, Rose, Amber, Indigo, etc.) para personalizar la apariencia.
- **Concentración**: Reproductor de música Lo-Fi integrado en la barra flotante inferior.

---

## ⚙️ Guía de Despliegue (Producción)

La aplicación está preparada para ser desplegada en entornos de producción. Cada servicio requiere configuración de Variables de Entorno separadas:

### 1. Frontend (Vercel / Netlify)
Directorio: `client/`
Comando de Build: `pnpm run build`
**Variables de entorno requeridas:**
- `VITE_API_URL`: URL pública del servidor Express (ej. https://mi-backend.onrender.com).
- `VITE_AI_URL`: URL pública del microservicio de FastAPI (ej. https://mi-ia.onrender.com).

### 2. Backend API (Render / Railway)
Directorio: `server/`
Comando de Start: `npm start`
**Variables de entorno requeridas:**
- `MONGO_URI`: Cadena de conexión a MongoDB Atlas.
- `PORT`: Puerto de despliegue (normalmente automático).

### 3. Microservicio IA (Render / Railway)
Directorio: `ai-agent/`
Comando de Start: `uvicorn main:app --host 0.0.0.0 --port 8000`
**Variables de entorno requeridas:**
- `GEMINI_API_KEY`: Clave de API válida de Google Gemini (requiere soporte de modelos modernos como `gemini-3.5-flash`).

---

## 🚀 Entorno de Desarrollo Local

Para correr la aplicación en modo desarrollo en tu máquina local:

1. Asegúrate de tener instalado **Node.js**, **Python** y **pnpm**.
2. Desde la carpeta raíz del proyecto, instala las dependencias iniciales si es necesario.
3. Ejecuta el comando mágico que iniciará los 3 servicios concurrentemente:
   ```bash
   pnpm run dev
   ```
4. Abre `http://localhost:5173` en tu navegador para empezar a crear tus notas.
