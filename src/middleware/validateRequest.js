const validateRequest = (schema) => {
  return (req, res, next) => {
    // Si no hay schema, pasar al siguiente middleware
    if (!schema) {
      return next();
    }

    // Validar el body contra el schema Joi
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,        // Recopilar todos los errores
      stripUnknown: true,       // Eliminar campos no definidos
      convert: true             // Convertir tipos si es posible
    });

    // Si hay errores de validación
    if (error) {
      const errors = error.details.map(detail => detail.message);
      
      return res.status(400).json({
        success: false,
        message: 'Errores de validación',
        errors: errors
      });
    }

    // Reemplazar el body con los valores validados y limpios
    req.body = value;
    next();
  };
};

module.exports = validateRequest;