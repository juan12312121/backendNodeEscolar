const winston = require('winston');
const path = require('path');

// Definir formato de los logs
const logFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
);

const logger = winston.createLogger({
    level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
    format: logFormat,
    defaultMeta: { service: 'school-manager-api' },
    transports: [
        // Escribir errores en error.log
        new winston.transports.File({ 
            filename: path.join('logs', 'error.log'), 
            level: 'error' 
        }),
        // Escribir todos los logs en combined.log
        new winston.transports.File({ 
            filename: path.join('logs', 'combined.log') 
        })
    ]
});

// Si estamos en desarrollo, también mostrar por consola con colores
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        )
    }));
}

module.exports = logger;
