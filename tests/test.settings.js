/* global it, describe, before, after, beforeEach, afterEach */
var assert = require('assert')
var dbSourcePath = './tests/settings.json'
var dbPath = './tests/testsettings.json'
var path = require('path')
var fs = require('fs')
var setting = 'nightmode_start'
var setting_val1 = '20:00'
var setting_val2 = '22:00'
var Settings = require(path.join(__dirname, '../lib/settings'))
var TSettings
describe('UT01: settings', function () {
  before('UT01-00: Copy TestSettings', function (done) {
    fs.copyFile(dbSourcePath, dbPath, function (err) {
      if (err) {
        done(err)
      } else {
        done()
      }
    })
  })
  describe('UT01-01: Object Contructor', function () {
    it('UT01-01-01: should return an error with no path', function (done) {
      try {
        Settings()
        done(new Error('there should be an error here'))
      } catch (error) {
        done()
      }
    })
    it('UT01-01-02: should return a settings object with a correct path', function (done) {
      try {
        var settings = new Settings(dbPath)
        assert.equal(settings.file, dbPath)
        assert.equal(Object.keys(settings.settings).length, 4)
        done()
      } catch (error) {
        done(error)
      }
    })
  })
  describe('UT01-02: settings.list', function () {
    before(function (done) {
      TSettings = new Settings(dbPath)
      done()
    })
    it('UT01-02-01: should throw an error with no callback given', function (done) {
      try {
        TSettings.list()
        done(new Error('there should be an error here'))
      } catch (error) {
        done()
      }
    })
    it('UT01-02-02: should callback all settings', function (done) {
      TSettings.list(function (error, settings) {
        if (error) {
          done(error)
        } else {
          assert.equal(Object.keys(settings).length, 4)
          assert.equal(settings[setting], setting_val1)
          done()
        }
      })
    })
  })
  describe('UT01-03: settings.getSetting', function () {
    beforeEach(function (done) {
      TSettings = new Settings(dbPath)
      done()
    })
    it('UT01-03-01: should throw an error with no callback given', function (done) {
      try {
        TSettings.getSetting(setting)
        done(new Error('there should be an error here'))
      } catch (error) {
        done()
      }
    })
    it('UT01-03-02: should throw an error with no name given', function (done) {
      try {
        TSettings.getSetting()
        done(new Error('there should be an error here'))
      } catch (error) {
        done()
      }
    })
    it('UT01-03-03: should callback an error with a not existing name given', function (done) {
      TSettings.getSetting('#', function (error, entry) {
        if (error) {
          assert.equal(error.message, 'No Setting with name # found')
          done()
        } else {
          done(new Error('there should be an error here'))
        }
      })
    })
    it('UT01-03-04: should callback an object with a correct id given', function (done) {
      TSettings.getSetting(setting, function (error, setValue) {
        if (error) {
          done(error)
        } else {
          assert.equal(setValue, setting_val1)
          done()
        }
      })
    })
    afterEach(function (done) {
      TSettings = {}
      done()
    })
  })
  describe('UT01-04: settings.updateSetting', function () {
    beforeEach(function (done) {
      TSettings = new Settings(dbPath)
      done()
    })
    it('UT01-04-01: should throw an error with no id given', function (done) {
      try {
        TSettings.updateSetting()
        done(new Error('there should be an error here'))
      } catch (error) {
        done()
      }
    })
    it('UT01-04-02: should throw an error with no data given', function (done) {
      try {
        TSettings.updateSetting(setting)
        done(new Error('there should be an error here'))
      } catch (error) {
        done()
      }
    })
    it('UT01-04-03: should throw an error with no callback given', function (done) {
      try {
        TSettings.updateSetting(setting, setting_val2)
        done(new Error('there should be an error here'))
      } catch (error) {
        done()
      }
    })
    it('UT01-04-04: should callback an error with a not existing id given', function (done) {
      TSettings.updateSetting('#', setting_val2, function (error, obj) {
        if (error) {
          done()
        } else {
          done(new Error('there should be an error here'))
        }
      })
    })
    it('UT01-04-05: should callback an object with id given and database should contain this changed object', function (done) {
      TSettings.updateSetting(setting, setting_val2, function (error, setVal) {
        if (error) {
          done(error)
        } else {
          assert.equal(setVal, setting_val2)
          TSettings.list(function (error, settings) {
            if (error) {
              done(error)
            } else {
              assert.equal(Object.keys(settings).length, 4)
              assert.equal(settings[setting], setting_val2)
              done()
            }
          })
        }
      })
    })
    afterEach(function (done) {
      TSettings = {}
      done()
    })
  })
  after('UT01-99: remove Copy of Database', function (done) {
    fs.unlink(dbPath, function (error) {
      if (error) {
        done(error)
      } else {
        done()
      }
    })
  })
})
