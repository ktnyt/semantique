angular.module('semantique', ['ionic', 'ion-autocomplete', 'semantique.services', 'semantique.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

        .state('editor', {
            url: '/editor',
            templateUrl: 'templates/editor.html',
            controller: 'EditorController'
        })

        .state('editor-child', {
            url: '/editor/:instance',
            templateUrl: 'templates/editor_child.html',
            controller: 'EditorChildController'
        })
    ;

    $urlRouterProvider.otherwise('/editor');
});

angular.module('semantique.services', []);
angular.module('semantique.controllers', []);
