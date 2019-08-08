// const Discord = require('discord.js');
const error = require('../utils/error.js');
const { mentionHandler, checkRole } = require('../utils/tools.js');

/*
	Command: Roles
	Purpose: Alter user(s) role(s), can be passed arrays of either
	Author: Jamie Muir
	TODO:
		*Operation functions
		*Structure
		*Logging
*/

const operations = {
	add: function(user, role) {

	},
	remove: function(user, role) {

	},
	toggle: function(user, role) {

	},
	check: function(user, role) {
		// If no role provided, return all roles of user
	},
};// ['add', 'remove', 'toggle', 'check'];

module.exports.run = async (bot, msg, args) => {
	if(!msg.guild.me.permissions.has('MANAGE_ROLES')) return error.noPerms(msg, 'MANAGE_ROLES', true);
	if(!msg.member.permissions.has('MANAGE_ROLES')) return error.noPerms(msg, 'MANAGE_ROLES');
	let users, roles = [];

	let op = args[0].toLowerCase();
	if(!operations.includes(op)) return error.wrongArg(msg, 'Invalid operation specified', 'roles')

	// Find guild member object(s) for user(s) given
	if(typeof args[1] === 'object' && args[1].length > 1) {
		for(i=0; i < args[1].length; i++){
			console.log('Adding user....')
			let user = mentionHandler(args[1][i], msg.guild)
			console.log(`User: ${user}`)
			users.push(user);
		}
		users.forEach(el => {
			if(el === false) return error.wrongArg(msg, `One or more of the users given could not be found`, 'roles');
			msg.channel.send(el.nickname);
		});
	}
	else{
		users = mentionHandler(args[1], msg.guild);
		if(!users) return error.wrongArg(msg, 'User not found', 'roles');
	}

	// Establish roles
	let r;
	if(typeof args[2] === 'object' && args[2].length > 1){
		for(j=0; j < args[2].length; j++){
			r = checkRole(msg, args[2][j]);
			console.log(`r1: ${r}`);
			if(!r) return error.wrongArg(msg, `The role ${args[2][j]} could not be found`, 'roles');
			roles.push(r);
		}
	}
	else{
		r = checkRole(msg, args.slice(2).join(' '));
		console.log(`r2: ${r}`);
		if(!r) return error.wrongArg(msg, `The role ${args[2]} could not be found`, 'roles');
		roles.push(r);
	}

	console.log(`Users: ${users}\nRoles: ${roles}`)
	if(op === operations[0]) {

	}
	else if(op === operations[1]) {

	}
	else if(op === operations[2]) {

	}
	else if(op === operations[3]) {

	}
}

module.exports.help = {
	name: 'roles',
	cooldown: 5,
	desc: 'desc',
	usage: 'usage',
	args: true
}
