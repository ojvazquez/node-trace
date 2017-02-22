'use strict';

module.exports = (() => {
  const bunyan = require('bunyan');
  const fs = require('fs');

  var initialized = false;
  var log = null;

  class Trace {
    constructor () {
      throw new TypeError('Should not instance static class: Trace.');
    }

    static init (options) {
      initialize(options);
    }

    // The service/app is going to stop or become unusable now. An operator should definitely look into this soon.
    static fatal (msg, err) {
      if (!initialized) {
        throw new Error('Call init() once before using.');
      }

      if (err) {
        log.fatal(msg, err);
      } else {
        log.fatal(msg);
      }
    }

    // Fatal for a particular request, but the service/app continues servicing other requests. An operator should look at this soon(ish).
    static error (msg, err) {
      if (!initialized) {
        throw new Error('Call init() once before using.');
      }

      if (err) {
        log.error(msg, err);
      } else {
        log.error(msg);
      }
    }

    // A note on something that should probably be looked at by an operator eventually.
    static warn (msg, fields) {
      if (!initialized) {
        throw new Error('Call init() once before using.');
      }

      if (fields) {
        log.warn(msg, fields);
      } else {
        log.warn(msg);
      }
    }

    // Detail on regular operation.
    static info (msg, fields) {
      if (!initialized) {
        throw new Error('Call init() once before using.');
      }

      if (fields) {
        log.info(msg, fields);
      } else {
        log.info(msg);
      }
    }

    // Anything else, i.e. too verbose to be included in "info" level.
    static debug (msg, fields) {
      if (!initialized) {
        throw new Error('Call init() once before using.');
      }

      if (fields) {
        log.debug(msg, fields);
      } else {
        log.debug(msg);
      }
    }

    // Logging from external libraries used by your app or very detailed application logging.
    static trace (msg, fields) {
      if (!initialized) {
        throw new Error('Call init() once before using.');
      }

      if (fields) {
        log.trace(msg, fields);
      } else {
        log.trace(msg);
      }
    }
  }

  function initialize (options) {
    if (!initialized) {
      initialized = true;
      options = options || {};

      const DEFAULTS = {
        appName: 'node-trace',
        isDev: process.env.NODE_ENV !== 'test' && process.env.NODE_ENV !== 'production',
        logPath: './logs/'
      };

      const IS_DEV = (typeof options.isDev === 'boolean') ? options.isDev : DEFAULTS.isDev;
      const LOG_PATH = options.logPath || DEFAULTS.logPath;

        // Create folder if it doesn't exist.
      if (!fs.existsSync(LOG_PATH) && !IS_DEV) {
        fs.mkdirSync(LOG_PATH);
      }

      var streams = [];

        // Log to stdout and stderr when on a development environment.
      if (IS_DEV) {
        streams.push(...[{
          level: 'fatal',
          stream: process.stderr
        }, {
          level: 'trace',
          stream: process.stdout
        }]);
      } else {
          // Log to files when running on test or production environments.
        streams.push(...[{
          level: 'fatal',
          path: `${LOG_PATH}fatal.json`
        }, {
          level: 'error',
          path: `${LOG_PATH}error.json`
        }, {
          level: 'warn',
          path: `${LOG_PATH}warn.json`
        }, {
          level: 'info',
          path: `${LOG_PATH}info.json`
        }, {
          level: 'debug',
          path: `${LOG_PATH}debug.json`
        }, {
          level: 'trace',
          path: `${LOG_PATH}trace.json`
        }]);
      }

      log = bunyan.createLogger({
        name: options.appName || DEFAULTS.appName,
        streams: streams
      });
    }
  }

  return Trace;
})();
