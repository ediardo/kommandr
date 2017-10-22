'use strict';
module.exports = function(sequelize, DataTypes) {
  var Fav = sequelize.define('Fav', {
    userId: DataTypes.INTEGER,
    kommandrId: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  });
  
  Fav.associate = models => {
    Fav.belongsTo(models.User, { foreignKey: 'userId' });
    Fav.belongsTo(models.Kommandr, { foreignKey: 'kommandrId' });
  };

  Fav.afterCreate((fav, options) => {
    const { id, kommandrId, userId } = fav;
    // Anon user is always 0, do not log activity
    if (userId !== 0) { 
      sequelize.models.Activity.create({
        userId,
        targetId: id,
        targetType: 'fav',
      });
    }
    sequelize.models.Kommandr.increment('totalFavs', { where: { id: kommandrId }, silent: true })
  });

  Fav.beforeBulkDestroy(options => {
    options.individualHooks = true;
    return options;
  });

  Fav.afterDestroy((fav, options) => {
    const { id, kommandrId, userId } = fav;
    // Anon user is always 0, do not log activity
    if (userId !== 0) { 
      sequelize.models.Activity.destroy({
        where: {
          userId,
          targetId: id,
          targetType: 'fav',
        },      
      });
    }
    sequelize.models.Kommandr.increment({ totalFavs: -1 }, { where: { id: kommandrId }, silent: true });
  });

  return Fav;
};
