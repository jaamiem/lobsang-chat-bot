// const Discord = require('discord.js');
const error = require('../utils/error.js');
const { checkRole } = require('../utils/tools.js');

/*
	Command: addStaff
	Purpose: Add a role to the staff role database
	Author: Jamie Muir
	TODO:
		*
*/

function addRoles(msg, roles) {
	let newRole, badRoles, i;

	const elements = [].concat(roles || []);
	for(i = 0; i < elements.length; i++) {
		newRole = checkRole(msg, elements[i]);
		if(newRole === undefined) {
			badRoles.push(elements[i]);
			elements.splice(i, 1);
		}
	}
	error.wrongArg(msg, `Unacceptable roles:\n • ${badRoles.join('\n • ')}`, 'ModRole');
}

module.exports.run = async (bot, msg, args) => {
	if(!msg.member.permissions.has('ADMINISTRATOR')) return error.restrictedCmd(msg, 'Admin');

	const opArr = ['add', 'a', 'remove', 'rmv'];
	const guildRoles = msg.guild.roles.map(r => r.name);
	let newRole;

	if(!opArr.includes(args[0])) return error.wrongArg(msg, 'Operation', 'ModRole');

	if(checkRole(msg, args[1]) !== undefined) {

		return;
	}
	// if(!Array.isArray(args[1])) {
	// 	newRole = checkRole(msg, args[1]);
	// 	if(typeof newRole === undefined) {
	// 		return error.wrongArg(msg, `Role '${args[1]}' not found`, 'ModRole');
	// 	}
	// }
	// else {
	// 	newRole = args[1].map(x => checkRole(msg, x));
	// 	newRole.forEach(r => {
	// 		if(typeof r === undefined) {
	// 			// r == undefined at this point, makes no sense.
	// 			return error.wrongArg(msg, `Role '${r}' not found`, 'ModRole');
	// 		}
	// 	});
	// }

};

module.exports.help = {
	name: 'modrole',
	aliases: [ 'oprole', 'mr' ],
	desc: 'Add a role to the mod role database. Enables mod only commands for that role.'
		+ '\nEnter multiple roles between brackets [] as second argument to bulk add/remove',
	usage: 'modrole <(add/a) or (remove/rmv)> <role(s)>',
	args: true,
	cooldown: 10,
	adminOnly: true,
};
