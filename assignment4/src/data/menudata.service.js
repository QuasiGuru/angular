(function () {
'use strict';

angular.module('MenuApp')
.service('MenuDataService', MenuDataService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");


MenuDataService.$inject = ['$http', 'ApiBasePath']
function MenuDataService($http, ApiBasePath) {
  var service = this;

  service.getAllCategories = function() {
    return $http.get(ApiBasePath + '/categories.json')
    .then(function (response) {
      return response.data;
    });
  };

  service.getItemsForCategory = function(category) {
    return $http.get(ApiBasePath + '/menu_items.json?category=' + category)
    .then(function(response) {
      return response.data;
    })
  };
}

})();
