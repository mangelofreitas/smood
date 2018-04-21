(function () {
    'use strict';

    angular.module('smoodWebApp')
        .directive('navBar', function () {
            return {
                restrict: 'E',
                scope: {
                    cancelFunction: '=?',
                    submitFunction: '=?',
                    getClass: '='
                },
                templateUrl: 'views-directives/nav-bar.html'
            }
        });
})();
