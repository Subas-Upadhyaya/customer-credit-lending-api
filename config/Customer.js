const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Customer = sequelize.define(
  "Customer",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    mobile: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: true,
    },

    pan: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },

    cibil_score: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    score_fetched_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "customers",
    timestamps: false,
  }
);

module.exports = Customer;