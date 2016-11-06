/**
 * Created by formu on 06.11.2016.
 */
HotelApp.controller('MainCtrl', function ($scope,MainService) {
    $scope.test = 'Hello world';
    $scope.items = [{id:0,price:0,guests:0,type:'',options_id:0,image_src:''}];
    $scope.show_all = function () {
        MainService.get_all(function (items) {
            $scope.items = items;
        });
    };
});
