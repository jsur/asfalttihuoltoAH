'use strict';
module.exports = function(sequelize, DataTypes) {
  var Job = sequelize.define('Job', {
    clientname: DataTypes.STRING,
    address: DataTypes.STRING,
    orderdate: DataTypes.DATE,
    sitesize: DataTypes.INTEGER,
    stonework: DataTypes.BOOLEAN,
    stoneworkdescription: DataTypes.STRING,
    streetcategory: DataTypes.STRING,
    completiongoal: DataTypes.STRING,
    completiondate: DataTypes.DATE,
    started: DataTypes.BOOLEAN,
    startdate: DataTypes.DATE,
    completed: DataTypes.BOOLEAN,
    actual_completion_date: DataTypes.DATE,
    billed: DataTypes.BOOLEAN,
    original_startdate: DataTypes.DATE, //Added 28.3.2017
    fileurl: DataTypes.STRING // Added 19.11.2017
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Job;
};
