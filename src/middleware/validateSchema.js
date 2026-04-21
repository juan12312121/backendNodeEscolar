const { sendError } = require('../utils/response');

/**
 * Middleware para validar el cuerpo de la petición contra un esquema de Joi.
 * @param {Object} schema - Esquema de Joi para validar.
 */
const validateSchema = (schema) => {
    return (req, res, next) => {
        if (!schema) return next();

        const { error } = schema.validate(req.body, {
            abortEarly: false, // Capturar todos los errores, no solo el primero
            stripUnknown: true // Eliminar campos no definidos en el esquema (Seguridad!)
        });

        if (error) {
            const details = error.details.map(d => ({
                campo: d.path[0],
                mensaje: d.message.replace(/['"]/g, '')
            }));

            return res.status(400).json({
                success: false,
                message: 'Error de validación en los datos enviados',
                errors: details
            });
        }

        next();
    };
};

module.exports = validateSchema;
