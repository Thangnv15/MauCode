myapp.controller("orderDetail-ctrl", function ($scope, $http, $location) {
    $scope.backUser = function () {
        $location.path("/user")
    }
    $scope.localStorageOrder = JSON.parse(localStorage.getItem('Order')) || [];
    $scope.addressAll = $scope.localStorageOrder.address.address_detail + " - " +
        $scope.localStorageOrder.address.town_code + " - " +
        $scope.localStorageOrder.address.district_code + " - " +
        $scope.localStorageOrder.address.province_code;
    if ($scope.localStorageOrder.create_date === null) {
        $scope.ngaydathang = null;
    } else {
        $scope.ngayhuy =  new Date($scope.localStorageOrder.update_date);
        $scope.ngaydathang = new Date($scope.localStorageOrder.create_date)
    }

    $scope.orderDetail = [];
    $http.get("http://localhost:8080/api/orderdetail/" + $scope.localStorageOrder.id + "/orderdetailfororder")
        .then(function (response) {
            $scope.orderDetail = response.data;

            angular.forEach(response.data, function (cartItem) {
                // Gọi API để lấy danh sách images cho từng watchdetail
                cartItem.watchdetail.images = [];
                $http.get("http://localhost:8080/api/watch/" + cartItem.watchdetail.id + "/images").then(function (imageResponse) {
                    cartItem.watchdetail.images = imageResponse.data;
                });
            });

        }, function (error) {
            console.error('Lỗi trong quá trình gọi API:', error);
        });
})