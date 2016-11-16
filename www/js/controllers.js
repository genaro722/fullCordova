angular.module('app.controllers', [])

        .controller('AppCtrl', function ($scope, $timeout, $ionicPopover, $ionicLoading, myConfiguration,$ionicModal,
$cordovaBatteryStatus, $cordovaCamera, $cordovaCapture, $cordovaBarcodeScanner, $cordovaImagePicker,
$cordovaMedia, $cordovaInAppBrowser, $cordovaDeviceOrientation) {
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

            $scope.camera = function () {
                $scope.galleryPrincipal = "";
                $scope.arrayGallery = [];
                $scope.closePopover();
                document.addEventListener("deviceready", function () {

//                        destinationType: Camera.DestinationType.FILE_URI,
                    var options = {
                        destinationType: Camera.DestinationType.DATA_URL,
                        sourceType: Camera.PictureSourceType.CAMERA,
                        saveToPhotoAlbum: $scope.config[0],
                        allowEdit: $scope.config[1],
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
//                                        $scope.galleryPrincipal = image.src;
                                        $scope.galleryPrincipal = imageURI;
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
                    maximumImagesCount: $scope.config[2],
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
                var options = {limit: 1, duration: $scope.config[4]};

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