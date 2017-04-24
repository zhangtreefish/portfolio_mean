var mongoose = require('mongoose');
var projects = require('./projects');
var assert = require('assert');
var wagner = require('wagner-core');


require('./models')(wagner);

wagner.invoke(function(Project){
  console.log(typeof Project); //function
  Project.collection.deleteMany({}, function (err) {
    assert.equal(null, err);
  });
  //console.log(projects['projects'].length);
  Project.create(projects['projects'], function(err, result) {
    assert.equal(null, err);
    assert.equal(projects.projects.length, result.insertedCount);
  });
});

wagner.invoke(function(db){
  db.disconnect();
});

//TODO:Project.deleteMany({}, function (err) {
//          ^
//TypeError: undefined is not a function
 // message: 'Project validation failed',
 //  name: 'ValidationError',
 //  errors:

 //    at EventEmitter.<anonymous> (C:\MongoDB\portfolio_MEAN\server\add_data.js:16:12)



