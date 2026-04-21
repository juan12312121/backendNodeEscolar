const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Ciclo = sequelize.define('Ciclo', {
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    id_plan: DataTypes.UUID,
    id_esc: DataTypes.UUID,
    nombre: { type: DataTypes.STRING(20), allowNull: false },
    f_inicio: DataTypes.DATEONLY,
    f_fin: DataTypes.DATEONLY,
    activo: { type: DataTypes.BOOLEAN, defaultValue: false },
    f_cre: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    f_mod: DataTypes.DATE
}, { tableName: 'Ciclo', timestamps: false });

module.exports = Ciclo;
