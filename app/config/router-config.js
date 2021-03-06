'use strict';

module.exports = ['$stateProvider','$urlServiceProvider',
  function($stateProvider, $urlServiceProvider) {
    $urlServiceProvider.rules.when('', '/signup');
    $urlServiceProvider.rules.when('/', '/signup');
    $urlServiceProvider.rules.when('/signup', '/join#signup');
    $urlServiceProvider.rules.when('/login', '/join#login');

    let routes = [
      {
        name: 'landing',
        url: '/join',
        template: require('../view/landing/landing.html'),
        controller: 'LandingController',
        controllerAs: 'landingCtrl',
      },
      {
        name: 'splash',
        url: '/home',
        template: require('../view/splash/splash.html'),
        controller: 'SplashController',
        controllerAs: 'splashCtrl',
      },
      {
        name: 'profile',
        url: '/profile',
        template: require('../view/profile/profile.html'),
        controller: 'ProfileController',
        controllerAs: 'profileCtrl',
      },
    ];
    routes.forEach($stateProvider.state);
  },
];
