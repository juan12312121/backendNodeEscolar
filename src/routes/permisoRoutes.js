const express = require('express');
const router = express.Router();
const permisoController = require('../controllers/permisoController');
const { verifyToken, checkPermission } = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Permisos
 *   description: Gestión de permisos del sistema
 */

router.get('/', verifyToken, permisoController.getPermisos);
router.post('/', verifyToken, checkPermission('gestionar-permisos'), permisoController.createPermiso);
router.put('/:id', verifyToken, checkPermission('gestionar-permisos'), permisoController.updatePermiso);
router.delete('/:id', verifyToken, checkPermission('gestionar-permisos'), permisoController.deletePermiso);

module.exports = router;
