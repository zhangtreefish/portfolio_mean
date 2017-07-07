var controllers = require('./controllers');
var directives = require('./directives');
var services = require('./services');
var _ = require('underscore');

var components = angular.module('myApp.components', ['ng']);

_.each(controllers, function(controller, name) {
  components.controller(name, controller);
});

_.each(directives, function(directive, name) {
  components.directive(name, directive);
});

_.each(services, function(factory, name) {
  components.factory(name, factory);
});

var app = angular.module('myApp', ['myApp.components', 'ngRoute']);
app.config(function($routeProvider) {
  $routeProvider.
    when('/', {
      templateUrl: '/portfolio/templates/about.html'
    }).
    when('/me', {
      template: '<me></me>'
    }).
    when('/tools', {
      templateUrl: '/portfolio/templates/tool.html'
    }).
    when('/about', {
      templateUrl: '/portfolio/templates/about.html',
      controller: function($scope) {
        $scope.linkText = 'about';
      }
    }).
    when('/tool/:tool', {
      template: '<projects-by-tool></projects-by-tool>'
    }).
    when('/project/:id', {
      template: '<project-details></project-details>'
    }).
    when('/users', {
      template: '<users></users>'
    }).
    when('/user/:id', {
      template: '<user-details></user-details>'
    });
  });
