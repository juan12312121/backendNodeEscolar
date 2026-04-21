const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const LogActividad = sequelize.define('LogActividad', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    usuario_id: {
        type: DataTypes.UUID,
        allowNull: true
    },
    accion: {
        type: DataTypes.STRING(20), // CREATE, UPDATE, DELETE, LOGIN
        allowNull: false
    },
    entidad: {
        type: DataTypes.STRING(50), // Escuelas, Empleados, etc.
        allowNull: false
    },
    entidad_id: {
        type: DataTypes.UUID,
        allowNull: true
    },
    detalles: {
        type: DataTypes.JSON,
        allowNull: true
    },
    ip: {
        type: DataTypes.STRING(45),
        allowNull: true
    }
}, {
    tableName: 'Logs_Actividad',
    timestamps: true,
    updatedAt: false // Solo nos interesa cuándo se creó el log
});

module.exports = LogActividad;
