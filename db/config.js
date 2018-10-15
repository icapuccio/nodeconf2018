require("dotenv");

/** Sample Object configuration
 * {
        "dialect":"postgres",
        "ssl": true,
        "dialectOptions": {
            "ssl": true
    }
}
 */

const sequelizeConfig = {
  dialect: "postgres",
  ssl: false,
  url: process.env.DB_URL,
  dialectOptions: {
    ssl: false,
    logging: console.log
  }
};

module.exports = sequelizeConfig;
