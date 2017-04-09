var bodyparser = require('body-parser');
var express = require('express');
var status = require('http-status');
var _ = require('underscore');
var mongoose = require('mongoose');
var assert = require('assert');

module.exports = function(wagner) {
  var api = express.Router();

  //parses request to json as req.body
  api.use(bodyparser.json());

  api.get('/something', wagner.invoke( function(Project) {
    return (req, res) => {
      res.json({"test": true});
    };
  }));

  //load user's portfolio
  api.get('/me', function(req, res) {
    if (!req.user) {
      return res.
        status(status.UNAUTHORIZED).
        json({ error: 'Not logged in' });
    }
    //populate: TODO
    // req.user.populate('data.portfolio.project')
    //         .exec(handleOne.bind(null, 'user', res)
    // );
    req.user.populate({path:'data.portfolio.project', model:'Project'}, handleOne.bind(null, 'user', res));
  });

  //save user's portfolio
  api.put('/me/portfolio', function(req, res) {
    try {
     var port = req.body.data.portfolio;
    } catch(e) {
      return res.
        status(status.NOT_FOUND).
        json({ error: 'No portfolio provided!' });
    }

    req.user.data.portfolio = port;

    req.user.save(function(error, user) {
      if (error) {
        return res.
          status(status.INTERNAL_SERVER_ERROR).
          json({ error: error.toString() });
      }
      return res.json({ user: user });
    });
  });

  //return all projects by default
  api.get('/projects', wagner.invoke(function(Project) {
    return function(req, res) {
      Project.
        find().
        sort({ title: 1 }).
        exec(handleMany.bind(null, 'projects', res));
    };
  }));

  api.get('/tools', wagner.invoke(function(Project) {
    return function(req, res) {
      Project.
        aggregate([
          {"$project": {"tools": 1}},
          {"$unwind": "$tools"},
          {"$group": {"_id": "$tools", "count":{"$sum": 1}}},
          {"$sort": {"_id": 1}}
        ]).
        exec(handleMany.bind(null, 'tools', res));
    };
  }));

  //TODO: api.get('/me/portfolio/tool/:query', wagner.invoke(function(Project) {}))
  //TODO: api.get('/me/portfolio/project/:id', wagner.invoke(function(Project) {}))
  //TODO: api.get('/me/portfolio/genre/:genre', wagner.invoke(function(Project) {}))
  //TODO: api.get('/me/portfolio/tools', wagner)
  //returns all projects involving certain tool
  //implemented using a promise instead of a callback
  mongoose.Promise = require('bluebird');
  api.get('/projects/tool/:query', wagner.invoke(function(Project) {
    return function(req, res) {
      let query_promise = Project.
        find(
          { $text : { $search : req.params.query } },
          { score : { $meta: 'textScore' } }).
        sort({ score: { $meta : 'textScore' }, title: 1 }).exec();
      assert.equal(query_promise.constructor, require('bluebird'));
      query_promise.
        then(handleManyPromise.bind(null, 'projects', res)).
        catch(function(err) {
          console.log('error:', err);
        })
      ;
    };
  }));

  //returns all projects of certain genre: full stack, front-end, back-end.
  api.get('/projects/genre/:query', wagner.invoke(function(Project) {
    return function(req, res) {
      Project.
        find({ "genre" : req.params.query }).
        exec(handleMany.bind(null, 'projects', res));
    };
  }));

  api.get('/project/id/:id', wagner.invoke(function(Project) {
    return function(req, res) {
      Project.
        findOne({ "_id" : req.params.id }).
        exec(handleOne.bind(null, 'project', res));
    };
  }));

  return api;
};

function handleMany(property, res, error, result) {
  if (error) {
    console.log(error);
    return res.
      status(status.INTERNAL_SERVER_ERROR).
      json({ error: error.toString() });
  }

  var json = {};
  json[property] = result;
  res.json(json);
}
function handleManyPromise(property, res, result) {
  // if (error) {
  //   console.log(error);
  //   return res.
  //     status(status.INTERNAL_SERVER_ERROR).
  //     json({ error: error.toString() });
  // }

  var json = {};
  json[property] = result;
  res.json(json);
}
function handleOne(property, res, error, result) {
  if (error) {
    return res.
      status(status.INTERNAL_SERVER_ERROR).
      json({ error: error.toString() });
  }
  if (!result) {
    return res.
      status(status.NOT_FOUND).
      json({ error: 'Not found' });
  }

  var json = {};
  json[property] = result;
  res.json(json);
}
