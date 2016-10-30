angular.module('app.route', [])

        .config(function ($stateProvider, $urlRouterProvider) {
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
                    .state('app.playlists', {
                        url: '/playlists',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/playlists.html',
                                controller: 'PlaylistsCtrl'
                            }
                        }
                    })

                    .state('app.single', {
                        url: '/playlists/:playlistId',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/playlist.html',
                                controller: 'PlaylistCtrl'
                            }
                        }
                    });
            // if none of the above states are matched, use this as the fallback
            $urlRouterProvider.otherwise('/app/home');
        });
