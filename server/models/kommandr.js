'use strict';
module.exports = function(sequelize, DataTypes) {
  var Kommandr = sequelize.define('Kommandr', {
    title: DataTypes.STRING,
    cli: DataTypes.STRING,
    description: DataTypes.STRING
  });

  Kommandr.associate = models => {
    Kommandr.belongsTo(models.User, { foreignKey: 'userId' });
    Kommandr.hasMany(models.Comment, { foreignKey: 'kommandrId' });
    Kommandr.belongsTo(models.Collection, { foreignKey: 'collectionId' });
  };

  return Kommandr;
};
