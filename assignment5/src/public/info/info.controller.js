(function () {
"use strict";

angular.module('public')
.controller('InfoController', InfoController);

InfoController.$inject = ['SignUpService', 'ApiPath'];
function InfoController(SignUpService, ApiPath) {
  var infoCtrl = this;
  infoCtrl.basePath = ApiPath;
  infoCtrl.user = SignUpService.getUser();

  infoCtrl.userExists = function() {
    return infoCtrl.user.first_name != null;
  }
}


})();