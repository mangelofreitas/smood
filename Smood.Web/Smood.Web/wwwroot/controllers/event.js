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

                return newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate() + " " + newDate.getHours() + ":" + newDate.getMinutes();
            };

            var _getEmotionChartDataFromApi = (startDate, endDate) => {
                $rootScope.showLoadingAnimation();
                var promise = apiConnector.get($routeParams.id + "/emotions-timeline?startDate=" + _getDateFormatted(startDate) + "&endDate=" + _getDateFormatted(endDate), "event/").then(dataResult => {
                    dataResult.series.forEach(e => {
                        e.borderColor = emotionChartColor[e.label];
                    });
                    $scope.emotionsChartData = dataResult;
                    $rootScope.hideLoadingAnimation(true);
                    return dataResult;
                }, err => {
                    $location.path("/error");
                    $rootScope.hideLoadingAnimation(true);
                    });
                return promise;
            };

            $scope.getEmotionChartDataFromApi = _getEmotionChartDataFromApi;

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
                $scope.emotionsFilter = {
                    startDate: result.startDate,
                    endDate: result.endDate
                };
                _getEmotionChartDataFromApi(result.startDate, result.endDate);
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