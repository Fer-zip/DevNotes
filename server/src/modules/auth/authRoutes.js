import { Router } from 'express';
import * as authController from './authController.js';

const router = Router();

/**
 * Rutas del módulo de Autenticación.
 */
router.post('/login', authController.login);
router.post('/register', authController.register);

export default router;
