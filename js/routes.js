(function() {
  'use strict';
  angular.module('app')
  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    $routeProvider
      .when("/", {
        templateUrl: "/partials/main.html",
        controller: "Main"
      })
      .otherwise({
        redirectTo: '/'
      });


    $locationProvider.html5Mode(true).hashPrefix('!');
  }]);
}());
