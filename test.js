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
  var succeeded = 0;
  var fullStackProjects;

  it('works', function() {
    ++succeeded;
  });
  /**
   *  This test tests if interface.js' `insert()` function properly inserts.
   */
  it('can insert a project', function(done) {
    this.timeout(6000);
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
      ++succeeded;
      done();
    });
  });

  /**
   *  This test ensures that interface.js' `byDirector()` function returns
   *  projects in ascending order by their title.
   */
  it('returns multiple results ordered by genre', function(done) {
    this.timeout(6000);
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
      ++succeeded;
      fullStackProjects = docs;
      done();
    });
  });

  /**
   *  This function setup the correct data in the "projects" collection.
   */
  before(function(done) {
    connect(function(error, conn) {
      //console.log('look here aft conn!!');
      if (error) {
        return done(error);
      }
      //console.log('look here aft conn-err-check!!');
      db = conn;
      db.collection('projects').removeMany({}, function(error) {
        //console.log('look here after remove!!');
        if (error) {
          return done(error);
        }
        console.log('look here after remove-err-check!!');
        var fns = [];
        projects.projects.forEach(function(proj) {
          console.log('look here in forEach!!', proj.title);
          fns.push(function(callback) {
            console.log('look here in push!!',proj.title);
            dbInterface.insert(db, proj, callback);
            console.log('look here after dbInterface.insert!!',proj.title);
          });
        });
        console.log('look here before parallel!!');
        require('async').parallel(fns, done);
      });
    });
  });

  /**
   *  The below code generates the answer code that we will use to
   *  verify you got the correct answer. Modifying this code is a
   *  violation of the honor code.
   */
  after(function(done) {
    if (succeeded >= 1) {
      console.log('success!')
      db.close(done);
    } else {
      db.close(done);
    }
  });
});
