module.exports.run = async (bot, msg, args) => {
	let sides;
	if(args.length) {
		sides = parseInt(args);
		if(isNaN(sides)) return false;
	}
	else { sides = 6; }

	const random = Math.floor(Math.random() * (sides - 1) + 1);

	msg.channel.send(`Rolling a ${sides} sided dice!\n\n:game_die: You rolled ${random} :game_die:`);
};

module.exports.help = {
	name: 'dice',
	aliases: ['d', 'die', 'roll', 'rolldice', 'rd'],
	desc: 'Roll a 6 sided die, specify a number to roll a die of that size',
	usage: 'dice [number of sides]',
	args: false,
	cooldown: 2,
};
