import { Router } from 'express';
import * as controller from './turnos.controller';
import { validate } from '../../middleware/validate.middleware';
import { createSchema, updateSchema } from './turnos.validation';

const router = Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', validate(createSchema), controller.create);
router.put('/:id', validate(updateSchema), controller.update);
router.delete('/:id', controller.remove);

export default router;
