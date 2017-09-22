'use strict';
module.exports = function(sequelize, DataTypes) {
  var Fav = sequelize.define('Fav', {
    userId: DataTypes.INTEGER,
    kommandrId: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  });

  Fav.associate = models => {
    Fav.belongsTo(models.User, { foreignKey: 'userId' });
  };
  return Fav;
};
