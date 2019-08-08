const { token, dbAddress } = require('./data/botconfig.json');
const Discord = require('discord.js');
const mongoose = require('mongoose');
const guildModel = require('./data/models/guilds.js');

// Collections
const bot = new Discord.Client({ disableEveryone: true });
module.exports.bot = bot;
bot.commands = new Discord.Collection();
bot.events = new Discord.Collection();
bot.prefixes = new Discord.Collection();

// Database URL
mongoose.connect(dbAddress, { useNewUrlParser: true });
const db = mongoose.connection;

// Log connection error
db.on('error', console.error.bind(console, 'db connection error:'));
db.once('open', () => {
	console.log('Database connected...');
	guildModel.find({}, 'guildId prefix', (err, data) => {
		if(err) console.error(err);

		data.forEach((v, idx) => {
			if(data[idx].guildId) bot.prefixes.set(data[idx].guildId, data[idx].prefix);
			else console.log('Prefix DB: invalid guild: ', data);
		});
	});
});

require('./core/ioFunctions.js')(bot, 'events', 'commands');

bot.login(token);

// module.exports = {
// 	bot: bot,
// };
