const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Turno = sequelize.define('Turno', {
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    id_esc: DataTypes.UUID,
    nombre: { type: DataTypes.STRING(25), allowNull: false },
    desc: DataTypes.TEXT,
    h_inicio: DataTypes.TIME,
    h_fin: DataTypes.TIME,
    activo: { type: DataTypes.BOOLEAN, defaultValue: true },
    f_cre: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    f_mod: DataTypes.DATE
}, { tableName: 'Turnos', timestamps: false });

module.exports = Turno;
