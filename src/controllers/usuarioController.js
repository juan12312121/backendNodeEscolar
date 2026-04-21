const { Usuario, Rol } = require('../models');
const CRUDService = require('../services/crudService');
const asyncHandler = require('../middleware/asyncHandler');
const { sendSuccess } = require('../utils/response');

class UsuarioCRUD extends CRUDService {
  async getAll(where = {}) {
    return await this.Model.findAll({
      where,
      attributes: { exclude: ['contra'] },
      include: [{
        model: Rol,
        as: 'rol',
        attributes: ['id', 'nombre']
      }]
    });
  }

  async getById(id) {
    const record = await this.Model.findByPk(id, {
      attributes: { exclude: ['contra'] },
      include: [{
        model: Rol,
        as: 'rol',
        attributes: ['id', 'nombre']
      }]
    });
    if (!record) throw { status: 404, message: 'Usuario no encontrado' };
    return record;
  }
}

const crudService = new UsuarioCRUD(Usuario);

const getAll = asyncHandler(async (req, res) => {
  const usuarios = await crudService.getAll({ activo: true });
  sendSuccess(res, usuarios, 'Usuarios obtenidos correctamente');
});

const getById = asyncHandler(async (req, res) => {
  const usuario = await crudService.getById(req.params.id);
  sendSuccess(res, usuario);
});

const update = asyncHandler(async (req, res) => {
  const usuario = await crudService.update(req.params.id, req.body);
  sendSuccess(res, usuario, 'Usuario actualizado correctamente');
});

const deleteUsuario = asyncHandler(async (req, res) => {
  await crudService.delete(req.params.id);
  sendSuccess(res, null, 'Usuario eliminado correctamente');
});

module.exports = {
  getAll,
  getById,
  update,
  delete: deleteUsuario
};