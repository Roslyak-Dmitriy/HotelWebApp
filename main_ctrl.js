/**
 * Created by formu on 06.11.2016.
 */
HotelApp.controller('MainCtrl', function ($scope,MainService,$uibModal) {
    $scope.test = 'Hello world';
    $scope.selected2=['от дешевых к дорогим','от дорогих к дешевым'];
    $scope.guests = [1,2,3,4];
    $scope.items = [{id:0,price:0,guests:0,type:'',options:'',image_src:''}];
    $scope.dt1popup = {opened: false};$scope.dt2popup = {opened: false};
    $scope.dtoptions = {minDate: new Date(),showWeeks: false};
    $scope.date = {in:'',out:''};
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
    $scope.openComponentModal = function (date,item_id) {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'myModalContent.html',
            component: 'modalComponent',
            resolve: {
                date: function () {
                      return date;
                },
                item_id: function () {
                    return item_id;
                }
            }
        });

        modalInstance.result.then(function (submit_res) {
            $scope.submit_res = submit_res;
        }, function () {
            // $log.info('modal-component dismissed at: ' + $scope.submit_res);
        });
    };
});
HotelApp.component('modalComponent', {
    templateUrl: 'myModalContent.html',
    bindings: {
        resolve: '<',
        close: '&',
        dismiss: '&'
    },
    controller: function (MainService) {
        var $ctrl = this;
        $ctrl.order = {item_id:-1,name:'',user_email:''};
        $ctrl.$onInit = function () {
            $ctrl.order.item_id = $ctrl.resolve.item_id;
            $ctrl.date = $ctrl.resolve.date;
        };

        $ctrl.ok = function () {
            // $scope.submit_order = function () {
                MainService.submit_order (function () {
                },$ctrl.order,$ctrl.date);
            // };
            $ctrl.close({$value: true});
        };

        $ctrl.cancel = function () {
            $ctrl.close({$value: false});
        };
    }
});

