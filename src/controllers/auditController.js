const { LogActividad, Usuario } = require("../models");
const asyncHandler = require("../middleware/asyncHandler");
const { sendSuccess } = require("../utils/response");

/**
 * Controlador para visualizar los logs de auditoría del sistema.
 */
const getAuditLogs = asyncHandler(async (req, res) => {
  const logs = await LogActividad.findAll({
    limit: 50,
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: Usuario,
        as: "usuario",
        attributes: ["id", "nombre", "correo"],
      },
    ],
  });

  sendSuccess(res, logs, "Logs de auditoría obtenidos correctamente");
});

module.exports = { getAuditLogs };
