import { Router } from 'express';
import { login, refresh, logout } from './auth.controller';
import { authenticate } from '../../middleware/auth.middleware';
import { validate } from '../../middleware/validate.middleware';
import { loginSchema, refreshSchema } from './auth.validation';

const router = Router();

router.post('/login', validate(loginSchema), login);
router.post('/refresh', validate(refreshSchema), refresh);
router.post('/logout', authenticate, logout);

export default router;
