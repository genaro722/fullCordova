angular.module('app.controllers')

        .controller('contactUsCtrl', function ($scope, myConfiguration, $cordovaEmailComposer) {

            $cordovaEmailComposer.isAvailable().then(function () {
                alert("EMAIL AVAILABLE");
                var email = {
                    to: 'max@mustermann.de',
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
                    subject: 'From Full Cordova APP',
                    body: 'Hello it is a text',
                    isHtml: true
                };

                $cordovaEmailComposer.open(email).then(null, function (e) {
                    alert(e);
                    // user cancelled email
                });
            }, function () {
                alert("EMAIL NOT AVAILABLE");
            });

        });