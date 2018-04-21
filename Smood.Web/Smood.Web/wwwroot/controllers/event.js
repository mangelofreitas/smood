(function () {
    'use strict';

    angular.module('smoodWebApp')
        .controller('EventController', function ($scope, $rootScope, $location) {

            $scope.event = {};

            $scope.tabIndex = 1;

            $rootScope.cancelFunction = () => {
                $location.path('/event');
            };

            var _submit = function ($event) {
                var entity = $scope.event;
            };

            $scope.submit = _submit;

            $rootScope.submitFunction = ($event) => {
                _submit($event);
            };

        });
})();