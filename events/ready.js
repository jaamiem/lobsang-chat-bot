const { bot } = require('../index.js');
const { updateActivity } = require('../utils/tools');

module.exports.help = {
	name: 'ready',
};

bot.on('ready', () => {
	console.log(`${bot.user.tag} is online!`);
	console.log(`Present on ${bot.guilds.size} server(s)`);
	updateActivity(bot);
});

// bot.on('ready', () => {
// 	updateActivity(bot);
// });
