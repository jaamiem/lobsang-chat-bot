const { defaultPrefix } = require('../data/botconfig.json');
// const { bot } = require('../index.js');

module.exports = bot => {
	bot.updateActivity = () => {
		bot.user.setActivity((`${defaultPrefix} on ${bot.guilds.size} Server(s)`), { type: 'Listening' });
	};
};
