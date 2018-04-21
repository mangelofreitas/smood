(function () {
    'use strict';

    angular.module('smoodWebApp')
        .config(function ($routeProvider, $locationProvider) {

            var _getRoute = function (entityName, controller, fileName) {
                return {
                    templateUrl: 'views/' + entityName + '/' + fileName,
                    controller: controller,
                    resolve: {
                        entityName: function () { return entityName; }
                    }
                };
            };

            $locationProvider.hashPrefix('');

            $routeProvider
                .when('/', { redirectTo: '/dashboard' })
                .when('/dashboard', _getRoute('dashboard', 'DashboardController', 'index.html'))
                .when('/error', _getRoute('error', 'ErrorController','index.html'))
                .when('/event/create', _getRoute('event', 'EventController', 'index.html'))
                .when('/event/view/:id', _getRoute('event', 'EventController', 'view.html'))
                .when('/events', _getRoute('event', 'EventDashController', 'index.html'))
                .when('/page-not-found', _getRoute('pageNotFound', 'PageNotFoundController', 'index.html'))
                .otherwise({ redirectTo: '/page-not-found' });
        });
})();
