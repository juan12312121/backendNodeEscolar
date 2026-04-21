const express = require('express');
const router = express.Router();
const rolController = require('../controllers/rolController');
const { verifyToken, checkPermission } = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Gestión de roles del sistema
 */

router.get('/', verifyToken, rolController.getRoles);
router.get('/:id', verifyToken, rolController.getRolById);
router.post('/', verifyToken, checkPermission('crear-roles'), rolController.createRol);
router.put('/:id', verifyToken, checkPermission('editar-roles'), rolController.updateRol);
router.delete('/:id', verifyToken, checkPermission('eliminar-roles'), rolController.deleteRol);
router.post('/:id/permisos', verifyToken, checkPermission('editar-roles'), rolController.assignPermissions);

module.exports = router;
