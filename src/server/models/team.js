'use strict';
module.exports = function(sequelize, DataTypes) {
  var Team = sequelize.define('Team', {
    name: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  });

  Team.associate = models => {
    Team.belongsTo(models.User, { foreignKey: 'userId' });
    Team.hasMany(models.TeamMember, { foreignKey: 'teamId', onDelete: 'cascade' });
  }

  Team.afterCreate((team, options) => {
    const { id, userId } = team;
    // Anon user is always 0, do not log activity
    if (userId !== 0) { 
      sequelize.models.Activity.create({
        userId,
        targetId: id,
        targetType: 'team',
      });
    }
  });
  return Team;
};
