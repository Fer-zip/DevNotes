import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import authRoutes from './modules/auth/authRoutes.js';
import studyRoutes from './modules/study/routes.js';
import notebookRoutes from './modules/notebook/routes.js';
import errorHandler from './middleware/errorHandler.js';

dotenv.config();

const app = express();

// Middlewares Globales
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Registro de Módulos (Rutas)
app.use('/api/auth', authRoutes);
app.use('/api/study', studyRoutes);
app.use('/api/notebook', notebookRoutes);

// Ruta de estado
app.get('/api/status', (req, res) => {
  res.json({ success: true, message: 'Server is robust and running' });
});

// Manejo de errores centralizado
app.use(errorHandler);

export default app;
