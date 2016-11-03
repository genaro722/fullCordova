angular.module('app.controllers')

        .controller('settingsCtrl', function ($scope) {
            
            $scope.delete = true;
            $scope.move = true;
            
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
                color: '#387ef5' //the code of the color, the default result is black
//              response: is the result of the select star
            };
            $scope.valueStars=2.5;
            
            $scope.deleteItem = function (number) {
                $scope.configlocation.list.splice(number, 1);
            };
            $scope.moveItem = function (item, fromIndex, toIndex) {
                //Move the item in the array
                $scope.configlocation.list.splice(fromIndex, 1);
                $scope.configlocation.list.splice(toIndex, 0, item);
            };
            
            $scope.deleteItem2 = function (number) {
                $scope.configLocationDown.list.splice(number, 1);
            };
            $scope.moveItem2 = function (item, fromIndex, toIndex) {
                //Move the item in the array
                $scope.configLocationDown.list.splice(fromIndex, 1);
                $scope.configLocationDown.list.splice(toIndex, 0, item);
            };

        });