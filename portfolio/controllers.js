// exports.AddToCartController = function($scope, $http, $user, $timeout) {
//   $scope.addToCart = function(product) {
//     var obj = { product: product._id, quantity: 1 };
//     $user.user.data.cart.push(obj);

//     $http.
//       put('/api/v1/me/cart', { data: { cart: $user.user.data.cart } }).
//       success(function(data) {
//         $user.loadUser();
//         $scope.success = true;

//         $timeout(function() {
//           $scope.success = false;
//         }, 5000);
//       });
//   };
// };

exports.ToolProjectsController = function($scope, $routeParams, $http) {
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
    $scope.$emit('ToolProjectsController');
  }, 0);
};

exports.ToolProjectsTwoController = function($scope, $routeParams, $http, $shareTool, $log) {
  $scope.selectedTool = $shareTool.selectedTool;
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

exports.AnyToolController = function($scope, $http, $window, $log) {
  $scope.load = function() {
    $http.
      get('/api/v1/tools').
      success(function(data){
        $scope.tools = data.tools;
      });
  };

  $scope.goPickedTool = function(){
    var url = "http://" + $window.location.host + "/portfolio/#/tool/"+$scope.pickedTool._id;
    $log.log('url', url);
    $window.location.href = url;
  };

  $scope.load();

  setTimeout(function() {
    $scope.$emit('AnyToolController');
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
