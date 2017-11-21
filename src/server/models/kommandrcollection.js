'use strict';
module.exports = (sequelize, DataTypes) => {
  var KommandrCollection = sequelize.define('KommandrCollection', {
    userId: DataTypes.INTEGER,
    kommandrId: DataTypes.INTEGER,
    addedManually: DataTypes.BOOLEAN,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  });
  
  KommandrCollection.associate = models => {
    KommandrCollection.belongsTo(models.User, { foreignKey: 'userId' });
    KommandrCollection.belongsTo(models.Kommandr, { foreignKey: 'kommandrId' });
  };

  return KommandrCollection;
};