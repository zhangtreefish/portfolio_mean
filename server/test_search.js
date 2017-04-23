var assert = require('assert');
var express = require('express');
var status = require('http-status');
var superagent = require('superagent');
var wagner = require('wagner-core');

var URL_ROOT = 'http://localhost:3000';

describe('Text Search API', function() {
  var server;
  var Project;
  var User;

  before(function() {
    var app = express();

    // Bootstrap server
    require('./models')(wagner);

    // Make models available in tests
    var dependencies = wagner.invoke(function(Project, User) {
      return {
        Project: Project,
        User: User
      };
    });

    Project = dependencies.Project;
    User = dependencies.User;

    app.use(function(req, res, next) {
      User.findOne({}, function(error, user) {
        assert.ifError(error);
        req.user = user;
        next();
      });
    });

    app.use(require('./api')(wagner));

    server = app.listen(3000);
  });

  after(function() {
    // Shut the server down when we're done
    server.close();
  });

  beforeEach(function(done) {
    // Make sure projects are empty before each test
    Project.remove({}, function(error) {
      assert.ifError(error);
      User.remove({}, function(error) {
        assert.ifError(error);
        done();
      });
    });
  });

  beforeEach(function(done) {
    var projects = [
      {
          "id": "101",
          "genre": "full stack",
          "title": "Piano Studio",
          "year_start": 2016,
          "year_end": 2018,
          "description": "Piano teacher and students manage the lessons, practice, payment, and recital",
          "tools": ["angular2", "typescript", "ES6", "MEAN", "javascript"],
          "image": "",
          "url": "",
          "code": ""
      },
      {
          "id": "102",
          "genre": "full stack",
          "title": "Speak to One Another",
          "year_start": 2015,
          "year_end": 2019,
          "description": "Where learners of opposite language pairs talk to each other",
          "tools": ["amazon-web-services", "MERN", "react-native", "javascript"],
          "image": "",
          "url": "",
          "code": ""
      },
    ];

    var users = [{
      profile: {
        username: 'vkarpov15',
        picture: 'http://pbs.twimg.com/profile_images/550304223036854272/Wwmwuh2t.png'
      },
      data: {
        oauth: 'invalid',
      }
    }];

    Project.create(projects, function(error) {
      assert.ifError(error);
      User.create(users, function(error) {
        assert.ifError(error);
        done();
      });
    });
  });

  it('can search by text', function(done) {
    var url = URL_ROOT + '/projects/tool/javascript';
    // Get products whose name contains 'asus'
    superagent.get(url, function(error, res) {
      assert.ifError(error);
      assert.equal(res.status, status.OK);

      var results;
      assert.doesNotThrow(function() {
        results = JSON.parse(res.text).projects;
      });

      // Expect that we got the Zenbook Prime back
      assert.equal(results.length, 2);
      assert.equal(results[1].id, '102');
      assert.equal(results[0].title, 'Piano Studio');
      done();
    });
  });
});
