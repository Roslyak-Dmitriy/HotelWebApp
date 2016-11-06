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
        }
    }
});
