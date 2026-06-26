const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Offer = sequelize.define(
  "Offer",
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

    lender_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    loan_amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    interest_rate: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    tenure_months: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    min_cibil_score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM("locked", "active", "disbursed"),
      defaultValue: "locked",
    },

    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "offers",
    timestamps: false,
  }
);

module.exports = Offer;