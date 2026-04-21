const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { loginLimiter } = require('../middleware/rateLimiter');

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registrar nuevo usuario
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - correo
 *               - contra
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Juan García
 *               correo:
 *                 type: string
 *                 example: juan@email.com
 *               contra:
 *                 type: string
 *                 example: password123
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *       409:
 *         description: El correo ya existe
 *       400:
 *         description: Validación fallida
 *       429:
 *         description: Demasiados intentos
 */
router.post(
  '/register',
  loginLimiter,
  authController.register
);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login de usuario
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - correo
 *               - contra
 *             properties:
 *               correo:
 *                 type: string
 *                 example: juan@email.com
 *               contra:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login exitoso, devuelve token JWT
 *       401:
 *         description: Credenciales inválidas
 *       400:
 *         description: Validación fallida
 *       429:
 *         description: Demasiados intentos
 */
router.post(
  '/login',
  loginLimiter,
  authController.login
);

module.exports = router;