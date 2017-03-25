var assert = require('assert');
var connect = require('./connect');
var dbInterface = require('./interface');
var fs = require('fs');
var projects = require('./projects2');

/**
 *  This test suite is meant to be run through gulp (use the `npm run watch`)
 *  script.
 */
describe('dbInterface', function() {
  var db;
  var fullStackProjects;

  /**
   *  This test tests if interface.js' `insert()` function properly inserts.
   */
  it('can insert a project', function(done) {
    var project = { "id": "20",
                    "genre": "full stack",
                    "title": "Portfolio!",
                    "dates": "2017",
                    "description": "on a MEAN stack, per the course on EdX",
                    "tools": ["mean-stack", "mongodb-atlas", "passport-facebook", "heroku"],
                    "image": "",
                    "url": "",
                    "code": ""
                  };
    dbInterface.insert(db, project, function(error) {
      assert.ifError(error);
      db.collection('projects').count({ title: 'Portfolio!' }, function(error, c) {
        assert.ifError(error);
        assert.equal(c, 1);
        done();
      });
    });
  });

  it('can query data by a tool', function(done) {
    dbInterface.byTool(db, 'selenium', function(error, docs) {
      assert.ifError(error);
      assert.ok(Array.isArray(docs));
      assert.equal(docs.length, 1);
      assert.equal(docs[0].title, 'Tour of Projects');
      done();
    });
  });

  /**
   *  This test ensures that interface.js' `byDirector()` function returns
   *  projects in ascending order by their title.
   */
  it('returns multiple results ordered by genre', function(done) {
    dbInterface.byGenre(db, 'front end', function(error, docs) {
      assert.ifError(error);
      assert.ok(Array.isArray(docs));
      assert.equal(docs.length, 2);
      assert.equal(docs[0].title, 'A Frogger Game');
      docs.forEach(function(doc) {
        delete doc._id;
      });
      assert.deepEqual(Object.keys(docs[0]), ["id",
                    "genre",
                    "title",
                    "dates",
                    "description",
                    "tools",
                    "image",
                    "url",
                    "code"]);
      fullStackProjects = docs;
      done();
    });
  });

  /**
   *  This function setup the correct data in the "projects" collection.
   */
  before(function(done) {
    connect(function(error, conn) {
      if (error) {
        return done(error);
      }
      db = conn;
      db.collection('projects').removeMany({}, function(error) {
        if (error) {
          return done(error);
        }
        var fns = [];
        projects.projects.forEach(function(proj) {
          fns.push(function(callback) {
            dbInterface.insert(db, proj, callback);
          });
        });
        require('async').parallel(fns, done);
      });
    });
  });

  after(function(done) {
      db.close(done);
  });
});
