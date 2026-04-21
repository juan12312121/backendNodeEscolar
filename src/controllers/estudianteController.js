const { Estudiante } = require('../models');
const CRUDService = require('../services/crudService');
const asyncHandler = require('../middleware/asyncHandler');
const { sendSuccess, sendError } = require('../utils/response');

const crudService = new CRUDService(Estudiante);

const getAll = asyncHandler(async (req, res) => {
  const estudiantes = await crudService.getAll({ activo: true });
  sendSuccess(res, estudiantes, 'Estudiantes obtenidos correctamente');
});

const getById = asyncHandler(async (req, res) => {
  const estudiante = await crudService.getById(req.params.id);
  sendSuccess(res, estudiante);
});

const create = asyncHandler(async (req, res) => {
  crudService.validateRequired(req.body, ['id_persona', 'id_grupo', 'matricula']);
  const estudiante = await crudService.create(req.body);
  sendSuccess(res, estudiante, 'Estudiante creado correctamente', 201);
});

const update = asyncHandler(async (req, res) => {
  const estudiante = await crudService.update(req.params.id, req.body);
  sendSuccess(res, estudiante, 'Estudiante actualizado correctamente');
});

const deleteEstudiante = asyncHandler(async (req, res) => {
  await crudService.delete(req.params.id);
  sendSuccess(res, null, 'Estudiante eliminado correctamente');
});

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: deleteEstudiante
};