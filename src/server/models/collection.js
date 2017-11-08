'use strict';
module.exports = function(sequelize, DataTypes) {
  var Collection = sequelize.define('Collection', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    totalKommandrs: DataTypes.INTEGER,
    matchPattern: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  });

  Collection.associate = models => {
    Collection.hasMany(models.Kommandr, { foreignKey: 'collectionId' });
    Collection.belongsTo(models.User, { foreignKey: 'userId' });
  };

  Collection.afterCreate((collection, options) => {
    const { id, userId } = collection;
    // Anon user is always 0, do not log activity
    if (userId !== 0) { 
      sequelize.models.Activity.create({
        userId,
        targetId: id,
        targetType: 'collection',
      });
    }
  });
  
  return Collection;
};
