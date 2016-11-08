/**
 * Created by formu on 06.11.2016.
 */
HotelApp.factory('MainService', function ($http, $log) {
    return {
        get_all: function (callback) {
            $http({
                method: 'POST',
                url: './php/service.php',
                data: {
                    command: 'get_all'
                }
            }).success(function (data, status, headers, config) {
                callback(data);
            }).error(function (data, status, headers, config) {
                $log.info(data);
            });
        },
        submit_order: function (callback,order,date) {
            $http({
                method: 'POST',
                url: './php/service.php',
                data: {
                    command: 'submit_order',
                    order:{
                        item_id:order.item_id,
                        name: order.name,
                        user_email: order.user_email
                    },
                    date:{
                        in: date.in,
                        out:date.out
                    }
                }
            }).success(function (data, status, headers, config) {
                callback(data);
            }).error(function (data, status, headers, config) {
                $log.info(data);
            });
        }
    }
});
