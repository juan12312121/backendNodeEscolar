const Joi = require('joi');

const personaSchema = {
    create: Joi.object({
        nombre: Joi.string().min(2).max(50).required(),
        app_p: Joi.string().min(2).max(50).required(),
        app_m: Joi.string().min(2).max(50).required()
    }),
    update: Joi.object({
        nombre: Joi.string().min(2).max(50),
        app_p: Joi.string().min(2).max(50),
        app_m: Joi.string().min(2).max(50),
        activo: Joi.boolean()
    })
};

const empleadoSchema = {
    create: Joi.object({
        id_persona: Joi.string().uuid().required(),
        id_esc: Joi.string().uuid().required(),
        rfc: Joi.string().length(13).uppercase().required(),
        curp: Joi.string().length(18).uppercase().required(),
        num_control: Joi.string().max(20),
        f_ingreso: Joi.date().iso()
    }),
    update: Joi.object({
        id_esc: Joi.string().uuid(),
        rfc: Joi.string().length(13).uppercase(),
        curp: Joi.string().length(18).uppercase(),
        activo: Joi.boolean()
    })
};

module.exports = { personaSchema, empleadoSchema };
