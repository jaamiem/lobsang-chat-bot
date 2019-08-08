const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const snowflakeRegex = /^\d+$/;

const userSchema = new Schema({
	userId: {
		type: String,
		required: true,
		validate: function(text) {
			return snowflakeRegex.test(text);
		},
	},
	guilds: {
		type: [String],
		required: false,
		default: [],
	},
});

module.exports = mongoose.model('Users', userSchema);
