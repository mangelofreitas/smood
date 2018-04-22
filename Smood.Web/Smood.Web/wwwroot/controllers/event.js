(function () {
    'use strict';

    angular.module('smoodWebApp')
        .controller('EventController', function ($scope, $rootScope, $location, apiConnector, Upload, $routeParams) {

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
                $scope.card = result;
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
                $rootScope.hideLoadingAnimation(true);
            }, err => {
                $location.path("/error");
                $rootScope.hideLoadingAnimation(true);
            });


            var _submit = submitEvent => {

                if (!$scope.event.file) {
                    alert("Please select an image!");
                    return;
                }

                Upload.base64DataUrl($scope.event.file)
                    .then(file64 => {
                        $scope.event.imageData = file64.replace(/^data:image\/(png|jpg|jpeg|gif);base64,/, "");;

                        apiConnector.post("event", $scope.event)
                            .then(response => {
                                console.log(response);
                                $('#create-event').modal('hide');
                                $location.path("event/view/" + response.eventId);
                            })
                            .catch(err => {
                                console.log(err);
                                alert("Problem to save");
                            })
                    });
            };

            $scope.submit = _submit;

            $rootScope.submitFunction = ($event) => {
                _submit($event);
            };

        });
})();