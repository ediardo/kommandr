'use strict';
module.exports = function(sequelize, DataTypes) {
  var Activity = sequelize.define('Activity', {
    userId: DataTypes.INTEGER,
    targetId: DataTypes.INTEGER,
    targetType: DataTypes.STRING,
    isPublic: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  });

  Activity.associate = models => {
    Activity.belongsTo(models.User, { foreignKey: 'userId' });
  };
  return Activity;
};
