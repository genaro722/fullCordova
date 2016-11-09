angular.module('app.controllers')

        .controller('settingsCtrl', function ($scope, myConfiguration) {

            $scope.delete = true;
            $scope.move = true;
            $scope.config = JSON.parse(myConfiguration.getConfig());
            console.log($scope.config);

            $scope.makeDefault = function () {
                myConfiguration.defaultConfig();
                $scope.config = JSON.parse(myConfiguration.getConfig());
            };

            $scope.saveConfig = function () {
                myConfiguration.setConfig($scope.config);
            };

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

            $scope.deleteItem = function (number) {
                $scope.configlocation.list.splice(number, 1);
            };
            $scope.moveItem = function (item, fromIndex, toIndex) {
                //Move the item in the array
                $scope.configlocation.list.splice(fromIndex - 1, 1);
                $scope.configlocation.list.splice(toIndex - 1, 0, item);
            };

            $scope.deleteItem2 = function (number) {
                $scope.configLocationDown.list.splice(number, 1);
            };
            $scope.moveItem2 = function (item, fromIndex, toIndex) {
                //Move the item in the array
                $scope.configLocationDown.list.splice(fromIndex - 1, 1);
                $scope.configLocationDown.list.splice(toIndex - 1, 0, item);
            };

        });