angular.module('app.controllers')

        .controller('contactUsCtrl', function ($scope, myConfiguration, $cordovaEmailComposer, $ionicLoading) {

            $scope.email = "";
            $scope.mensaje = "";
            $scope.message = function (mes) {
                $ionicLoading.show({template: mes, duration: 2000});
            };

            $scope.images = [
                {img: "http://i3.wallpaperscraft.com/image/app_storm_apple_mac_blue_symbol_8281_480x800.jpg", white: true},
                {img: "https://academy413.files.wordpress.com/2014/06/bg1-copy.jpg", white: true},
                {img: "http://www.creatingiphone.com/uploads/soft/iPhone%20Wallpaper/Background/Best%20background%20app%20for%20iphone.jpg", white: true},
                {img: "http://more-sky.com/data/out/5/IMG_76236.jpg", white: true},
                {img: "https://s-media-cache-ak0.pinimg.com/236x/e2/43/72/e24372a499ae71c4b41b2904411f90a9.jpg", white: true},
                {img: "https://s-media-cache-ak0.pinimg.com/236x/77/59/a3/7759a3f6d6bc621cb496f306f9358766.jpg", white: true}, 
                {img: "https://s-media-cache-ak0.pinimg.com/236x/7b/b3/9c/7bb39c0efb8dc62e22aed6e2d2b950f8.jpg", white: true}, 
                {img: "http://i3.wallpaperscraft.com/image/app_storm_apple_mac_shadow_black_blue_8044_720x1280.jpg", white: true}, 
                {img: "http://media.148apps.com/screenshots/921448948/us-iphone-4-hd-wallpapers-for-iphone6s-and-6s-download-latest-backgrounds-with-custom-lock-screens-for-free.jpeg", white: true}, 
                {img: "https://s-media-cache-ak0.pinimg.com/236x/a8/a6/b7/a8a6b788b66880028df4a8d913c3b55f.jpg", white: true},
                {img: "https://s-media-cache-ak0.pinimg.com/564x/f8/8b/08/f88b0883dff8102259b8440219c3423b.jpg", white: true},
                {img: "http://previews.123rf.com/images/narutotootee/narutotootee1206/narutotootee120600179/14247295-Abstract-blue-and-white-triangle-background--Stock-Photo.jpg", white: true}
            ];
            $scope.aleatorio=Math.round(Math.random()*5);
            console.log($scope.aleatorio);

            $scope.sendEmail = function () {
                console.log("COMIENZO");
                console.log($scope.mensaje);
                console.log($scope.email);
                if ($scope.mensaje !== "" && $scope.mensaje !== null && $scope.mensaje !== undefined && $scope.email !== "" && $scope.email !== null && $scope.email !== undefined) {
                    $cordovaEmailComposer.isAvailable().then(function () {
                        alert("EMAIL AVAILABLE");
                        var email = {
                            to: 'genaro.a@hotmail.com',
//                    cc: 'erika@mustermann.de',
                            cc: '',
//                    bcc: ['john@doe.com', 'jane@doe.com'],
                            bcc: [],
//                    attachments: [
//                        'file://img/logo.png',
//                        'res://icon.png',
//                        'base64:icon.png//iVBORw0KGgoAAAANSUhEUg...',
//                        'file://README.pdf'
//                    ],
                            subject: 'From Full Cordova APP: ' + $scope.email,
                            body: $scope.mensaje,
                            isHtml: true
                        };

                        $cordovaEmailComposer.open(email).then(null, function (e) {
                            alert(e);
                            // user cancelled email
                        });
                    }, function () {
                        alert("EMAIL NOT AVAILABLE");
                    });
                } else {
                    $scope.message("missing data");
                    console.log("ERROR");
                }
            };

        });