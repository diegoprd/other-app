var moment = require('moment');
var errorHandler = require('./errorHandler');

module.exports = {
  validate: function (criteria){
    var validatorResponse = errorHandler.createResponse();

    return validatorResponse;
  } 
};