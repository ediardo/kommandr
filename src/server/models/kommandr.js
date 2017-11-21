var Hashids = require('hashids');

module.exports = function(sequelize, DataTypes) {
  var Kommandr = sequelize.define('Kommandr', {
    hashId: DataTypes.STRING,
    title: DataTypes.STRING,
    cli: DataTypes.STRING,
    description: DataTypes.STRING,
    forkFrom: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    source: DataTypes.STRING,
    totalViews: DataTypes.INTEGER,
    totalStars: DataTypes.INTEGER,
    totalComments: DataTypes.INTEGER,
    totalForks: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  });

  Kommandr.associate = models => {
    Kommandr.belongsTo(models.User, { foreignKey: 'userId' });
    Kommandr.hasMany(models.Comment, { foreignKey: 'kommandrId', onDelete: 'CASCADE' });
    Kommandr.hasMany(models.Star, { foreignKey: 'kommandrId' });
    Kommandr.hasMany(models.Kommandr, { foreignKey: 'forkFrom', as: 'Forks', onDelete: 'SET NULL' })
    Kommandr.belongsToMany(models.Collection, { foreignKey: 'kommandrId', through: 'KommandrCollection' });
  };

  Kommandr.beforeCreate((kommandr, options) => {
    return Kommandr.max('id').then(max => {
      var hashId = new Hashids('kommandr', 6);
      return kommandr.hashId = hashId.encode(max + 1);
    });
  });

  Kommandr.afterCreate((kommandr, options) => {
    const { id, userId } = kommandr;
    // Anon user is always 0, do not log activity
    if (userId !== 0) { 
      sequelize.models.Activity.create({
        userId,
        targetId: id,
        targetType: 'kommandr',
      });
    }
    if (options.isForked) {
      const { forkFrom } = kommandr;
      sequelize.models.Kommandr.update({ totalForks: sequelize.literal('totalForks + 1')}, { where: { id: forkFrom }, silent: true });
    }
  });
  
  Kommandr.beforeBulkDestroy(options => {
    options.individualHooks = true;
    return options;
  });

  Kommandr.afterDestroy((kommandr, options) => {
    const { id, userId, forkFrom } = kommandr;
    // Anon user is always 0, do not log activity
    if (userId !== 0) { 
      sequelize.models.Activity.destroy({
        where: {
          userId,
          targetId: id,
          targetType: 'kommandr',
        },      
      });
    }
    if (forkFrom) {
      sequelize.models.Kommandr.update({ totalForks: sequelize.literal('totalForks - 1') }, { where: { id: forkFrom }, silent: true });
    }
    
  });
  return Kommandr;
};
