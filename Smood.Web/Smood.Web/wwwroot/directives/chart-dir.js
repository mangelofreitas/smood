(function () {
    'use strict';

    angular.module('smoodWebApp')
        .directive('chartDir', function () {
            return {
                restrict: 'E',
                scope: {
                    dataset: '=?',
                    labels: '=?',
                    textTitle: '@',
                    type: '@',
                    id: '@'
                },
                controller: function ($scope, $timeout) {
                    if (!$scope.labels) {
                        $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
                    }

                    var chartColors = ['#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'];

                    if (!$scope.dataset) {
                        $scope.dataset = [
                            {
                                label: 'Series A',
                                data: [65, 59, 80, 81, 56, 55, 40],
                                borderColor: chartColors[0]
                            },
                            {
                                label: 'Series B',
                                data: [28, 48, 40, 19, 86, 27, 90],
                                borderColor: chartColors[1]
                            }
                        ];
                    }
                    if (!$scope.type) {
                        $scope.type = "line";
                    }



                    $scope.options = {
                        responsive: true,
                        maintainAspectRatio: true,
                        responsiveAnimationDuration: 1000,
                        showLines: true
                    };

                    
                    var chart = new Chart($("#" + $scope.id + " canvas"), {
                        type: 'line',
                        data: {
                            labels: $scope.labels,
                            datasets: $scope.dataset,
                        },
                        options: $scope.options
                    });
                    
                },
                templateUrl: 'views-directives/chart-dir.html'
            }
        });
})();
