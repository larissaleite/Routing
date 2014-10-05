var app = angular.module('adote', ['ngCookies', 'ngResource', 'ngRoute', 'ngAnimate', 'flow', 'ngTagsInput', 'ngSanitize', 'mgcrea.ngStrap'])
  
  app.config(function($locationProvider, $routeProvider, $httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    })
  .controller('MenuCtrl', function($scope, $http, $location) {

    $scope.selectedAnimal = "";

    /* refactor to get only id, name and pic instead of the whole obj to increase performance */
    $http.get('/api/animals')
      .success(function(response) {
        $scope.animals = response;
      }).error(function(response){
         console.log("erro "+response);
      });

    $scope.$on('$typeahead.select', function() {
      $scope.selectedValue = $scope.selectedAnimal;
      $scope.selectedAnimal = "";
      window.location.href = '/animal/'+$scope.selectedValue._id;

    });

});