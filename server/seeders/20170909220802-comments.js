'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Comments', [
      {
        id: 1,
        userId: 2,
        kommandrId: 1,
        comment: 'Thank you',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        userId: 1,
        kommandrId: 3,
        comment: 'i don\'t understand',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.dropTable('Comments');
  }
};
