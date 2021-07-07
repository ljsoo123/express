const Sequelize = require("sequelize");

const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
module.exports = db;

db.User = require("./user")(sequelize, Sequelize);
db.Comment = require("./comment")(sequelize, Sequelize);

db.User.hasMany(db.Comment, { foreignKey: "commeneter", sourceKey: "id" });
db.Comment.belongsTo(db.User, { foreignKey: "commeneter", targetKey: "id" });
