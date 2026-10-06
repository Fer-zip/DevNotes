import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pdf = require("pdf-parse");
import StudySession from "./model.js";

/**
 * Crea una nueva sesión de estudio.
 * @param {Object} sessionData - Datos de la sesión.
 * @returns {Promise<Object>} La sesión creada.
 */
export const createStudySession = async (sessionData) => {
  try {
    const session = new StudySession(sessionData);
    return await session.save();
  } catch (error) {
    throw new Error("Error al crear la sesión de estudio: " + error.message);
  }
};

/**
 * Obtiene todas las sesiones de estudio.
 * @returns {Promise<Array>} Lista de sesiones.
 */
export const getAllSessions = async () => {
  try {
    return await StudySession.find().sort({ createdAt: -1 });
  } catch (error) {
    throw new Error("Error al obtener las sesiones: " + error.message);
  }
};

/**
 * Obtiene una sesión de estudio por ID.
 * @param {string} id - ID de la sesión.
 * @returns {Promise<Object>} La sesión encontrada.
 */
export const getSessionById = async (id) => {
  try {
    return await StudySession.findById(id);
  } catch (error) {
    throw new Error("Error al obtener la sesión: " + error.message);
  }
};

/**
 * Actualiza el progreso de una sesión.
 * @param {string} id - ID de la sesión.
 * @param {number} progress - Nuevo progreso.
 * @returns {Promise<Object>} La sesión actualizada.
 */
export const updateProgress = async (id, progress) => {
  try {
    return await StudySession.findByIdAndUpdate(
      id,
      { progress },
      { new: true },
    );
  } catch (error) {
    throw new Error("Error al actualizar el progreso: " + error.message);
  }
};

/**
 * Procesa un archivo subido, extrae su texto y obtiene un resumen de la IA.
 * @param {Object} file - Objeto de archivo de multer.
 * @returns {Promise<Object>} Resumen y texto extraído.
 */
export const processAndValidateFile = async (file) => {
  try {
    let text = '';
    if (file.mimetype === 'application/pdf') {
      const { PDFParse } = pdf;
      const parser = new PDFParse({ data: file.buffer });
      const result = await parser.getText();
      text = result.text;
      await parser.destroy();
    } else {
      text = file.buffer.toString('utf-8');
    }

    const aiAgentUrl = process.env.AI_AGENT_URL || 'http://localhost:8000';
    const response = await fetch(`${aiAgentUrl}/api/analyze-document`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });

    const aiResult = await response.json();
    return {
      fileName: file.originalname,
      summary: aiResult.summary,
      fullText: text
    };
  } catch (error) {
    throw new Error('Error al procesar el archivo: ' + error.message);
  }
};

/**
 * Inicia una conversación de configuración de tema con la IA.
 * @param {Array} messages - Historial de mensajes.
 * @param {Array} docSummaries - Resúmenes de documentos subidos.
 * @returns {Promise<Object>} Respuesta de la IA.
 */
export const setupChat = async (messages, docSummaries = []) => {
  try {
    const aiAgentUrl = process.env.AI_AGENT_URL || "http://localhost:8000";
    const response = await fetch(`${aiAgentUrl}/api/setup-chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages, doc_summaries: docSummaries }),
    });
    return await response.json();
  } catch (error) {
    throw new Error("Error en el chat de configuración: " + error.message);
  }
};

/**
 * Genera un plan de estudio llamando al agente de IA.
 * @param {string} prompt - El tema o consulta del usuario.
 * @param {string} mode - Modo de generación.
 * @param {string} docText - Texto completo de los documentos.
 * @returns {Promise<Object>} La sesión de estudio generada.
 */
export const generatePlan = async (prompt, mode, docText = "") => {
  try {
    const aiAgentUrl = process.env.AI_AGENT_URL || "http://localhost:8000";

    const response = await fetch(`${aiAgentUrl}/api/generate-plan`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, mode, doc_text: docText }),
    });

    if (!response.ok) {
      throw new Error("El agente de IA no pudo procesar la solicitud");
    }

    const aiData = await response.json();

    // Crear la sesión en la DB
    const session = new StudySession({
      title: aiData.title || prompt,
      description: aiData.description,
      modules: aiData.modules || [],
      progress: 0,
    });

    return await session.save();
  } catch (error) {
    throw new Error("Error en la generación del plan: " + error.message);
  }
};

/**
 * Genera un examen para un módulo específico.
 * @param {string} content - El contenido del módulo.
 * @returns {Promise<Array>} Lista de preguntas del examen.
 */
export const generateQuiz = async (content) => {
  try {
    const aiAgentUrl = process.env.AI_AGENT_URL || "http://localhost:8000";

    const response = await fetch(`${aiAgentUrl}/api/generate-quiz`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });

    if (!response.ok) {
      throw new Error("No se pudo generar el examen");
    }

    return await response.json();
  } catch (error) {
    throw new Error("Error generando el examen: " + error.message);
  }
};

/**
 * Elimina una sesión de estudio por ID.
 * @param {string} id - ID de la sesión.
 * @returns {Promise<Object>} La sesión eliminada.
 */
export const deleteSession = async (id) => {
  try {
    return await StudySession.findByIdAndDelete(id);
  } catch (error) {
    throw new Error("Error al eliminar la sesión: " + error.message);
  }
};
