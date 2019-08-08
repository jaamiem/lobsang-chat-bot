const { RichEmbed } = require('discord.js');
const { capitalise, pluralise } = require('../utils/tools.js');
const { defaultColour } = require('../data/botconfig.json');

// This pollutes global - soltion: ?
const punishObj = {
	report: {
		colour: '#ffcd05',
		tense: 'Reported',
	},
	kick: {
		colour: '#f49242',
		tense: 'Kicked',
		arg: true,
	},
	ban: {
		colour: '#c13000',
		tense: 'Banned',
		arg: true,
	},
};

module.exports = {
	/* 	@params : msg, and an incidentObj to be destructured
		@return : RichEmbed filled with punish data to be sent to a channel */
	punish: function(bot, msg, incidentObj) {
		const { type, userId, createdById, reason, locationCalled, completed } = incidentObj;
		const punish = punishObj[type];
		const img = msg.guild.iconURL;

		const embed = new RichEmbed()
			.setThumbnail(img)
			.setTitle(`*${capitalise(type)} Log*`)
			.setColor(punish.colour || defaultColour)
			.addField(`${punish.tense} User`,
				`<@${userId}> with ID \`\`${userId}\`\``)
			.addField(`${punish.tense} By`,
				`<@${createdById}> with ID \`\`${createdById}\`\``)
			.addField('Reason: ', reason)
			.addField('Where: ', locationCalled, true)
			.setFooter(`${bot.user.tag} bot`)
			.setTimestamp();

		if(punish.arg) embed.addField('User Removed: ', completed, true);

		return embed;
	},
	usageHelp: function(msg, help, prefix) {
		const img = msg.guild.me.user.avatarURL;

		const embed = new RichEmbed()
			.setThumbnail(img)
			.setTitle(`Help: ${capitalise(help.name)}`)
			.setColor(msg.guild.me.displayColor || defaultColour)
			.setDescription(help.desc)
			.addField('Usage:', ` \`\`\`${prefix}${help.usage}\`\`\` `, true)
			.addField(`${pluralise(help.aliases.length, 'Alias', 'es')}`,
				(help.aliases.join(' | ') || 'none'))
			// .addField('Limited to members with the following permissions:',
			// 	`• ${help.restrictions.join('\n• ')}`)
			.addField('\u200B', `Requires Arguments: ${help.args}`, true)
			.addField('\u200B', `Cooldown: ${help.cooldown}`, true);

		if(help.adminOnly) embed.setFooter('Admin Only Command');

		return msg.channel.send(embed);
	},
	// sendError: function(msg, error, ...parameter) {
	//
	// }
};
