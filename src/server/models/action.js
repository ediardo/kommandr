'use strict';
module.exports = (sequelize, DataTypes) => {
  var Action = sequelize.define('Action', {
    userId: DataTypes.INTEGER,
    targetId: DataTypes.INTEGER,
    targetType: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAT: DataTypes.DATE,
  });

  Action.associate = models => {
    Action.belongsTo(models.User, { foreignKey: 'userId' });
  };
  return Action;
};