var mongoose = require('mongoose');

var timeSchema = new mongoose.Schema({
	date: {type: Date, default:Date.now, required: true},
	distance: {type: Number, required: true},
	time: {type: Number, required: true},
	userId: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('Time', timeSchema);