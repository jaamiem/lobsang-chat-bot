const { mentionHandler } = require('../utils/tools.js');

/*
	Command: Addrole
	Purpose: Add a role to a user
	Author: Jamie Muir
	TODO:
		* Merge into super role command
		* Check bot has permissions
*/

module.exports.run = async (bot, msg, args) => {
	if(!msg.member.permissions.has('MANAGE_ROLES')) return msg.channel.send('I don\'t think you have that power...');
	const user = mentionHandler (args.shift(22), msg.guild);
	if(!user) return msg.channel.send('User not found..');
	const role = args.join(' ');
	const gRole = msg.guild.roles.find(r => r.name === role);
	if(!gRole) return msg.channel.send('Role not found, it must be case sensitive');
	console.log(gRole);

	if(user.roles.has(gRole.id)) return msg.channel.send(`Erm... ${user} already has that role`);
	await (user.addRole(gRole.id));

	return msg.channel.send(`${user} now has the role of ${role}!`);
};

module.exports.help = {
	name: 'addrole',
	aliases: [ 'ar', '+role' ],
	desc: 'Give a user a role',
	usage: 'addrole <@User> <role>',
	args: false,
	cooldown: 2,
};
