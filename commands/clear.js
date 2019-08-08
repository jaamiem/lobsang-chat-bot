/*
	Command: Clear
	Purpose: Clear a user-specified amount of messages that are younger than 14 days
	Author: Jamie Muir
	TODO:
		* Bypass 14 day restriction
*/

module.exports.run = async (bot, msg, args) => {
	if(!msg.guild.me.permissions.has('MANAGE_MESSAGES')) return msg.channel.send('Bot don\'t go no perms fam');
	if(!msg.member.permissions.has('MANAGE_MESSAGES')) return msg.channel.send(`I can't let you do that ${msg.author}`);
	let num = parseInt(args);
	if(isNaN(num) || num <= 0) return msg.channel.send('Invalid number entered');
	num++;

	function clear(n) {
		msg.channel.bulkDelete(n, true);
	}

	const quotient = Math.floor(num / 100);
	const remainder = num % 100;

	for(let i = 0; i < quotient; i++) {
		clear(100);
	}
	if(remainder >= 1) clear(remainder);
	msg.channel.send('--Cleared messages--').then(m => m.delete(3000));
};

module.exports.help = {
	name: 'clear',
	aliases: [],
	desc: 'Clear a specified number of messages in a channel',
	usage: 'clear <quantity>',
	args: true,
	cooldown: 5,
};
