'use strict';
module.exports = function(sequelize, DataTypes) {
  var Comment = sequelize.define('Comment', {
    title: DataTypes.STRING,
    cli: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Comment.belongsTo(models.Kommandr);
        Comment.belongsTo(models.User);
      }
    }
  });
  return Comment;
};
