angular.module('app.controllers')

        .controller('componentsCtrl', function ($scope) {
            
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
            
            $scope.configStars= {
                type: "input",//type: input or show
                size: 3, //size: 1,2,3,4,5.
                color: 'rgb(56, 126, 245)' //the code of the color, the default result is black
//              response: is the result of the select star
            };
            $scope.valueStars=2.5; //numbers interger o decimal
            
        });