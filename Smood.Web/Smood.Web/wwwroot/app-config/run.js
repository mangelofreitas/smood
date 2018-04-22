(function () {
    'use strict';

    angular.module('smoodWebApp')
        .run(function ($rootScope, $http, $window, $location, $timeout, $document) {

            var _apiEndpoint = 'http://localhost:57623';
            //var _apiEndpoint = 'http://smood.azurewebsites.net'
            var _baseUrl = _apiEndpoint + '/';


            var showLoadingCount = 0;

            $rootScope.showLoadingAnimation = function () {
                showLoadingCount++;
                $rootScope.showLoading = true;
            };

            $rootScope.hideLoadingAnimation = function (forceHide) {

                if (forceHide) {
                    showLoadingCount = 0;
                } else {
                    showLoadingCount--;
                }

                if (showLoadingCount == 0) {
                    $rootScope.showLoading = false;
                }
            };
            
            $rootScope.getClass = function (entityName) {
                if ($location.path().indexOf(entityName) != -1) {
                    return "active";
                }
            }


            $rootScope.constants = {
                appName: 'Smood',
                description: '',

                baseApiUrl: _baseUrl + 'api/',
                baseUrl: _apiEndpoint,
                authApiUrl: _baseUrl + 'api/',
            };

        });
})();
