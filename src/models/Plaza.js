const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Plaza = sequelize.define('Plaza', {
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    id_empleado: { type: DataTypes.UUID },
    id_nombramiento: { type: DataTypes.UUID },
    id_materia: { type: DataTypes.UUID },
    id_esc: { type: DataTypes.UUID },
    codigo_plaza: { type: DataTypes.STRING(30) },
    horas_clase: DataTypes.INTEGER,
    horas_descarga: DataTypes.INTEGER,
    horas_fortalec: DataTypes.INTEGER,
    func_descarga: DataTypes.TEXT,
    evaluado: DataTypes.STRING(255),
    observaciones: DataTypes.TEXT,
    activo: { type: DataTypes.BOOLEAN, defaultValue: true },
    f_cre: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    f_mod: DataTypes.DATE
}, { tableName: 'Plaza', timestamps: false });

module.exports = Plaza;
