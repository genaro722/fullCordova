angular.module('pascalprecht.translate').config(function ($translateProvider, $translatePartialLoaderProvider) {
    $translateProvider.useSanitizeValueStrategy('escape');
    $translateProvider.useLoader('$translatePartialLoader', {
        urlTemplate: 'js/i18n/{part}/locale-{lang}.json'
    });
    $translatePartialLoaderProvider.addPart('home');
    $translatePartialLoaderProvider.addPart('menu');
    $translatePartialLoaderProvider.addPart('settings');
    var i18n = localStorage.getItem("fullCordova-language-i18n");
    if (i18n !== "" && i18n !== null && i18n !== undefined) {
        $translateProvider.preferredLanguage(i18n);
    } else {
        $translateProvider.preferredLanguage('en');
    }
    $translateProvider.forceAsyncReload(true);
});