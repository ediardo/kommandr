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
    User.hasMany(models.Kommandr);
    User.hasMany(models.Comment);
    User.belongsTo(models.Group);
  }

  return User;
};
