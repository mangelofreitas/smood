(function () {
    'use strict';

    angular.module('smoodWebApp')
        .controller('EventController', function ($scope, $rootScope, $location, $routeParams, apiConnector, Upload) {
            const emotionChartColor = {
                Happy: "#30BA24",
                Angry: "#FD0500",
                Sad: "#2574BC",
                Unknown: "#000000",
                Calm: "#CBF0F3",
                Disgusted: "#7622B0",
                Surprised: "#FFECA6",
                Confused: "#FFE1AD"
            };

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

            var _getDateFormatted = function (nonFormattedDate) {
                var newDate = new Date(nonFormattedDate);

                return newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate();
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

                apiConnector.get($routeParams.id + "/emotions-timeline?startDate=" + _getDateFormatted(result.startDate) + "&endDate=" + _getDateFormatted(result.endDate), "event/").then(dataResult => {
                    dataResult.series.forEach(e => {
                        e.borderColor = emotionChartColor[e.label];
                    });
                    $scope.emotionsChartData = dataResult;
                    $rootScope.hideLoadingAnimation(true);
                }, err => {
                    $location.path("/error");
                    $rootScope.hideLoadingAnimation(true);
                });

            }, err => {
                $location.path("/error");
                $rootScope.hideLoadingAnimation(true);
            });

            $scope.uploadImages = ($files) => {      
                $rootScope.showLoadingAnimation();          
                apiConnector.postImage($routeParams.id, "event", $files)
                .then( result => {
                    console.log(result);
                    result.data.map( r => $scope.event.photoUrls.push(r));                
                    $rootScope.hideLoadingAnimation(true);
                })
                .catch(err => {
                    $location.path("/error");
                    $rootScope.hideLoadingAnimation(true);                    
                });
            };

            var _submit = submitEvent => {                
                $rootScope.showLoadingAnimation();     
                apiConnector.put($routeParams.id, "event", $scope.event)
                .then( response => {
                    $rootScope.hideLoadingAnimation(true);          
                })
                .catch( err => {
                    $location.path("/error");
                    $rootScope.hideLoadingAnimation(true);
                });
            };     

            $scope.submit = _submit;

            $rootScope.submitFunction = ($event) => {
                _submit($event);
            };

        });
})();