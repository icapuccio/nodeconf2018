"use strict";

const Sequelize = require("sequelize");
const config = require("./config");
const db = {};

const sequelize = new Sequelize(config.url, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Logs = db.sequelize.import("./models/logs.model");

db.connect = connectWithRetry(sequelize, 1000).then(() => {
  return sequelize.sync().then(() => {
    console.log("DB Synced - Connected");
    return sequelize.authenticate();
  });
});

async function connectWithRetry(sequelizeInstance, retryDelay) {
  try {
    await sequelizeInstance.authenticate();
    console.log("Connected"); // eslint-disable-line no-console
    return;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(
      `Could not connect, retrying in ${retryDelay} milliseconds...`,
      error.toString()
    );
    await new Promise(resolve => setTimeout(resolve, retryDelay));
    await connectWithRetry(sequelizeInstance, retryDelay * 2);
  }
}

module.exports = db;
