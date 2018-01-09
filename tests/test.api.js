/* global it, describe, before, after */
var assert = require('assert')
var superagent = require('superagent')
var status = require('http-status')
var ip = require('ip')
var fs = require('fs')
const spawn = require('child_process').spawn
var dbSourcePath = './tests/settings.json'
var dbPath = './tests/testsettings.json'
var testPort = 55556
var setting = 'nightmode_start'
var setting_val1 = '20:00'
var setting_val2 = '22:00'
var server
describe('UT02: API', function () {
  const uri = 'http://' + ip.address() + ':' + testPort
  before(function (done) {
    fs.copyFile(dbSourcePath, dbPath, function (err) {
      if (err) {
        done(err)
      } else {
        server = spawn('node', ['./app.js', dbPath, testPort])
        setTimeout(function () {
          done()
        }, 1000)
      }
    })
  })
  describe('UT02-01: GET /', function () {
    it('UT02-01-01: Should List all Settings', function (done) {
      superagent.get(uri + '/').end(function (err, res) {
        assert.ifError(err)
        assert.equal(res.status, status.OK)
        var result = JSON.parse(res.text)
        assert.equal(Object.keys(result).length, 4)
        assert.equal(result[setting], setting_val1)
        done()
      })
    })
  })
  describe('UT02-02: GET /:setting', function () {
    it('UT02-02-01: Should get setting by name', function (done) {
      superagent.get(uri + '/' + setting).end(function (err, res) {
        assert.ifError(err)
        assert.equal(res.status, status.OK)
        assert.equal(res.text, setting_val1)
        done()
      })
    })
    it('UT02-02-02: Should get 404 on wrong id', function (done) {
      superagent.get(uri + '/some-id').end(function (err, res) {
        if (err) {
          assert.equal(res.status, status.NOT_FOUND)
          done()
        } else {
          done(new Error('Here be an Error'))
        }
      })
    })
  })
  describe('UT02-03: PUT /:setting', function () {
    it('UT02-03-01: Should Update a Setting by Name', function (done) {
      superagent.put(uri + '/' + setting).type('text/plain').send(setting_val2).end(function (err, res) {
        assert.ifError(err)
        assert.equal(res.status, status.OK)
        assert.equal(res.text, setting_val2)
        superagent.get(uri + '/').end(function (err, res) {
          assert.ifError(err)
          assert.equal(res.status, status.OK)
          var result = JSON.parse(res.text)
          assert.equal(Object.keys(result).length, 4)
          assert.equal(result[setting], setting_val2)
          done()
        })
      })
    })
    it('UT02-05-02: Should Error on no Data in PUT', function (done) {
      superagent.put(uri + '/' + setting).send({}).end(function (err, res) {
        if (err) {
          assert.equal(res.status, status.BAD_REQUEST)
          superagent.get(uri + '/').end(function (err, res) {
            assert.ifError(err)
            assert.equal(res.status, status.OK)
            var result = JSON.parse(res.text)
            assert.equal(Object.keys(result).length, 4)
            assert.equal(result[setting], setting_val2)
            done()
          })
        } else {
          done(new Error('Here be an Error'))
        }
      })
    })
    it('UT02-05-03: Should Error on wrong ID', function (done) {
      superagent.put(uri + '/someid').send(setting_val2).end(function (err, res) {
        if (err) {
          assert.equal(res.status, status.NOT_FOUND)
          superagent.get(uri + '/').end(function (err, res) {
            assert.ifError(err)
            assert.equal(res.status, status.OK)
            var result = JSON.parse(res.text)
            assert.equal(Object.keys(result).length, 4)
            assert.equal(result[setting], setting_val2)
            done()
          })
        } else {
          done(new Error('Here be an Error'))
        }
      })
    })
  })
  after(function (done) {
    server.kill('SIGHUP')
    setTimeout(function () {
      fs.unlink(dbPath, function (error) {
        if (error) {
          done(error)
        } else {
          done()
        }
      })
    }, 1000)
  })
})
