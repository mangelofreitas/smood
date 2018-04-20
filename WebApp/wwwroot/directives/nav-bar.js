(function () {
    'use strict';

    angular.module('smoodWebApp')
        .directive('navBar', function () {
            return {
                restrict: 'E',
                templateUrl: 'views-directives/nav-bar.html'
            }
        });
})();
