const guildModel = require('../data/models/guilds.js');
const error = require('../utils/error.js');

/*
	Command: Prefix
	Purpose: Change the prefix for current server
	Author: Jamie Muir
	TODO:
		*Check is mod
		*log change, and who called it
*/

module.exports.run = async (bot, msg, args) => {
	if(!msg.member.permissions.has('ADMINISTRATOR')) return error.restrictedCmd(msg, 'Admin');
	const newPrefix = args[0];

	if(newPrefix === bot.prefixes.get(msg.guild.id)) return; // if new equals old, leave
	if(!newPrefix.match(/^[^`'"]{1,4}$/)) return error.wrongArg(msg, 'Invalid Prefix', 'prefix'); // no quotes, up to 4 chars

	guildModel.findOne({ guildId: msg.guild.id }, (err, data) => {
		err && console.log(err); // log error

		data.prefix = newPrefix; // change data
		data.save(err => err && console.log(err)); // save data to db
		bot.prefixes.set(msg.guild.id, newPrefix); // update prefix collection
	});

	msg.channel.send(`\`\`\`Server prefix successfully changed to: ${newPrefix}\`\`\``);
};

module.exports.help = {
	name: 'prefix',
	aliases: [ 'p' ],
	desc: 'Replace the active prefix for the server. Limit of 4 characters. ' +
		'\nNo whitespace characters or quotation marks (\',",`)',
	usage: 'prefix <new prefix>',
	args: true,
	cooldown: 10,
	adminOnly: true,
};
