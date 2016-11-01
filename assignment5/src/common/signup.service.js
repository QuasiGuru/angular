(function () {
"use strict";

angular.module('common')
.service('SignUpService', SignUpService);


SignUpService.$inject = ['$http', 'ApiPath'];
function SignUpService($http, ApiPath) {
    var service = this;
    service.user = {};

    service.getUser = function() {
        return service.user;
    }

    service.setUser = function (number, newUser) {
        return $http.get(ApiPath + '/menu_items/' + number + '.json').then(function (response) {
            newUser.meal = {"short_name": response.data.short_name,
                            "name": response.data.name,
                            "description": response.data.description};
            
            service.user = newUser;
            return service.user;
        });
    };
}

})();