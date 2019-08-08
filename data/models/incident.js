const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const incidentSchema = new Schema({
	guildId: String,
	userId: String,
	createdById: String,
	type: String,
	reason: String,
	locationCalled: String,
	completed: Boolean,
	time: Date,
});

module.exports = mongoose.model('Incidents', incidentSchema);
