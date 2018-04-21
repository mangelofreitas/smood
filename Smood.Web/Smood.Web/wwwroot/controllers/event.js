(function () {
    'use strict';

    angular.module('smoodWebApp')
        .controller('EventController', function ($scope, $rootScope, $location, apiConnector, Upload) {

            $scope.event = {};

            $scope.cancel = () => {
                $location.path('/events');
            };

            $scope.uploadFiles = files => {
                files.forEach(file => {
                    console.log(file);
                });
                $scope.files = files;
            };

            $scope.submit = submitEvent => {

                if (!$scope.event.file) {
                    alert("Please select an image!");
                    return;
                }

                Upload.base64DataUrl($scope.event.file)
                    .then(file64 => {
                        $scope.event.imageData = file64.replace(/^data:image\/(png|jpg|jpeg|gif);base64,/, "");;

                        apiConnector.post("event", $scope.event)
                            .then(response => {
                                console.log(response);
                                $('#create-event').modal('hide');
                                $location.path("event/view/" + response.eventId);
                            })
                            .catch(err => {
                                console.log(err);
                                alert("Problem to save");
                            })
                    });
            };
        });
})();