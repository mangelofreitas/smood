(function () {
    'use strict';

    angular.module('smoodWebApp')
        .controller('EventController', function ($scope, $rootScope, $location) {
            $scope.event = {};

            $scope.cancel = () => {
                $location.path('/dashboard');
            };
        });
})();