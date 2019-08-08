const mongoose = require('mongoose');
const { mentionHandler } = require('./tools.js');

function isSnowflake(text) {
	return /^\d+$/.exec(text);
}

module.exports = {
	// Purpose: check user roles for Mod roles saved in DB
	isMod: function(msg) {
		const user = mentionHandler(msg.author.id, msg.guild); // get guild member
		const userRoles = user.roles.map(r => r.id); // get ID's of all users roles

		const modPromise = new Promise((resolve, reject) => {
			// get staff roles of current guild.
			mongoose.model('Guild').find({ guildId: msg.guild.id }, 'modRoles', (err, data) => {
				if(err) reject(err);
				else resolve(data[0].modRoles);
			});
		});

		const isMod = modPromise.then(res => {
			return res.some(r => userRoles.indexOf(r) >= 0);
		}).catch(err => console.log(err));

		return isMod;
	},
	addStaff: function(msg, role, staffLevel) {
		const guildRoles = msg.guild.roles.map(r => r.name);

		if(!guildRoles.includes(role)) return false;

	},
	/* Function to find possible mods based on permissions */
	findAdmin: function() {

	},
	validate: isSnowflake,
};
