var assert = require('assert');
var superagent = require('superagent');
var _ = require('underscore');
var fs = require('fs');
var wagner = require('wagner-core');

describe('auth fb', function() {

  //first import the needed dependencies
  require('./dependencies')(wagner);

  it( 'can access Facebook using facebookClientId and ' +
      'facebookClientSecret', function(done) {
    var url = 'https://graph.facebook.com/' +
      process.env.facebookClientId + '?access_token=' +
      process.env.facebookClientId + '|' + process.env.facebookClientSecret;

    superagent.get(url, function(error, res) {
      if (error) {
        return done(error);
      }
      var result;
      assert.doesNotThrow(function() {
        result = JSON.parse(res.text);
      });

      assert.equal(result.id, process.env.facebookClientId);
      done();
    });
  });


  after(function(done) {
      done();
  });
});
