const { type } = require('node:os');
const {DataTypes} = require('sequelize');
const {sequelize} = require('../config/database');

const Persona = sequelize.define('Persona', {
    
    id:{
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },

    nombre :{
        type: DataTypes.STRING,
        allowNull: false
    },

    app_m:{
        type: DataTypes.STRING,
        allowNull: false
    },

    f_cre:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },

    
}, {
  tableName: 'Persona',
  timestamps: false,
  createdAt: false,
  updatedAt: false
});

module.exports = Persona;