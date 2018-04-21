(function () {
    'use strict';

    angular.module('smoodWebApp')
        .directive('footerDir', function () {
            return {
                restrict: 'E',
                templateUrl: 'views-directives/footer-dir.html'
            }
        });
})();
