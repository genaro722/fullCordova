angular.module('app.controllers', [])

        .controller('AppCtrl', function ($scope, $ionicModal, $timeout, $ionicPopover, $ionicLoading,
                $cordovaFlashlight, $cordovaVibration, $cordovaBatteryStatus, $cordovaCamera,
                $cordovaCapture, $cordovaBarcodeScanner, $cordovaImagePicker, $cordovaAppVersion, $cordovaDevice, $cordovaGeolocation,
                $cordovaMedia, $cordovaInAppBrowser, $rootScope, $cordovaDeviceOrientation, myConfiguration) {
//            var $ctrl = this;

            $scope.myLenguage = myConfiguration.getLanguage();
            $scope.loadingLocation = false;
            $scope.result = null;
            $scope.dialogo = function () {
                alert("hola");
            };

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

            $scope.location = function () {
                $scope.loadingLocation = true;
                var posOptions = {timeout: 20000, enableHighAccuracy: false};
                $cordovaGeolocation.getCurrentPosition(posOptions)
                        .then(function (position) {
                            $scope.loadingLocation = false;
                            var lat = position.coords.latitude;
                            var long = position.coords.longitude;
                            alert("Lat: " + lat + ", long: " + long);
                        }, function (err) {
                            $scope.loadingLocation = false;
                            if (err.code === 3) {
                                alert("Revisa tu señal o activa el GPS");
                            } else {
                                alert("ERROR");
                            }
                            // error
                        });
            };

            $scope.doOrientation = function () {
                $scope.orientation = !$scope.orientation;
            };

            $scope.vibration = function () {
                $cordovaVibration.vibrate(5000);
            };


            document.addEventListener("deviceready", function () {
                $rootScope.$on('$cordovaBatteryStatus:status', function (event, result) {
                    $scope.result = result;
                });
            }, false);

            $scope.battery = function () {
                if ($scope.result.isPlugged) {
                    alert("Charging -> " + $scope.result.level + "%");
                } else {
                    alert("Battety -> " + $scope.result.level + "%");
                }
            };

            $scope.camera = function () {
                $scope.galleryPrincipal = "";
                $scope.arrayGallery = [];
                $scope.closePopover();
                document.addEventListener("deviceready", function () {

                    var options = {
//                        destinationType: Camera.DestinationType.FILE_URI,
                        destinationType: Camera.DestinationType.DATA_URL,
                        sourceType: Camera.PictureSourceType.CAMERA,
                        saveToPhotoAlbum: false,
                        encodingType: Camera.EncodingType.JPEG
                    };

                    $cordovaCamera.getPicture(options)
                            .then(
                                    function (imageURI) {
                                        var image = document.getElementById('myImage');
                                        image.src = imageURI;
                                        alert(image.src);
                                        alert(imageURI);
                                        alert(image);
                                        $scope.galleryPrincipal = image.src;
                                        $scope.modalPhotos();
                                    }, function (err) {
                                alert(err);
                                // error
                            });
//                    $cordovaCamera.cleanup().then(...); // only for FILE_URI

                }, false);
            };


            $scope.gallery = function () {
                $scope.galleryPrincipal = "";
                $scope.arrayGallery = [];
                var row = [];
                var options = {
                    maximumImagesCount: 10,
                    width: 800,
                    height: 800,
                    quality: 100
                };
                $cordovaImagePicker.getPictures(options)
                        .then(function (results) {
                            alert(results);
                            for (var i = 0; i < results.length; i++) {
                                if (row.lenth < 2) {
                                    row.push(results[i].file);
                                }
                                if (row.lenth === 2) {
                                    $scope.arrayGallery.push(row);
                                    $scope.arrayGallery = [];
                                }
                            }
                            $scope.modalPhotos();
                        }, function (error) {
                            alert(error);
                            // error getting photos
                        });
            };

            $scope.modalPhotos = function () {
                $ionicModal.fromTemplateUrl('templates/modals/images.html', {
                    scope: $scope
                }).then(function (modal) {
                    $scope.modal = modal;
                    $scope.modal.show();
                }, function (error) {
                    console.log(error);
                });
            };

            $scope.capture = function () {
                alert("NOT WORK");
//                var options = {limit: 3};
//
//                $cordovaCapture.captureImage(options).then(function (imageData) {
//                    // Success! Image data is here
//                }, function (err) {
//                    // An error occurred. Show a message to the user
//                });
            };

            $scope.voice = function () {
                var options = {limit: 1, duration: 30};

                $cordovaCapture.captureAudio(options).then(function (audioData) {
                    alert(JSON.stringify(audioData));
                    $scope.play(audioData.localURL);
                    // Success! Audio data is here
                }, function (err) {
                    // An error occurred. Show a message to the user
                });
            };

            $scope.play = function (src) {
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

            $scope.scanner = function () {
                document.addEventListener("deviceready", function () {
                    $cordovaBarcodeScanner
                            .scan()
                            .then(function (barcodeData) {
                                $scope.url = barcodeData.text;
                                alert(JSON.stringify(barcodeData));
                                $scope.inAppBrowser();
                            }, function (error) {
                                alert(error);
                                // An error occurred
                            });
                }, false);
            };

            $scope.inAppBrowser = function () {
                var options = {
                    location: 'yes',
                    clearcache: 'yes',
                    toolbar: 'no'
                };
                document.addEventListener("deviceready", function () {
                    $cordovaInAppBrowser.open($scope.url, '_blank', options)
                            .then(function (event) {
                                alert(JSON.stringify(event));
                            })
                            .catch(function (event) {
                                alert(event);
                            });
//                    $cordovaInAppBrowser.close();
                }, false);
            };


            $scope.encode = function () {
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

            $scope.system = function () {
                document.addEventListener("deviceready", function () {
                    $cordovaAppVersion.getVersionNumber().then(function (version) {
                        $scope.version = version;
                    });
                }, false);
                $cordovaAppVersion.getVersionCode().then(function (build) {
                    $scope.build = build;
                });
                $cordovaAppVersion.getAppName().then(function (name) {
                    $scope.appName = name;
                });
                $cordovaAppVersion.getPackageName().then(function (package) {
                    $scope.appPackage = package;
                });
                $scope.device = $cordovaDevice.getDevice();
                $scope.cordova = $cordovaDevice.getCordova();
                $scope.model = $cordovaDevice.getModel();
                $scope.platform = $cordovaDevice.getPlatform();
                $scope.uuid = $cordovaDevice.getUUID();
                $scope.version2 = $cordovaDevice.getVersion();
                $ionicModal.fromTemplateUrl('templates/modals/systemInfo.html', {
                    scope: $scope
                }).then(function (modal) {
                    $scope.modal = modal;
                    $scope.modal.show();
                });
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
                {name: "English", img: "img/usa.png", text: "Hello, my name is CHARAWATO"},
                {name: "Español", img: "img/spain.png", text: "Hola, mi nombre es CHARAWATO"},
                {name: "Portuguess", img: "img/br.png", text: "Oi, meu nome é CHARAWATO"}
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
                myConfiguration.setLanguage(item.img);
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
