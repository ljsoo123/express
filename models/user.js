const Sequelize = require("sequelize");

module.exports = (sequelize, Datatype) => {
  return sequelize.define(
    "user",
    {
      email: {
        type: Sequelize.STRING(40),
        allowNull: true,
        unique: true,
      },
      nick: {
        type: Sequelize.STRING(15),
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      prvider: {
        type: Sequelize.STRING(10),
        allowNull: false,
        defaultValue: "local",
      },
      snsId: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );
};
