const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const RolPermiso = sequelize.define('RolPermiso', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    id_rol: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Roles',
            key: 'id'
        }
    },
    id_permiso: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Permisos',
            key: 'id'
        }
    }
}, {
    tableName: 'Rol_Permiso',
    timestamps: false
});

module.exports = RolPermiso;
