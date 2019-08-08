const mongoose = require('mongoose');
const { validate } = require('../../utils/dbtools.js');

const Schema = mongoose.Schema;

const guildSchema = new Schema({
	guildId: {
		type: String,
		required: true,
		validate: validate,
	},
	guildName: String,
	prefix: {
		type: String,
		default: 'o/',
	},
	incidentChannelId: {
		type: String,
		default: 'incidents',
		// validate: function(text){
		// 	return snowflakeRegex.test(text);
		// }
	},
	modRoles:{
		type: [String],
		required: false,
		default: [],
		// validate: function(text){
		// 	return snowflakeRegex.test(text);
		// }
	},
	userCount: Number,
	greetingImg: String,
});

guildSchema.methods.changePrefix = function(newPrefix) {
	return this.prefix = newPrefix;
};

module.exports = mongoose.model('Guild', guildSchema);
