angular.module('app.services', [])
        .service('myConfiguration', ["$http", "$q", "$translate", function ($http, $q, $translate) {

                this.getLanguage = function (file, name) {
                    var language = localStorage.getItem("fullCordova-language");
                    if (language !== null && language !== undefined && language !== "") {
                        var i18n = localStorage.getItem("fullCordova-language-i18n");
                        var all={language: language, i18n: i18n};
                        return all;
                    } else {
                        return "img/usa.png";
                    }
//                      localStorage.setItem("preseeyl-token", resp.data.token);
                };

                this.setLanguage = function (item) {
                    localStorage.setItem("fullCordova-language", item.img);
                    localStorage.setItem("fullCordova-language-i18n", item.i18n);
                    $translate.use(item.i18n);
                };

                this.defaultConfig = function () {
                    config = [false, false, 5, 5000, 3000];
                    config = JSON.stringify(config);
                    localStorage.setItem("fullCordova-generalConfig", config);
                    alert("CONFIGURACION DEFAULT");
                };

                this.getConfig = function () {
                    var config = localStorage.getItem("fullCordova-generalConfig");
                    if (config !== null && config !== undefined && config !== "") {
                        return config;
                    } else {
                        config = [false, false, 5, 5000, 30];
                        config = JSON.stringify(config);
                        localStorage.setItem("fullCordova-generalConfig", config);
                        return config;
                    }
                };

                this.setConfig = function (config) {
                    config = JSON.stringify(config);
                    localStorage.setItem("fullCordova-generalConfig", config);
                    alert("CONFIGURACION GUARDADA");
                };
            }]);