(function() {
  'use strict';
  angular.module('app').controller('Main', ['$http', '$scope', Main]);

  function Main($http, $scope) {
    var vm = this;
    vm.isLoaded = false;
    vm.schema = [];
    vm.avatarNames = [];
    vm.avatarDefaults = ["25","31","-1", "-2", "28", "7"];
    vm.results = [];
    vm.currentAvatar = {
      name: "",
      images: ["25","31","-1", "-2", "28", "7"]
    }
    vm.imageUrls = {};
    vm.currentUser = "";
    vm.currentAvatarIndex = 0;

    vm.getImageById = function(id) {
      return imageUrls[id];
    };
    
    vm.getSchema = function() {
    	$http({
        method: 'GET',
        //url: '/schema.json'
        // url: 'http://default-environment.ymuptkfrgv.us-west-2.elasticbeanstalk.com/getAdultMaleParts'
        url: 'http://178.62.255.163:8080/FamilyStoryWebService/getAdultMaleParts'
      }).then(function success(data){
      	vm.schema = data.data;
        vm.schema.forEach(function(item){
          item.values.forEach(function(value){
            vm.imageUrls[value.image_id] = {
              location: value.image_location,
              image_x: value.image_x,
              image_y: value.image_y
            };
          });
        });
        console.log(JSON.stringify(vm.imageUrls));
      	vm.isLoaded = true;
      }, function fail(data){

      });
    };
    vm.getSchema();
    vm.postPerson = function() {
      var response = {
        user_id: vm.currentUser,
        avatar_name: vm.currentAvatar.name,
        image_id_list: vm.currentAvatar.images.map(function(item){return parseInt(item);})
      }
      // vm.schema.forEach(function(item){
      //   response.image_id_list += $('input[name=' + item.image_type + ']:checked').val() + ",";
      // });
      // response.image_id_list = response.image_id_list.slice(0, -1);
      console.log("About to send response: " + JSON.stringify(response));
      $http({
        method: 'POST',
        // url: 'http://default-environment.ymuptkfrgv.us-west-2.elasticbeanstalk.com/setUserSelection',
        url: 'http://178.62.255.163:8080/FamilyStoryWebService/setUserSelection',
        headers: {
          "Content-Type": "application/json"
        },
        data: response
      }).then(function(data){
        if (data.data.result = "SUCCESS") {
          alert("Saved!");
          vm.results.push(Array.prototype.slice.call(vm.currentAvatar.images));
          vm.avatarNames.push(vm.currentAvatar.name);
          vm.currentAvatar.name = "";
          vm.currentAvatar.images = Array.prototype.slice.call(vm.avatarDefaults);
          vm.currentAvatarIndex++;
        }
        console.log(data);
        console.log(vm.avatarNames);
        console.log(vm.results);
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
