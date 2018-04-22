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
                inputId: '@',
                onChange: '=?',
                required: '=?',
                disabled: '=?'
            },
            controller: function($scope, $timeout) {
                if(!$scope.type) {
                    $scope.type = "text";
                }

                if (!$scope.placeholder) {
                    $scope.placeholder = $scope.label;
                }

                //04 / 22 / 2018 10: 02 AM

                var _getDataValueFormatted = date => {
                    var newDate = new Date(date);
                    var partOfDay = "";
                    var hoursOfDay = newDate.getHours();
                    if (hoursOfDay == 0) {
                        partOfDay = "PM";
                        hoursOfDay = 12;
                    }
                    else if(hoursOfDay <= 12) {
                        partOfDay = "AM";
                    }
                    else if (hoursOfDay > 12) {
                        partOfDay = "PM";
                        hoursOfDay -= 12;
                    }
                    return (newDate.getMonth() + 1) + "/" + newDate.getDate() + "/" + newDate.getFullYear() + " " + hoursOfDay + ":" + newDate.getMinutes() + " " + hoursOfDay;
                };

                if ($scope.type == "dateAndPlaceholder") {

                    $timeout(() => {
                        $("#" + $scope.inputId + " > input").val(_getDataValueFormatted($scope.model));
                        $("#" + $scope.inputId).datetimepicker({
                            locale: 'pt'
                        });
                    });
                }

                $scope.onUnSelect = e => {
                    $scope.onChange($scope.model, $("#" + $scope.inputId + " > input").val());
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