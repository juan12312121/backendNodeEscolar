const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Nombramiento = sequelize.define('Nombramiento', {
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    nombre: { type: DataTypes.STRING(100), allowNull: false },
    activo: { type: DataTypes.BOOLEAN, defaultValue: true },
    f_cre: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    f_mod: DataTypes.DATE
}, { tableName: 'Nombramiento', timestamps: false });

module.exports = Nombramiento;
