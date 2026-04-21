const { Escuela } = require('../models');
const CRUDService = require('../services/crudService');
const asyncHandler = require('../middleware/asyncHandler');
const { sendSuccess } = require('../utils/response');

const crudService = new CRUDService(Escuela);

const getAll = asyncHandler(async (req, res) => {
  const data = await crudService.getAll(req.query);
  sendSuccess(res, data, 'Escuelas obtenidas correctamente');
});

const getById = asyncHandler(async (req, res) => {
  const data = await crudService.getById(req.params.id);
  sendSuccess(res, data);
});

const create = asyncHandler(async (req, res) => {
  crudService.validateRequired(req.body, ['nombre']);
  const data = await crudService.create(req.body, req.user?.id);
  sendSuccess(res, data, 'Escuela creada correctamente', 201);
});

const update = asyncHandler(async (req, res) => {
  const data = await crudService.update(req.params.id, req.body, req.user?.id);
  sendSuccess(res, data, 'Escuela actualizada correctamente');
});

const deleteEscuela = asyncHandler(async (req, res) => {
  await crudService.delete(req.params.id, req.user?.id);
  sendSuccess(res, null, 'Escuela eliminada correctamente');
});

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteEscuela
};
