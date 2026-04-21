const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Escuela = sequelize.define(
  "Escuela",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    nombre: { type: DataTypes.STRING(100), allowNull: false },
    clave: { type: DataTypes.STRING(10), unique: true },
    zona_escolar: DataTypes.STRING(5),
    nivel: DataTypes.STRING(10),
    num_tel: DataTypes.STRING(10),
    correo: DataTypes.STRING(50),
    domicilio: DataTypes.STRING(255),
    localidad: DataTypes.STRING(50),
    municipio: DataTypes.STRING(50),
    estado: DataTypes.STRING(50),
    codigo_postal: DataTypes.STRING(5),
    activo: { type: DataTypes.BOOLEAN, defaultValue: true },
    f_cre: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    f_mod: DataTypes.DATE,
  },
  { tableName: "Escuela", timestamps: false },
);

module.exports = Escuela;
