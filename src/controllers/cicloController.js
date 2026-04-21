const { Ciclo } = require('../models');
const CRUDService = require('../services/crudService');
const asyncHandler = require('../middleware/asyncHandler');
const { sendSuccess } = require('../utils/response');

const crudService = new CRUDService(Ciclo);

const getAll = asyncHandler(async (req, res) => {
  const data = await crudService.getAll();
  sendSuccess(res, data);
});

const getById = asyncHandler(async (req, res) => {
  const data = await crudService.getById(req.params.id);
  sendSuccess(res, data);
});

const create = asyncHandler(async (req, res) => {
  crudService.validateRequired(req.body, ['nombre', 'id_plan', 'id_esc']);
  const data = await crudService.create(req.body);
  sendSuccess(res, data, 'Ciclo creado correctamente', 201);
});

const update = asyncHandler(async (req, res) => {
  const data = await crudService.update(req.params.id, req.body);
  sendSuccess(res, data);
});

const deleteCiclo = asyncHandler(async (req, res) => {
  await crudService.delete(req.params.id);
  sendSuccess(res, null);
});

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteCiclo
};
