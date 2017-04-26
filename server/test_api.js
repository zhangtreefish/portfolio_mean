var assert = require('assert');
var express = require('express');
var status = require('http-status');
var superagent = require('superagent');
var wagner = require('wagner-core');

var URL_ROOT = 'http://localhost:3003';
var PROJECT_ID = '000000000000000000000001';
var PROJECT_ID2 = '000000000000000000000002';
var PROJECT_ID3 = '000000000000000000000003';


describe('API', function() {
  let server;

  let Project;
  let User;
  let Config;

  before(function() {
    let app = express();

    // Bootstrap server
    require('./models')(wagner);
    require('./dependencies')(wagner);

    let depes = wagner.invoke(function(Project, User, Config) {
      return {
        Proj: Project,
        Usr: User,
        Conf: Config
      };
    });

    // Config = depends.Config;
    // User = mods.User;
    Config = depes.Conf;
    User =  depes.Usr;

    Project = depes.Proj;


    // User = models.User;

    app.use(function(req, res, next) {
      User.findOne({}, function(error, user) {
        assert.ifError(error);
        req.user = user;
        console.log(user); //?
        next();
      });
    });

    app.use(require('./api')(wagner));

    server = app.listen(3003);
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
          "_id": PROJECT_ID,
          "id": "101",
          "genre": "full stack",
          "title": "Piano Studio",
          "year_start": 2016,
          "year_end": 2018,
          "description": "Piano teacher and students manage the lessons, practice, payment, and recital",
          "tools": ["angular2", "typescript", "ES6", "MEAN", "javascript"]
      },
      {
          "_id": PROJECT_ID2,
          "id": "102",
          "genre": "full stack",
          "title": "Speak to One Another",
          "year_start": 2015,
          "year_end": 2019,
          "description": "Where learners of opposite language pairs talk to each other",
          "tools": ["amazon-web-services", "MERN", "react-native", "javascript"]
      }
    ];

    var users = [{
      _id: PROJECT_ID3,
      profile: {
        username: 'treefish',
        picture: 'http://i.imgur.com/5r0DB0H.jpg'
      },
      data: {
        oauth: 'invalid',
        portfolio:[]
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

  it('can load users portfolio', function(done) {
    var url = URL_ROOT + '/me';

    User.findOne({}, function(error, user) {
      assert.ifError(error);
      user.data.portfolio = [{ project: PROJECT_ID }];
      user.save(function(error) {
        assert.ifError(error);

        superagent.get(url, function(error, res) {
          assert.ifError(error);

          assert.equal(res.status, 200);
          var result;
          assert.doesNotThrow(function() {
            result = JSON.parse(res.text).user;
          });
          assert.equal(result.data.portfolio.length, 1);
          assert.equal(result.data.portfolio[0].project.title, 'Piano Studio');
          done();
        });
      });
    });
  });

  it('can save users portfolio', function(done) {
    var url = URL_ROOT + '/me/portfolio';
    superagent.
      put(url).
      send({
        data: {
          portfolio: [{ project: PROJECT_ID }]
        }
      }).
      end(function(error, res) {
        assert.ifError(error);
        assert.equal(res.status, status.OK);
        User.findOne({}, function(error, user) {
          assert.ifError(error);
          assert.equal(user.data.portfolio.length, 1);
          assert.equal(user.data.portfolio[0].project, PROJECT_ID);
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

      // Expect that we got the Piano Studio back
      assert.equal(results.length, 2);
      assert.equal(results[1].id, '102');
      assert.equal(results[0].title, 'Piano Studio');
      done();
    });
  });
});
