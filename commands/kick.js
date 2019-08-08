const { mentionHandler, checkChannel } = require('../utils/tools.js');
const { incidentsChannel } = require('../data/botconfig.json');
const log = require('../utils/log.js');
const error = require('../utils/error.js');
const incidentSchema = require('../data/models/incident.js');

/*
	Command: Kick
	Purpose: Kick a user if possible and post a report to the moderator channel
	Author: Jamie Muir
	TODO:
		*
*/

module.exports.run = async (bot, msg, args) => {
	if(!msg.guild.me.permissions.has('KICK_MEMBERS')) return error.noPerms(msg, 'KICK_MEMBERS', true);
	if(!msg.member.permissions.has('KICK_MEMBERS')) return error.noPerms(msg, 'KICK_MEMBERS');

	const kickUser = mentionHandler(args.shift(22), msg.guild);
	if(!kickUser) return error.wrongArg(msg, 'User not found', 'kick');

	const reason = args.join(' ') || 'No reason given';

	const kickChannel = checkChannel(msg, incidentsChannel);

	kickUser.kick(reason).catch(() => error.outranked(msg));

	const completed = (kickUser.deleted) ? true : false;
	const incidentModel = new incidentSchema({
		guildId: msg.guild.id,
		userId: kickUser.id,
		createdById: msg.author.id,
		type: 'kick',
		reason: reason,
		locationCalled: msg.channel,
		completed: completed,
		time: Date.now(),
	});

	incidentModel.save()
		.catch(err => console.log(err));

	kickChannel.send(log.punish(bot, msg, incidentModel)); // msg, punishment, user, reason, arg
};

module.exports.help = {
	name: 'kick',
	aliases: ['k', 'remove', 'boot'],
	desc: 'Removes a user from the server.',
	usage: 'kick <@User> [reason]',
	// restrictions: ['KICK_MEMBERS'],
	cooldown: 2,
	args: true,
};
