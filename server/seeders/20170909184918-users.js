'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        id: 1,
        username: 'demo',
        email: 'demo@demo.com',
        password: 'demo123',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        username: 'ediardo',
        email: 'djedir@gmail.com',
        password: 'demo123',
        createdAt: new Date(),
        updatedAt: new Date(),
        github: 'ediardo'
      }
    ]);
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.dropTable('Users');
  }
};
