angular.module('app.controllers')
        .controller('homeCtrl', function ($scope, $ionicModal, $ionicPlatform, myConfiguration, $ionicLoading, $timeout,
                $cordovaFlashlight, $cordovaVibration, $cordovaBatteryStatus, $cordovaCamera, $cordovaLocalNotification,
                $cordovaCapture, $cordovaBarcodeScanner, $cordovaImagePicker, $cordovaAppVersion, $cordovaDevice, $cordovaGeolocation,
                $cordovaMedia, $cordovaInAppBrowser, $rootScope, $cordovaDeviceOrientation) {

            var ctrl = this;

            ctrl.myLenguage = myConfiguration.getLanguage();
            ctrl.config = JSON.parse(myConfiguration.getConfig());
            ctrl.loadingLocation = false;
            ctrl.result = null;
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
                    alert("Charging -> " + ctrl.result.level + "%");
                } else {
                    alert("Battety -> " + ctrl.result.level + "%");
                }
            };

            ctrl.camera = function () {
                ctrl.galleryPrincipal = "";
                ctrl.arrayGallery = [];
                ctrl.closePopover();
                document.addEventListener("deviceready", function () {

//                        destinationType: Camera.DestinationType.FILE_URI,
                    var options = {
                        destinationType: Camera.DestinationType.DATA_URL,
                        sourceType: Camera.PictureSourceType.CAMERA,
                        saveToPhotoAlbum: ctrl.config[0],
                        allowEdit: ctrl.config[1],
                        encodingType: Camera.EncodingType.JPEG
                    };

                    $cordovaCamera.getPicture(options)
                            .then(
                                    function (imageURI) {
//                                        var image = document.getElementById('myImage');
//                                        image.src = imageURI;
//                                        alert(image.src);
                                        alert(imageURI);
//                                        alert(image);
//                                        ctrl.galleryPrincipal = image.src;
                                        ctrl.galleryPrincipal = imageURI;
                                        ctrl.modalPhotos();
                                    }, function (err) {
                                alert(err);
                                // error
                            });
//                    $cordovaCamera.cleanup().then(...); // only for FILE_URI

                }, false);
            };


            ctrl.gallery = function () {
                ctrl.galleryPrincipal = "";
                ctrl.arrayGallery = [];
                var row = [];
                var options = {
                    maximumImagesCount: ctrl.config[2],
                    width: 800,
                    height: 800,
                    quality: 100
                };
                $cordovaImagePicker.getPictures(options)
                        .then(function (results) {
                            alert(results);
                            for (var i = 0; i < results.length; i++) {
                                if (row.lenth < 2) {
                                    row.push(results[i]);
                                }
                                if (row.lenth === 2) {
                                    ctrl.arrayGallery.push(row);
                                    ctrl.arrayGallery = [];
                                }
                            }
                            ctrl.modalPhotos();
                        }, function (error) {
                            alert(error);
                            // error getting photos
                        });
            };

            ctrl.modalPhotos = function () {
                $ionicModal.fromTemplateUrl('templates/modals/images.html', {
                    scope: ctrl
                }).then(function (modal) {
                    ctrl.modal = modal;
                    ctrl.modal.show();
                }, function (error) {
                    console.log(error);
                });
            };

            ctrl.capture = function () {
                alert("NOT WORK");
//                var options = {limit: 3};
//
//                $cordovaCapture.captureImage(options).then(function (imageData) {
//                    // Success! Image data is here
//                }, function (err) {
//                    // An error occurred. Show a message to the user
//                });
            };

            ctrl.voice = function () {
                var options = {limit: 1, duration: ctrl.config[4]};

                $cordovaCapture.captureAudio(options).then(function (audioData) {
                    alert(JSON.stringify(audioData));
                    ctrl.play(audioData.localURL);
                    // Success! Audio data is here
                }, function (err) {
                    // An error occurred. Show a message to the user
                });
            };

            ctrl.play = function (src) {
                var media = new Media(src, null, null, mediaStatusCallback);
                $cordovaMedia.play(media);
//                var media = $cordovaMedia.newMedia(src);
//                media.play();
            };

            var mediaStatusCallback = function (status) {
                if (status == Media.MEDIA_STARTING) {
                    $ionicLoading.show({template: "Loading..."});
                } else {
                    $ionicLoading.hide();
                }
            };

            ctrl.scanner = function () {
                document.addEventListener("deviceready", function () {
                    $cordovaBarcodeScanner
                            .scan()
                            .then(function (barcodeData) {
                                ctrl.url = barcodeData.text;
                                alert(JSON.stringify(barcodeData));
                                ctrl.inAppBrowser();
                            }, function (error) {
                                alert(error);
                                // An error occurred
                            });
                }, false);
            };

            ctrl.inAppBrowser = function () {
                var options = {
                    location: 'yes',
                    clearcache: 'yes',
                    toolbar: 'no'
                };
                document.addEventListener("deviceready", function () {
                    $cordovaInAppBrowser.open(ctrl.url, '_blank', options)
                            .then(function (event) {
                                alert(JSON.stringify(event));
                            })
                            .catch(function (event) {
                                alert(event);
                            });
//                    $cordovaInAppBrowser.close();
                }, false);
            };


            ctrl.encode = function () {
                alert("Not Work");
//                document.addEventListener("deviceready", function () {
//                    $cordovaBarcodeScanner
//                            .encode(BarcodeScanner.Encode.TEXT_TYPE, "http://www.youtube.com")
//                            .then(function (success) {
//                                alert(success);
//                            }, function (error) {
//                                alert(error);
//                                // An error occurred
//                            });
//                }, false);
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
                });
            };
        });
