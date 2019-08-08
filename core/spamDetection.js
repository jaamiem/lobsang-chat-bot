const Discord = require('discord.js');

module.exports = {
	/* Ideas:
			*Can issue temp mute
			*Deletes messages after too many duplicates
			*Checks for duplicates
	*/
	spamCheck: async function(msg){
		let regex = /(.)\1{5,}/;
		if(!regex.test(msg)) return false;

	}
}
