(function () {
    'use strict';

    angular.module('smoodWebApp')
        .directive('breadcrum', function () {
            return {
                restrict: 'E',
                scope: {
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
                    };


                    _recalculateBreadCam();

                    $scope.$on('$locationChangeSuccess', function () {
                        _recalculateBreadCam();
                    });


                },
                templateUrl: 'views-directives/breadcrum.html'
            }
        });
})();
