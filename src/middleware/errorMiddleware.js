const logger = require('../utils/logger');
const { sendError } = require('../utils/response');

/**
 * Middleware global para capturar y procesar todos los errores de la aplicación.
 */
const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    // Loguear el error solo si es un error 500 (interno) o crítico
    if (err.statusCode >= 500) {
        logger.error({
            message: err.message,
            stack: err.stack,
            path: req.path,
            method: req.method,
            body: req.body
        });
    }

    // Respuesta para el cliente
    const message = err.statusCode === 500 
        ? 'Algo salió mal en el servidor' 
        : err.message;

    return res.status(err.statusCode).json({
        success: false,
        status: err.status,
        message: message,
        // En desarrollo mostramos el stack trace para depurar
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
};

module.exports = globalErrorHandler;
