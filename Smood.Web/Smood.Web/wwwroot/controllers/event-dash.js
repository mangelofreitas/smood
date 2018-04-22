(function () {
    'use strict';

    angular.module('smoodWebApp')
        .controller('EventDashController', function ($scope, $rootScope, $location, apiConnector, Upload) {

            $scope.cards = [];
            $scope.event = {};


            $rootScope.showLoadingAnimation();
            apiConnector.getAll('event')
                .then(events => {
                    $rootScope.hideLoadingAnimation(true);
                    $scope.cards = events;
                    $scope.cards.forEach(card => {
                        card.imageUrl = card.imageUrl
                            ? card.imageUrl
                            : "content/images/no-image.svg"
                    });
                })
                .catch(err => {
                    $rootScope.hideLoadingAnimation(true);
                    $location.path("/error");
                });

            $scope.submit = $eventSubmit => {
                if (!$scope.event.file) {
                    alert("Please select an image!");
                    return;
                }
                $('#create-event').modal('hide');
                $rootScope.showLoadingAnimation();

                $scope.event.imageName = $scope.event.file.name;

                var fileDataPromise = Upload.base64DataUrl($scope.event.file);
                var postPromise = fileDataPromise.then(fileData => {
                    $scope.event.imageData = fileData.replace(/^data:image\/(png|jpg|jpeg|gif);base64,/, "");;
                    return apiConnector.post("event", $scope.event);                            
                });

                postPromise.then(response => {                    
                    $rootScope.hideLoadingAnimation(true);
                    $location.path("event/view/" + response.eventId);
                })
                .catch(err => {
                    $location.path("/error");
                    $rootScope.hideLoadingAnimation(true);
                });
            };

            $scope.deleteEvent = card => {
                $rootScope.showLoadingAnimation();
                apiConnector.delete('event', card.eventId)
                    .then(() => {
                        var cards = $scope.cards;

                        for (var i = 0; i < cards.length; i++) {
                            if (cards[i].eventId == card.eventId) {
                                $scope.cards.splice(i, 1);
                                break;
                            }
                        }
                        $rootScope.hideLoadingAnimation(true);
                    })
                    .catch(err => {
                        $rootScope.hideLoadingAnimation(true);
                        $location.path("/error");
                    });
            };

            $scope.goToEvent = card => {
                $location.path('/event/view/' + card.eventId)
            };
        });
})();