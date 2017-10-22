'use strict';
module.exports = (sequelize, DataTypes) => {
  var TeamMember = sequelize.define('TeamMember', {
    userId: DataTypes.INTEGER,
    teamId: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  });
  
  TeamMember.associate = models => {
    TeamMember.belongsTo(models.User, { foreignKey: 'userId' });
    TeamMember.belongsTo(models.Team, { foreignKey: 'teamId' });
  }
  
  return TeamMember;
};