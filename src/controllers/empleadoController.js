const { Empleado, Persona } = require('../models');
const CRUDService = require('../services/crudService');
const asyncHandler = require('../middleware/asyncHandler');
const { sendSuccess } = require('../utils/response');

class EmpleadoCRUD extends CRUDService {
  async getAllWithPersona() {
    return await this.Model.findAll({
      where: { activo: true },
      include: [{ model: Persona, as: 'Persona' }]
    });
  }
}

const crudService = new EmpleadoCRUD(Empleado);

const getAll = asyncHandler(async (req, res) => {
  const data = await crudService.getAllWithPersona();
  sendSuccess(res, data);
});

const create = asyncHandler(async (req, res) => {
  crudService.validateRequired(req.body, ['id_persona', 'id_esc', 'rfc']);
  const data = await crudService.create(req.body);
  sendSuccess(res, data, 'Empleado registrado', 201);
});

const update = asyncHandler(async (req, res) => {
  const data = await crudService.update(req.params.id, req.body);
  sendSuccess(res, data);
});

const deleteEmpleado = asyncHandler(async (req, res) => {
  await crudService.delete(req.params.id);
  sendSuccess(res, null);
});

module.exports = {
  getAll,
  create,
  update,
  deleteEmpleado
};
