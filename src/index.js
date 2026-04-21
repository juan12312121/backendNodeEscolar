const express = require('express');
const dotenv = require('dotenv');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');

const { sequelize, TestConnection } = require('./config/database');
const { swaggerUi, specs } = require('./swagger');
const createCRUDRouter = require('./utils/routeFactory');

// Esquemas de validación
const { escuelaSchema } = require('./validations/escuelaValidation');
const { personaSchema, empleadoSchema } = require('./validations/personalValidation');
const { usuarioSchema } = require('./validations/usuarioValidation');
const { academicoSchema } = require('./validations/academicoValidation');

// Controladores
const authRoutes = require('./routes/authRoutes');
const rolRoutes = require('./routes/rolRoutes');
const permisoRoutes = require('./routes/permisoRoutes');

const escuelaController = require('./controllers/escuelaController');
const personaController = require('./controllers/personaController');
const empleadoController = require('./controllers/empleadoController');
const usuarioController = require('./controllers/usuarioController');
const cicloController = require('./controllers/cicloController');
const materiaController = require('./controllers/materiaController');
const grupoController = require('./controllers/grupoController');
const estudianteController = require('./controllers/estudianteController');
const auditController = require('./controllers/auditController');

const logger = require('./utils/logger');
const globalErrorHandler = require('./middleware/errorMiddleware');

dotenv.config();

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

const hpp = require('hpp');
const { apiLimiter, loginLimiter } = require('./middleware/rateLimiter');

const app = express();

app.use(helmet());
app.use(cors());
app.use(compression());
app.use(hpp()); // Prevenir Parameter Pollution
app.use(express.json({ limit: '10kb' })); // Limitar tamaño de body para seguridad
app.use('/api', apiLimiter); // Rate limit global para la API

// ============================================
// SWAGGER DOCUMENTATION
// ============================================
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs));

TestConnection();

// ============================================
// RUTAS
// ============================================

app.get('/api/test', (req, res) => {
  res.json({
    message: '¡Hola desde el backend!',
    environment: NODE_ENV,
    database: 'Sequelize conectado'
  });
});

app.use('/api/auth', loginLimiter, authRoutes);
app.use('/api/roles', rolRoutes);
app.use('/api/permisos', permisoRoutes);
const { verifyToken, checkPermission } = require('./middleware/auth');
app.use('/api/auditoria', verifyToken, checkPermission('ver-auditoria'), auditController.getAuditLogs);

// Rutas generadas por Factory (Seguras, Validadas y Cohesivas)
app.use('/api/escuelas', createCRUDRouter(escuelaController, 'escuelas', escuelaSchema));
app.use('/api/personas', createCRUDRouter(personaController, 'personas', personaSchema));
app.use('/api/usuarios', createCRUDRouter(usuarioController, 'usuarios', usuarioSchema));
app.use('/api/empleados', createCRUDRouter(empleadoController, 'empleados', empleadoSchema));
app.use('/api/ciclos', createCRUDRouter(cicloController, 'ciclos', academicoSchema.ciclo));
app.use('/api/materias', createCRUDRouter(materiaController, 'materias', academicoSchema.materia));
app.use('/api/grupos', createCRUDRouter(grupoController, 'grupos'));
app.use('/api/estudiantes', createCRUDRouter(estudianteController, 'estudiantes'));

// Manejador de errores global (Debe ir después de todas las rutas)
app.use(globalErrorHandler);

// ============================================
// INICIAR SERVIDOR
// ============================================

app.listen(PORT, () => {
  logger.info(`Servidor corriendo en puerto ${PORT}`);
  logger.info(`Documentación: http://localhost:${PORT}/api/docs`);
});

module.exports = app;