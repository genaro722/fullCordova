angular.module('app.controllers')
        .controller('homeCtrl', function ($scope, $ionicModal, $ionicPlatform, myConfiguration, $ionicLoading, $timeout,
                $cordovaFlashlight, $cordovaVibration,  $cordovaLocalNotification, $cordovaAppVersion, $cordovaDevice, $cordovaGeolocation,
                 $rootScope) {

            var ctrl = this;
            
            ctrl.myLenguage = myConfiguration.getLanguage();
            ctrl.config = JSON.parse(myConfiguration.getConfig());
            ctrl.loadingLocation = false;
            ctrl.result = {};
            ctrl.bateryStatus="";
            ctrl.result.level = null;
            ctrl.dialogo = function () {
                alert("hola");
            };

            ctrl.flash = false;
            ctrl.orientation = false;

            ctrl.message = function (mes) {
                $ionicLoading.show({template: mes});
                $timeout(function () {
                    $ionicLoading.hide();
                }, 2000);
            };

            ctrl.doFlash = function () {
                $cordovaFlashlight.available().then(function (availability) {
                    $cordovaFlashlight.toggle()
                            .then(function (success) {
                                ctrl.flash = !ctrl.flash;
                            },
                                    function (error) { /* error */
                                    });
                }, function () {
                    // unavailable
                });
            };

            ctrl.location = function () {
                ctrl.loadingLocation = true;
                var posOptions = {timeout: 20000, enableHighAccuracy: false};
                $cordovaGeolocation.getCurrentPosition(posOptions)
                        .then(function (position) {
                            ctrl.loadingLocation = false;
                            var lat = position.coords.latitude;
                            var long = position.coords.longitude;
                            alert("Lat: " + lat + ", long: " + long);
                        }, function (err) {
                            ctrl.loadingLocation = false;
                            if (err.code === 3) {
                                alert("Revisa tu señal o activa el GPS");
                            } else {
                                alert("ERROR");
                            }
                            // error
                        });
            };

            ctrl.localNotification = function () {
//                ctrl.orientation = !ctrl.orientation;
                $ionicPlatform.ready(function () {
                    ctrl.scheduleDelayedNotification = function () {
                        var now = new Date().getTime();
                        var _10SecondsFromNow = new Date(now + 10 * 1000);

                        $cordovaLocalNotification.schedule({
                            id: 1,
                            title: 'Title here',
                            text: 'Text here',
                            at: _10SecondsFromNow
                        }).then(function (result) {
                            alert(result);
                            // ...
                        });
                    };
                });
            };

            ctrl.vibration = function () {
                $cordovaVibration.vibrate(ctrl.config[3]);
            };


            document.addEventListener("deviceready", function () {
                $rootScope.$on('$cordovaBatteryStatus:status', function (event, result) {
                    ctrl.result = result;
                });
            }, false);

            ctrl.battery = function () {
                if (ctrl.result.isPlugged) {
                    ctrl.bateryStatus="CHARGING";
                    alert("Charging -> " + ctrl.result.level + "%");
                } else {
                    ctrl.bateryStatus="USIN_BATTERY";
                    alert("Battety -> " + ctrl.result.level + "%");
                }
            };

            ctrl.system = function () {
                document.addEventListener("deviceready", function () {
                    $cordovaAppVersion.getVersionNumber().then(function (version) {
                        ctrl.version = version;
                    });
                }, false);
                $cordovaAppVersion.getVersionCode().then(function (build) {
                    ctrl.build = build;
                });
                $cordovaAppVersion.getAppName().then(function (name) {
                    ctrl.appName = name;
                });
                $cordovaAppVersion.getPackageName().then(function (package) {
                    ctrl.appPackage = package;
                });
                ctrl.device = $cordovaDevice.getDevice();
                ctrl.cordova = $cordovaDevice.getCordova();
                ctrl.model = $cordovaDevice.getModel();
                ctrl.platform = $cordovaDevice.getPlatform();
                ctrl.uuid = $cordovaDevice.getUUID();
                ctrl.version2 = $cordovaDevice.getVersion();
                $ionicModal.fromTemplateUrl('templates/modals/systemInfo.html', {
                    scope: ctrl
                }).then(function (modal) {
                    ctrl.modal = modal;
                    ctrl.modal.show();
                }, function(){
                    alert("ERROR");
                });
            };
        });
