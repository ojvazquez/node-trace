'use strict';

module.exports = (() => {
	const bunyan = require('bunyan');
	const fs = require('fs');

	const ENV = process.env.NODE_ENV;
	const LOG_FOLDER = './logs/';

	// Create folder if it doesn't exist.
	if (!fs.existsSync(LOG_FOLDER))
		fs.mkdirSync(LOG_FOLDER);

	// TODO: Add a way to close the streams.
	var streams = [{
		level: 'error',
		path: `${LOG_FOLDER}error.json`
	}, {
		level: 'warn',
		path: `${LOG_FOLDER}warn.json`
	}, {
		level: 'info',
		path: `${LOG_FOLDER}info.json`
	}];

	// Don't log to console when running tests or production.
	if (ENV !== 'production' && ENV !== 'test') {
		streams.push(...[{
			level: 'fatal',
			stream: process.stderr
		}, {
			level: 'info',
			stream: process.stdout
		}]);
	}

	const log = bunyan.createLogger({
		name: 'muamba-engine',
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
