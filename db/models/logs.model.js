const Logs = function(sequelize, DataTypes) {
  return sequelize.define("logs", {
    container_id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    author: DataTypes.STRING
  });
};

module.exports = Logs;
