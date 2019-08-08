const Discord = require('discord.js');
const { defaultPrefix } = require('../data/botconfig.json');
// const { bot } = require('../index.js');

module.exports = {
	noPerms: function(msg, perm, botChk) {
		const author = (botChk) ? msg.guild.me : msg.author.username;
		const embed = new Discord.RichEmbed()
			.setAuthor(msg.author.username)
			.setTitle('Insufficient Permissions')
			.setColor(msg.guild.me.displayColor)
			.setDescription(`${author} lacks ${perm} permission`)
			.setFooter('This is a self-destructing message');

		msg.channel.send(embed).then(m => m.delete(10000));
	},
	outranked: function(msg) {
		const embed = new Discord.RichEmbed()
			.setTitle('Rank Error')
			.setColor(msg.guild.me.displayColor)
			.setDescription('This bot cannot perform that operation against a higher or similarly ranked member')
			.setFooter('This is a self-destructing message');

		msg.channel.send(embed).then(m => m.delete(10000));
	},
	wrongArg: function(msg, arg, cmd) {
		// const prefix = bot.prefixes.get(msg.guild.id);

		const embed = new Discord.RichEmbed()
			.setAuthor(msg.author.username)
			.setTitle('Incorrect Argument Usage')
			.setColor(msg.guild.me.displayColor)
			.setDescription(`Error: ${arg}`)
			.addField('\u200B', `For help enter: \`${defaultPrefix}${cmd} help\``)
			.setFooter('This is a self-destructing message');

		msg.channel.send(embed).then(m => m.delete(10000));
	},
	missingFile: function(msg, file) {
		const embed = new Discord.RichEmbed()
			.setTitle('Missing File Data')
			.setColor(msg.guild.me.displayColor)
			.setDescription(`Error: ${file}`)
			.addField('\u200B', 'Report this as a bug')
			.setFooter('This is a self-destructing message');

		msg.channel.send(embed).then(m => m.delete(10000));
	},
	noChannel: function(msg, chn) {
		const embed = new Discord.RichEmbed()
			.setAuthor(msg.guild.username)
			.setTitle('Channel Not Found')
			.setColor(msg.guild.me.displayColor)
			.setDescription(`Channel: ${chn}`)
			.addField('\u200B', `Maybe I wasn't able to setup correctly,
				use: \`${defaultPrefix}setup\` to correct or create the channel manually`)
			.setFooter('This is a self-destructing message');

		msg.channel.send(embed).then(m => m.delete(10000));
	},
	restrictedCmd: function(msg, role) {
		const embed = new Discord.RichEmbed()
			.setTitle(`${role} Only Command`)
			.setColor(msg.guild.me.displayColor)
			.setDescription(`This command is only available to those with ${role} permissions`)
			.setFooter('This is a self-destructing message');

		msg.channel.send(embed).then(m => m.delete(10000));
	},
	noGuild: function(msg) {
		const embed = new Discord.RichEmbed()
			.setTitle('Guild Unavailable')
			.setColor(msg.guild.me.displayColor)
			.setDescription(`This indicates an outage with Discord servers.
			\nHow you got this error message, I dunno tbh. Somebody done fucked up.`)
			.setFooter('This is a self-destructing message');

		msg.channel.send(embed).then(m => m.delete(10000));
	},
};
