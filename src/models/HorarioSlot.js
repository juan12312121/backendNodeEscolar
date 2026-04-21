const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const HorarioSlot = sequelize.define('HorarioSlot', {
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    id_empleado: { type: DataTypes.UUID },
    id_grupo: { type: DataTypes.UUID },
    id_materia: { type: DataTypes.UUID },
    dia_semana: { type: DataTypes.STRING(10) },
    h_inicio: { type: DataTypes.TIME },
    h_fin: { type: DataTypes.TIME },
    activo: { type: DataTypes.BOOLEAN, defaultValue: true },
    f_cre: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    f_mod: DataTypes.DATE
}, { tableName: 'Horario_Slot', timestamps: false });

module.exports = HorarioSlot;
