// import 'bootstrap/dist/css/bootstrap.css';
// import './bootstrap.scss';
// import './bootstrap.scss';
import 'angular-toastr/dist/angular-toastr.css';

import './index.scss';

import _ from 'underscore';

// window.jQuery = window.$ = require('jquery');

// import Popper from 'popper.js';
// window.Popper = Popper;

// require('bootstrap/js/src/dropdown');

// import bootstrap from 'bootstrap';

// import vodacomci from 'vodacom-ci';

import angular from 'angular';

import ngAnimate from 'angular-animate';
import ngAria from 'angular-aria';
import ngCookies from 'angular-cookies';
import ngSanitize from 'angular-sanitize';
import ngTouch from 'angular-touch';
import uiBootstrap from 'angular-ui-bootstrap';
import uiRouter from 'angular-ui-router';
import toastr from 'angular-toastr';
import rx from 'rx-angular';

import CoreModule from './core/core.module';
// import SitesModule from './sites/sites.module';

angular.module('app', [
    CoreModule.name,
    // SitesModule.name,
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'ui.router',
    'rx',
    'toastr',
    'VodacomNimbleClient',
    'vodacom-components.module'
])

    .run(['VodacomNimble', 'AuthService', (VodacomNimble, AuthService) => {
        VodacomNimble.setTokenManager(() => {
            return AuthService.getToken();
        });
    }])
    .config(($stateProvider, $urlRouterProvider, $httpProvider, toastrConfig, VodacomNimbleProvider) => {
        'ngInject';
        VodacomNimbleProvider.setEnvironment(ENV);

        angular.extend(toastrConfig, {
            autoDismiss: true,
            containerId: 'toast-container',
            maxOpened: 3,
            newestOnTop: true,
            positionClass: 'toast-bottom-right',
            preventDuplicates: false,
            preventOpenDuplicates: false,
            target: 'body'
        });


        let isLoggedIn = ($state, AuthService) => {
            'ngInject';
            return AuthService.isLoggedIn().then((response) => {
                return response;
            }, () => {
                $state.go('Login');
            });
        };


        let isNotLoggedIn = ($state, AuthService) => {
            'ngInject';
            return AuthService.isNotLoggedIn().then((response) => {
                return response;
            }, () => {
                $state.go('Sites');
            });
        };

        $stateProvider
            .state('Login', {
                url: '/login',
                template: '<login-layout><login-page></login-page></login-layout>',
                resolve: {auth: isNotLoggedIn}
            })
            .state('Sites', {
                url: '/sites/site-list',
                template: '<layout><dashboard-page></dashboard-page></layout>',
                resolve: {auth: isLoggedIn}
            })
            .state('SiteDetails', {                
                url: '/sites/site-details/:vrf/:solutionId',
                template: '<layout><site-detail-page></site-detail-page></layout>',
                resolve: {auth: isLoggedIn}
            })
            .state('MyServiceRequests', {                
                url: '/my-service-requests',
                template: '<layout ><my-service-requests-page></my-service-requests-page></layout>',
                resolve: {auth: isLoggedIn}
            });

        $httpProvider.interceptors.push('AuthInterceptor');
        $httpProvider.interceptors.push('VodacomNimbleCache');

        $urlRouterProvider.otherwise('/login');
    });

angular.element(document).ready(() => {
    angular.bootstrap(document, ['app']);
});