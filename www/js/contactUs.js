angular.module('app.controllers')

        .controller('contactUsCtrl', function ($scope, myConfiguration, $cordovaEmailComposer, $ionicLoading) {

            var ctrl = this;

            ctrl.email = "";
            ctrl.mensaje = "";
            ctrl.message = function (mes) {
                $ionicLoading.show({template: mes, duration: 2000});
            };

//            ctrl.images = [
//                {img: "http://i3.wallpaperscraft.com/image/app_storm_apple_mac_blue_symbol_8281_480x800.jpg", white: true},
//                {img: "https://academy413.files.wordpress.com/2014/06/bg1-copy.jpg", white: true},
//                {img: "http://www.creatingiphone.com/uploads/soft/iPhone%20Wallpaper/Background/Best%20background%20app%20for%20iphone.jpg", white: true},
//                {img: "http://more-sky.com/data/out/5/IMG_76236.jpg", white: true},
//                {img: "https://s-media-cache-ak0.pinimg.com/236x/e2/43/72/e24372a499ae71c4b41b2904411f90a9.jpg", white: true},
//                {img: "https://s-media-cache-ak0.pinimg.com/236x/77/59/a3/7759a3f6d6bc621cb496f306f9358766.jpg", white: true},
//                {img: "https://s-media-cache-ak0.pinimg.com/236x/7b/b3/9c/7bb39c0efb8dc62e22aed6e2d2b950f8.jpg", white: true},
//                {img: "http://i3.wallpaperscraft.com/image/app_storm_apple_mac_shadow_black_blue_8044_720x1280.jpg", white: true},
//                {img: "http://media.148apps.com/screenshots/921448948/us-iphone-4-hd-wallpapers-for-iphone6s-and-6s-download-latest-backgrounds-with-custom-lock-screens-for-free.jpeg", white: true},
//                {img: "https://s-media-cache-ak0.pinimg.com/236x/a8/a6/b7/a8a6b788b66880028df4a8d913c3b55f.jpg", white: true},
//                {img: "https://s-media-cache-ak0.pinimg.com/564x/f8/8b/08/f88b0883dff8102259b8440219c3423b.jpg", white: true},
//                {img: "http://previews.123rf.com/images/narutotootee/narutotootee1206/narutotootee120600179/14247295-Abstract-blue-and-white-triangle-background--Stock-Photo.jpg", white: true}
//            ];
            ctrl.images = [
                {img: "img/1.jpg", white: true},
                {img: "img/2.jpg", white: true},
                {img: "img/3.jpg", white: true},
                {img: "img/4.jpg", white: true},
                {img: "img/5.jpg", white: true},
                {img: "img/6.jpg", white: false}
            ];
            ctrl.aleatorio = Math.round(Math.random() * ctrl.images.length);
            console.log(ctrl.aleatorio);

            ctrl.sendEmail = function () {
                console.log("COMIENZO");
                console.log(ctrl.mensaje);
                console.log(ctrl.email);
                if (ctrl.mensaje !== "" && ctrl.mensaje !== null && ctrl.mensaje !== undefined && ctrl.email !== "" && ctrl.email !== null && ctrl.email !== undefined) {
                    $cordovaEmailComposer.isAvailable().then(function () {
                        alert("EMAIL AVAILABLE");
                    }, function () {
                        alert("EMAIL NOT AVAILABLE");
                    });

//                    var email = {
//                        to: 'genaro.a@hotmail.com',
////                    cc: 'erika@mustermann.de',
//                        cc: '',
////                    bcc: ['john@doe.com', 'jane@doe.com'],
//                        bcc: [],
////                    attachments: [
////                        'file://img/logo.png',
////                        'res://icon.png',
////                        'base64:icon.png//iVBORw0KGgoAAAANSUhEUg...',
////                        'file://README.pdf'
////                    ],
//                        subject: 'From Full Cordova APP: ' + ctrl.email,
//                        body: ctrl.mensaje,
//                        isHtml: true
//                    };
                    var email = {
                        to: 'genaro.a@hotmail.com',
                        cc: '',
                        bcc: [],
                        attachments: [],
                        subject: 'From Full Cordova APP: ' + ctrl.email,
                        body: ctrl.mensaje,
                        isHtml: true
                    };

                    $cordovaEmailComposer.open(email).then(
                            function (s) {
                                alert(s);
                            }, function (e) {
                        alert(e);
                        // user cancelled email
                    });
                } else {
                    ctrl.message("missing data");
                    console.log("ERROR");
                }
            };

        });