const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Empleado = sequelize.define('Empleado', {
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    id_persona: { type: DataTypes.UUID, allowNull: false },
    id_esc: { type: DataTypes.UUID, allowNull: false },
    num_control: { type: DataTypes.STRING(20) },
    rfc: { type: DataTypes.STRING(13), unique: true },
    curp: { type: DataTypes.STRING(18), unique: true },
    lugar_nac: DataTypes.STRING(150),
    estado_civil: DataTypes.STRING(20),
    f_ingreso: DataTypes.DATEONLY,
    activo: { type: DataTypes.BOOLEAN, defaultValue: true },
    f_cre: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    f_mod: DataTypes.DATE
}, { tableName: 'Empleado', timestamps: false });

module.exports = Empleado;
