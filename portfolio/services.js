var status = require('http-status');

exports.$user = function($http) {
  var s = {};

  s.loadUser = function() {
    $http.
      get('/api/v1/me').
      success(function(data) {
        s.user = data.user;
      }).
      error(function(data, status) {
        if (status === status.UNAUTHORIZED) {
          s.user = null;
        }
      });
  };

  s.loadUser();

  setInterval(s.loadUser, 60 * 60 * 1000);

  return s;
};
//TODO: how to pass variale alogn with http?
exports.$insertUser = function($http, $scope) {
  var s = {};
  $http.
      post('/api/v1/users/newuser', { data: { user: {username: $scope.newUser.username} }}).
      success(function(data) {
        s.newuser = data.newuser;
        $log.log('success! new user added!', s.newuser.username);
      }).
      error(function(data, status) {
        if (status === status.UNAUTHORIZED) {
          s.newuser = null;
        }
      });
  return s;
}

exports.$projects = function($http) {
  var s = {};
  s.fetchProjects = function() {
    $http.
      get('/api/v1/projects').
      success(function(data) {
        s.projects = data.projects;
      });
    };
  s.fetchProjects();
  return s;
}

exports.$users = function($http) {
var s = {};

  s.loadUsers = function() {
    $http.
      get('/api/v1/users').
      success(function(data) {
        s.users = data.users;
      }).
      error(function(data, status) {
        if (status === status.UNAUTHORIZED) {
          s.users = null;
        }
      });
  };

  s.loadUsers();

  return s;
};

exports.$shareTool = function() {
  return {selectedTool: {_id: 'react'}};
};
exports.$shareUserTool = function() {
  return {selectedTool: {_id: ''}};
};
exports.$shareProject = function() {
  return {selectedProject: {}};
};
