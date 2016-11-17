angular.module('app.controllers')

        .controller('starsContainerCtrl', function ($scope) {

            var ctrl = this;

            ctrl.hideStar = true;

            ctrl.configStars = {
                type: "input", //type: input or show. Default Show
                size: 3, //size: 1,2,3,4,5. Default 2
                decimal: true, //if it is true you can select decimal numbers
                color: "#387ef5" //'rgb(56, 126, 245)' //the code of the color, the default result is black
            };

            ctrl.myValue = 2; //numbers interger o decimal
//
//            $scope.$watch('ctrl.myValue', function (newValue, oldValue) {
//                console.log(ctrl.myValue);
//            });

            ctrl.log = function (u) {
                if (u !== null) {
                    if (u <= 5) {
                        ctrl.myValue = u;
                    }
                } else {
//                    ctrl.myValue = 0;
                }
            };

        });