TIMO - Settings Microservice
========================

Simple CRUD Webservice, will manage the settings

# Database
Simple JSON File, hold in memory for faster reading  
Example:
```json
{
	"nightmode":"true",
	"nightmode_start":"20:00",
	"nightmode_end":"08:00",
	"nightmode_days":"1-7",
	...
}
```
# Settings
TODO: Add Settings here

# API
* GET /all <- return full json
* GET /:setting <- return value for setting
* PUT /:setting <- update value for setting

# TODO
* Add raml for api
* complete list of settings
* code routes
* lib database
* jsonschema
* testcases
* code coverage
* build script (testresults into html)