'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Kommandrs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      hashId: {
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING
      },
      cli: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      forkFrom: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      collectionId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Collections',
          key: 'id'
        }
      },
      totalViews: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      totalForks: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      totalFavs: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      totalComments: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Kommandrs');
  }
};
