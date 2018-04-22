(function () {
    'use strict';

    angular.module('smoodWebApp')
        .controller('EventController', function ($scope, $rootScope, $location, $routeParams, apiConnector, Upload) {

            $scope.event = {};

            $scope.tabIndex = 1;
            $scope.baseUrl = $rootScope.constants.baseUrl;

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

            $scope.uploadImages = ($files) => {

                var filesPromise = Upload.base64DataUrl($files);
                var postPromise = filesPromise.then( filesData => {
                    filesData = filesData.map( fd => { 
                        fd = fd.replace(/^data:image\/(png|jpg|jpeg|gif);base64,/, "")
                        return fd;
                    });                    
                    return apiConnector.postImage($routeParams.id, "event", filesData)
                });

                postPromise.then( result => {
                    console.log(result);
                })
                .catch(err => {
                    $location.path("/error");
                    $rootScope.hideLoadingAnimation(true);                    
                });

            };

            var _submit = submitEvent => {
            };

            $scope.submit = _submit;

            $rootScope.submitFunction = ($event) => {
                _submit($event);
            };

        });
})();