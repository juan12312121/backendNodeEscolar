const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 20, // Aumentado para desarrollo
  message: {
    success: false,
    message: 'Demasiados intentos de login, intenta más tarde'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 500, // Aumentado para desarrollo
  message: {
    success: false,
    message: 'Demasiadas solicitudes, intenta más tarde'
  },
});

module.exports = { loginLimiter, apiLimiter };