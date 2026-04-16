import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { authorize } from '../middleware/authorize.middleware';
import authRoutes from '../modules/auth/auth.routes';
import adminRoutes from './admin.routes';
import superAdminRoutes from './super-admin.routes';

const router = Router();

// Publico
router.use('/auth', authRoutes);

// Admin: accesible por admin y super_admin
router.use('/admin', authenticate, authorize('admin', 'super_admin'), adminRoutes);

// Super Admin: accesible unicamente por super_admin
router.use('/super-admin', authenticate, authorize('super_admin'), superAdminRoutes);

export default router;
