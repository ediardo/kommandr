'use strict';
module.exports = function(sequelize, DataTypes) {
  var Comment = sequelize.define('Comment', {
    comment: DataTypes.STRING
  });

  Comment.associate = models => {
    Comment.belongsTo(models.User, { foreignKey: 'userId' });
    Comment.belongsTo(models.Kommandr, { foreignKey: 'kommandrId' });
  }

  return Comment;
};
