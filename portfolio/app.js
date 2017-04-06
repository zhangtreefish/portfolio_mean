var app = angular.module('myApp', ['ng']);

app.directive('userMenu', function() {
  return {
    controller: 'PortfolioHttpController',
    templateUrl: '/portfolio/template.html'
  }
});

app.controller('PortfolioHttpController', function($scope, $http) {
  $http.get('/api/v1/me').success(function(data) {
    $scope.user = data.user;
  });

  setTimeout(function() {
    $scope.$emit('PortfolioHttpController');
  }, 0);
});
