'use strict';
define([
    'angular',
    'underscore',
    'configuration',
    'bootstrap',
    'angularRoute',
    'angularResource',
    'app/api/services'
], function(angular, _, config) {
    angular.module('ticketMonster.venueDetailView', ['ngRoute', 'ngResource', 'ticketMonster.api'])
        .config(['$routeProvider', function($routeProvider) {
            $routeProvider.when('/venues/:venueId', {
                templateUrl: 'resources/js/app/venueDetail/venueDetail.html',
                controller: 'VenueDetailController'
            });
        }])
        .controller('VenueDetailController', ['$scope', '$routeParams', '$location', 'VenueResource', 'ShowResource', function($scope, $routeParams, $location, VenueResource, ShowResource) {
            VenueResource.get({venueId:$routeParams.venueId}, function(data) {
                $scope.venue = data;
                ShowResource.queryAll({venue:$scope.venue.id}, function(data) {
                    console.log("Fetched Shows");
                    $scope.shows = data;
                }, function() {
                    console.log("Failed to fetch shows");
                });
            }, function() {
                console.log("failure");
            });

            $scope.$watch('selectedShow', function(newValue, oldValue) {
                if(newValue == null) {
                    $scope.selectedPerformanceDays = [];
                } else {
                    $scope.selectedPerformanceDays = newValue.performances;
                    $scope.selectedPerformanceDay = $scope.selectedPerformanceDays[0];
                }
                $scope.selectedPerformances = [];
                $scope.selectedPerformance = {};
            });

            $scope.$watch('selectedPerformanceDay', function(newValue, oldValue) {
                if(newValue != null) {
                    $scope.selectedPerformances = _.filter($scope.selectedShow.performances, function(performance) {
                        var performanceDay = new Date(performance.date).setHours(0, 0, 0, 0);
                        var chosenDay = new Date(newValue.date).setHours(0, 0, 0, 0);
                        return chosenDay.valueOf() === performanceDay.valueOf();
                    });
                    $scope.selectedPerformance = $scope.selectedPerformances[0];
                }
            });

            $scope.beginBooking = function() {
                $location.path('/book/' + $scope.selectedShow.id + '/' + $scope.selectedPerformance.id);
            }
        }]);
});