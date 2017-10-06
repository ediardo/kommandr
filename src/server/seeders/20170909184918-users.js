'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        id: 0,
        name: 'Anonymous',
        username: 'anon',
        isPasswordSet: 0,
        isLoginEnabled: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        status: 1
      },
      {
        id: 1,
        name: 'test',
        username: 'test',
        isPasswordSet: 0,
        isLoginEnabled: 0,
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], { skip: ['password', 'username', 'email']});
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.dropTable('Users');
  }
};
