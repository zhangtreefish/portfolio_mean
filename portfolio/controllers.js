exports.AddToPortfolioController = function($scope, $http, $user, $timeout) {
  $scope.addToPortfolio = function(project) {
    var obj = { project: project._id};
    $user.user.data.portfolio.push(obj);

    $http.
      put('/api/v1/me/portfolio', { data: { portfolio: $user.user.data.portfolio } }).
      success(function(data) {
        $user.loadUser();
        $scope.success = true;

        $timeout(function() {
          $scope.success = false;
        }, 5000);
      });
  };
};

exports.ProjectsByToolController = function($scope, $routeParams, $http) {
  $scope.tool = encodeURIComponent($routeParams.tool);
  $scope.load = function() {
    $http.
      get('/api/v1/projects/tool/' + $scope.tool).
      success(function(data) {
        $scope.projects = data.projects;
      });
  };

  $scope.load();

  setTimeout(function() {
    $scope.$emit('ProjectsByToolController');
  }, 0);
};

exports.ToolProjectsTwoController = function($scope, $routeParams, $http, $shareTool, $log) {
  $scope.selectedTool = $shareTool.selectedTool;
  var encode = $shareTool.selectedTool._id;
  $log.log('$scope.selectedTool._is', $scope.selectedTool._id);
  $scope.load = function() {
    $http.
      get('/api/v1/projects/tool/' + $scope.selectedTool._id).
      success(function(data) {
        $scope.projects = data.projects;
        $log.log('projects', $scope.projects);
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

exports.ProjectDetailsController = function($scope, $routeParams, $http) {
  var encoded = encodeURIComponent($routeParams.id);

  $http.
    get('/api/v1/project/id/' + encoded).
    success(function(data) {
      $scope.project = data.project;
    });

  setTimeout(function() {
    $scope.$emit('ProjectDetailsController');
  }, 0);
};
