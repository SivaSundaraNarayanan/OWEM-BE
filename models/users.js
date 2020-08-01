"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Users.hasMany(models.Registrations, { foreignKey: "user" });

      Users.hasMany(models.Users, {
        foreignKey: "referredBy",
        as: "references",
      });

      Users.belongsTo(models.Users, {
        foreignKey: "referredBy",
        as: "referrer",
      });
    }
  }
  Users.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
      },
      age: {
        type: DataTypes.FLOAT,
      },
      mail: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING,
      },
      type: {
        type: DataTypes.ENUM,
        values: ["COLLEGE", "SCHOOL"],
      },
      institution: {
        type: DataTypes.STRING,
      },
      department: {
        type: DataTypes.STRING,
      },
      year: {
        type: DataTypes.STRING,
      },
      amount: {
        type: DataTypes.FLOAT,
      },
      referralID: {
        type: DataTypes.STRING,
      },
      paid: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  return Users;
};
