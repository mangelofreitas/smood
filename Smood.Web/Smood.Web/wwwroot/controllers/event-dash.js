(function () {
    'use strict';

    angular.module('smoodWebApp')
        .controller('EventDashController', function ($scope, $rootScope, $location, apiConnector) {
            
            $scope.cards = [];

            $rootScope.showLoadingAnimation();
            apiConnector.getAll('event')
            .then( events => {
                $rootScope.hideLoadingAnimation(true);
                $scope.cards = events;
                $scope.cards.forEach( card => {
                    card.imageUrl = card.imageUrl
                    ? card.imageUrl
                    : "http://via.placeholder.com/350x150"
                });
            })
            .catch( err => {
                $rootScope.hideLoadingAnimation(true);
                $location.path("/error");
            });

            $scope.addEvent = () => {
                $location.path('/event/create');
            };

            $scope.goToEvent = card => {
                $location.path('/event/view/' + card.eventId)
            }            
        });
})();