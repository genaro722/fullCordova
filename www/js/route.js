angular.module('app.route', [])
        .config(function ($stateProvider, $urlRouterProvider) {
            // if none of the above states are matched, use this as the fallback
            $urlRouterProvider.otherwise('/app/home');
            
            $stateProvider
                    .state('app', {
                        url: '/app',
                        abstract: true,
                        templateUrl: 'templates/menu.html',
                        controller: 'AppCtrl'
                    })

                    .state('app.home', {
                        url: '/home',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/home.html',
                                controller: 'PlaylistsCtrl'
                            }
                        }
                    })
                    .state('app.components', {
                        url: '/components',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/components.html',
                                controller: 'componentsCtrl'
                            }
                        }
                    })
                    .state('app.settings', {
                        url: '/settings',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/settings.html',
                                controller: 'settingsCtrl'
                            }
                        }
                    })
                    .state('app.contacts', {
                        url: '/contacts',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/contacts.html',
                                controller: 'contactsCtrl'
                            }
                        }
                    })
                    ;
        });
