(function () {
    'use strict';

    angular.module('smoodWebApp')
        .controller('DashboardController', function ($scope, $location, $rootScope) {
            $scope.cards = [
            {
                Name: "Name",
                Count: 10
            },{
                Name: "Name 2",
                Count: 20
            }];

            $scope.newEvent = function(){
                $location.path("/event/create");
            }
        });
})();