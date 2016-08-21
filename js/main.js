(function() {
  'use strict';
  angular.module('app').controller('Main', ['$http', Main]);

  function Main($http) {
    var vm = this;
    vm.schema = [];
    vm.getSchema = function() {
    	$http({
        method: 'GET',
        url: '/schema.json'
      }).then(function success(data){
      	vm.schema = data.data;
      	console.log(vm.schema);
      }, function fail(data){

      });
    };
    vm.getSchema();
  }
}());
