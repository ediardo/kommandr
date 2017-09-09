'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Kommandrs', [
      {
        id: 1,
        userId: 1,
        title: 'Reset last commit',
        description: 'This command resets the last commit in your local repo',
        cli: 'git reset HEAD~',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        userId: 1,
        title: 'Start apache service',
        description: 'Run this command to start the apache http server',
        cli: 'serviche apache2 start',
        createdAt: new Date(),
        updatedAt: new Date(),

      },
      {
        id: 3,
        title: 'Start mysqld',
        userId: 2,
        description: 'Run this command to start the mysql server',
        cli: 'mysqld --datadir=/path/to/datadir',
        createdAt: new Date(),
        updatedAt: new Date(),

      },
    ]);
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.dropTable('Kommandrs');
  }
};
