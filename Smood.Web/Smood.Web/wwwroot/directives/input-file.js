(function () {
	'use strict';

	angular.module('smoodWebApp').directive('inputFile', function () {
        return {
            restrict: 'E',
            scope: {
                model: '=',
                id: '@',
                label: '@',
                multiple: '='
            },
            controller: function($scope) {
                $scope.OnSelect = ($file, $files) => { 
                    if($scope.multiple){
                        $scope.model = $files
                    } else {
                        $scope.model = $file;
                    }
                };       
            },
            templateUrl: function() {
                return 'views-directives/input-file.html';
            }            
        }
    })
})();