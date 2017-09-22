'use strict';
module.exports = function(sequelize, DataTypes) {
  var Kommandr = sequelize.define('Kommandr', {
    hashId: DataTypes.STRING,
    title: DataTypes.STRING,
    cli: DataTypes.STRING,
    description: DataTypes.STRING,
    forkFrom: DataTypes.INTEGER,
    totalViews: DataTypes.INTEGER,
    totalFavs: DataTypes.INTEGER,
    totalComments: DataTypes.INTEGER,
    totalForks: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  });

  Kommandr.associate = models => {
    Kommandr.belongsTo(models.User, { foreignKey: 'userId' });
    Kommandr.hasMany(models.Comment, { foreignKey: 'kommandrId' });
    Kommandr.belongsTo(models.Collection, { foreignKey: 'collectionId' });
  };

  return Kommandr;
};
