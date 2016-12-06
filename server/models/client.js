'use strict';
module.exports = function(sequelize, DataTypes) {
  var Client = sequelize.define('Client', {
    clientname: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Client.hasMany(models.Job);
      }
    }
  });
  return Client;
};