const { bot } = require('../index.js');
const error = require('../utils/error.js');
const { usageHelp } = require('../utils/log.js');
const { defaultPrefix } = require('../data/botconfig.json');
const { resolve } = require('path');
// const { mentionHandler } = require('../utils/tools.js');

module.exports.help = {
	name: 'message',
};

function stringsBetweenBrackets(array) {
	const strCombiner = (acc, val) => acc + ' ' + val;
	// Shows distance from last comma
	let combinedStrCnt = 0;

	for(let z = 0; z < array.length - 1; z++) {
		if(array[z].endsWith(',')) {
			array[z] = array[z].slice(0,-1); // remove comma from end
			const arrayUpToComma = array.slice(combinedStrCnt, z + 1); // Get a sub-array of items to be combined

			// Splice reduced array starting at index of last added newString, deleting z+1 indexes
			array.splice(combinedStrCnt, arrayUpToComma.length, arrayUpToComma.reduce(strCombiner).trim());
			z = combinedStrCnt;
			combinedStrCnt++;
		}
	}
	if(combinedStrCnt <= (array.length - 2)) {
		const lastStr = array.slice(combinedStrCnt, array.length).reduce(strCombiner);
		array.splice(combinedStrCnt, array.length - combinedStrCnt, lastStr);
	}
	array[0] = array[0].slice(1);
	array[array.length - 1] = array[array.length - 1].slice(0,-1);
	return array;
}

bot.on('message', msg => {
	const prefix = bot.prefixes.get(msg.guild.id) || defaultPrefix;

	// Identify possible commands
	if(msg.author.bot) return;
	if(!msg.guild) return; // Ignore bot msgs & dm's/non-guild msg's
	if(msg.content === `<@${bot.user.id}>`) {
		return msg.channel.send(`\`\`\`Prefix for ${msg.guild.name}: ${prefix}\`\`\``);
	}
	if(!msg.content.toLowerCase().startsWith(prefix)) return; // Ignore any msg not lead by prefix
	if(!msg.guild.available) return error.noGuild(msg);

	// Process args & assign for use
	const msgArray = msg.content.split(/\s+/); // Combine into function
	const cmd = msgArray[0].toLowerCase().slice(prefix.length); // take everything after length of prefix as cmd
	const args = msgArray.slice(1);

	let match;
	const regex = /\[.*?\]/g;
	while((match = regex.exec(msg.content)) != null) {
		const matchArr = match[0].split(/\s+/);
		const len = matchArr.length;
		const startIdx = args.indexOf(matchArr[0]);
		stringsBetweenBrackets(matchArr);
		args.splice(startIdx, len, matchArr);
	}

	for(let x = 0; x < args.length; x++) {
		console.log(`Final Check: arg ${x}: ${args[x]} -- type: ${typeof args[x]}`);
	}

	// Get the file associated with the command & run it
	const commandFile = bot.commands.get(cmd) || bot.commands.find(c => c.help.aliases && c.help.aliases.includes(cmd));

	if(commandFile) {
		const cd = require(resolve(__dirname,'../core/cooldown.js'))(msg, commandFile.help, cmd);
		if(!cd) return false;

		if (args[0] === 'help') {
			if(commandFile.help) { return usageHelp(msg, commandFile.help, prefix); }
			else { return error.missingFile(msg, `Help file not found for \`${prefix}${cmd}\``); }
		}
		if (commandFile.help.args && !args.length) {
			return error.wrongArg(msg, 'You didn\'t specify any arguments', cmd);
		}
		commandFile.run(bot, msg, args);
	}
	else {
		return msg.channel.send(`Cannot find ${prefix}${cmd} command`)
			.then(m => m.delete(5000));
	}
});
