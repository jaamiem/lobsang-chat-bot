/*
	Command: ping
	Purpose: pong
	Author: Jamie Muir
	TODO:
		* Beep boop?
*/

module.exports.run = async (bot, msg) => {
	const m = await msg.channel.send('pong!');
	m.edit(`Pong! Latency is ${m.createdTimestamp - msg.createdTimestamp}ms. API Latency is ${Math.round(bot.ping)}ms`);
};

module.exports.help = {
	name: 'ping',
	aliases: ['pong'],
	desc: 'Ping test',
	usage: 'ping',
	args: false,
	cooldown: 2,
};
