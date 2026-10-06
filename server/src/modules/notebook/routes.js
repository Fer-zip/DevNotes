import { Router } from 'express';
import { getThemes, createTheme, createTab, updateTab, updateTheme, deleteTheme, deleteTab } from './controller.js';
// import { requireAuth } from '../../middleware/authMiddleware.js'; // Descomentar cuando la auth sea estricta

const router = Router();

// Nota: Podemos inyectar requireAuth en el futuro si lo necesitas
router.get('/themes', getThemes);
router.post('/themes', createTheme);
router.put('/themes/:themeId', updateTheme);
router.delete('/themes/:themeId', deleteTheme);
router.post('/themes/:themeId/tabs', createTab);
router.put('/tabs/:tabId', updateTab);
router.delete('/tabs/:tabId', deleteTab);

export default router;
