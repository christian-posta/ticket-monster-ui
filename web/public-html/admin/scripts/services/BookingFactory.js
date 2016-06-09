angular.module('ticketmonster').factory('BookingResource', function($resource){
    var resource = $resource('../api/admin/forge/bookings/:BookingId',{BookingId:'@id'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});