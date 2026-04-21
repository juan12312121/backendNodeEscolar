const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Grupo = sequelize.define('Grupo', {

    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },

    id_esc: {
        type: DataTypes.UUID,
        allowNull: false
    },

    id_grado: {
        type: DataTypes.UUID,
        allowNull: false
    },

    id_turno: {
        type: DataTypes.UUID,
        allowNull: false
    },

    nombre: {
        type: DataTypes.STRING(5),
        allowNull: false
    },

    activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },

    f_cre: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },

    f_mod: {
        type: DataTypes.DATE,
        allowNull: true
    }

}, {
    tableName: 'Grupos',
    timestamps: false,
    createdAt: false,
    updatedAt: false
});

module.exports = Grupo;