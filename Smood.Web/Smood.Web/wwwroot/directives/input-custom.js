(function () {
	'use strict';

	angular.module('smoodWebApp').directive('inputCustom', function () {
        return {
            restrict: 'E',
            scope: {
                model: '=',
                id: '@',
                label: '@',
                type: '@'                
            },
            controller: function($scope) {
                if(!$scope.type) {
                    $scope.type = "text";
                }
            },
            templateUrl: function() {
                return 'views-directives/input-custom.html';
            }            
        }
    })
})();