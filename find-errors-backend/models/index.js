const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.max,
    min: dbConfig.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("../models/user.model.js")(sequelize, Sequelize);
db.AuthToken = require("../models/authToken.model.js")(sequelize, Sequelize);
db.Message = require("../models/message.model.js")(sequelize, Sequelize);

db.User.hasMany(db.Message);
db.Message.belongsTo(db.User);
//db.User.belongsToMany(db.Message, { through: "UserMessageRel" });

module.exports = db;
