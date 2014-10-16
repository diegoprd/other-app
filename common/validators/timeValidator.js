var moment = require('moment');
var errorHandler = require('./errorHandler');

module.exports = {
  validate: function (time){
    
    var validatorResponse = errorHandler.createResponse();

    if(!_numberValid(time.distance)) {
      validatorResponse.valid = false;
      var error = errorHandler.createError(3, 'Not a valid Distance - Please provide amount of Kms');
      validatorResponse.errors.push(error);
    }

    if(!_numberValid(time.time)) {
      validatorResponse.valid = false;
      var error = errorHandler.createError(4, 'Not a valid Time - Please provide amount of minutes');
      validatorResponse.errors.push(error);
    }

    if(!_dateValid(time.date)) {
      validatorResponse.valid = false;
      var error = errorHandler.createError(5, 'Not a valid Date');
      validatorResponse.errors.push(error);
    }    

    return validatorResponse;

  } 
};

var _numberValid = function(number) {

  if (number.length == 0) return false
  var re = /^\d+$/;

  return re.test(number);
};

var _dateValid = function(date) {
  return moment(date).isValid(date);
};