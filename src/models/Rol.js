const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Rol = sequelize.define('Rol', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    nombre: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true
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
    tableName: 'Roles',
    timestamps: false
});

module.exports = Rol;
