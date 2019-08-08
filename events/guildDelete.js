const { bot } = require('../index.js');
const { updateActivity } = require('../utils/tools.js');

module.exports.help = {
	name: 'guildDelete',
};

bot.on('guildDelete', guild => {
	console.log(`Guild removed: ${guild.name}`);
	updateActivity();
});
