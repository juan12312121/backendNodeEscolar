const Joi = require('joi');

const usuarioSchema = {
    create: Joi.object({
        nombre: Joi.string().min(3).max(100).required(),
        correo: Joi.string().email().required(),
        contra: Joi.string().min(8).required(),
        id_rol: Joi.string().uuid()
    }),
    update: Joi.object({
        nombre: Joi.string().min(3).max(100),
        correo: Joi.string().email(),
        contra: Joi.string().min(8),
        id_rol: Joi.string().uuid(),
        activo: Joi.boolean()
    })
};

module.exports = { usuarioSchema };
