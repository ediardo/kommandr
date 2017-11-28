'use strict';
module.exports = (sequelize, DataTypes) => {
  var Token = sequelize.define('Token', {
    tokenHash: DataTypes.STRING,
    tokenHint: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    lastUsedAt: DataTypes.DATE,
  });
  Token.associate = models => {
    Token.belongsTo(models.User, { foreignKey: 'userId' });
  }
  
  return Token;
};