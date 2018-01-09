/**
 * @overview Settings Microservice Server File
 * @module index
 * @author Dominik Sigmund
 * @version 0.1
 * @description Starts the Server and keeps it running
 * @memberof timo-settings
 * @requires express
 * @requires lib/settings
 */

 // Require needed modules
 console.log('Starting up TIMO-Settings-service...')
 console.log('Pulling in dependencies...')
 var config = require('./config.json')
 /**
 * express module
 * @const
 */
 var express = require('express')
 var bodyParser = require('body-parser')
 var app = express()
 var server = require('http').createServer(app)
 var Settings = require('./lib/settings.js')

// Accept Text Body
 app.use(bodyParser.text())

// Overwrite DBFile Location
 if (process.argv.length >= 3) {
   config.dbfilelocation = process.argv[2]
 }
 var mySettings = new Settings(config.dbfilelocation)

// Listen to Port
 if (process.argv.length >= 4) {
   config.port = process.argv[3]
 }
 server.listen(config.port)
 console.log('TIMO-Settings-service running on ' + config.port)

// Routes
 app.get('/', function (req, res) {
   mySettings.list(function (err, list) {
     if (err) {
       res.status(500).send(err)
     } else {
       res.send(list)
     }
   })
 })
 app.get('/:setting', function (req, res) {
   mySettings.getSetting(req.params.setting, function (err, setting) {
     if (err) {
       res.status(404).send(err)
     } else {
       res.send(setting)
     }
   })
 })
 app.put('/:setting', function (req, res) {
   mySettings.updateSetting(req.params.setting, req.body, function (err, setting) {
     if (err) {
       res.status(err.status).send(err.error)
     } else {
       res.send(setting)
     }
   })
 })

/** Handles exitEvents by destroying open connections first
 * @function
* @param {object} options - Some Options
* @param {object} err - An Error Object
*/
 function exitHandler (options, err) {
   console.log('Exiting...')
   process.exit()
 }
  // catches ctrl+c event
 process.on('SIGINT', exitHandler)
  // catches uncaught exceptions
 process.on('uncaughtException', function (err) {
   console.error(err)
   exitHandler(null, err)
 })

  // keep running
 process.stdin.resume()
