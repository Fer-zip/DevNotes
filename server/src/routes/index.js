import { Router } from 'express';
import * as userController from '../controllers/userController.js';

const router = Router();

router.get('/status', (req, res) => res.json({ success: true, message: 'API is operational' }));
router.get('/users', userController.getUsers);

export default router;
