(function () {
    'use strict';

    angular.module('smoodWebApp')
        .directive('loadingOverlay', function () {
            return {
                restrict: 'E',
                templateUrl: 'views-directives/loading-overlay.html'
            }
        });
})();
