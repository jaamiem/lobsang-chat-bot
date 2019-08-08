const { mentionHandler, checkBans, checkChannel } = require('../utils/tools.js');
const { incidentsChannel } = require('../data/botconfig.json');
const log = require('../utils/log.js');
const error = require('../utils/error.js');
const incidentSchema = require('../data/models/incident.js');

/*
	Command: Ban
	Purpose: Ban a user if possible and post a report to the moderator channel
	Author: Jamie Muir
	TODO:
		*
*/

module.exports.run = async (bot, msg, args) => {
	if(!msg.guild.me.permissions.has('BAN_MEMBERS')) return error.noPerms(msg, 'BAN_MEMBERS', true);
	if(!msg.member.permissions.has('BAN_MEMBERS')) return error.noPerms(msg, 'BAN_MEMBERS');

	const banUser = mentionHandler(args.shift(22), msg.guild);
	if(!banUser) return error.wrongArg(msg, 'User not found', 'ban');

	const reason = args.join(' ') || 'No reason given';

	const banChannel = checkChannel(msg, incidentsChannel);

	banUser.ban(reason).catch(() => {
		error.outranked(msg);
	});
	const completed = checkBans(msg, banUser.id) || 'unknown';

	const incidentModel = new incidentSchema({
		guildId: msg.guild.id,
		userId: banUser.id,
		createdById: msg.author.id,
		type: 'ban',
		reason: reason,
		locationCalled: msg.channel,
		completed: completed,
		time: Date.now(),
	});

	incidentModel.save()
		.catch(err => console.log(err));

	banChannel.send(log.punish(bot, msg, incidentModel));
};

module.exports.help = {
	name: 'ban',
	aliases: ['b', 'banhammer'],
	desc: 'Ban a user from the server',
	usage: 'ban <@User> [reason]',
	cooldown: 2,
	args: true,
};
