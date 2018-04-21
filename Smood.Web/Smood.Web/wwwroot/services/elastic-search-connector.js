(function () {
    'use strict';

    angular.module('smoodWebApp').service('elasticSearchConnector', function ($http, $window, $rootScope) {
        const url = "";

        this.get = (id, entityName) => {
            var promise = $http.get(url.concat(entityName, "/", id)).then(response => {
                return response;
            });
            return promise;
        };

        this.getAll = (entityName) => {
            var promise = $http.get(url.concat(entityName)).then(response => {
                return response;
            });
            return promise;
        };

        
    })
})();