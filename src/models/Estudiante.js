const {DataTypes} = require('sequelize');
const {sequelize} = require('../config/database');

const Estudiante = sequelize.define('Estudiante', {

    id:{
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },

    id_persona:{
        type: DataTypes.UUID,
        allowNull: false
    },

    id_grupo:{
        type: DataTypes.UUID,
        allowNull: false
    },

    matricula:{
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },

    f_ingreso:{
        type: DataTypes.DATEONLY,
        allowNull: false
    },

    activo:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },

    f_cre: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },

    f_mod:{
        type: DataTypes.DATE,
        allowNull: true
    }

},{
    tableName: 'estudiante',
    timestamps: false,
    createdAt: false,
    updatedAt: false
});

module.exports = Estudiante;