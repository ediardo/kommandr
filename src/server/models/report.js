'use strict';
module.exports = (sequelize, DataTypes) => {
  var Report = sequelize.define('Report', {
    userId: DataTypes.INTEGER,
    kommandrId: DataTypes.INTEGER,
    reason: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  });
  
  Report.associate = models => {
    Report.belongsTo(models.User, { foreignKey: 'userId' });
    Report.belongsTo(models.Kommandr, { foreignKey: 'kommandrId' });
  };

  return Report;
};