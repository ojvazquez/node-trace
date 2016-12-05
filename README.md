# node-trace

Simple node tracing library (ES6) for logging to stdout, stderr and JSON files using [bunyan](https://github.com/trentm/node-bunyan).

## Instalation

```
$ npm install --save ojvazquez/node-trace
```

## Example

```js
const Trace = require('node-trace');

Trace.info('Hello world');

try {
	throw new Error();
} catch(err) {
	Trace.error(err, 'Something went wrong');
}
```

**Note**: Add `logs/` to your *.gitignore* file.

## API

> All functions on class Trace are **static**, meaning you that should not instance it.

### Trace.info(msg)

`msg`: String, message to log on *info.json* file.

### Trace.warn(msg)

`msg`: String, message to log on *warn.json* file.

### Trace.error(err, msg)

`err`: Object (optional), exception stack.

`msg`: String, message to log on *error.json* file.
