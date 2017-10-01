'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        id: 0,
        name: 'Anonymous',
        username: 'anon',
        isPasswordSet: 0,
        enableLogin: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 1,
        name: 'Eddie Ramirez',
        username: 'ediardo',
        isPasswordSet: 0,
        email: 'djedir@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], { skip: ['password', 'username']});
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.dropTable('Users');
  }
};
