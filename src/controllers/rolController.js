const { Rol, Permiso, RolPermiso, Usuario } = require('../models');
const errorHandler = require('../errors/errorHandler');
const { sendSuccess, sendError } = require('../utils/response');

const getRoles = errorHandler(async (req, res) => {
    const roles = await Rol.findAll({
        include: [{
            model: Permiso,
            as: 'permisos',
            through: { attributes: [] }
        }]
    });
    sendSuccess(res, roles, 'Roles obtenidos exitosamente');
});

const getRolById = errorHandler(async (req, res) => {
    const { id } = req.params;
    const rol = await Rol.findByPk(id, {
        include: [{
            model: Permiso,
            as: 'permisos',
            through: { attributes: [] }
        }]
    });
    
    if (!rol) {
        return sendError(res, 'Rol no encontrado', 404);
    }
    
    sendSuccess(res, rol, 'Rol obtenido exitosamente');
});

const createRol = errorHandler(async (req, res) => {
    const { nombre, descripcion, permisos } = req.body;
    
    if (!nombre) {
        return sendError(res, 'El nombre del rol es requerido', 400);
    }
    
    const nuevoRol = await Rol.create({ nombre, descripcion });
    
    if (permisos && permisos.length > 0) {
        await nuevoRol.setPermisos(permisos);
    }
    
    sendSuccess(res, nuevoRol, 'Rol creado exitosamente', 201);
});

const updateRol = errorHandler(async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, permisos, activo } = req.body;
    
    const rol = await Rol.findByPk(id);
    
    if (!rol) {
        return sendError(res, 'Rol no encontrado', 404);
    }
    
    await rol.update({ nombre, descripcion, activo, f_mod: new Date() });
    
    if (permisos) {
        await rol.setPermisos(permisos);
    }
    
    sendSuccess(res, rol, 'Rol actualizado exitosamente');
});

const deleteRol = errorHandler(async (req, res) => {
    const { id } = req.params;
    const rol = await Rol.findByPk(id);
    
    if (!rol) {
        return sendError(res, 'Rol no encontrado', 404);
    }
    
    // Verificar si hay usuarios con este rol
    const usuariosConRol = await Usuario.count({ where: { id_rol: id } });
    if (usuariosConRol > 0) {
        return sendError(res, 'No se puede eliminar un rol que tiene usuarios asignados', 400);
    }
    
    await rol.destroy();
    sendSuccess(res, null, 'Rol eliminado exitosamente');
});

const assignPermissions = errorHandler(async (req, res) => {
    const { id } = req.params;
    const { permisos } = req.body;
    
    const rol = await Rol.findByPk(id);
    
    if (!rol) {
        return sendError(res, 'Rol no encontrado', 404);
    }
    
    await rol.setPermisos(permisos);
    sendSuccess(res, null, 'Permisos asignados exitosamente');
});

module.exports = {
    getRoles,
    getRolById,
    createRol,
    updateRol,
    deleteRol,
    assignPermissions
};
