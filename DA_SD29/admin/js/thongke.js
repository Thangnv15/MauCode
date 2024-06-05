myapp.controller("thongke-ctrl", function ($scope, $http, $location) {
    // alert("Hello các cháu");

    $scope.orders = [];
    var currentDate = new Date();
    $scope.choXacNhan = 0;
    $scope.choLayHang = 0;
    $scope.choXuLy = 0;
    $scope.hdall = 0;

    $http.get("http://localhost:8080/api/order")
        .then(function (response) {
            $scope.orders = response.data;
            angular.forEach($scope.orders, function (orderItem) {
                var ngaynay = new Date(orderItem.create_date);

                // So sánh ngày, tháng và năm để xác định liệu ngày tạo có trùng với ngày hiện tại không
                if (
                    ngaynay.getDate() === currentDate.getDate() &&
                    ngaynay.getMonth() === currentDate.getMonth() &&
                    ngaynay.getFullYear() === currentDate.getFullYear()
                ) {
                    $scope.hdall++;
                }

                if (orderItem.status === 0) {
                    $scope.choXacNhan++;
                }
                if (orderItem.status === 1) {
                    $scope.choLayHang++;
                }
                if (orderItem.status === 10) {
                    $scope.choXuLy++;
                }
            });
        }, function (error) {
            console.error('Lỗi trong quá trình gọi API:', error);
        });

    $scope.sanPham = 0;
    $scope.watchs = [];
    $http.get("http://localhost:8080/api/watch")
        .then(function (response) {
            $scope.watchs = response.data;
            angular.forEach($scope.watchs, function (orderItem) {
                if (orderItem.quantity_stock === 0) {
                    $scope.sanPham++;
                }
            })
        }, function (error) {
            console.error('Lỗi trong quá trình gọi API:', error);
        });

    $scope.kmai = 0;
    $scope.km3s = [];
    $http.get("http://localhost:8080/api/chietkhausanpham")
        .then(function (response) {
            $scope.km3s = response.data;
            angular.forEach($scope.km3s, function (orderItem) {
                if (orderItem.status === 2) {
                    $scope.kmai++;
                }
            })
        }, function (error) {
            console.error('Lỗi trong quá trình gọi API:', error);
        });

    $scope.errorTime = false;
    $scope.empTyTime = false;
    $scope.totol = 0;
    $scope.hdThanhCong = 0;
    $scope.hdHuy = 0;
    $scope.hdHoan = 0;
    $scope.loc = function () {
        $scope.totol = 0;
        $scope.hdHoan = 0;
        $scope.hdThanhCong = 0;
        $scope.hdHuy = 0;
        var batdau = new Date($scope.startTime);
        var ketthuc = new Date($scope.endTime);

        // Đặt thời gian về 00:00:00
        batdau.setHours(0, 0, 0, 0);
        ketthuc.setHours(0, 0, 0, 0);

        if (!$scope.startTime || !$scope.endTime) {
            $scope.empTyTime = true;
        } else {
            $scope.empTyTime = false;
        }

        if ($scope.startTime > $scope.endTime) {
            $scope.errorTime = true;
        } else {
            $scope.errorTime = false;
        }

        angular.forEach($scope.orders, function (orderItem) {
            // Đặt thời gian của orderItem.create_date về 00:00:00
            var createDate = new Date(orderItem.create_date);
            createDate.setHours(0, 0, 0, 0);
    
            if (createDate >= batdau && createDate <= ketthuc) {
                $scope.totol += orderItem.total_money;
    
                switch (orderItem.status) {
                    case 6: // Thành công
                        $scope.hdThanhCong++;
                        break;
                    case 3: // Hủy
                        $scope.hdHuy++;
                        break;
                    case 10: // Hoàn
                        $scope.hdHoan++;
                        break;
                    default:
                        break;
                }
            }
        });
    };
    // $scope.vaitros = [];
    // $http.get("http://localhost:8080/api/accountrole")
    //     .then(function (response) {
    //         $scope.vaitros = response.data;
    //     }, function (error) {
    //         console.error('Lỗi trong quá trình gọi API:', error);
    //     });
    // $scope.orders = [];
    // $scope.accounts = [];
    // $scope.filteredWatchs = [];
    // $scope.loadPage = function () {

    //     $http.get("http://localhost:8080/api/order")
    //         .then(function (response) {
    //             $scope.orders = response.data;
    //             angular.forEach($scope.accounts, function (accItem) {
    //                 var tongmua = 0;
    //                 var tongdon = 0;
    //                 var donhuy = 0;
    //                 var donhoan = 0;
    //                 var donthanhcong = 0;

    //                 angular.forEach($scope.orders, function (orderItem) {
    //                     // Kiểm tra xem orderItem.account có tồn tại và có thuộc tính id không
    //                     if (orderItem.account && orderItem.account.id === accItem.id) {
    //                         tongmua += orderItem.total_money;

    //                         // Tính tổng số hóa đơn
    //                         tongdon++;

    //                         // Kiểm tra trạng thái để tăng giá trị cho donhuy, donhoan, hoặc donthanhcong
    //                         switch (orderItem.status) {
    //                             case 3:
    //                                 donhuy++;
    //                                 break;
    //                             case 6:
    //                                 donthanhcong++;
    //                                 break;
    //                             case 11:
    //                                 donhoan++;
    //                                 break;
    //                             default:
    //                                 break;
    //                         }
    //                     }
    //                 });

    //                 // Gán giá trị cho các thuộc tính mới
    //                 accItem.tongmua = tongmua;
    //                 accItem.tongdon = tongdon;
    //                 accItem.donhuy = donhuy;
    //                 accItem.donthanhcong = donthanhcong;
    //                 accItem.donhoan = donhoan;
    //             });
    //         }, function (error) {
    //             console.error('Lỗi trong quá trình gọi API:', error);
    //         });
    //     $http.get("http://localhost:8080/api/account")
    //         .then(function (response) {
    //             $scope.accounts = response.data;
    //             $scope.filteredWatchs = response.data;
    //             angular.forEach($scope.vaitros, function (cartItem) {
    //                 angular.forEach($scope.accounts, function (accItem) {
    //                     if (cartItem.account.id === accItem.id) {
    //                         accItem.vaitro = cartItem.role.name;
    //                         console.log("Có tồn tại");
    //                     }
    //                 })
    //             })
    //             angular.forEach($scope.vaitros, function (cartItem) {
    //                 angular.forEach($scope.filteredWatchs, function (accItem) {
    //                     if (cartItem.account.id === accItem.id) {
    //                         accItem.vaitro = cartItem.role.name;
    //                         console.log("Có tồn tại");
    //                     }
    //                 })
    //             })


    //         }, function (error) {
    //             console.error('Lỗi trong quá trình gọi API:', error);
    //         });
    // }

    // $scope.searchProducts = function (searchTerm) {
    //     if (!searchTerm || searchTerm.trim() === '') {
    //         // Nếu searchTerm rỗng, load lại trang
    //         $scope.loadPage();
    //         return;
    //     }

    //     var regex = new RegExp(searchTerm.trim().split('').join('.*?'), 'i');

    //     $scope.accounts = $scope.filteredWatchs.filter(function (account) {
    //         return regex.test(account.username); // Đổi từ email thành username nếu cần
    //     });

    //     if ($scope.accounts.length === 0) {
    //         // Nếu không tìm thấy account, có thể hiển thị thông báo hoặc thực hiện các thao tác khác
    //         $scope.loadPage();
    //     }
    // };

    // $scope.loadPage();
});