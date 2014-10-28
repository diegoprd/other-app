var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  type: {type: String, required: true},
  status: {type: String, required: true},
	fullname: {type: String, required: true},
  preferedEmailAddress: {type: String, required: false},
  phoneNumber: {type: String, required: false}

});

module.exports = mongoose.model('User', userSchema);