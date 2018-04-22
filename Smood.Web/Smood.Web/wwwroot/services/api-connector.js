(function () {
    'use strict';

    angular.module('smoodWebApp').service('apiConnector', function ($http, $window, $rootScope) {
        const url = $rootScope.constants.baseApiUrl;

        this.post = (entityName, data) => {            
            var promise = $http.post(url.concat(entityName), data).then(response => {
                return response.data;
            });
            return promise;
        };

        this.postImage = () => {
            
        };

        this.put = (entityName, id, data) => {
            var promise = $http.put(url.concat(entityName, "/", id), data).then(response => {
                return response;
            });
            return promise;
        };        

        this.get = (id, entityName) => {
            var promise = $http.get(url.concat(entityName, "/", id)).then(response => {
                return response.data;
            });
            return promise;
        };

        this.getAll = (entityName) => {
            var promise = $http.get(url.concat(entityName)).then(response => {
                return response.data;
            });
            return promise;
        };        
    })
})();