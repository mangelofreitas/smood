(function () {
    'use strict';

    angular.module('smoodWebApp')
        .directive('chartPie', function () {
            return {
                restrict: 'E',
                scope: {
                    dataset: '=?',
                    labels: '=?',
                    textTitle: '@'
                },
                controller: function ($scope, $timeout) {
                    var chartColors = ['#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'];

                    $scope.options = {
                        responsive: true,
                        maintainAspectRatio: true,
                        responsiveAnimationDuration: 1000,
                        showLines: true
                    };

                    
                    //var chart = new Chart($("#" + $scope.id + " canvas"), {
                    //    type: $scope.type,
                    //    data: {
                    //        labels: $scope.labels,
                    //        datasets: $scope.dataset,
                    //    },
                    //    options: $scope.options
                    //});
                    
                },
                templateUrl: 'views-directives/chart-pie.html'
            }
        });
})();
