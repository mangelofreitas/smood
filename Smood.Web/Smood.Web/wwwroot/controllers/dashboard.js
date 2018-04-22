(function () {
    'use strict';

    angular.module('smoodWebApp')
        .controller('DashboardController', function ($scope, $location, $rootScope, apiConnector) {

            $rootScope.showLoadingAnimation();
            apiConnector.getAll("event").then(result => {
                $scope.nEvents = result.length;
                $rootScope.hideLoadingAnimation(true);
            }, error => {
                $rootScope.hideLoadingAnimation(true);
                $location.path("error");
            });
        });
})();
