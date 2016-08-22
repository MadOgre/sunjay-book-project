(function() {
  'use strict';
  angular.module('app').controller('Main', ['$http', '$scope', Main]);

  function Main($http, $scope) {
    var vm = this;
    $scope.isLoaded = false;
    $scope.schema = [];
    $scope.facepath = "";
    $scope.bodypath = "";
    $scope.eyespath = "";
    
    $scope.getSchema = function() {
    	$http({
        method: 'GET',
       // url: '/schema.json'
        url: 'http://192.168.20.56:8080/FamilyStoryWebService/getAdultMaleParts'
      }).then(function success(data){
      	$scope.schema = data.data;
      	$scope.isLoaded = true;
        $scope.facepath = $scope.schema[0].values[0].image_location;
        $scope.bodypath = $scope.schema[1].values[0].image_location;
        $scope.eyespath = $scope.schema[2].values[0].image_location;
        $scope.facecoords = {x: 0, y: 0};
        $scope.bodycoords = {x: 0, y: 0};
        $scope.eyescoords = {x: 0, y: 0};
      }, function fail(data){

      });
    };
    $scope.getSchema();
    $scope.postPerson = function() {
      var response = {
        user_id: "test_user1",
        avatar_name: "test_avatar1",
        image_id_list: ""
      }
      $scope.schema.forEach(function(item){
        response.image_id_list += $('input[name=' + item.image_type + ']:checked').val() + ",";
      });
      response.image_id_list = response.image_id_list.slice(0, -1);
      console.log("About to send response: " + JSON.stringify(response));
      $http({
        method: 'POST',
        url: 'http://192.168.20.56:8080/FamilyStoryWebService/setUserSelection',
        headers: {
          "Content-Type": "application/json"
        },
        data: response
      }).then(function(data){
        console.log(data);
      });
    }

    $scope.switchImages = function(image_type, location, image_x, image_y) {
      console.log("called");
      console.log(image_type + ": " + location);
      switch (image_type) {
        case "ADULT_BODY":
          $scope.bodypath = location;
          $scope.bodycoords.x = image_x;
          $scope.bodycoords.y = image_y;
          $(".img-body").css("top", $scope.bodycoords.y);
          console.log($scope.bodycoords.y);
          break;
        case "ADULT_FACE":
          $scope.facepath = location;
          $scope.facecoords.x = image_x;
          $scope.facecoords.y = image_y;
          $(".img-face").css("top", $scope.facecoords.y);
          break;
        case "ADULT_EYES":
          $scope.eyespath = location;
          $scope.eyescoords.x = image_x;
          $scope.eyescoords.y = image_y;
          $(".img-eyes").css("top", $scope.eyescoords.y);
          break;  
      };
    }
  }
}());
