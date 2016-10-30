angular.module('app.controllers', [])

        .controller('AppCtrl', function ($scope, $ionicModal, $timeout, $ionicPopover, $ionicLoading,
                $cordovaFlashlight, $cordovaDeviceOrientation, $cordovaVibration, $cordovaBatteryStatus, $rootScope) {
//            var $ctrl = this;

            $scope.flash = false;
            $scope.orientation = false;

            $scope.message = function (mes) {
                $ionicLoading.show({template: mes});
                $timeout(function () {
                    $ionicLoading.hide();
                }, 2000);
            };

            $scope.doFlash = function () {
                $cordovaFlashlight.available().then(function (availability) {
                    $cordovaFlashlight.toggle()
                            .then(function (success) {
                                $scope.flash = !$scope.flash;
                            },
                                    function (error) { /* error */
                                    });
                }, function () {
                    // unavailable
                });
            };

            $scope.doOrientation = function () {
                $scope.orientation = !$scope.orientation;
            };

            $scope.doVibration = function () {
                $cordovaVibration.vibrate(100);
            };

            $scope.doBattery = function () {
                document.addEventListener("deviceready", function () {
                    $rootScope.$on('$cordovaBatteryStatus:status', function (result) {
                        var batteryLevel = result.level;       // (0 - 100)
                        var isPluggedIn = result.isPlugged;   // bool
                        if (isPluggedIn === true) {
                            $scope.message('Level: ' + batteryLevel + " Status: Normal");
                        }
                    });

                    $rootScope.$on('$cordovaBatteryStatus:critical', function (result) {
                        var batteryLevel = result.level;       // (0 - 100)
                        var isPluggedIn = result.isPlugged;   // bool
                        if (isPluggedIn === true) {
                            $scope.message('Level: ' + batteryLevel + " Status: Critical");
                        }
                    });

                    $rootScope.$on('$cordovaBatteryStatus:low', function (result) {
                        var batteryLevel = result.level;       // (0 - 100)
                        var isPluggedIn = result.isPlugged;   // bool
                        if (isPluggedIn === true) {
                            $scope.message('Level: ' + batteryLevel + " Status: Low");
                        }
                    });
                }, false);
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
            $ionicModal.fromTemplateUrl('templates/login.html', {
                scope: $scope
            }).then(function (modal) {
                $scope.modal = modal;
            });

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


            $ionicPopover.fromTemplateUrl('options-popover.html', {
                scope: $scope
            }).then(function (popover) {
                $scope.popover = popover;
            });
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
        })

        .controller('PlaylistsCtrl', function ($scope) {
            $scope.playlists = [
                {title: 'Reggae', id: 1},
                {title: 'Chill', id: 2},
                {title: 'Dubstep', id: 3},
                {title: 'Indie', id: 4},
                {title: 'Rap', id: 5},
                {title: 'Cowbell', id: 6}
            ];
        })

        .controller('PlaylistCtrl', function ($scope, $stateParams) {
        });
