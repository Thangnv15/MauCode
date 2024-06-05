myapp.controller("khuyenmai-ctrl", function ($scope, $http, $location, $route) {
    // alert("Hello khuyen mai!")
    $scope.chuyenKhuyenMai3 = function () {
        $location.path("/khuyenMai3")
    }

    $scope.selectedTab = 'all';

    // Hàm để chọn tab
    $scope.selectTab = function (tabName) {
        $scope.selectedTab = tabName;
        // $scope.loadPage();
    };

    // Hàm để kiểm tra xem một tab có được chọn không
    $scope.isSelected = function (tabName) {
        return $scope.selectedTab === tabName;
    };

    $scope.voucher3s = [];
    $scope.voucher3sOridinal = [];
    $scope.loadPage = function () {
        $http.get("http://localhost:8080/api/chietkhausanpham").then(function (imageResponse) {
            $scope.voucher3s = imageResponse.data;
            $scope.voucher3sOridinal = imageResponse.data;

            angular.forEach(imageResponse.data, function (item) {
                var ngaybatdau = new Date(item.ngaybatdau);
                var ngayketthuc = new Date(item.ngayketthuc);
                ngaybatdau.setHours(ngaybatdau.getHours() + 7);
                ngayketthuc.setHours(ngayketthuc.getHours() + 7);

                // console.log(ngayGioDaChuyenDoi);
                // Format the adjusted date
                item.ngaybatdau = ngaybatdau.toISOString().replace('T', ' ').slice(0, 19);
                item.ngayketthuc = ngayketthuc.toISOString().replace('T', ' ').slice(0, 19);
                // console.log(ngayGioDaChinhSua);
            })


            // console.log(cartItem.images[0].image_link); // Lấy hình ảnh đầu tiên từ danh sách
        });
    }

    $scope.km3s = [];
    var currentDate = new Date();
    $http.get("http://localhost:8080/api/chietkhausanphamdetail").then(function (imageResponse) {
        $scope.km3s = imageResponse.data;
        angular.forEach($scope.km3s, function (item) {
            var ngaybatdau = new Date(item.chietkhausanpham.ngaybatdau);
            var ngayketthuc = new Date(item.chietkhausanpham.ngayketthuc);
            if (currentDate >= ngaybatdau && currentDate <= ngayketthuc) {
                // console.log("Có 1 cái");
                if (item.chietkhausanpham.status === 4) {

                } else {
                    item.chietkhausanpham.status = 2;
                    $http.post("http://localhost:8080/api/chietkhausanpham/add", item.chietkhausanpham)
                        .then(function (response) {

                        })
                        .catch(function (error) {
                            // Xử lý lỗi nếu có
                            console.error('Lỗi khi cập nhật trạng thái cho hóa đơn có ID:', error);
                        });
                }

            }
            if (currentDate > ngayketthuc) {
                // console.log("Có 1 cái");
                item.chietkhausanpham.status = 3;
                $http.post("http://localhost:8080/api/chietkhausanpham/add", item.chietkhausanpham)
                    .then(function (response) {

                    })
                    .catch(function (error) {
                        // Xử lý lỗi nếu có
                        console.error('Lỗi khi cập nhật trạng thái cho hóa đơn có ID:', error);
                    });
            }
        })
    });

    $scope.xoaKM3 = function (vh3) {
        var userConfirmed = confirm("Xác nhân xóa khuyến mãi này? Hành động này không thể hoàn tác!");
        if (userConfirmed) {
            var vh3Fake = vh3;

            angular.forEach($scope.km3s, function (khItem) {
                if (vh3Fake.id === khItem.chietkhausanpham.id) {

                    var km3chitiet = khItem;
                    $http.delete("http://localhost:8080/api/chietkhausanphamdetail/delete/" + km3chitiet.id)
                        .then(function (response) {
                            $http.delete("http://localhost:8080/api/chietkhausanpham/delete/" + km3chitiet.chietkhausanpham.id)
                                .then(function (response) {
                                    $route.reload();
                                })
                                .catch(function (error) {
                                    // Xử lý lỗi nếu có lỗi xảy ra trong quá trình POST
                                    console.error("Lỗi khi gửi yêu cầu POST: ", error);
                                });
                        })
                        .catch(function (error) {
                            // Xử lý lỗi nếu có lỗi xảy ra trong quá trình POST
                            console.error("Lỗi khi gửi yêu cầu POST: ", error);
                        });
                }
            });
            alert("Xóa khuyến mãi thành công");
        }
    }

    $scope.chinhSua = function (vh3) {
        localStorage.setItem('DetailKhuyenMai', JSON.stringify(vh3));
        $location.path("/chinhSuaChietKhau");
    }

    $scope.ngungKM = function (vh3) {
        var chietkhau = vh3;
        chietkhau.ngaybatdau = new Date(vh3.ngaybatdau);
        chietkhau.ngayketthuc = new Date(vh3.ngayketthuc);
        chietkhau.ngaytao = new Date(vh3.ngaytao);
        chietkhau.status = 4;
        var confirmation = confirm("Bạn có chắc chắn muốn ngưng khuyến mãi?");
        if (confirmation) {
            $http.post("http://localhost:8080/api/chietkhausanpham/add", chietkhau)
                .then(function (response) {
                    alert("Ngưng khuyến mãi thành công");
                    $route.reload();
                })
                .catch(function (error) {
                    // Xử lý lỗi nếu có
                    console.error('Lỗi khi cập nhật trạng thái cho hóa đơn có ID:', error);
                });
        }

    }

    $scope.tiepTuc = function (vh3) {
        var chietkhau = vh3;
        chietkhau.ngaybatdau = new Date(vh3.ngaybatdau);
        chietkhau.ngayketthuc = new Date(vh3.ngayketthuc);
        chietkhau.ngaytao = new Date(vh3.ngaytao);
        chietkhau.status = 2;
        $http.post("http://localhost:8080/api/chietkhausanpham/add", chietkhau)
            .then(function (response) {
                alert("Cập nhập khuyến mãi thành công");
                $route.reload();
            })
            .catch(function (error) {
                // Xử lý lỗi nếu có
                console.error('Lỗi khi cập nhật trạng thái cho hóa đơn có ID:', error);
            });
    }

    $scope.searchOrders = function(searchMaHD){
        if (!searchMaHD || searchMaHD.trim() === '') {
            $scope.loadPage();
            return;
        }

        var regex = new RegExp(searchMaHD.trim().split('').join('.*?'), 'i');

        $scope.voucher3s = $scope.voucher3sOridinal.filter(function (order) {
            return regex.test(order.name);
        });

        if ($scope.voucher3s.length === 0) {
            // Nếu không tìm thấy sản phẩm, có thể hiển thị thông báo hoặc thực hiện các thao tác khác
            $scope.loadPage();
            // alert("Co cai nit")
        }
    }

    $scope.loadPage();

});