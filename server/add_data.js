var mongoose = require('mongoose');
var projects = require('./projectsv1');
var assert = require('assert');
var wagner = require('wagner-core');


require('./models')(wagner);

wagner.invoke(function(Project){
  Project.collection.deleteMany({}, function (err) {
    assert.equal(null, err);
  });

  Project.create(projects["projects"], function(err, result) {
    if(err) {
      console.log('err', err);
    } else {
      assert.equal(null, err);
      assert.equal(projects["projects"].length, result.insertedCount);
    }
  });
});

