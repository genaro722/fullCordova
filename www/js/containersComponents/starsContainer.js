angular.module('app.controllers')
        
        .controller('starsContainerCtrl', function ($scope) {
            $scope.hideStar = true;
            
            $scope.configStars = {
                type: "input", //type: input or show. Default Show
                size: 3, //size: 1,2,3,4,5. Default 2
                decimal: true, //if it is true you can select decimal numbers
                color: "#387ef5" //'rgb(56, 126, 245)' //the code of the color, the default result is black
            };
            
            $scope.myValue = 2; //numbers interger o decimal
            
            $scope.$watch('$scope.myValue', function (newValue, oldValue) {
                console.log($scope.myValue);
            });
            
            $scope.log = function (u) {
                if (u !== null) {
                    if (u <= 5) {
                        $scope.myValue = u;
                    }
                } else {
                    $scope.myValue = 0;
                }
            };
            
        });