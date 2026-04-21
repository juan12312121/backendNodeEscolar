const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

// Crear instancia de Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false, // Cambiar a console.log si quieres ver las queries
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

// Función para probar conexión
async function TestConnection() {
  try {
    await sequelize.authenticate();
    console.log(' Conexión a BD exitosa con Sequelize');
  } catch (error) {
    console.error('Error al conectar:', error.message);
  }
}

module.exports = {
  sequelize,
  TestConnection
};