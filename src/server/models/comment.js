'use strict';
module.exports = function(sequelize, DataTypes) {
  var Comment = sequelize.define('Comment', {
    userId: DataTypes.INTEGER,
    comment: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  });

  Comment.associate = models => {
    Comment.belongsTo(models.User, { foreignKey: 'userId' });
    Comment.belongsTo(models.Kommandr, { foreignKey: 'kommandrId' });
  }

  Comment.afterCreate((comment, options) => {
    const { id, userId, kommandrId } = comment;
    // Anon user is always 0, do not log activity
    if (userId !== 0) { 
      sequelize.models.Activity.create({
        userId,
        targetId: id,
        targetType: 'comment',
      });
    }
    sequelize.models.Kommandr.update({ totalComments: sequelize.literal('totalComments + 1')}, { where: { id: kommandrId }, silent: true });
  });

  Comment.beforeBulkDestroy(options => {
    options.individualHooks = true;
    return options;
  });

  Comment.afterDestroy((fav, options) => {
    const { id, kommandrId, userId } = fav;
    // Anon user is always 0, do not log activity
    if (userId !== 0) { 
      sequelize.models.Activity.destroy({
        where: {
          userId,
          targetId: id,
          targetType: 'comment',
        },      
      });
    }
    sequelize.models.Kommandr.update({ totalComments: sequelize.literal('totalComments - 1')}, { where: { id: kommandrId }, silent: true });
  });


  return Comment;
};
