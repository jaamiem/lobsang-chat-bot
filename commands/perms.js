/*
	Command: Perms
	Purpose: allows a user to check if they have a permission
	Author: Jamie Muir
	TODO:
		*
*/

module.exports.run = async (bot, msg, args) => {
	const perms = args.join(' ').toUpperCase();
	if(msg.member.permissions.has(perms)) return msg.channel.send(`You have ${perms} permission.`);
	else return msg.channel.send(`:x: :x: You do not have ${perms} permission. :x: :x:`);
};

module.exports.help = {
	name: 'perms',
	aliases: ['permissions', 'perm'],
	desc: 'Call with a permission to check if it is enabled for you.',
	usage: 'perms <permission>',
	args: true,
	cooldown: 0,
};
