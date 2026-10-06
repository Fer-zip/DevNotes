import * as studyService from './service.js';

/**
 * Handler para crear una nueva sesión de estudio.
 */
export const createSession = async (req, res) => {
  try {
    const session = await studyService.createStudySession(req.body);
    res.status(201).json({
      success: true,
      data: session
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Handler para obtener todas las sesiones.
 */
export const getSessions = async (req, res) => {
  try {
    const sessions = await studyService.getAllSessions();
    res.status(200).json({
      success: true,
      data: sessions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Handler para obtener una sesión por ID.
 */
export const getSession = async (req, res) => {
  try {
    const session = await studyService.getSessionById(req.params.id);
    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Sesión no encontrada'
      });
    }
    res.status(200).json({
      success: true,
      data: session
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Handler para validar un archivo y obtener su contexto mediante IA.
 */
export const validateFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No se subió ningún archivo' });
    }
    const result = await studyService.processAndValidateFile(req.file);
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Handler para la conversación inicial de configuración con IA.
 */
export const setupChat = async (req, res) => {
  try {
    const { messages, doc_summaries } = req.body;
    const aiResponse = await studyService.setupChat(messages, doc_summaries);
    res.status(200).json({
      success: true,
      data: aiResponse
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Handler para generar un plan de estudio usando IA.
 */
export const generateStudyPlan = async (req, res) => {
  try {
    const { prompt, mode, docText } = req.body;
    const session = await studyService.generatePlan(prompt, mode, docText);
    res.status(200).json({
      success: true,
      data: session
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Handler para generar un examen para un módulo.
 */
export const generateQuiz = async (req, res) => {
  try {
    const { content } = req.body;
    const quiz = await studyService.generateQuiz(content);
    res.status(200).json({
      success: true,
      data: quiz
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Handler para eliminar una sesión.
 */
export const deleteSession = async (req, res) => {
  try {
    await studyService.deleteSession(req.params.id);
    res.status(200).json({
      success: true,
      message: 'Sesión eliminada correctamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
