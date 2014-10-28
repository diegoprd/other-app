var mongoose = require('mongoose');

var ideaSchema = new mongoose.Schema({
	creationDate: {type: Date, default:Date.now, required: true},
  status: {type: String, required: true},
	title: {type: String, required: true},
	fullDescription: {type: String, required: true},
  mvpDescription: {type: String, required: true},
	innovatorId: mongoose.Schema.Types.ObjectId,
  engineerId: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('Idea', ideaSchema);