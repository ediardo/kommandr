'use strict';
module.exports = function(sequelize, DataTypes) {
  var Group = sequelize.define('Group', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Group.hasMany(models.User);
      }
    }
  });
  return Group;
};
