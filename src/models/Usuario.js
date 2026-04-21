const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Usuario = sequelize.define('Usuario', {

    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },

    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    correo: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false
    },

    contra: {
        type: DataTypes.STRING(255),
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
    },

    id_rol: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            model: 'Roles',
            key: 'id'
        }
    }

}, {
    tableName: 'Usuarios',
    timestamps: false
});

module.exports = Usuario;