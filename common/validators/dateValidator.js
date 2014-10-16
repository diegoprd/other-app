var moment = require('moment');
var errorHandler = require('./errorHandler');

module.exports = {
  validate: function (date){
    
    var validatorResponse = errorHandler.createResponse();

    if(!_dateValid(date)) {
      validatorResponse.valid = false;
      var error = errorHandler.createError(5, 'Not a valid Date!');
      validatorResponse.errors.push(error);
    }    

    return validatorResponse;

  } 
};

var _dateValid = function(date) {
  return moment(date).isValid(date);
};