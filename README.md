# node-trace [![Build Status](https://travis-ci.org/w4spe/node-trace.svg?branch=master)](https://travis-ci.org/w4spe/node-trace) [![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg?style=flat-square)](https://github.com/Flet/semistandard)
Simple node tracing library (ES6) for logging to stdout, stderr and JSON files using [bunyan](https://github.com/trentm/node-bunyan).

## Installation

```
$ npm i -S @w4spe/node-trace
```

## Example

```js
const Trace = require('@w4spe/node-trace');

// Should call init() once before using the library.
Trace.init({
  appName: 'node-trace',
  logFolder: './logs',
  isDev: false
});

Trace.info('Hello world');

try {
	throw new Error();
} catch(err) {
	Trace.error('Something went wrong', err);
}
```

**Note**: Add `logs/` to your *.gitignore* file.

## API

> All functions on class Trace are **static**, meaning you that should not instance it.

### Trace.init([options])

> Should call this function once before using the library.

`options`: an optional object containing some configuration:
- **appName**: the name of your application, defaults to `node-trace`
- **logFolder**: where to store the log files, defaults to `logs/`
- **isDev**: whether to output to files or stdout, defaults to false if
*NODE_ENV* is *test* or *production*

### Trace.fatal(msg, [err])

> The service/app is going to stop or become unusable now. An operator should definitely look into this soon.

`msg`: String, message to log on *error.json* file.

`err`: Object (optional), exception stack.

### Trace.error(msg, [err])

> Fatal for a particular request, but the service/app continues servicing other requests. An operator should look at this soon(ish).

`msg`: String, message to log on *error.json* file.

`err`: Object (optional), exception stack.

### Trace.warn(msg, [fields])

> A note on something that should probably be looked at by an operator eventually.

`msg`: String, message to log on *warn.json* file.

`fields`: Object (optional), merged into the log record.

### Trace.info(msg, [fields])

> Detail on regular operation.

`msg`: String, message to log on *info.json* file.

`fields`: Object (optional), merged into the log record.

### Trace.debug(msg, [fields])

> Anything else, i.e. too verbose to be included in "info" level.

`msg`: String, message to log on *info.json* file.

`fields`: Object (optional), merged into the log record.

### Trace.trace(msg, [fields])

> Logging from external libraries used by your app or very detailed application logging.

`msg`: String, message to log on *info.json* file.

`fields`: Object (optional), merged into the log record.
