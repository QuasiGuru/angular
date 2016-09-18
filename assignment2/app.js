(function () {
    'use strict';

    angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyShoppingController', ToBuyShoppingController)
    .controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyShoppingController(ShoppingListCheckOffService) {
        var toBuy = this;

        toBuy.items = ShoppingListCheckOffService.getBuyList();

        toBuy.empty = function () {
            return ShoppingListCheckOffService.everythingBought();
        };

        toBuy.buyItem = function (index) {
            ShoppingListCheckOffService.buyItem(index);
        };
    }

    AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
        var alreadyBought = this;

        alreadyBought.items = ShoppingListCheckOffService.getBoughtList();
        alreadyBought.empty = function () {
            return ShoppingListCheckOffService.nothingBought();
        };
    }

    function ShoppingListCheckOffService() {
        var service = this;
        var boughtList = [];
        var buyList = [
        {
            name: "Pens",
            quantity: "10"
        },
        {
            name: "USB Drives",
            quantity: "5"
        },
        {
            name: "Mice",
            quantity: "10"
        },
        {
            name: "Monitors",
            quantity: "2"
        },
        {
            name: "Binders",
            quantity: "100"
        }];

        service.buyItem = function (index) {
            boughtList.push(buyList[index]);
            buyList.splice(index, 1);
        };

        service.getBuyList = function () {
            return buyList;
        };

        service.getBoughtList = function () {
            return boughtList;
        };

        service.nothingBought = function () {
            return boughtList.length === 0;
        }

        service.everythingBought = function () {
            return buyList.length === 0;
        }
    }

})();