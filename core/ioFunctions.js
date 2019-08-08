const fs = require('fs');
const path = require('path');

module.exports = (bot, ...collections) => {
	collections.forEach(c => {
		const dir = `./${c}`;

		fs.readdir(dir, (err, files) => {
			if(err) console.error(err);

			const jsfiles = files.filter(f => f.endsWith('.js'));
			jsfiles.forEach(f => {
				const file = require(path.resolve(dir, `${f}`));
				bot[c].set(file.help.name, file);
			});
			console.log(`${c} files loaded: ${bot[c].size}`);
		});
	});
};
