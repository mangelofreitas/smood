(function () {
	'use strict';

	angular.module('smoodWebApp').directive('inputCustom', function () {
        return {
            restrict: 'E',
            scope: {
                model: '=',
                id: '@',
                label: '@',
                type: '@',
                placeholder: '@',
                inputId: '@'
            },
            controller: function($scope, $timeout) {
                if(!$scope.type) {
                    $scope.type = "text";
                }

                if (!$scope.placeholder) {
                    $scope.placeholder = $scope.label;
                }

                if ($scope.type == "dateAndPlaceholder") {
                    $timeout(() => {
                        console.log($scope.fatherId + " #" + $scope.inputId);
                        $($scope.fatherId+" #" + $scope.inputId).datetimepicker({
                            locale: 'pt'
                        });
                    });
                }

                $scope.onUnSelect = e => {

                };

            },
            templateUrl: function (elem, attrs) {
                if (attrs.type == 'dateAndPlaceholder') {
                    return 'views-directives/date-input-placeholder.html';
                } else {
                    return 'views-directives/input-custom.html';
                }
            }            
        }
    })
})();