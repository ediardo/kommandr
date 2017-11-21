'use strict';
module.exports = function(sequelize, DataTypes) {
  var Star = sequelize.define('Star', {
    userId: DataTypes.INTEGER,
    kommandrId: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  });
  
  Star.associate = models => {
    Star.belongsTo(models.User, { foreignKey: 'userId' });
    Star.belongsTo(models.Kommandr, { foreignKey: 'kommandrId' });
  };

  Star.afterCreate((star, options) => {
    const { id, kommandrId, userId } = star;
    // Anon user is always 0, do not log activity
    if (userId !== 0) { 
      sequelize.models.Activity.create({
        userId,
        targetId: id,
        targetType: 'fav',
      });
    }
    sequelize.models.Kommandr.update({ totalStars: sequelize.literal('totalStars + 1')}, { where: { id: kommandrId }, silent: true });    
  });

  Star.beforeBulkDestroy(options => {
    options.individualHooks = true;
    return options;
  });

  Star.afterDestroy((star, options) => {
    const { id, kommandrId, userId } = star;
    // Anon user is always 0, do not log activity
    if (userId !== 0) { 
      sequelize.models.Activity.destroy({
        where: {
          userId,
          targetId: id,
          targetType: 'star',
        },      
      });
    }
    sequelize.models.Kommandr.update({ totalStars: sequelize.literal('totalStars - 1')}, { where: { id: kommandrId }, silent: true });    
  });

  return Star;
};
