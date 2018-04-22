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
                    id: '@',
                    filter: '=?',
                    applyFilter: '=?'
                },
                controller: function ($scope, $timeout) {
                    if (!$scope.labels) {
                        $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
                    }

                    var chartColors = ['#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'];

                    var chart = null;

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
                    else {
                        var colorIndex = 0;
                        $scope.dataset.forEach(e => {
                            if (!e.borderColor) {
                                e.borderColor = chartColors[colorIndex];
                                colorIndex++;
                            }
                        });
                    }
                    if (!$scope.type) {
                        $scope.type = "line";
                    }

                    $scope.onChange = (oldValue, newValue) => {
                        if ($scope.filter.startDate == oldValue) {
                            $scope.filter.startDate = newValue;
                            $scope.applyFilter($scope.filter.startDate, $scope.filter.endDate).then(chartData => {
                                _createChart(chartData);
                            });
                        }
                        else if ($scope.filter.endDate == oldValue) {
                            $scope.filter.endDate = newValue;
                            $scope.applyFilter($scope.filter.startDate, $scope.filter.endDate).then(chartData => {
                                _createChart(chartData);
                            });
                        }
                    };

                    $scope.options = {
                        responsive: true,
                        maintainAspectRatio: true,
                        responsiveAnimationDuration: 1000,
                        showLines: true
                    };

                    var _createChart = chartData => {
                        if (chart != null) {
                            chart.destroy();
                        }
                        var labels = !chartData ? $scope.labels : chartData.labels;
                        var dataset = !chartData ? $scope.dataset : chartData.series;
                        chart = new Chart($("#" + $scope.id + " canvas"), {
                            type: $scope.type,
                            data: {
                                labels: labels,
                                datasets: dataset,
                            },
                            options: $scope.options
                        });
                    };

                    _createChart();
                },
                templateUrl: 'views-directives/chart-dir.html'
            }
        });
})();
