angular.module('ticketmonster').factory('SectionResource', function($resource){
    var resource = $resource('../api/admin/sections/:SectionId',{SectionId:'@id'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});