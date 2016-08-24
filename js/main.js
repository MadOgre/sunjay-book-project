(function() {
  'use strict';
  angular.module('app').controller('Main', ['$http', Main]);

  function Main($http) {
    var vm = this;
    vm.isLoaded = false;
    vm.schema = [];
    vm.results = ["4","1","7"];
    
    vm.getSchema = function() {
    	$http({
        method: 'GET',
       // url: '/schema.json'
        url: 'http://default-environment.ymuptkfrgv.us-west-2.elasticbeanstalk.com/getAdultMaleParts'
      }).then(function success(data){
      	vm.schema = data.data;
      	vm.isLoaded = true;
      }, function fail(data){

      });
    };
    vm.getSchema();
    vm.postPerson = function() {
      var response = {
        user_id: "test_user1",
        avatar_name: "test_avatar1",
        image_id_list: vm.results.map(function(item){return parseInt(item);})
      }
      // vm.schema.forEach(function(item){
      //   response.image_id_list += $('input[name=' + item.image_type + ']:checked').val() + ",";
      // });
      // response.image_id_list = response.image_id_list.slice(0, -1);
      console.log("About to send response: " + JSON.stringify(response));
      $http({
        method: 'POST',
        url: 'http://default-environment.ymuptkfrgv.us-west-2.elasticbeanstalk.com/setUserSelection',
        headers: {
          "Content-Type": "application/json"
        },
        data: response
      }).then(function(data){
        console.log(data);
      });
    }

    // vm.switchImages = function(image_type, location, image_x, image_y) {
    //   console.log("called");
    //   console.log(image_type + ": " + location);
    //   switch (image_type) {
    //     case "ADULT_BODY":
    //       $scope.bodypath = location;
    //       $scope.bodycoords.x = image_x;
    //       $scope.bodycoords.y = image_y;
    //       $(".img-body").css("top", $scope.bodycoords.y);
    //       console.log(vm.bodycoords.y);
    //       break;
    //     case "ADULT_FACE":
    //       $scope.facepath = location;
    //       $scope.facecoords.x = image_x;
    //       $scope.facecoords.y = image_y;
    //       $(".img-face").css("top", $scope.facecoords.y);
    //       break;
    //     case "ADULT_EYES":
    //       $scope.eyespath = location;
    //       $scope.eyescoords.x = image_x;
    //       $scope.eyescoords.y = image_y;
    //       $(".img-eyes").css("top", $scope.eyescoords.y);
    //       break;  
    //   };
    // }
  }
}());
