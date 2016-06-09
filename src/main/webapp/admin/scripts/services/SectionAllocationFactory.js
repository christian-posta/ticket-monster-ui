angular.module('ticketmonster').factory('SectionAllocationResource', function($resource){
    var resource = $resource('../api/admin/sectionallocations/:SectionAllocationId',{SectionAllocationId:'@id'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});