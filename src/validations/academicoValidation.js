const Joi = require('joi');

const academicoSchema = {
    ciclo: {
        create: Joi.object({
            id_plan: Joi.string().uuid().required(),
            id_esc: Joi.string().uuid().required(),
            nombre: Joi.string().max(20).required(),
            f_inicio: Joi.date().iso(),
            f_fin: Joi.date().iso().greater(Joi.ref('f_inicio'))
        }),
        update: Joi.object({
            nombre: Joi.string().max(20),
            f_inicio: Joi.date().iso(),
            f_fin: Joi.date().iso(),
            activo: Joi.boolean()
        })
    },
    materia: {
        create: Joi.object({
            id_plan: Joi.string().uuid().required(),
            nombre: Joi.string().max(100).required(),
            desc: Joi.string().allow('', null)
        }),
        update: Joi.object({
            nombre: Joi.string().max(100),
            desc: Joi.string().allow('', null),
            activo: Joi.boolean()
        })
    }
};

module.exports = { academicoSchema };
