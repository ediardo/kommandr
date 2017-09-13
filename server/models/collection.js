'use strict';
module.exports = function(sequelize, DataTypes) {
  var Collection = sequelize.define('Collection', {
    name: DataTypes.STRING
  });

  Collection.associate = models => {
    Collection.hasMany(models.Kommandr, { foreignKey: 'collectionId' });
    Collection.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return Collection;
};
