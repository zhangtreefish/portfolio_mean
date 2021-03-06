exports.UsersController = function ($scope, $users, $http, $log) {

    //I like to have an init() for controllers that need to perform some initialization. Keeps things in
    //one place...not required though especially in the simple example below
    $scope.load = function() {
        //$scope.users = $users;
      $http.
        get('/api/v1/users').
        success(function(data) {
          $scope.users = data.users;
          $log.log('users', $scope.users);
        }).
        error(function(data, status) {
          if (status === status.UNAUTHORIZED) {
            $scope.users = null;
          }
        });
      };
    //$scope.newUser.username = '';
    // $scope.insertUser = function () {

    //     $insertUser();
    //     $scope.newUser.username = '';
    // };

    // $scope.deleteUser = function (id) {
    //     $deleteUser(id);
    // };

    $scope.load();

    setTimeout(function() {
    $scope.$emit('UsersController');
  }, 0);
};

exports.CustomFooterController = function($window, $scope) {
  $scope.liurl = 'https://www.linkedin.com/in/zhangshuyu';
  $scope.ghurl = 'https://github.com/zhangtreefish';
  $scope.go = function(url) {
    $window.open(url);
  };
};

exports.AddToPortfolioController = function($scope, $http, $user, $timeout, $shareProject) {
  $scope.project = $shareProject.project;

  $scope.addToPortfolio = function(project) {
    var obj = { project: project};
    $user.user.data.portfolio.push(obj);

    $http.
      put('/api/v1/me/portfolio', { data: { portfolio: $user.user.data.portfolio } }).
      success(function(data) {
        $user.loadUser($http);
        $scope.success = true;

        $timeout(function() {
          $scope.success = false;
        }, 5000);
      });
  };

  setTimeout(function() {
    $scope.$emit('AddToPortfolioController');
  }, 0);
};

exports.ProjectsByToolController = function($scope, $routeParams, $http, $log) {
  $scope.tool = $routeParams.tool;
  var encoded = encodeURIComponent($routeParams.tool);
  $scope.load = function() {
    $http.
      get('/api/v1/projects/tool/' + encoded).
      success(function(data) {
        $scope.projects = data.projects;
      });
  };

  $scope.load();

  setTimeout(function() {
    $scope.$emit('ProjectsByToolController');
  }, 0);
};

exports.ToolProjectsTwoController = function($scope, $routeParams, $http, $shareTool, $log, $location, $route) {
  $scope.selectedTool = $shareTool.selectedTool;
  var encode = $shareTool.selectedTool._id;
  $log.log('trying hard getting $scope.projects with $scope.selectedTool', $scope.selectedTool);
  $scope.load = function() {
    $http.
      get('/api/v1/projects/tool/' + $scope.selectedTool._id).
      success(function(data) {
        $location.path('/tools');
        $scope.projects = data.projects;
        //$route.reload();
        $log.log('$scope.projects', $scope.projects);
      }).
      error(function (err) {
        console.error(err);
      });
  };

  $scope.load();

  setTimeout(function() {
    $scope.$emit('ToolProjectsTwoController');
  }, 0);
};

exports.AnyToolTwoController = function($scope, $http, $window, $log, $shareTool) {
  $scope.selectedTool = $shareTool.selectedTool;

  $scope.load = function() {
    $http.
      get('/api/v1/tools').
      success(function(data){
        $scope.tools = data.tools;
      });
  };

  $scope.load();

  setTimeout(function() {
    $scope.$emit('AnyToolTwoController');
  }, 0);
};

exports.NavBarController = function($scope, $user) {
  $scope.user = $user;

  setTimeout(function() {
    $scope.$emit('NavBarController');
  }, 0);
};

exports.ProjectDetailsController = function($scope, $routeParams, $http, $log) {
  var encoded = encodeURIComponent($routeParams.id);
  $scope.load = function() {
    $http.
      get('/api/v1/project/' + encoded).
      success(function(data) {
        $scope.project = data.project;
      });
    };

  $scope.load();

  setTimeout(function() {
    $scope.$emit('ProjectDetailsController');
  }, 0);
};

exports.UserDetailsController = function($scope, $http, $window, $routeParams, $log) {
  var tools = [];
  var encoded = encodeURIComponent($routeParams.id);

  $scope.load = function() {
    $http.
      get('/api/v1/user/' + encoded).
      success(function(data) {
        $scope.user = data.user;
        $scope.projects = data.user.data.portfolio;

        $scope.projects.forEach(function(p, i) {
          $http.
            get('/api/v1/project/' + p._id).
            success(function(data) {
              tools.concat(data.project.tools);
          });
        });

        $log.log('tools', tools);
        $scope.tools = tools.filter(function(tool, pos) {
          return tools.indexOf(tool) === pos;
        });
        $log.log('$scope.tools', $scope.tools);
        $scope.toolProjects = $scope.projects.filter(function(val, pos) {
          return val.project.tools.indexOf($scope.selectedTool) !== -1;
        });
        $log.log('$scope.toolProjects', $scope.toolProjects);
      });
    };

  $scope.load();

  setTimeout(function() {
    $scope.$emit('UserDetailsController');
  }, 0);
};

exports.MeController = function($scope, $user, $http, $projects) {
  $scope.user = $user;
  var myProjects = [];
//TODO: refactor into factory
  $http.
    get('/api/v1/projects').
    success(function(data) {
      $scope.projects = data.projects;
    });

  $scope.add = function(item) {
    //TODO: push item to [projects], save user

  }
  $scope.updatePortfolio = function() {
    $http.
      put('/api/v1/me/portfolio', $user.user).
      success(function(data) {
        $scope.updated = true;
      });
  };


  $scope.printPortfolio = function() {
    $scope.error = null;
  };
};
