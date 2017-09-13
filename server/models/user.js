'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    github: DataTypes.STRING,
    lastSignedIn: DataTypes.DATE
  });

  User.associate = models => {
    User.hasMany(models.Kommandr, { foreignKey: 'userId' });
    User.hasMany(models.Comment, {  foreignKey: 'userId' });
    User.hasMany(models.Collection, { foreignKey: 'userId' });
    User.belongsTo(models.Group, { foreignKey: 'groupId'});
  }

  return User;
};
