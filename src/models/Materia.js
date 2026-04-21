const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Materia = sequelize.define('Materia', {
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    id_plan: DataTypes.UUID,
    nombre: { type: DataTypes.STRING(100), allowNull: false },
    desc: DataTypes.TEXT,
    activo: { type: DataTypes.BOOLEAN, defaultValue: true },
    f_cre: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    f_mod: DataTypes.DATE
}, { tableName: 'Materias', timestamps: false });

module.exports = Materia;
