(function () {
	'use strict';

	angular.module('smoodWebApp').directive('inputFile', function () {
        return {
            restrict: 'E',
            scope: {
                model: '=?',
                id: '@',
                label: '@',
                multiple: '=?',
                uploadFunction: '=?'
            },
            controller: function($scope) {
                $scope.OnSelect = ($file, $files) => { 
                    if($scope.multiple){
                        $scope.model = $files;    
                    } else {
                        $scope.model = $file;                      
                    }

                    if($scope.uploadFunction){
                        $scope.uploadFunction($scope.model);
                    }  
                };       
            },
            templateUrl: function() {
                return 'views-directives/input-file.html';
            }            
        }
    })
})();