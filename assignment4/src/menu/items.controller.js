(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemsController', ItemsController);

ItemsController.$inject = ['items'];
function ItemsController(items) {
  var itemsList = this;
  itemsList.meals = items.menu_items;
  itemsList.title = items.category.name;
}

})();
