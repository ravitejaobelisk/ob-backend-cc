require('dotenv').config();
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const log = require('../config/logger');

const config = require(`../config/app/${process.env.NODE_ENV}`);

const basename = path.basename(__filename);

const db = {};

const sequelize = new Sequelize(
  config.database.database,
  config.database.username,
  config.database.password,
  {
    dialect: config.database.dialect,
    host: config.database.host,
    port: config.database.port
  }
);

fs.readdirSync(__dirname)
  .filter(
    file =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  )
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

sequelize.sync({ force: false }).then(() => {
  log.info('database model refresh done!');
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
