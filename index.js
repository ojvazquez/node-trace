'use strict';

module.exports = (() => {
	const bunyan = require('bunyan');
	const fs = require('fs');

	const isDev = process.env.NODE_ENV !== 'test' && process.env.NODE_ENV !== 'production';
	const LOG_FOLDER = './logs/';

	// Create folder if it doesn't exist.
	if (!fs.existsSync(LOG_FOLDER) && !isDev)
		fs.mkdirSync(LOG_FOLDER);

	var streams = [];

	// Log to stdout and stderr when on a development environment.
	if (isDev) {
		streams.push(...[{
			level: 'fatal',
			stream: process.stderr
		}, {
			level: 'info',
			stream: process.stdout
		}]);
	} else {
		// Log to files when running on test or production environments.
		streams.push(...[{
			level: 'error',
			path: `${LOG_FOLDER}error.json`
		}, {
			level: 'warn',
			path: `${LOG_FOLDER}warn.json`
		}, {
			level: 'info',
			path: `${LOG_FOLDER}info.json`
		}]);
	}

	// TODO: Add the app name as an option when requiring the module.
	const log = bunyan.createLogger({
		name: 'muamba',
		streams: streams
	});

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
