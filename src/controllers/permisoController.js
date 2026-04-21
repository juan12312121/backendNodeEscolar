const { Permiso } = require('../models');
const errorHandler = require('../errors/errorHandler');
const { sendSuccess, sendError } = require('../utils/response');

const getPermisos = errorHandler(async (req, res) => {
    const permisos = await Permiso.findAll();
    sendSuccess(res, permisos, 'Permisos obtenidos exitosamente');
});

const createPermiso = errorHandler(async (req, res) => {
    const { nombre, slug, descripcion } = req.body;
    
    if (!nombre || !slug) {
        return sendError(res, 'Nombre y slug son requeridos', 400);
    }
    
    const nuevoPermiso = await Permiso.create({ nombre, slug, descripcion });
    sendSuccess(res, nuevoPermiso, 'Permiso creado exitosamente', 201);
});

const updatePermiso = errorHandler(async (req, res) => {
    const { id } = req.params;
    const { nombre, slug, descripcion, activo } = req.body;
    
    const permiso = await Permiso.findByPk(id);
    
    if (!permiso) {
        return sendError(res, 'Permiso no encontrado', 404);
    }
    
    await permiso.update({ nombre, slug, descripcion, activo, f_mod: new Date() });
    sendSuccess(res, permiso, 'Permiso actualizado exitosamente');
});

const deletePermiso = errorHandler(async (req, res) => {
    const { id } = req.params;
    const permiso = await Permiso.findByPk(id);
    
    if (!permiso) {
        return sendError(res, 'Permiso no encontrado', 404);
    }
    
    await permiso.destroy();
    sendSuccess(res, null, 'Permiso eliminado exitosamente');
});

module.exports = {
    getPermisos,
    createPermiso,
    updatePermiso,
    deletePermiso
};
