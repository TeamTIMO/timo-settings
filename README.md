# TIMO - Settings Microservice

Simple CRUD Webservice, will manage the settings

## Installation

Clone the Repo, run npm install and use node app.js:

1. `git clone https://github.com/TeamTIMO/timo-settings.git`
2. `cd timo-settings`
3. `npm install`
4. `node app.js`

(We recommend using a process manager like pm2)

## Database

Simple JSON File, hold in memory for faster reading.

```json
{
	"nightmode":"true",
	"nightmode_start":"20:00",
	"nightmode_end":"08:00",
	"nightmode_days":"1-7",
	...
}
```

## Settings

TODO: Add Settings here

## API

See also docs/api.raml or docs/api.html

* GET / <- return full json
* GET /:setting <- return value for setting
* PUT /:setting <- update value for setting

## Developer Info

Here are some Infos for Developer

### Tests

The Tests are written using the assert-class and can be found in the tests-folder

You may use your favorite Test-Runner to do them yourself.

My Commandline is as follows:

`istanbul cover _mocha -- tests/*.js -R mochawesome`

#### Results

Coverage: docs/coverage/lcov-report/index.html
Mochawesome-Report: docs/mochawesome-report/index.html

### Libs

ClassDiagram:

![The class diagram](https://github.com/TeamTIMO/timo-settings/raw/master/docs/classes.png "The class Diagram")

Can be found in docs/classes.png

Also as editable plantUML-File.

SequenceDiagram:

![The sequence diagram](https://github.com/TeamTIMO/timo-settings/raw/master/docs/sequence.png "The sequence Diagram")

Can be found in docs/sequence.png

Also as editable plantUML-File.

__JSDOC__ in Files. See also HTML Version @ docs/jsdoc/index.html

### Dependencies

* [express](https://www.npmjs.com/package/express)

## Authors

* Dominik Sigmund <dominik.sigmund@webdad.eu>

## License

This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to <http://unlicense.org/>