const { bot } = require('../index.js');
const { updateActivity } = require('../utils/tools.js');
const guildSchema = require('../data/models/guilds.js');
// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/discord/Guilds', { useNewUrlParser: true});

module.exports.help = {
	name: 'guildCreate',
};

bot.on('guildCreate', guild => {
	console.log(`New guild joined: ${guild.name} with ${guild.memberCount} members`);
	updateActivity();

	const guildModel = new guildSchema({
		guildId: guild.id,
		guildName: guild.name,
		userCount: guild.memberCount,
	});

	guildModel
		.save()
		.catch(err => console.log(err));
});
