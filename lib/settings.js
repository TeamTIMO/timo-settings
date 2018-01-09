/**
 * @overview Settings Lib
 * @module settings
 * @author Dominik Sigmund
 * @version 0.9
 * @description Management of Memory Database and File-I/O
 * @memberof timo-settings
 * @requires fs
 */
 /**
 * fs module
 * @const
 */
const fs = require('fs')

/** Creates a instance of Settings Database
 * @class Settings
 * @throws {Error} Error
 * @param {string} dbfile - A path to the json-File
 * @returns {Settings} The Object
 * */
function Settings (dbfile, uuid) {
  var self = {}
  self.file = dbfile
  self.settings = JSON.parse(fs.readFileSync(self.file, 'utf8'))
  self.list = list
  self.getSetting = getSetting
  self.updateSetting = updateSetting
  self.saveFile = saveFile
  return self
}
/** get a List of all Settings
 * @throws {Error} Error
 * @param {Settings~listCallback} callback - A Callback with an error or the List of Entries
 * @returns Nothing
 * */
function list (callback) {
  if (!callback) {
    throw new Error('A callback must be given')
  }
  callback(null, this.settings)
}
/** get a Setting by its name
 * @throws {Error} Error
 * @param {string} name - A Name for a Setting
 * @param {Settings~settingCallback} callback - A Callback with an error or the Setting
 * @returns Nothing
 * */
function getSetting (name, callback) {
  if (!callback) {
    throw new Error('A callback must be given')
  }
  if (this.settings.hasOwnProperty(name)) {
    callback(null, this.settings[name])
  } else {
    callback(new Error('No Setting with name ' + name + ' found'))
  }
}
/** update a Setting by name
 * @throws {Error} Error
 * @param {string} name - A Name for a Setting
 * @param {string} value - Value of the Setting
 * @param {Settings~settingCallback} callback -  A Callback with an error or the Setting
 * @returns Nothing
 * */
function updateSetting (name, value, callback) {
  if (!callback) {
    throw new Error('A callback must be given')
  }
  var self = this
  if (self.settings.hasOwnProperty(name)) {
    if (value !== '' && typeof value === 'string') {
      self.settings[name] = value
      self.saveFile(function (err) {
        if (err) {
          callback(err)
        } else {
          callback(null, self.settings[name])
        }
      })
    } else {
      callback({ status: 400, error: new Error('Empty Value String given') })
    }
  } else {
    callback({ status: 404, error: new Error('No Setting with name ' + name + ' found') })
  }
}
/** saves all internal entries to the file
 * @throws {Error} Error
 * @param {Settings~saveCallback} callback - A Callback with an error or nothing
 * @returns Nothing
 * */
function saveFile (callback) {
  if (!callback) {
    throw new Error('A callback must be given')
  }
  fs.writeFile(this.file, JSON.stringify(this.settings), 'utf8', callback)
}
module.exports = Settings
/**
  * This callback is displayed as part of the Settings class.
  * @callback Settings~listCallback
  * @param {Error} Error or null
  * @param {Object} Object of settings
  */
  /**
  * This callback is displayed as part of the Settings class.
  * @callback Settings~settingCallback
  * @param {Error} Error or null
  * @param {string} Value of the Setting
  */
  /**
  * This callback is displayed as part of the Settings class.
  * @callback Settings~saveCallback
  * @param {Error} Error or null
  */
