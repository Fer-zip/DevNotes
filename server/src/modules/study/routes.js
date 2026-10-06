import express from 'express';
import multer from 'multer';
import * as studyController from './controller.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Rutas para sesiones de estudio
router.post('/', studyController.createSession);
router.post('/generate', studyController.generateStudyPlan);
router.post('/generate-quiz', studyController.generateQuiz);
router.post('/setup-chat', studyController.setupChat);
router.post('/validate-file', upload.single('file'), studyController.validateFile);
router.get('/', studyController.getSessions);
router.get('/:id', studyController.getSession);
router.delete('/:id', studyController.deleteSession);

export default router;
