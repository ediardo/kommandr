'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Favs', [
      {
        id: 1,
        userId: 1,
        kommandrId: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        userId: 1,
        kommandrId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        userId: 1,
        kommandrId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        userId: 1,
        kommandrId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        userId: 2,
        kommandrId: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        userId: 3,
        kommandrId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        userId: 3,
        kommandrId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        userId: 2,
        kommandrId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9,
        userId: 2,
        kommandrId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.dropTable('Favs');
  }
};
