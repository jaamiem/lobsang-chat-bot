const { incidentsChannel } = require('../data/botconfig.json');
const { mentionHandler, checkChannel } = require('../utils/tools.js');
const log = require('../utils/log.js');
const error = require('../utils/error.js');
const incidentSchema = require('../data/models/incident.js');

/*
	Command: Report
	Purpose: Send a message to the moderator channel containing information about an offence
	Author: Jamie Muir
	TODO:
		* Comment code
*/

module.exports.run = async (bot, msg, args) => {
	if(!msg.member.permissions.has('MANAGE_MESSAGES')) return error.noPerms(msg, 'MANAGE_MESSAGES');
	const user = mentionHandler(args.shift(22), msg.guild);

	if(!user) return error.wrongArg(msg, 'User not found', 'report');
	const reason = args.join(' ') || 'No reason given';

	const reportChannel = checkChannel(msg, incidentsChannel);

	const incidentModel = new incidentSchema({
		guildId: msg.guild.id,
		userId: user.id,
		createdById: msg.author.id,
		type: 'report',
		reason: reason,
		locationCalled: msg.channel,
		time: Date.now(),
	});

	incidentModel.save()
		.catch(err => console.log(err));

	reportChannel.send(log.punish(bot, msg, incidentModel)); // msg, punishment, user, reason, arg
	msg.channel.send('-Report Logged-').then(m => m.delete(5000));
};

module.exports.help = {
	name: 'report',
	aliases: [ 'rep', '9x' ],
	desc: 'Report a users behaviour',
	usage: 'report <@User> <reason>',
	args: true,
	cooldown: 2,
};
