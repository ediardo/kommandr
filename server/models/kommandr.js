'use strict';
module.exports = function(sequelize, DataTypes) {
  var Kommandr = sequelize.define('Kommandr', {
    title: DataTypes.STRING,
    cli: DataTypes.STRING,
    description: DataTypes.STRING
  });

  Kommandr.associate = models => {
    Kommandr.belongsTo(models.User);
    Kommandr.hasMany(models.Comment);
    Kommandr.belongsTo(models.Collection);
  };

  return Kommandr;
};
