(function () {
'use strict';

angular.module('MenuApp')
.component('categories', {
  templateUrl: 'src/menu/templates/menucategories.template.html',
  bindings: {
    items: '<'
  }
});

})();
