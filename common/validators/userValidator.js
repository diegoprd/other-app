var errorHandler = require('./errorHandler');

module.exports = {
  validate: function (user){

    var validatorResponse = errorHandler.createResponse();

    if(!_emailValid(user.username)) {
      validatorResponse.valid = false;
      var error = errorHandler.createError(1, 'Not a valid Email');
      validatorResponse.errors.push(error);
    }

    if(!_textValid(user.fullname)){
      validatorResponse.valid = false;
      var error = errorHandler.createError(2, 'Not a valid Full name, please use only letters or/and spaces');
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

var _textValid = function(text) {
  if (text.length == 0) return false

  var re = /^[ñA-Za-z _]*[ñA-Za-z][ñA-Za-z _]*$/

  return re.test(text);
};