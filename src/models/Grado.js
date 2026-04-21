const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Grado = sequelize.define('Grado', {
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    id_plan: DataTypes.UUID,
    nombre: { type: DataTypes.STRING(25), allowNull: false },
    numero: DataTypes.INTEGER,
    activo: { type: DataTypes.BOOLEAN, defaultValue: true },
    f_cre: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    f_mod: DataTypes.DATE
}, { tableName: 'Grados', timestamps: false });

module.exports = Grado;
