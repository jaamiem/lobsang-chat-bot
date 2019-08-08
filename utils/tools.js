const error = require('../utils/error.js');
const { defaultPrefix } = require('../data/botconfig.json');
// const { bot } = require('../index.js');

/*
	Purpose: Provided functions across code base
	Author: Jamie Muir
	TODO:
		*Refactor or Merge date/age functions
		*CheckBans needs completed
		*checkChannel needs finished after collectors are built
*/

function pluralise(count, noun, suffix = 's') {
	return `${noun}${count !== 1 ? suffix : ''}`;
}

function capitalise(str) {
	if(typeof str !== 'string') return '';
	return str.charAt(0).toUpperCase() + str.slice(1);
}

module.exports = {
	updateActivity: function(bot) {
		if(bot) {
			const size = bot.guilds.size;
			bot.user.setActivity((`${defaultPrefix} on ${size} ${pluralise(size, 'Server')}`), { type: 'Listening' });
		}
		else { console.error('Activity Error'); }
	},
	mentionHandler: function(mention, medium) {
		if(!mention || !medium) return false;

		if(mention.startsWith('<@') && mention.endsWith('>')) {
			mention = mention.slice(2, -1);

			if(mention.startsWith('!')) {
				mention = mention.slice(1);
			}
		}
		if(medium.users) return medium.users.get(mention);
		if(medium.members) return medium.members.get(mention);
		return false;
	},
	// Merge 3(three) date/age functions or refractor appropriately
	formatDate: function(date) {
		let dayOfMonth = date.getDate();
		const month = (dt) => {
			const mlist = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
			return mlist[dt.getMonth()];
		};
		const year = date.getFullYear();
		const hour = date.getHours();
		let minutes = date.getMinutes();

		// const diffMs = new Date() - date;
		// const diffSec = Math.round(diffMs / 1000);
		// const diffMin = diffSec / 60;
		// const diffHour = diffMin / 60;

		minutes = minutes < 10 ? '0' + minutes : minutes;
		dayOfMonth = dayOfMonth < 10 ? '0' + dayOfMonth : dayOfMonth;

		// if ( diffSec < 5 ) return 'right now';
		// else if ( diffMin < 2 ) return `${diffSec} sec. ago`;
		// else if ( diffHour < 2 ) return `${diffMin} min. ago`;
		return `${dayOfMonth} ${month(date)} ${year} | ${hour}:${minutes}`;
	},
	getAge: function(startTime) {
		const today = new Date();
		const age = [];
		let years = 0;
		let days = Math.floor((today - startTime) / (1000 * 60 * 60 * 24));
		while(days >= 364) {
			years++;
			days -= 364;
		}
		age[0] = years;
		age[1] = days;
		return age;
	},
	ageToString: function(age) {

		if(age[0] <= 0 && age[1] <= 0) return 'today';
		switch(true) {
		case (age[0] === 0):
			return `${age[1]} days ago`;
		case (age[0] === 1):
			return `${age[0]} year ${age[1]} days ago`;
		case (age[0] >= 2):
			return `${age[0]} years ${age[1]} days ago`;
		default:
			return false;
		}
	},
	capitalise: capitalise,
	pluralise: pluralise,
	checkChannel: function(msg, chn) {
		const channel = msg.guild.channels.find(c => c.name === chn);
		// TODO: Check if user has MANAGE_CHANNELS perms, then offer to create new channel
		if(!channel) {
			if(msg.member.permissions.has('MANAGE_CHANNELS')) {
				// TODO
			}
			return error.noChannel(msg, chn);
		}
		return channel;
	},
	checkRole: function(msg, role) {
		// Returns either a) role object, or b) undefined
		return msg.guild.roles.find(r => r.name.toLowerCase() == role.toLowerCase());
	},
	checkBans: function(msg) {
		const guild = msg.guild;
		return `${guild.id}: probably not`;
	},
	// checkPerms: function(msg, ...perms) {
	// 	const output = {};
	// 	perms.forEach(perm => {
	// 		if(msg.guild.me.permissions.has(perm)) output[perm].bot = true;
	// 		// return error.noPerms(msg, 'KICK_MEMBERS', true);
	// 		if(msg.member.permissions.has(perm)) output[perm].user = true;
	// 		// return error.noPerms(msg, 'KICK_MEMBERS');
	// 	});
	// 	return output;
	// },
};
