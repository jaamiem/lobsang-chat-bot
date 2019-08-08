// const { mentionHandler, getUserDays, checkBans, stringToArray, checkRole } = require('../utils/tools.js');
const { isMod } = require('../utils/dbtools.js');

const counter = (function() {
	let count = 0;
	return function() {
		return ++count;
	};
})();

module.exports.run = async (bot, msg) => {
	// let user = mentionHandler(args[0], msg.guild);
	// if(!user) return msg.reply("Use a proper mention u numpty");
	// // return msg.channel.send(`${user.username}'s avatar: ${user.displayAvatarURL}`);
	// const u = new User('bob', 'bob@email', 15);
	// u.agePlus();

	const isM = await isMod(msg);
	console.log('c:', isM);

	return msg.channel.send('Count: ' + counter());
	// console.log(user);


	// return msg.channel.send(log.punish(msg, 'ban', msg.member, 'cus', true));

	// let memc = '91700106373386240';
	// console.log(checkRole(msg, 'mod Cre'))

};

module.exports.help = {
	name: 'cmdtest',
	aliases: ['c'],
	desc: 'test cmd',
	usage: 'cmd <mandatoryArg> [OptionalArg]',
	args: false,
	cooldown: false,
};

class User {
	constructor(name, emails, age) {
		this.username = name;
		this.email = emails;
		this.age = age;
	}

	agePlus() {
		this.age++;
	}
}
