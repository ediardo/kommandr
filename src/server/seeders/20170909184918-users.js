'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        id: 1,
        name: 'Demo User',
        username: 'demo',
        email: 'demo@demo.com',
        password: 'demo123',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: 'Eddie Ramirez',
        username: 'ediardo',
        email: 'djedir@gmail.com',
        password: 'demo123',
        createdAt: new Date(),
        updatedAt: new Date(),
        github: 'ediardo'
      },
      {
        id: 3,
        name: 'Important User',
        username: 'fulanito',
        email: 'fulanito@gmail.com',
        password: 'fulanito',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        name: 'Ianeta Hutchinson',
        username: 'fulanita',
        email: 'fulanita@gmail.com',
        password: 'fulanita',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.dropTable('Users');
  }
};
