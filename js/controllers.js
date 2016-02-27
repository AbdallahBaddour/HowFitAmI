var app = angular.module('app.controllers', []);

app.controller('caloriyatCtrl', function ($scope, $ionicPopup) {

  var w = 0, h = 0, hm = 0, calories = 0;

  $scope.formData = {
    weight: "",
    heigh: ""
  };

  $scope.user = {
    gender: "",
    age: "op2"
  };

  $scope.bmi = function (form) {
    if (form.$valid) {
      w = $scope.formData.weight;
      h = $scope.formData.heigh;
      //console.log("W: ", w, "H:", h);
      var result = 0, note = null;


      hm = (h / 100);
      result = (w / (hm * hm)).toFixed(1);
      note = null;

      //console.log("result: ", result);
      //metric
      if (result < 18.5) {

        note = "UnderWeight";
      }
      else if (result > 18.5 && result < 24.9) {
        note = "Normal weight";
      }
      else if (result > 25.0 && result < 29.9) {
        note = "Overweight";
      }
      else if (result > 30.0) {
        note = "Obesity";
      }

      var alertPopup = $ionicPopup.alert({
        title: 'Result',
        template: note
      });
      

    }
    


  };

  $scope.cpd = function (form) {
    if ($scope.bmiform.$valid) {
      w = $scope.formData.weight;
      h = $scope.formData.heigh;
      hm = (h / 100);
      if (form.$valid) {
        if ($scope.user.gender == "male") {
          //console.log("hm: ", hm, "w: ", w, "h: ", h);
          calories = (665 + (6.3 * (w * 2.20462)) + (12.9 * (hm * 0.393701)) - (6.8 * 24));
          //console.log("calories: ", calories.toFixed(0));
          var alertPopup = $ionicPopup.alert({
            title: 'Calories per Day',
            template: 'You need to eat: <b>' + calories.toFixed(0) + '</b> per day.'
          });
        }
        else if ($scope.user.gender == "female") {
          //console.log("Female");
          //console.log("age: ", $scope.user.age);

          if ($scope.user.age == "op1") {
            calories = (455 + (4.3 * (w * 2.20462)) + (4.7 * (hm * 0.393701)) - (4.7 * 24));
            //console.log("calories: ", calories.toFixed(0));
            var alertPopup = $ionicPopup.alert({
              title: 'Calories per Day',
              template: 'You need to eat: <b>' + calories.toFixed(0) + '</b> per day.'
            });
          }
          else if ($scope.user.age == "op2") {
            calories = (655 + (4.3 * (w * 2.20462)) + (4.7 * (hm * 0.393701)) - (4.7 * 24));
            //console.log("calories: ", calories.toFixed(0));
            var alertPopup = $ionicPopup.alert({
              title: 'Calories per Day',
              template: 'You need to eat: <b>' + calories.toFixed(0) + '</b> per day.'
            });
          }
        }
      }
      else {
        //console.log("invalid form 2");
        var alertPopup = $ionicPopup.alert({
          title: 'Error',
          template: 'Please fill required fields',
          buttons: [
            {
              text: 'Cancel',
              type: 'button-assertive'
            }
          ]
        });
      }

    }
    else {
      //console.log("invalid form 1");
      var alertPopup = $ionicPopup.alert({
        title: 'Error',
        template: 'Please fill required fields',
        buttons: [
          {
            text: 'Cancel',
            type: 'button-assertive'
          }
        ]
      });
    }
  };


});

app.controller('SearchCtrl', function ($scope, $http, $ionicPopup, $ionicLoading) {


  $scope.food = {
    info: ""
  }
  $scope.details = {};
  $scope.select = function () {
    //console.log("search for: ", $scope.food.info);
    if ($scope.food.info != ""){
      $ionicLoading.show();
      //You will get the APP ID and KEY when you create a free account on http://www.nutritionix.com/business/api
      $http.get("https://api.nutritionix.com/v1_1/search/" + $scope.food.info + "?results=0%3A20&cal_min=0&cal_max=50000&fields=nf_calories%2Citem_name%2Cbrand_name%2Citem_id%2Cbrand_idcalories%2Citem_name%2Citem_id&appId=YOUR_APP_ID&appKey=YOUR_APP_KEY")
        .then(function (response) {

          if (response.data.max_score == null) {
            $ionicLoading.hide();
            $scope.details = response.data.hits;
            //console.log("no items found");
            var alertPopup = $ionicPopup.alert({
              title: 'Oops!',
              template: 'No items found ...',
              buttons: [
                {
                  text: 'Try again',
                  type: 'button-positive'
                }
              ]
            });
          }
          else {
            $ionicLoading.hide();
            $scope.details = response.data.hits;
            //console.log("result:", $scope.details);
            }
        });
  }
  }
});
