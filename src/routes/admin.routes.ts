import { Router } from 'express';
import planEstudiosRoutes from '../modules/plan_estudios/plan_estudios.routes';
import escuelaRoutes from '../modules/escuela/escuela.routes';
import nombramientoRoutes from '../modules/nombramiento/nombramiento.routes';
import rolEmpleadoRoutes from '../modules/rol_empleado/rol_empleado.routes';
import gradosRoutes from '../modules/grados/grados.routes';
import materiasRoutes from '../modules/materias/materias.routes';
import materiaGradoRoutes from '../modules/materia_grado/materia_grado.routes';
import turnosRoutes from '../modules/turnos/turnos.routes';
import cicloRoutes from '../modules/ciclo/ciclo.routes';

const router = Router();

// Catalogos base
router.use('/planes-estudio', planEstudiosRoutes);
router.use('/escuelas', escuelaRoutes);
router.use('/nombramientos', nombramientoRoutes);
router.use('/roles-empleado', rolEmpleadoRoutes);
router.use('/grados', gradosRoutes);
router.use('/materias', materiasRoutes);
router.use('/materia-grado', materiaGradoRoutes);
router.use('/turnos', turnosRoutes);
router.use('/ciclos', cicloRoutes);

export default router;
