(function () {
    'use strict';

    angular.module('smoodWebApp')
        .controller('DashboardController', function ($scope, $location, $rootScope) {
            $scope.cards = [
                {
                    Id:1,
                    Name: "Name",
                    Description: "Lorem ipsum cenas...",
                    ImageScr: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22286%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20286%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_162e8a4829e%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_162e8a4829e%22%3E%3Crect%20width%3D%22286%22%20height%3D%22180%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2299.125%22%20y%3D%2296.3%22%3EImage%20cap%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E'
                },
                {
                    Id:2,
                    Name: "Name 2",
                    Description: "Lorem ipsum cenas...",
                    ImageScr: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22286%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20286%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_162e8a4829e%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_162e8a4829e%22%3E%3Crect%20width%3D%22286%22%20height%3D%22180%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2299.125%22%20y%3D%2296.3%22%3EImage%20cap%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E'
                },
                {
                    Id: null,
                    Name: "Add Event",
                    Description: "",
                    ImageScr: 'data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDI0IDI0IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAyNCAyNCIgd2lkdGg9IjY0cHgiIGhlaWdodD0iNjRweCI+CiAgPHBhdGggZD0ibTIzLDEwaC04LjVjLTAuMywwLTAuNS0wLjItMC41LTAuNXYtOC41YzAtMC42LTAuNC0xLTEtMWgtMmMtMC42LDAtMSwwLjQtMSwxdjguNWMwLDAuMy0wLjIsMC41LTAuNSwwLjVoLTguNWMtMC42LDAtMSwwLjQtMSwxdjJjMCwwLjYgMC40LDEgMSwxaDguNWMwLjMsMCAwLjUsMC4yIDAuNSwwLjV2OC41YzAsMC42IDAuNCwxIDEsMWgyYzAuNiwwIDEtMC40IDEtMXYtOC41YzAtMC4zIDAuMi0wLjUgMC41LTAuNWg4LjVjMC42LDAgMS0wLjQgMS0xdi0yYzAtMC42LTAuNC0xLTEtMXoiIGZpbGw9IiMwMDc4ZDciLz4KPC9zdmc+Cg=='
                }
            ];

            $scope.goToLocation = function (card) {
                if (!card.Id) {
                    $location.path("/event/create");
                }
                else {
                    $location.path("/event/"+card.Id);
                }

            }
        });
})();
