(function () {
    'use strict';

    angular.module('smoodWebApp')
        .controller('EventController', function ($scope, $rootScope, $location, $routeParams, apiConnector, Upload) {

            $scope.event = {};

            $scope.tabIndex = 1;

            $rootScope.cancelFunction = () => {
                $location.path('/event');
            };

            $scope.changeTab = (tabNumber,withSubmit) => {
                $rootScope.showSubmitButtons = withSubmit;
                $scope.tabIndex = tabNumber;
            };

            $rootScope.showLoadingAnimation();
            apiConnector.get($routeParams.id, "event").then(result => {
                $rootScope.dataForBreadcrumFunction = function () {
                    return [
                        {
                            Text: "Event",
                            Active: false,
                            Path: "#/event"
                        },
                        {
                            Text: result.name,
                            Active: true,
                            Path: null
                        }
                    ];
                }
                $scope.event = result;
                $rootScope.hideLoadingAnimation(true);
            }, err => {
                $location.path("/error");
                $rootScope.hideLoadingAnimation(true);
            });


            var _submit = submitEvent => {
            };

            $scope.submit = _submit;

            $rootScope.submitFunction = ($event) => {
                _submit($event);
            };

        });
})();