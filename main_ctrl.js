/**
 * Created by formu on 06.11.2016.
 */
HotelApp.controller('MainCtrl', function ($scope,MainService) {
    $scope.test = 'Hello world';
    $scope.selected2=['от дешевых к дорогим','от дорогих к дешевым'];
    $scope.guests = [1,2,3,4];
    $scope.items = [{id:0,price:0,guests:0,type:'',options_id:0,image_src:''}];
    $scope.order = {item_id:-1,name:'',user_email:''};
    $scope.dt1popup = {opened: false};$scope.dt2popup = {opened: false};
    $scope.dtoptions = {minDate: new Date(),showWeeks: false};

    $scope.dt1open = function() {$scope.dt1popup.opened = true;};
    $scope.dt2open = function() {$scope.dt2popup.opened = true;};
    $scope.orderByprice = function () {
        if($scope.selected2=='от дешевых к дорогим')return 'price';
        else return '-price';
    };
    $scope.show_all = function () {
        MainService.get_all(function (items) {
            $scope.items = items;
        });
    };
    $scope.submit_order = function () {
        MainService.submit_order (function () {
        },$scope.order);
    };
});
