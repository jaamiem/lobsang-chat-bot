const { mentionHandler } = require('../utils/tools.js');

/*
	Command: removerole
	Purpose: remove a role from a user
	Author: Jamie Muir
	TODO:
		* Check bot has permissions
*/

module.exports.run = async (bot, msg, args) => {
	if(!msg.member.permissions.has('MANAGE_ROLES')) return msg.channel.send('I don\'t think you have that power...');
	const user = mentionHandler(args.shift(22), msg.guild);
	if(!user) return msg.channel.send('User not found..');
	const role = args.join(' ');
	const gRole = msg.guild.roles.find(r => r.name === role);
	if(!gRole) return msg.channel.send('Role not found, it must be case sensitive');

	if(!user.roles.has(gRole.id)) return msg.channel.send(`Erm... ${user} doesn't have that role...`);
	await (user.removeRole(gRole.id));

	return msg.channel.send(`${user} lost the role of ${role}!`);
};

module.exports.help = {
	name: 'removerole',
	aliases: [ 'rr', '-role' ],
	desc: 'Remove a role from a user',
	usage: 'removerole <@User> <Role(s)>',
	args: true,
	cooldown: 2,
};
