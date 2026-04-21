// Respuesta exitosa
const sendSuccess = (res, data = null, message = 'Operación exitosa', statusCode = 200) => {
  res.status(statusCode).json({
    success: true,
    data,
    message
  });
};

// Respuesta de error
const sendError = (res, message = 'Error interno del servidor', statusCode = 500, data = null) => {
  res.status(statusCode).json({
    success: false,
    message,
    error: data
  });
};

module.exports = {
  sendSuccess,
  sendError
};