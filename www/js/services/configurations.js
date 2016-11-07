angular.module('app.services', [])
        .service('myConfiguration', ["$http", "$q", function ($http, $q){
                this.getLanguage = function (file, name){
                    var language= localStorage.getItem("fullCordova-language");
                    if (language!==null && language!==undefined && language !=="") {
                        return language;
                    }else{
                        return "img/usa.png";
                    }
//                      localStorage.setItem("preseeyl-token", resp.data.token);
                };
                this.setLanguage=function(item){
                    localStorage.setItem("fullCordova-language", item);
                };
                this.defaultConfig=function(){};
                this.getConfig=function(){};
                this.setConfig=function(){};
        }]);