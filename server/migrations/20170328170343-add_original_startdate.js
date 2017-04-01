'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'Jobs',
      'original_startdate',
      Sequelize.DATE
    );
  }
};
//20170328
