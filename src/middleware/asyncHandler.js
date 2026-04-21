// Wrapper para manejar errores automáticamente
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    const statusCode = err.status || 500;
    const message = err.message || 'Error interno del servidor';
    res.status(statusCode).json({
      success: false,
      message
    });
  });
};

module.exports = asyncHandler;