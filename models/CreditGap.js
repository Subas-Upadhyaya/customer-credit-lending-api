const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const CreditGap = sequelize.define(
  "CreditGap",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    factor: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    current_value: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    ideal_value: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    impact: {
      type: DataTypes.ENUM("high", "medium", "low"),
      allowNull: false,
    },

    estimated_score_gain: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    action_description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM("open", "resolved"),
      defaultValue: "open",
    },

    resolved_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "credit_gaps",
    timestamps: false,
  }
);

module.exports = CreditGap;