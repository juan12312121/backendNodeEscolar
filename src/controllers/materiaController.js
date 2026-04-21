const { Materia } = require('../models');
const CRUDService = require('../services/crudService');
const asyncHandler = require('../middleware/asyncHandler');
const { sendSuccess } = require('../utils/response');

const crudService = new CRUDService(Materia);

const getAll = asyncHandler(async (req, res) => {
  const data = await crudService.getAll({ activo: true });
  sendSuccess(res, data);
});

const create = asyncHandler(async (req, res) => {
  crudService.validateRequired(req.body, ['nombre', 'id_plan']);
  const data = await crudService.create(req.body);
  sendSuccess(res, data, 'Materia creada correctamente', 201);
});

const update = asyncHandler(async (req, res) => {
  const data = await crudService.update(req.params.id, req.body);
  sendSuccess(res, data);
});

const deleteMateria = asyncHandler(async (req, res) => {
  await crudService.delete(req.params.id);
  sendSuccess(res, null);
});

module.exports = {
  getAll,
  create,
  update,
  deleteMateria
};
