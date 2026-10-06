/**
 * Middleware para manejo de errores global.
 * Captura cualquier error lanzado en los controladores.
 */
const errorHandler = (err, req, res, next) => {
  const statusCode = err.status || 500;
  
  res.status(statusCode).json({
    success: false,
    error: err.message || 'Error interno del servidor',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};

export default errorHandler;
