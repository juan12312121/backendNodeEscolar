const { Grupo } = require('../models');
const CRUDService = require('../services/crudService');
const asyncHandler = require('../middleware/asyncHandler');
const { sendSuccess } = require('../utils/response');

const crudService = new CRUDService(Grupo);

const getAll = asyncHandler(async (req, res) => {
  const grupos = await crudService.getAll({ activo: true });
  sendSuccess(res, grupos, 'Grupos obtenidos correctamente');
});

const getById = asyncHandler(async (req, res) => {
  const grupo = await crudService.getById(req.params.id);
  sendSuccess(res, grupo);
});

const create = asyncHandler(async (req, res) => {
  crudService.validateRequired(req.body, ['id_esc', 'id_grado', 'id_turno', 'nombre']);
  const grupo = await crudService.create(req.body);
  sendSuccess(res, grupo, 'Grupo creado correctamente', 201);
});

const update = asyncHandler(async (req, res) => {
  const grupo = await crudService.update(req.params.id, req.body);
  sendSuccess(res, grupo, 'Grupo actualizado correctamente');
});

const deleteGrupo = asyncHandler(async (req, res) => {
  await crudService.delete(req.params.id);
  sendSuccess(res, null, 'Grupo eliminado correctamente');
});

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: deleteGrupo
};