angular.module('app.controllers')

        .controller('componentsCtrl', function ($scope) {
            
            $scope.hideCheck=true;
            $scope.hideDropdown=true;
            $scope.hideStar=true;
            
            $scope.configlocation = {
                list: [{name: "Waterfront", selected: false}, {name: "Retail Anchored", selected: false},
                    {name: "Downtown", selected: false}, {name: "Mountain", selected: false},
                    {name: "Beachfront", selected: false}, {name: "City views", selected: false},
                    {name: "Resort", selected: false}, {name: "Vacational", selected: false}],
                response: [],
                no: "None"
            };
            
            $scope.configLocationDown = {
                title: 'Location',
                list: [{name: "Miami"}, {name: "New York"}, {name: "Texas"}, {name: "Dallas"}, {name: "San Francisco"}],
                response: []
            };
            
        });