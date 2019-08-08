const Discord = require('discord.js');
const { mentionHandler, getAge, ageToString, formatDate } = require('../utils/tools.js');
const error = require('../utils/error.js');
const { defaultColour } = require('../data/botconfig.json');

/*
	Command: Info
	Purpose: Provides information about the current guild or a specific user on that guild
	Author: Jamie Muir
	TODO:
		*Usage
*/

module.exports.run = async (bot, msg, args) => {
	const output = new Discord.RichEmbed().setColor(msg.guild.me.displayColor || defaultColour);

	if(args.length) {
		const guser = mentionHandler(args[0], msg.guild); // Get Guild Member
		if(!guser) return error.wrongArg(msg, 'User not found', 'info');
		const user = guser.user; // Get Discord User
		const userNick = (!guser.nickname) ? 'None' : guser.nickname;
		const highestRole = (guser.hoistRole) ? guser.hoistRole : guser.highestRole;

		const img = user.avatarURL;
		output.setThumbnail(img)
			.setColor(guser.displayColor)
			.setTitle(`${user.tag}`)
			.setDescription(`\`\`${user.id}\`\``)
			.addField('Server nickname', userNick, true)
			.addField('Highest Role', highestRole, true)
			.setFooter(`Joined server ${ageToString(getAge(guser.joinedAt))} on ${formatDate(guser.joinedAt)}`);

		if(user.voiceChannel) output.addField('Location on server', user.voiceChannel, true);
	}
	else {
		const guild = msg.guild;
		const img = guild.iconURL;
		output.setThumbnail(img)
			.setTitle('Guild Name')
			.setDescription(guild.name)
			.addField('# of members', guild.memberCount, true)
			.addField('# of Channels', guild.channels.size, true)
			.setFooter(`Created ${ageToString(getAge(guild.createdAt))} | ${formatDate(guild.createdAt)}`);
	}
	return msg.channel.send(output);
};

module.exports.help = {
	name: 'info',
	aliases: ['i', 'profile'],
	desc: 'Displays profile for current guild, or a user if given a name',
	usage: 'info [@User]',
	cooldown: 2,
	args: false,
};
