'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Jobs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      clientname: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      orderdate: {
        type: Sequelize.DATE
      },
      sitesize: {
        type: Sequelize.INTEGER
      },
      stonework: {
        type: Sequelize.BOOLEAN
      },
      stoneworkdescription: {
        type: Sequelize.STRING
      },
      streetcategory: {
        type: Sequelize.STRING
      },
      completiongoal: {
        type: Sequelize.STRING
      },
      completiondate: {
        type: Sequelize.DATE
      },
      started: {
        type: Sequelize.BOOLEAN
      },
      startdate: {
        type: Sequelize.DATE
      },
      completed: {
        type: Sequelize.BOOLEAN
      },
      actual_completion_date: {
        type: Sequelize.DATE
      },
      billed: {
        type: Sequelize.BOOLEAN
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
    return queryInterface.dropTable('Jobs');
  }
};