require('dotenv').config();
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const log = require('../config/logger');

const config = require(`../config/app/${process.env.NODE_ENV}`);
const basename = path.basename(__filename);
const db = {};

/**
 * Creates a new Sequelize connection
 */
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

/**
 * Get all model schema files and create Sequelize Model Instances
 */
fs.readdirSync(__dirname)
  .filter(
    file =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  )
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

/**
 * Attach associations to the models by reading the association methods
 */
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

/**
 * Sync the database with the current schema.
 * Never set the `force` attribute to true in production. Will flush all the data
 */
sequelize.sync({ force: false }).then(() => {
  log.info('database model refresh done!');
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
