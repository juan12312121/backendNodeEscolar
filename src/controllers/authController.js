const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Usuario } = require('../models');
const errorHandler = require('../errors/errorHandler');
const { sendSuccess, sendError } = require('../utils/response');

function generateToken(user) {
  return jwt.sign(
    { id: user.id, nombre: user.nombre, correo: user.correo, id_rol: user.id_rol },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
}

const login = errorHandler(async (req, res) => {
  const { correo, contra } = req.body;
  
  if (!correo || !contra) {
    return sendError(res, 'Correo y contraseña son requeridos', 400);
  }
  
  const usuario = await Usuario.findOne({ where: { correo } });
  
  if (!usuario) {
    return sendError(res, 'Usuario no encontrado', 401);
  }
  
  const passwordValid = await bcrypt.compare(contra, usuario.contra);
  
  if (!passwordValid) {
    return sendError(res, 'Contraseña incorrecta', 401);
  }
  
  const token = generateToken(usuario);
  
  sendSuccess(res, { token }, 'Login exitoso');
});

const register = errorHandler(async (req, res) => {
  const { nombre, correo, contra } = req.body;
  
  if (!nombre || !correo || !contra) {
    return sendError(res, 'Nombre, correo y contraseña son requeridos', 400);
  }
  
  const usuarioExistente = await Usuario.findOne({ where: { correo } });
  
  if (usuarioExistente) {
    return sendError(res, 'El correo ya está registrado', 409);
  }
  
  const contraEncriptada = await bcrypt.hash(contra, 10);
  
  const usuario = await Usuario.create({
    nombre,
    correo,
    contra: contraEncriptada
  });
  
  const token = generateToken(usuario);
  
  sendSuccess(res, { token }, 'Usuario registrado exitosamente', 201);
});

module.exports = {
  login,
  register,
  generateToken
};