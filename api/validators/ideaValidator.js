var moment = require('moment');
var errorHandler = require('./errorHandler');

module.exports = {
  validate: function (idea){
    var validatorResponse = errorHandler.createResponse();

    return validatorResponse;
  } 
};