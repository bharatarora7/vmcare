var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Personal Details

var PersonalDetails = new Schema({
	details: { type: String, required: true },
	value: { type: String, required: true },	
	modified: { type: Date, default: Date.now }
});

module.exports = mongoose.model('PersonalDetails', PersonalDetails);