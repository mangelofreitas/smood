(function () {
    'use strict';

    angular.module('smoodWebApp')
        .controller('PageNotFoundController', function ($rootScope) {
            $rootScope.hideLoadingAnimation(true);
        });
})();