const { Persona } = require('../models');
const CRUDService = require('../services/crudService');
const asyncHandler = require('../middleware/asyncHandler');
const { sendSuccess } = require('../utils/response');

const crudService = new CRUDService(Persona);

const getAllPersonas = asyncHandler(async (req, res) => {
  const personas = await crudService.getAll({ activo: true });
  sendSuccess(res, personas, 'Personas obtenidas correctamente');
});

const getPersonaById = asyncHandler(async (req, res) => {
  const persona = await crudService.getById(req.params.id);
  sendSuccess(res, persona);
});

const createPersona = asyncHandler(async (req, res) => {
  crudService.validateRequired(req.body, ['nombre', 'app_p']);
  const persona = await crudService.create(req.body);
  sendSuccess(res, persona, 'Persona creada correctamente', 201);
});

const updatePersona = asyncHandler(async (req, res) => {
  const persona = await crudService.update(req.params.id, req.body);
  sendSuccess(res, persona, 'Persona actualizada correctamente');
});

const deletePersona = asyncHandler(async (req, res) => {
  await crudService.delete(req.params.id);
  sendSuccess(res, null, 'Persona eliminada correctamente');
});

module.exports = {
  getAllPersonas,
  getPersonaById,
  createPersona,
  updatePersona,
  deletePersona
};