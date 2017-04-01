var assert = require('assert');
var superagent = require('superagent');
var _ = require('underscore');
var fs = require('fs');
var wagner = require('wagner-core');

describe('auth fb', function() {

  //first import the needed dependencies
  require('./dependencies')(wagner);

  //then invoke one of the dependencies: Config
  var Config = wagner.invoke(function(Config){
      return Config;
    })


  it( 'can access Facebook using facebookClientId and ' +
      'facebookClientSecret', function(done) {
    var url = 'https://graph.facebook.com/' +
      Config.facebookClientId + '?access_token=' +
      Config.facebookClientId + '|' + Config.facebookClientSecret;

    superagent.get(url, function(error, res) {
      if (error) {
        return done(error);
      }
      var result;
      assert.doesNotThrow(function() {
        result = JSON.parse(res.text);
      });

      assert.equal(result.id, Config.facebookClientId);
      done();
    });
  });


  after(function(done) {
      done();
  });
});
