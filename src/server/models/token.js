import bcrypt from 'bcrypt';
const tokenHash = (token) => bcrypt.hashSync(token, 1);
module.exports = (sequelize, DataTypes) => {
  var Token = sequelize.define('Token', {
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    tokenHash: DataTypes.STRING,
    tokenHint: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    lastUsedAt: DataTypes.DATE,
  });

  Token.associate = models => {
    Token.belongsTo(models.User, { foreignKey: 'userId' });
  }

  Token.beforeCreate((token, options) => {
    return token.tokenHash = tokenHash(token.tokenHash);
  });
  return Token;
};