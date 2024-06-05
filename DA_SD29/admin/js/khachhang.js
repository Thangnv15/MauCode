myapp.controller("khachhang-ctrl", function ($scope, $http, $location) {
    // alert("Hello các cháu");
    $scope.vaitros = [];
    $http.get("http://localhost:8080/api/accountrole")
        .then(function (response) {
            $scope.vaitros = response.data;
        }, function (error) {
            console.error('Lỗi trong quá trình gọi API:', error);
        });
    $scope.orders = [];
    $scope.accounts = [];
    $scope.filteredWatchs = [];
    $scope.loadPage = function () {

        $http.get("http://localhost:8080/api/order")
            .then(function (response) {
                $scope.orders = response.data;
                angular.forEach($scope.accounts, function (accItem) {
                    var tongmua = 0;
                    var tongdon = 0;
                    var donhuy = 0;
                    var donhoan = 0;
                    var donthanhcong = 0;

                    angular.forEach($scope.orders, function (orderItem) {
                        // Kiểm tra xem orderItem.account có tồn tại và có thuộc tính id không
                        if (orderItem.account && orderItem.account.id === accItem.id) {
                            tongmua += orderItem.total_money;

                            // Tính tổng số hóa đơn
                            tongdon++;

                            // Kiểm tra trạng thái để tăng giá trị cho donhuy, donhoan, hoặc donthanhcong
                            switch (orderItem.status) {
                                case 3:
                                    donhuy++;
                                    break;
                                case 6:
                                    donthanhcong++;
                                    break;
                                case 11:
                                    donhoan++;
                                    break;
                                default:
                                    break;
                            }
                        }
                    });

                    // Gán giá trị cho các thuộc tính mới
                    accItem.tongmua = tongmua;
                    accItem.tongdon = tongdon;
                    accItem.donhuy = donhuy;
                    accItem.donthanhcong = donthanhcong;
                    accItem.donhoan = donhoan;
                });
            }, function (error) {
                console.error('Lỗi trong quá trình gọi API:', error);
            });
        $http.get("http://localhost:8080/api/account")
            .then(function (response) {
                $scope.accounts = response.data;
                $scope.filteredWatchs = response.data;
                angular.forEach($scope.vaitros, function (cartItem) {
                    angular.forEach($scope.accounts, function (accItem) {
                        if (cartItem.account.id === accItem.id) {
                            accItem.vaitro = cartItem.role.name;
                            console.log("Có tồn tại");
                        }
                    })
                })
                angular.forEach($scope.vaitros, function (cartItem) {
                    angular.forEach($scope.filteredWatchs, function (accItem) {
                        if (cartItem.account.id === accItem.id) {
                            accItem.vaitro = cartItem.role.name;
                            console.log("Có tồn tại");
                        }
                    })
                })


            }, function (error) {
                console.error('Lỗi trong quá trình gọi API:', error);
            });
    }

    $scope.searchProducts = function (searchTerm) {
        if (!searchTerm || searchTerm.trim() === '') {
            // Nếu searchTerm rỗng, load lại trang
            $scope.loadPage();
            return;
        }
    
        var regex = new RegExp(searchTerm.trim().split('').join('.*?'), 'i');
    
        $scope.accounts = $scope.filteredWatchs.filter(function (account) {
            return regex.test(account.username); // Đổi từ email thành username nếu cần
        });
    
        if ($scope.accounts.length === 0) {
            // Nếu không tìm thấy account, có thể hiển thị thông báo hoặc thực hiện các thao tác khác
            $scope.loadPage();
        }
    };

    $scope.loadPage();
});