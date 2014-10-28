module.exports = {
  createResponse: function (){
    return {valid: true, errors: []};
  },
  createError: function(errorCode, errorMessage){
  return {code: errorCode, message: errorMessage};
  }
};
