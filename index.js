'use strict';

module.exports = (() => {
	const bunyan = require('bunyan');
	const fs = require('fs');

	const LOG_FOLDER = 'logs/';
	const log = bunyan.createLogger({
		name: 'muamba-engine',
		streams: [{
			level: 'error',
			path: `${LOG_FOLDER}error.json`
		}, {
			level: 'fatal',
			stream: process.stderr
		}, {
			level: 'warn',
			path: `${LOG_FOLDER}warn.json`
		}, {
			level: 'info',
			path: `${LOG_FOLDER}info.json`
		}, {
			level: 'info',
			stream: process.stdout
		}]
	});

	// Create folder if it doesn't exist.
	if (!fs.existsSync(LOG_FOLDER)) {
		console.log('creating folder');

		fs.mkdirSync(LOG_FOLDER);
	}

	// TODO: Improve this class.
	class Trace {
		constructor() {
			throw new TypeError('Should not instance static class: Trace.');
		}

		static fatal(err, msg) {
			// Unimplemented.
		}

		static error(err, msg) {
			if (msg)
				log.error(err, msg);
			else
				log.error(err);
		}

		static warn(msg) {
			log.warn(msg);
		}

		static info(msg) {
			log.info(msg);
		}

		static debug(msg) {
			// Unimplemented.
		}

		static trace(msg) {
			// Unimplemented.
		}
	}

	return Trace;
})();
