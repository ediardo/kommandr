'use strict';
module.exports = function(sequelize, DataTypes) {
  var Collection = sequelize.define('Collection', {
    name: DataTypes.STRING
  });

  Collection.associate = models => {
    Collection.hasMany(models.Kommandr);
    Collection.belongsTo(models.User);
  };

  return Collection;
};
