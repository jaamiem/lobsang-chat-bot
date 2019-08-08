const { bot } = require('../index.js');
const { updateActivity } = require('../utils/tools.js');

module.exports.help = {
	name: 'error',
};

const counter = (function() {
	let count = 0;
	return function() {
		return ++count;
	};
})();

bot.on('error', () => {
	console.log('Websocket Timeout', counter());
	updateActivity();
});
