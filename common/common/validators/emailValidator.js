var errorHandler = require('./errorHandler');

module.exports = {
  validate: function(email) {

    var validatorResponse = errorHandler.createResponse();

    if(!_emailValid(email)) {
      validatorResponse.valid = false;
      var error = errorHandler.createError(1, 'Not a valid Email');
      validatorResponse.errors.push(error);
    }

    return validatorResponse;

  }
};

var _emailValid = function(email) {
    if (email.length == 0) return false;
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
    return re.test(email);
};
