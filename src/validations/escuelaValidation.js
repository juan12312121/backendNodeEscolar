const Joi = require('joi');

const escuelaSchema = {
    // Esquema para creación
    create: Joi.object({
        nombre: Joi.string().max(100).required(),
        clave: Joi.string().max(10).allow('', null),
        zona_escolar: Joi.string().max(5).allow('', null),
        nivel: Joi.string().max(10).allow('', null),
        num_tel: Joi.string().length(10).pattern(/^[0-9]+$/).allow('', null),
        correo: Joi.string().email().max(50).allow('', null),
        domicilio: Joi.string().max(255).allow('', null),
        localidad: Joi.string().max(50).allow('', null),
        municipio: Joi.string().max(50).allow('', null),
        estado: Joi.string().max(50).allow('', null),
        codigo_postal: Joi.string().length(5).pattern(/^[0-9]+$/).allow('', null)
    }),

    // Esquema para actualización
    update: Joi.object({
        nombre: Joi.string().max(100),
        clave: Joi.string().max(10).allow('', null),
        zona_escolar: Joi.string().max(5).allow('', null),
        nivel: Joi.string().max(10).allow('', null),
        num_tel: Joi.string().length(10).pattern(/^[0-9]+$/).allow('', null),
        correo: Joi.string().email().max(50).allow('', null),
        domicilio: Joi.string().max(255).allow('', null),
        localidad: Joi.string().max(50).allow('', null),
        municipio: Joi.string().max(50).allow('', null),
        estado: Joi.string().max(50).allow('', null),
        codigo_postal: Joi.string().length(5).pattern(/^[0-9]+$/).allow('', null),
        activo: Joi.boolean()
    })
};

module.exports = {
    escuelaSchema
};
