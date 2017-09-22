'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    github: DataTypes.STRING,
    lastSignedIn: DataTypes.DATE,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  });

  User.associate = models => {
    User.hasMany(models.Kommandr, { foreignKey: 'userId' });
    User.hasMany(models.Comment, {  foreignKey: 'userId' });
    User.hasMany(models.Collection, { foreignKey: 'userId' });
    User.hasMany(models.Fav, { foreignKey: 'userId' });
  }

  return User;
};
