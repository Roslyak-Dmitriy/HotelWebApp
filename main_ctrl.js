/**
 * Created by formu on 06.11.2016.
 */
HotelApp.controller('MainCtrl', function ($scope,MainService,$uibModal) {
    // $scope.test = 'Hello world';
    $scope.init = function () {
        $scope.selected_sort ='-price';
        $scope.sort_price=[{text:'от дешевых к дорогим',sort:'price'},{text:'от дорогих к дешевым',sort:'-price'}];
        $scope.guests = [1];
        $scope.items1 = [{id:0,price:0,guests:0,type:'',options:'',image_src:''}];
        $scope.dt1popup = {opened: false};$scope.dt2popup = {opened: false};
        $scope.dtoptions = {minDate: new Date(),showWeeks: false};
        function addDays(date, days) {
            var result = new Date(date);
            result.setDate(result.getDate() + days);
            return result;
        }
        $scope.date = {in:new Date(),out:addDays(new Date(),1)};
        $scope.dt1open = function() {$scope.dt1popup.opened = true;};
        $scope.dt2open = function() {$scope.dt2popup.opened = true;};
    };
    $scope.count_days = function () {
        var temp = Date.parse($scope.date.out)-Date.parse($scope.date.in);
        if(temp>0)
        {
            var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
            var diffDays = Math.round(Math.abs(temp/(oneDay)));
            return diffDays;
        }else return 1;
    };
    $scope.show_all = function () {
        MainService.get_all(function (items) {
            var max_guest_count=0;
            for(var i=0;i<items.length;i++)
            {
                if(items[i].guests>max_guest_count)
                {
                    max_guest_count= items[i].guests;
                }
                $scope.items1[i] = items[i];
                $scope.items1[i].price = parseInt(items[i].price);
            }
            for(var i=0;i<max_guest_count;i++)
            {
                $scope.guests[i]=i+1;
            }
        });
    };
    $scope.openComponentModal = function (date,item_id) {
        var temp = Date.parse(date.out)-Date.parse(date.in);
        if(temp>0) {
            var datea = {in: '', out: ''};
            datea.in = date.in.toDateString();
            datea.out = date.out.toDateString();
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'myModalContent.html',
                component: 'modalComponent',
                resolve: {
                    date: function () {
                        return datea;
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
        }
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

        $ctrl.ok = function (is_valid) {
            if(is_valid) {
                MainService.submit_order(function () {
                }, $ctrl.order, $ctrl.date);
                $ctrl.close({$value: true});
            }
        };

        $ctrl.cancel = function () {
            $ctrl.close({$value: false});
        };
    }
});

