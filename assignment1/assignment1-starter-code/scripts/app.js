(function () {
    'use strict';

    angular.module('LunchCheck', [])
    .controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject = ['$scope'];

    function LunchCheckController($scope) {
        $scope.message = "";

        $scope.checkTooMuch = function () {
            if (emptyText($scope.menu)) {
                $scope.message = "Please enter data first";
            } else {
                var nod = numberOfDishes($scope.menu);
                if (nod <= 3) {
                    $scope.message = "Enjoy!";
                } else {
                    $scope.message = "Too much!";
                }
            }
        };
    }

    function emptyText(text) {
        if (text == null || text.trim() == "") return true;
        return false; 
    }

    function numberOfDishes(text) {
        var nod = 1;

        for (var i = 0; i < text.length; i++) {
            if (text.charAt(i) == ',') nod++;
        }

        return nod;
    }

})();
