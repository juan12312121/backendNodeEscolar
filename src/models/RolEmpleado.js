const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const RolEmpleado = sequelize.define('RolEmpleado', {
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    nombre: { type: DataTypes.STRING(25), allowNull: false },
    desc: DataTypes.TEXT,
    activo: { type: DataTypes.BOOLEAN, defaultValue: true },
    f_cre: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    f_mod: DataTypes.DATE
}, { tableName: 'Rol_Empleado', timestamps: false });

module.exports = RolEmpleado;
