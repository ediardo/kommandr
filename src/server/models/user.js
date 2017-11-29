import bcrypt from 'bcrypt';
import { reservedUsernames } from '../config/reservedUsernames';

const hashPassword = (password) => bcrypt.hashSync(password, 1);

/* TO BE DEPRECATED
const comparePassword = (password, hash) => bcrypt.compare(password, hash);
const usernameIsReserved = (username) => reservedUsernames.includes(username);
const usernameIsValid = (username) => username.match(/^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){3,38}$/i);
*/
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
      name: DataTypes.STRING,
      username: {
        type: DataTypes.STRING,
        validate: {
          min: 3,
          isLowercase: true,
          notIn: [reservedUsernames],
        }
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
        }
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          min: 6
        }
      },
      isPasswordSet: DataTypes.BOOLEAN,
      isUsernameSet: DataTypes.BOOLEAN,
      website: DataTypes.STRING,
      isLoginEnabled: DataTypes.BOOLEAN,
      githubId: DataTypes.STRING,
      googleId: DataTypes.STRING,
      facebookId: DataTypes.STRING,
      slackId: DataTypes.STRING,
      lastSignedIn: DataTypes.DATE,
      lastSignedInIp: DataTypes.STRING,
      forgotPasswordToken: DataTypes.STRING,
      forgotPasswordExpires: DataTypes.DATE,
      externalAvatarUrl: DataTypes.STRING,
      hasSeenWelcome: DataTypes.INTEGER,
      status: DataTypes.INTEGER,
      createdAt: {
        type: DataTypes.DATE
      },
      updatedAt: {
        type: DataTypes.DATE,
      } 
    }
  );

  User.hook('beforeBulkUpdate', (user) => {
    const { username, password } = user.attributes;
    if (username) {
      user.attributes.username = username.trim().toLowerCase()
    }
    if (password) {
      user.attributes.password  = hashPassword(password);
    }
    return user;
  });
  
  User.associate = models => {
    User.hasMany(models.Kommandr, { foreignKey: 'userId' });
    User.hasMany(models.Comment, {  foreignKey: 'userId' });
    User.hasMany(models.Collection, { foreignKey: 'userId' });
    User.hasMany(models.Star, { foreignKey: 'userId' });
    User.hasMany(models.Token, { foreignKey: 'userId' });
  };

  return User;
};
