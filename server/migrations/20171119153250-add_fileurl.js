'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'Jobs',
      'fileurl',
      Sequelize.STRING
    );
  }
};

// 19112017
