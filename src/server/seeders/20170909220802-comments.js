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
      },
      {
        id: 3,
        userId: 1,
        kommandrId: 1,
        comment: 'This is not working for me, what version are you using?',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        userId: 3,
        kommandrId: 5,
        comment: 'works ok, thx!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        userId: 3,
        kommandrId: 3,
        comment: 'I wish I could run this on my machine but  I dont know how',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        userId: 1,
        kommandrId: 7,
        comment: 'good',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 7,
        userId: 1,
        kommandrId: 7,
        comment: 'Ok is working now thank you!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 8,
        userId: 1,
        kommandrId: 5,
        comment: 'I guess this could be dangerous',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.dropTable('Comments');
  }
};
