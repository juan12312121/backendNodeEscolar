const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const PlanEstudio = sequelize.define(
  "PlanEstudio",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    nombre: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },

    desc: DataTypes.TEXT,
    activo: { type: DataTypes.BOOLEAN, defaultValue: true },
    f_cre: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    f_mod: DataTypes.DATE,
  },
  { tableName: "Plan_estudios", timestamps: false },
);

module.exports = PlanEstudio;
