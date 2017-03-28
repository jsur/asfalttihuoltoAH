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
    billed: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Job;
};