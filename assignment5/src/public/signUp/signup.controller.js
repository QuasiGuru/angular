(function () {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ["SignUpService"];
function SignUpController(SignUpService) {
  var $signCtrl = this;
  $signCtrl.user = SignUpService.getUser();
  $signCtrl.noMeal = false;
  $signCtrl.successSignUp = false;

  $signCtrl.noMealFound = function() {
    return $signCtrl.noMeal;
  }

  $signCtrl.submit = function() {
    var newUser = $signCtrl.user;
    var promise = SignUpService.setUser(newUser.fav_meal, newUser);

    promise.then(function (response) {
      $signCtrl.successSignUp = true
      $signCtrl.noMeal = false;
      $signCtrl.user = response;
    })
    .catch(function (error) {
      $signCtrl.noMeal = true;
      $signCtrl.successSignUp = false;
    });

  }

  $signCtrl.UserAdded = function() {
    return $signCtrl.successSignUp;
  }
}


})();