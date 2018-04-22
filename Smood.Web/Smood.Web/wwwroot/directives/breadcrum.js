(function () {
    'use strict';

    angular.module('smoodWebApp')
        .directive('breadcrum', function () {
            return {
                restrict: 'E',
                scope: {
                    submitFunction: '=?',
                    cancelFunction: '=?',
                    breadcrumFunction: '=?',
                    showSubmitButtons: '=?'
                },
                controller: function ($scope, $timeout, $location) {
                    var _capitalizeFirstLetter = function (string) {
                        return string.charAt(0).toUpperCase() + string.slice(1);
                    }

                    var _getPreviousPath = function (index, array) {
                        var pathToReturn = "#";
                        for (var i = 0; i <= index; i++) {
                            pathToReturn += array[i]+ "/";
                        }
                        return pathToReturn;
                    };

                    var _recalculateBreadCam = function () {
                        if (!$scope.breadcrumFunction) {
                            $scope.path = [];
                            var path = $location.path();
                            var splitter = path.split("/");


                            for (var i = 1; i < splitter.length; i++) {
                                var elem = splitter[i];
                                if (i == 1 || ["list", "edit", "create", "view"].includes(elem)) {
                                    elem = _capitalizeFirstLetter(elem);
                                }
                                if (!Number(elem)) {
                                    $scope.path.push({
                                        Text: elem,
                                        Active: false,
                                        Path: _getPreviousPath(i, splitter)
                                    });
                                }
                            }
                            $scope.path[$scope.path.length - 1].Active = true;
                        }
                        else {
                            $scope.path = $scope.breadcrumFunction();
                        }

                        if ($location.path().indexOf("create") != -1 || $location.path().indexOf("edit") != -1) {
                            $scope.showSubmitButtons = true;
                        }
                        else if (!$scope.showSubmitButtons) {
                            $scope.showSubmitButtons = false;
                        }
                        else {
                            $scope.showSubmitButtons = false;
                        }
                    };

                    $scope.$watch('showSubmitButtons', (newValue, oldValue) => {
                        if (newValue != oldValue) {
                            $scope.showSubmitButtons = newValue;
                        }
                    });

                    $scope.$watch('breadcrumFunction', (newValue, oldValue) => {
                        if (newValue != oldValue) {
                            _recalculateBreadCam();
                        }
                    });

                    _recalculateBreadCam();

                    $scope.$on('$locationChangeSuccess', function () {
                        $scope.submitFunction = undefined;
                        $scope.cancelFunction = undefined;
                        $scope.breadcrumFunction = undefined;
                        $scope.showSubmitButtons = undefined;
                        _recalculateBreadCam();
                    });

                    $scope.doCancel = function () {
                        $scope.cancelFunction();
                    };

                    $scope.doSubmit = function () {
                        $scope.submitFunction();
                    };

                },
                templateUrl: 'views-directives/breadcrum.html'
            }
        });
})();
