(function () {
    'use strict';

    angular.module('smoodWebApp')
        .directive('navBar', function () {
            return {
                restrict: 'E',
                scope: {
                    cancelFunction: '=?',
                    submitFunction: '=?',
                    getClass: '=',
                    breadcamFunction: '=?',
                    showSubmitButtons: '=?'
                },
                templateUrl: 'views-directives/nav-bar.html'
            }
        });
})();
