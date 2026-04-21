const jwt = require('jsonwebtoken');

// Middleware para verificar JWT
async function verifyToken(req, res, next) {
  try {
    // Obtener token del header
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token no proporcionado'
      });
    }
    
    // Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Token inválido o expirado'
    });
  }
}

// Middleware para verificar permisos (RBAC)
function checkPermission(requiredPermission) {
  return async (req, res, next) => {
    try {
      const { id_rol } = req.user;

      if (!id_rol) {
        return res.status(403).json({
          success: false,
          message: 'El usuario no tiene un rol asignado'
        });
      }

      // Importar modelos aquí para evitar problemas de carga circular
      const { Rol, Permiso } = require('../models');

      const rol = await Rol.findByPk(id_rol, {
        include: [{
          model: Permiso,
          as: 'permisos',
          where: { slug: requiredPermission, activo: true },
          required: true
        }]
      });

      if (!rol || !rol.permisos || rol.permisos.length === 0) {
        return res.status(403).json({
          success: false,
          message: 'No tienes permiso para realizar esta acción'
        });
      }

      next();
    } catch (error) {
      console.error('Error en checkPermission:', error);
      return res.status(500).json({
        success: false,
        message: 'Error al verificar permisos'
      });
    }
  };
}

module.exports = {
  verifyToken,
  checkPermission
};