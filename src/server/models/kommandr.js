var Hashids = require('hashids');

module.exports = function(sequelize, DataTypes) {
  var Kommandr = sequelize.define('Kommandr', {
    hashId: DataTypes.STRING,
    title: DataTypes.STRING,
    cli: DataTypes.STRING,
    description: DataTypes.STRING,
    forkFrom: DataTypes.INTEGER,
    totalViews: DataTypes.INTEGER,
    totalFavs: DataTypes.INTEGER,
    totalComments: DataTypes.INTEGER,
    totalForks: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  });

  Kommandr.beforeCreate((kommandr, options) => {
    var hashId = new Hashids('kommandr', 6);   
    return kommandr.hashId = hashId.encode(options.nextId);
  });

  Kommandr.associate = models => {
    Kommandr.belongsTo(models.User, { foreignKey: 'userId' });
    Kommandr.hasMany(models.Comment, { foreignKey: 'kommandrId', onDelete: 'cascade' });
    Kommandr.hasMany(models.Fav, { foreignKey: 'kommandrId', onDelete: 'cascade' });
    Kommandr.belongsTo(models.Collection, { foreignKey: 'collectionId' });
  };

  return Kommandr;
};
