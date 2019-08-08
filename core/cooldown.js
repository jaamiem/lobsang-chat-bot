const Discord = require('discord.js');

const cooldowns = new Discord.Collection();
const userCds = new Discord.Collection();

module.exports = function(msg, cf, cmd) {

	if(!cf) return console.log('ERROR: FILE NOT FOUND');

	if(cf && !cooldowns.has(cf.name)) {
		cooldowns.set(cf.name, new Discord.Collection());
	}
	const now = Date.now();
	const timestamps = cooldowns.get(cf.name);
	const cdAmount = (cf.cooldown || 2) * 1000;

	if(timestamps.has(msg.author.id)) {
		const expireTime = timestamps.get(msg.author.id) + cdAmount;
		if(now < expireTime) {
			const timeLeft = (expireTime - now) / 1000;

			if(userCds.has(msg.author.id)) {
				msg.delete();
				return false;
			}
			const str = `\`\`\`${msg.author.username}, Please wait ${timeLeft.toFixed(0)} more second(s) before reusing the '${cmd}' command.\`\`\``;

			msg.channel.send(str)
				.then(m => m.delete(3000))
				.catch(e => console.log(e));

			userCds.set(msg.author.id);
			setTimeout(() => userCds.delete(msg.author.id), 5000);

			msg.delete();
			return false;
		}
	}
	timestamps.set(msg.author.id, now);
	setTimeout(() => timestamps.delete(msg.author.id), cdAmount);
	return true;
};
