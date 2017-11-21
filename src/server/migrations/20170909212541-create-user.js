'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      isPasswordSet: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      isUsernameSet: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      email: {
        type: Sequelize.STRING
      },
      website: {
        type: Sequelize.STRING
      },
      bio: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING,
      },
      isLoginEnabled: {
        type: Sequelize.BOOLEAN
      },
      lastSignedIn: {
        type: Sequelize.DATE
      },
      lastSignedInIp: {
        type: Sequelize.STRING
      },
      githubId: {
        type: Sequelize.STRING
      },
      googleId: {
        type: Sequelize.STRING
      },
      slackId: {
        type: Sequelize.STRING
      },
      facebookId: {
        type: Sequelize.STRING
      },
      forgotPasswordToken: {
        type: Sequelize.STRING
      },
      forgotPasswordExpires: {
        type: Sequelize.STRING
      },
      externalAvatarUrl: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
      hasSeenWelcome: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Users');
  }
};
