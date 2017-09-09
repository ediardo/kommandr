'use strict';
module.exports = function(sequelize, DataTypes) {
  var Comment = sequelize.define('Comment', {
    comment: DataTypes.STRING
  });

  Comment.associate = models => {
    Comment.belongsTo(models.User);
    Comment.belongsTo(models.Kommandr);
  }

  return Comment;
};
