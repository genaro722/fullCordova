angular.module('app.controllers', [])

        .controller('AppCtrl', function ($scope, $timeout, $ionicPopover, $ionicLoading, myConfiguration) {
//            var $ctrl = this;
            
            $scope.myLenguage = myConfiguration.getLanguage().language;
            $scope.viewImage = function (img) {
                var image = "<img src='" + img + "'> <br> <h2>Full Cordova</h2>";
                $ionicLoading.show({template: image, duration: 3000});
            };
            $scope.closeImage = function () {
                console.log("CLOSE");
                $ionicLoading.hide();
            };

            // With the new view caching in Ionic, Controllers are only called
            // when they are recreated or on app start, instead of every page change.
            // To listen for when this page is active (for example, to refresh data),
            // listen for the $ionicView.enter event:
            //$scope.$on('$ionicView.enter', function(e) {
            //});

            // Form data for the login modal
            $scope.loginData = {};

            // Create the login modal that we will use later
//            $ionicModal.fromTemplateUrl('templates/modals/images.html', {
//                scope: $scope
//            }).then(function (modal) {
//                $scope.modal = modal;
//            });

            // Triggered in the login modal to close it
            $scope.closeLogin = function () {
                $scope.modal.hide();
            };

            // Open the login modal
            $scope.login = function () {
                $scope.modal.show();
            };

            // Perform the login action when the user submits the login form
            $scope.doLogin = function () {
                console.log('Doing login', $scope.loginData);
                // Simulate a login delay. Remove this and replace with your login
                // code if using a login system
                $timeout(function () {
                    $scope.closeLogin();
                }, 1000);
            };

            $scope.languages = [
                {name: "English", img: "img/usa.png", text: "Hello, my name is CHARAWATO", i18n: "en"},
                {name: "Español", img: "img/spain.png", text: "Hola, mi nombre es CHARAWATO", i18n: "es"},
                {name: "Portuguess", img: "img/br.png", text: "Oi, meu nome é CHARAWATO", i18n: "pt"}
            ];

            $scope.openLanguage = function () {
                $ionicPopover.fromTemplateUrl('languages-popover.html', {
                    scope: $scope
                }).then(function (popover) {
                    $scope.popover = popover;
                    $scope.openPopover();
                });
            };

            $scope.selectLenguage = function (item) {
                $scope.myLenguage = item.img;
                myConfiguration.setLanguage(item);
                $scope.closePopover();
            };

            $scope.openOption = function () {
                $ionicPopover.fromTemplateUrl('options-popover.html', {
                    scope: $scope
                }).then(function (popover) {
                    $scope.popover = popover;
                    $scope.openPopover();
                });
            };

            $scope.openPopover = function ($event) {
                $scope.popover.show($event);
            };
            $scope.closePopover = function (item) {
                $scope.popover.hide();
            };
            //Cleanup the popover when we're done with it!
            $scope.$on('$destroy', function () {
                $scope.popover.remove();
            });
            // Execute action on hide popover
            $scope.$on('popover.hidden', function () {
                // Execute action
            });
            // Execute action on remove popover
            $scope.$on('popover.removed', function () {
                // Execute action
            });
        });