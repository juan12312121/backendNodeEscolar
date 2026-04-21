const express = require('express');
const { verifyToken, checkPermission } = require('../middleware/auth');
const validateSchema = require('../middleware/validateSchema');

/**
 * Crea un router con las rutas CRUD estándar protegidas por permisos y validaciones.
 */
const createCRUDRouter = (controller, entityName, schemas = {}) => {
    const router = express.Router();
    
    router.use(verifyToken);

    // GET / (Listar todos)
    if (controller.getAll) {
        router.get('/', checkPermission(`ver-${entityName}`), controller.getAll);
    }

    // GET /:id (Obtener uno)
    const getFunc = controller.getById || controller.get;
    if (getFunc) {
        router.get('/:id', checkPermission(`ver-${entityName}`), getFunc);
    }
    
    // POST / (Crear)
    if (controller.create) {
        router.post('/', 
            checkPermission(`gestionar-${entityName}`), 
            validateSchema(schemas.create), 
            controller.create
        );
    }

    // PUT /:id (Actualizar)
    if (controller.update) {
        router.put('/:id', 
            checkPermission(`gestionar-${entityName}`), 
            validateSchema(schemas.update), 
            controller.update
        );
    }

    // DELETE /:id (Eliminar)
    const deleteFunc = controller.delete || controller[`delete${entityName.charAt(0).toUpperCase() + entityName.slice(1, -1)}`];
    if (deleteFunc) {
        router.delete('/:id', checkPermission(`gestionar-${entityName}`), deleteFunc);
    }

    return router;
};

module.exports = createCRUDRouter;
