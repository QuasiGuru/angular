(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

function FoundItemsDirective() {
    var ddo = {
        templateUrl: 'foundItems.html',
        scope: {
            items: '<foundItem',
            onRemove: '&',
            hasError: '&',
        },
        controller: FoundItemsDirectiveController,
        controllerAs: 'menu',
        bindToController: true
    };

    return ddo;
}

function FoundItemsDirectiveController() {
    var menu = this;

    menu.hasItems = function() {
        return menu.items.length > 0;
    }
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
    var narrow = this;

    narrow.found = [];
    narrow.hasError = false;

    narrow.narrowMenu = function() {
        var promise = MenuSearchService.getMatchedMenuItems(narrow.searchTerm);
        promise.then(function (response) {
            narrow.found = response;
            if (narrow.found.length == 0) {
                narrow.hasError = true;
            } else {
                narrow.hasError = false;
            }
        })
        .catch(function () {
            narrow.found = [];
            narrow.hasError = true;
        });
    };

    narrow.removeItem = function(index) {
        narrow.found.splice(index, 1);     
    };

    narrow.isError = function() {
        return narrow.hasError;
    }
}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
    var service = this;

    service.getMatchedMenuItems = function(searchTerm) {
        return $http({
            method: "GET",
            url: (ApiBasePath + '/menu_items.json')
        }).then(function (result) {
            var foundItems = [];
            if (searchTerm === null || searchTerm === "") return foundItems;
            
            var discs = result.data.menu_items;

            for (var d in discs) {
                if (discs[d].description.indexOf(searchTerm) != -1) {
                    foundItems.push({
                        name: discs[d].name,
                        short_name: discs[d].short_name,
                        description: discs[d].description
                    });
                }
            }
            return foundItems;
        })
    };    
}

})();