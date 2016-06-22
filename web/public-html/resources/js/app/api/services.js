'use strict';
define([
    'angular',
    'underscore',
    'configuration',
    'angularResource'
], function (angular, _, config) {
    angular.module('ticketMonster.api', ['ngResource'])
        .factory('EventResource', function ($resource) {
            var resource = $resource(config.baseUrl + 'api/search/events/:eventId', {eventId: '@id'}, {
                'queryAll': {
                    method: 'GET',
                    isArray: true
                }, 'query': {method: 'GET', isArray: false}
            });
            return resource;
        })
        .factory('VenueResource', function ($resource) {
            var resource = $resource(config.baseUrl + 'api/search/venues/:venueId', {venueId: '@id'}, {
                'queryAll': {
                    method: 'GET',
                    isArray: true
                }, 'query': {method: 'GET', isArray: false}
            });
            return resource;
        })
        .factory('ShowResource', function ($resource) {
            var resource = $resource(config.baseUrl + 'api/search/shows/:showId', {showId: '@id'}, {
                'queryAll': {
                    method: 'GET',
                    isArray: true
                }, 'query': {method: 'GET', isArray: false}
            });
            return resource;
        })
        .factory('BookingResource', function ($resource) {
            var resource = $resource(config.baseUrl + 'api/orders/bookings/:bookingId', {bookingId: '@id'}, {
                'queryAll': {
                    method: 'GET',
                    isArray: true
                },
                'query': {method: 'GET', isArray: false},
                'update': {method: 'PUT',  url: 'api/orders/bookings/:bookingId'},
                'save': { method: 'POST',  url: 'api/orders/bookings'}
            });
            return resource;
        })
        .factory('PerformanceDetailsResource', function ($resource) {
            var resource = $resource(config.baseUrl + 'api/search/shows/performance/:performanceId', {performanceId: '@id'}, {
                'queryAll': {
                    method: 'GET',
                    isArray: true
                }, 'query': {method: 'GET', isArray: false}
            });
            return resource;
        });
});