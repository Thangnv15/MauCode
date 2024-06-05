myapp.controller("hoantra-ctrl", function ($scope, $http, $location, $route) {
    $scope.selectedTab = 'choXacNhan';

    // Hàm để chọn tab
    $scope.selectTab = function (tabName) {
        $scope.selectedTab = tabName;
        $scope.loadOrder();
    };

    // Hàm để kiểm tra xem một tab có được chọn không
    $scope.isSelected = function (tabName) {
        return $scope.selectedTab === tabName;
    };

    $scope.hoadontrachitietFakes = [];
    $scope.hoadontrachitietOrdionals = [];
    $http.get("http://localhost:8080/api/hoadontrachitiet")
        .then(function (response) {
            $scope.hoadontrachitietFakes = response.data;
            $scope.hoadontrachitietOrdionals = response.data;
        }, function (error) {
            console.error('Lỗi trong quá trình gọi API:', error);
        });
    $scope.orders = [];
    $scope.loadOrder = function () {
        $http.get("http://localhost:8080/api/order")
            .then(function (response) {
                // Gán dữ liệu trả về từ API vào biến $scope.orders
                $scope.orders = response.data;
                // Lặp qua từng order để lấy thông tin order detail
                angular.forEach($scope.orders, function (order) {
                    // Lặp qua từng hoadontrachitietFake để kiểm tra id
                    angular.forEach($scope.hoadontrachitietFakes, function (item) {
                        if (order.id === item.hoadonchitiet.order.id) {
                            // Nếu có id giống nhau, cập nhật thoigiansua của order
                            order.thoigiansua = item.update_date;
                        }
                    });
                });
            }, function (error) {
                console.error('Lỗi trong quá trình gọi API order:', error);
            });
    }
    $scope.lydotuchoihoans = [];
    $http.get("http://localhost:8080/api/lydotuchoihoan")
        .then(function (response) {
            $scope.lydotuchoihoans = response.data;

        }, function (error) {
            console.error('Lỗi trong quá trình gọi API:', error);
        });

    $scope.showDoiTraChiTiet = false;
    $scope.hoadon = {};
    $scope.hoadontras = [];
    $scope.hoadontrachitiets = [];
    $scope.startDoiTraChiTiet = function (ord) {
        console.log("Dữ liệu order khi bắt đầu:", ord);
        $scope.showDoiTraChiTiet = true;
        $scope.hoadon = ord;
        $http.get("http://localhost:8080/api/hoadontra")
            .then(function (response) {
                $scope.hoadontras = response.data;
                var foundHoadontra = $scope.hoadontras.find(function (hoadontra) {
                    return hoadontra.order.id === $scope.hoadon.id;
                });
                $http.get("http://localhost:8080/api/hoadontrachitiet/" + foundHoadontra.id + "/hoadontrachitietforhoadontra")
                    .then(function (response) {
                        $scope.hoadontrachitiets = response.data;
                        // alert("Đẩy dữ liệu vào đây là okla")
                        angular.forEach(response.data, function (cartItem) {
                            cartItem.soluonghoan = 1;
                            cartItem.trangthaihoansanpham = 0;
                            if (cartItem.soluonghoan === cartItem.hoadonchitiet.quantity) {
                                cartItem.trangthaihoansanpham = 1;
                            }
                            cartItem.hoadonchitiet.watchdetail.images = [];
                            $http.get("http://localhost:8080/api/watch/" + cartItem.hoadonchitiet.watchdetail.id + "/images").then(function (imageResponse) {
                                cartItem.hoadonchitiet.watchdetail.images = imageResponse.data;
                            });
                        });

                    }, function (error) {
                        console.error('Lỗi trong quá trình gọi API:', error);
                    });
            }, function (error) {
                console.error('Lỗi trong quá trình gọi API:', error);
            });
    }
    $scope.closeDoiTraChiTiet = function () {
        $scope.showDoiTraChiTiet = false;
    }

    $scope.updateSoluonghoan = function (ordd) {
        if (ordd.soluonghoan >= ordd.soluong) {
            ordd.soluonghoan = ordd.soluong;
            ordd.trangthaihoansanpham = 1;
        } else {
            ordd.trangthaihoansanpham = 0;
        }
    }



    $scope.watchs = [];
    $http.get("http://localhost:8080/api/watch")
        .then(function (response) {
            // Gán dữ liệu trả về từ API vào biến $scope.watchs
            $scope.watchs = response.data;
        }, function (error) {
            console.error('Lỗi trong quá trình gọi API:', error);
        });


    $scope.showSanPhamHoan = false;
    $scope.sanphamshophoan = {};
    $scope.sanphamshophoans = [];
    $scope.hoadonhoansanpham = [];
    $scope.hoadonhoantrachitietFake = {};
    $scope.hienThiSanPhamHoan = function (ordd) {
        $scope.showSanPhamHoan = true;
        $scope.sanphamshophoan = ordd.hoadonchitiet.watchdetail;
        $scope.hoadonhoantrachitietFake = ordd;
        ordd.sanphamshophoans = [];
        for (var i = 0; i < $scope.watchs.length; i++) {
            // So sánh name của từng sản phẩm với name của $scope.sanphamshophoan
            if ($scope.watchs[i].product.name === $scope.sanphamshophoan.product.name) {
                // Nếu giống nhau, thêm sản phẩm này vào mảng matchedProducts
                ordd.sanphamshophoans.push($scope.watchs[i]);
            }
        }
        $scope.hoadonhoansanpham = ordd;
    }

    $scope.closeSanPhamShopHoan = function () {
        $scope.showSanPhamHoan = false;
    }



    $scope.hoandoisanpham = function (sp) {
        $scope.hoadonhoantrachitietFake.sanphamhoandoi = sp;
        for (var i = 0; i < $scope.hoadontrachitiets.length; i++) {
            // So sánh name của từng sản phẩm với name của $scope.sanphamshophoan
            if ($scope.hoadontrachitiets[i].id === $scope.hoadonhoantrachitietFake.id) {
                // Nếu giống nhau, thêm sản phẩm này vào mảng matchedProducts
                $scope.hoadontrachitiets[i] = $scope.hoadonhoantrachitietFake;
            }
        }
        $scope.showSanPhamHoan = false;
    }

    $scope.confirmHoan = function () {
        console.log("Danh sách hoadontrachitiets:", $scope.hoadontrachitiets);
        var userConfirmed = confirm("Xác nhận hoàn? Hành động này không thể hoàn tác!");
        var currentDate = new Date();
        var formattedDate = currentDate.toISOString().split('T')[0];
        var username = localStorage.getItem('username');

        if (userConfirmed) {
            for (var i = 0; i < $scope.hoadontrachitiets.length; i++) {
                // So sánh name của từng sản phẩm với name của $scope.sanphamshophoan
                if ($scope.hoadontrachitiets[i].status == 0) {
                    alert("Có sản phẩm chưa được xác nhận!")
                } else {
                    if ($scope.hoadontrachitiets[i].status == 1) {
                        // alert("Xác nhận hoàn")
                        if ($scope.hoadontrachitiets[i].phuongthuchoan.name === 'Hoàn tiền') {
                            if ($scope.hoadontrachitiets[i].trangthaihoansanpham == 0) {
                                // alert("Xác nhận hoàn 1 phần")
                                if (!$scope.hoadontrachitiets[i].motalydohoanmotphan) {
                                    alert("Cần phải điền đầy đủ thông tin lý do hoàn 1 phần");
                                } else {
                                    // console.log("Sản phẩm yêu cầu hoàn:" + $scope.hoadontrachitiets[i].hoadonchitiet.watchdetail.code + "-Số lượng:" + $scope.hoadontrachitiets[i].hoadonchitiet.watchdetail.quantity_stock +
                                    //     "\n Sản phẩm được shop hoàn:" + $scope.hoadonhoantrachitietFake.sanphamhoandoi.code + "-Số lượng:" + $scope.hoadonhoantrachitietFake.sanphamhoandoi.quantity_stock);

                                    $scope.hoadontrachitiets[i].hoadonchitiet.watchdetail.quantity_stock = $scope.hoadontrachitiets[i].soluonghoan + $scope.hoadontrachitiets[i].hoadonchitiet.watchdetail.quantity_stock;
                                    var sanphamFake1 = $scope.hoadontrachitiets[i].hoadonchitiet.watchdetail;
                                    $scope.hoadontrachitiets[i].update_date = formattedDate;
                                    $scope.hoadontrachitiets[i].updated_by = username;
                                    $scope.hoadontrachitiets[i].money_hoan = $scope.hoadontrachitiets[i].soluonghoan * $scope.hoadontrachitiets[i].hoadonchitiet.watchdetail.price;
                                    if ($scope.hoadontrachitiets[i].hoadonchitiet.giamgia) {
                                        $scope.hoadontrachitiets[i].money_hoan = $scope.hoadontrachitiets[i].soluonghoan * $scope.hoadontrachitiets[i].hoadonchitiet.watchdetail.price * ((100 - $scope.hoadontrachitiets[i].hoadonchitiet.giamgia) / 100);
                                    }
                                    // console.log("Sau khi hoàn \nSản phẩm yêu cầu hoàn:" + $scope.hoadontrachitiets[i].hoadonchitiet.watchdetail.code + "-Số lượng:" + $scope.hoadontrachitiets[i].hoadonchitiet.watchdetail.quantity_stock +
                                    //     "\n Sản phẩm được shop hoàn:" + $scope.hoadonhoantrachitietFake.sanphamhoandoi.code + "-Số lượng:" + $scope.hoadonhoantrachitietFake.sanphamhoandoi.quantity_stock);
                                    $http.post("http://localhost:8080/api/hoadontrachitiet/add", $scope.hoadontrachitiets[i])
                                        .then(function (response) {
                                            console.log("Hóa đơn chi tiết 1 phần đổi sản phẩm cập nhập thành công");
                                            $http.post("http://localhost:8080/api/watch/addsanpham", sanphamFake1)
                                                .then(function (response) {
                                                    console.log("Sản phẩm yêu cầu hoàn cập nhập thành công!")
                                                })
                                                .catch(function (error) {
                                                    // Xử lý lỗi nếu có
                                                    console.error('Lỗi khi cập nhật trạng thái cho hóa đơn có ID:', error);
                                                });
                                            $scope.hoadon.status = 11;
                                            $http.post("http://localhost:8080/api/order/add", $scope.hoadon)
                                                .then(function (responseOrder) {
                                                    var thongbaoFake = {
                                                        create_date: formattedDate,
                                                        status: 2,
                                                        order: responseOrder.data
                                                    }
                                                    $http.post("http://localhost:8080/api/thongbaoadmin/add", thongbaoFake)
                                                        .then(function (responseThongBao) {
                                                            console.log("Tạo thông báo thành công!");
                                                            $http.post("http://localhost:8080/api/checkemail/send-notificationAdmin", responseThongBao.data)
                                                                .then(function (response) {
                                                                    console.log("Tạo thông báo tới email thành công!")
                                                                })
                                                                .catch(function (error) {
                                                                    // Xử lý lỗi nếu có
                                                                    console.error('Lỗi khi cập nhật trạng thái cho hóa đơn có ID:', order.id, error);
                                                                });
                                                        })
                                                        .catch(function (error) {
                                                            // Xử lý lỗi nếu có
                                                            console.error('Lỗi khi cập nhật trạng thái cho hóa đơn có ID:', order.id, error);
                                                        });
                                                    $scope.hoadontras[0].updated_by = username;
                                                    $scope.hoadontras[0].update_date = formattedDate;
                                                    $scope.hoadontras[0].status = 1;
                                                    $http.post("http://localhost:8080/api/hoadontra/add", $scope.hoadontras[0])
                                                        .then(function (response) {


                                                        }, function (error) {
                                                            console.error('Lỗi trong quá trình gọi API:', error);
                                                        });
                                                }, function (error) {
                                                    console.error('Lỗi trong quá trình gọi API:', error);
                                                });
                                            alert("Đã xác nhận hóa đơn hoàn thành công!");
                                            $scope.showDoiTraChiTiet = false;
                                            $route.reload();
                                        })
                                        .catch(function (error) {
                                            // Xử lý lỗi nếu có
                                            console.error('Lỗi khi cập nhật trạng thái cho hóa đơn có ID:', error);
                                        });
                                }
                            } else {
                                // alert("Xác nhận hoàn hết")
                                // console.log("Sản phẩm yêu cầu hoàn:" + $scope.hoadontrachitiets[i].hoadonchitiet.watchdetail.code + "-Số lượng:" + $scope.hoadontrachitiets[i].hoadonchitiet.watchdetail.quantity_stock +
                                //     "\n Sản phẩm được shop hoàn:" + $scope.hoadonhoantrachitietFake.sanphamhoandoi.code + "-Số lượng:" + $scope.hoadonhoantrachitietFake.sanphamhoandoi.quantity_stock);

                                $scope.hoadontrachitiets[i].hoadonchitiet.watchdetail.quantity_stock = $scope.hoadontrachitiets[i].soluonghoan + $scope.hoadontrachitiets[i].hoadonchitiet.watchdetail.quantity_stock;
                                var sanphamFake1 = $scope.hoadontrachitiets[i].hoadonchitiet.watchdetail;
                                $scope.hoadontrachitiets[i].update_date = formattedDate;
                                $scope.hoadontrachitiets[i].updated_by = username;
                                $scope.hoadontrachitiets[i].money_hoan = $scope.hoadontrachitiets[i].soluonghoan * $scope.hoadontrachitiets[i].hoadonchitiet.watchdetail.price;
                                if ($scope.hoadontrachitiets[i].hoadonchitiet.giamgia) {
                                    $scope.hoadontrachitiets[i].money_hoan = $scope.hoadontrachitiets[i].soluonghoan * $scope.hoadontrachitiets[i].hoadonchitiet.watchdetail.price * ((100 - $scope.hoadontrachitiets[i].hoadonchitiet.giamgia) / 100);
                                }
                                // console.log("Sau khi hoàn \nSản phẩm yêu cầu hoàn:" + $scope.hoadontrachitiets[i].hoadonchitiet.watchdetail.code + "-Số lượng:" + $scope.hoadontrachitiets[i].hoadonchitiet.watchdetail.quantity_stock +
                                //     "\n Sản phẩm được shop hoàn:" + $scope.hoadonhoantrachitietFake.sanphamhoandoi.code + "-Số lượng:" + $scope.hoadonhoantrachitietFake.sanphamhoandoi.quantity_stock);
                                $http.post("http://localhost:8080/api/hoadontrachitiet/add", $scope.hoadontrachitiets[i])
                                    .then(function (response) {
                                        console.log("Hóa đơn chi tiết hoàn hết phần đổi sản phẩm cập nhập thành công");
                                        $http.post("http://localhost:8080/api/watch/addsanpham", sanphamFake1)
                                            .then(function (response) {
                                                console.log("Sản phẩm yêu cầu hoàn cập nhập thành công!")
                                            })
                                            .catch(function (error) {
                                                // Xử lý lỗi nếu có
                                                console.error('Lỗi khi cập nhật trạng thái cho hóa đơn có ID:', error);
                                            });
                                        $scope.hoadon.status = 11;
                                        $http.post("http://localhost:8080/api/order/add", $scope.hoadon)
                                            .then(function (responseOrder) {
                                                var thongbaoFake = {
                                                    create_date: formattedDate,
                                                    status: 2,
                                                    order: responseOrder.data
                                                }
                                                $http.post("http://localhost:8080/api/thongbaoadmin/add", thongbaoFake)
                                                    .then(function (responseThongBao) {
                                                        console.log("Tạo thông báo thành công!");
                                                        $http.post("http://localhost:8080/api/checkemail/send-notificationAdmin", responseThongBao.data)
                                                            .then(function (response) {
                                                                console.log("Tạo thông báo tới email thành công!")
                                                            })
                                                            .catch(function (error) {
                                                                // Xử lý lỗi nếu có
                                                                console.error('Lỗi khi cập nhật trạng thái cho hóa đơn có ID:', order.id, error);
                                                            });
                                                    })
                                                    .catch(function (error) {
                                                        // Xử lý lỗi nếu có
                                                        console.error('Lỗi khi cập nhật trạng thái cho hóa đơn có ID:', order.id, error);
                                                    });
                                                $scope.hoadontras[0].updated_by = username;
                                                $scope.hoadontras[0].update_date = formattedDate;
                                                $scope.hoadontras[0].status = 1;
                                                $http.post("http://localhost:8080/api/hoadontra/add", $scope.hoadontras[0])
                                                    .then(function (response) {


                                                    }, function (error) {
                                                        console.error('Lỗi trong quá trình gọi API:', error);
                                                    });
                                            }, function (error) {
                                                console.error('Lỗi trong quá trình gọi API:', error);
                                            });
                                        alert("Đã xác nhận hóa đơn hoàn thành công!");
                                        $scope.showDoiTraChiTiet = false;
                                        $route.reload();
                                    })
                                    .catch(function (error) {
                                        // Xử lý lỗi nếu có
                                        console.error('Lỗi khi cập nhật trạng thái cho hóa đơn có ID:', error);
                                    });
                            }
                        } else {
                            if ($scope.hoadontrachitiets[i].trangthaihoansanpham == 0) {
                                // alert("Xác nhận hoàn 1 phần")
                                if (!$scope.hoadontrachitiets[i].motalydohoanmotphan) {
                                    alert("Cần phải điền đầy đủ thông tin lý do hoàn 1 phần");
                                } else {
                                    // console.log("Sản phẩm yêu cầu hoàn:" + $scope.hoadontrachitiets[i].hoadonchitiet.watchdetail.code + "-Số lượng:" + $scope.hoadontrachitiets[i].hoadonchitiet.watchdetail.quantity_stock +
                                    //     "\n Sản phẩm được shop hoàn:" + $scope.hoadonhoantrachitietFake.sanphamhoandoi.code + "-Số lượng:" + $scope.hoadonhoantrachitietFake.sanphamhoandoi.quantity_stock);

                                    $scope.hoadontrachitiets[i].hoadonchitiet.watchdetail.quantity_stock = $scope.hoadontrachitiets[i].soluonghoan + $scope.hoadontrachitiets[i].hoadonchitiet.watchdetail.quantity_stock;
                                    $scope.hoadonhoantrachitietFake.sanphamhoandoi.quantity_stock = $scope.hoadonhoantrachitietFake.sanphamhoandoi.quantity_stock - $scope.hoadontrachitiets[i].soluonghoan;
                                    $scope.hoadontrachitiets[i].update_date = formattedDate;
                                    $scope.hoadontrachitiets[i].updated_by = username;
                                    var sanphamFake1 = $scope.hoadontrachitiets[i].hoadonchitiet.watchdetail;
                                    var sanphamFake2 = $scope.hoadonhoantrachitietFake.sanphamhoandoi;
                                    // console.log("Sau khi hoàn \nSản phẩm yêu cầu hoàn:" + $scope.hoadontrachitiets[i].hoadonchitiet.watchdetail.code + "-Số lượng:" + $scope.hoadontrachitiets[i].hoadonchitiet.watchdetail.quantity_stock +
                                    //     "\n Sản phẩm được shop hoàn:" + $scope.hoadonhoantrachitietFake.sanphamhoandoi.code + "-Số lượng:" + $scope.hoadonhoantrachitietFake.sanphamhoandoi.quantity_stock);
                                    $scope.hoadontrachitiets[i].id_sanphamshophoan = $scope.hoadonhoantrachitietFake.sanphamhoandoi.id;
                                    $http.post("http://localhost:8080/api/hoadontrachitiet/add", $scope.hoadontrachitiets[i])
                                        .then(function (response) {
                                            console.log("Hóa đơn chi tiết 1 phần đổi sản phẩm cập nhập thành công");
                                            $http.post("http://localhost:8080/api/watch/addsanpham", sanphamFake1)
                                                .then(function (response) {
                                                    console.log("Sản phẩm yêu cầu hoàn cập nhập thành công!")
                                                })
                                                .catch(function (error) {
                                                    // Xử lý lỗi nếu có
                                                    console.error('Lỗi khi cập nhật trạng thái cho hóa đơn có ID:', error);
                                                });

                                            $http.post("http://localhost:8080/api/watch/addsanpham", sanphamFake2)
                                                .then(function (response) {
                                                    console.log("Sản phẩm Shop hoàn cập nhập thành công!")
                                                })
                                                .catch(function (error) {
                                                    // Xử lý lỗi nếu có
                                                    console.error('Lỗi khi cập nhật trạng thái cho hóa đơn có ID:', error);
                                                });
                                            $scope.hoadon.status = 11;
                                            $http.post("http://localhost:8080/api/order/add", $scope.hoadon)
                                                .then(function (responseOrder) {
                                                    var thongbaoFake = {
                                                        create_date: formattedDate,
                                                        status: 2,
                                                        order: responseOrder.data
                                                    }
                                                    $http.post("http://localhost:8080/api/thongbaoadmin/add", thongbaoFake)
                                                        .then(function (responseThongBao) {
                                                            console.log("Tạo thông báo thành công!");
                                                            $http.post("http://localhost:8080/api/checkemail/send-notificationAdmin", responseThongBao.data)
                                                                .then(function (response) {
                                                                    console.log("Tạo thông báo tới email thành công!")
                                                                })
                                                                .catch(function (error) {
                                                                    // Xử lý lỗi nếu có
                                                                    console.error('Lỗi khi cập nhật trạng thái cho hóa đơn có ID:', order.id, error);
                                                                });
                                                        })
                                                        .catch(function (error) {
                                                            // Xử lý lỗi nếu có
                                                            console.error('Lỗi khi cập nhật trạng thái cho hóa đơn có ID:', order.id, error);
                                                        });
                                                    $scope.hoadontras[0].updated_by = username;
                                                    $scope.hoadontras[0].update_date = formattedDate;
                                                    $scope.hoadontras[0].status = 1;
                                                    $http.post("http://localhost:8080/api/hoadontra/add", $scope.hoadontras[0])
                                                        .then(function (response) {


                                                        }, function (error) {
                                                            console.error('Lỗi trong quá trình gọi API:', error);
                                                        });
                                                }, function (error) {
                                                    console.error('Lỗi trong quá trình gọi API:', error);
                                                });
                                            alert("Đã xác nhận hóa đơn hoàn thành công!");
                                            $scope.showDoiTraChiTiet = false;
                                            $route.reload();
                                        })
                                        .catch(function (error) {
                                            // Xử lý lỗi nếu có
                                            console.error('Lỗi khi cập nhật trạng thái cho hóa đơn có ID:', error);
                                        });
                                }
                            } else {
                                alert("Xác nhận hoàn hết")
                                // console.log("Sản phẩm yêu cầu hoàn:" + $scope.hoadontrachitiets[i].hoadonchitiet.watchdetail.code + "-Số lượng:" + $scope.hoadontrachitiets[i].hoadonchitiet.watchdetail.quantity_stock +
                                //     "\n Sản phẩm được shop hoàn:" + $scope.hoadonhoantrachitietFake.sanphamhoandoi.code + "-Số lượng:" + $scope.hoadonhoantrachitietFake.sanphamhoandoi.quantity_stock);

                                $scope.hoadontrachitiets[i].hoadonchitiet.watchdetail.quantity_stock = $scope.hoadontrachitiets[i].soluonghoan + $scope.hoadontrachitiets[i].hoadonchitiet.watchdetail.quantity_stock;
                                $scope.hoadonhoantrachitietFake.sanphamhoandoi.quantity_stock = $scope.hoadonhoantrachitietFake.sanphamhoandoi.quantity_stock - $scope.hoadontrachitiets[i].soluonghoan;
                                $scope.hoadontrachitiets[i].update_date = formattedDate;
                                $scope.hoadontrachitiets[i].updated_by = username;
                                // console.log("Sau khi hoàn \nSản phẩm yêu cầu hoàn:" + $scope.hoadontrachitiets[i].hoadonchitiet.watchdetail.code + "-Số lượng:" + $scope.hoadontrachitiets[i].hoadonchitiet.watchdetail.quantity_stock +
                                //     "\n Sản phẩm được shop hoàn:" + $scope.hoadonhoantrachitietFake.sanphamhoandoi.code + "-Số lượng:" + $scope.hoadonhoantrachitietFake.sanphamhoandoi.quantity_stock);
                                var sanphamFake1 = $scope.hoadontrachitiets[i].hoadonchitiet.watchdetail;
                                var sanphamFake2 = $scope.hoadonhoantrachitietFake.sanphamhoandoi;
                                $scope.hoadontrachitiets[i].id_sanphamshophoan = $scope.hoadonhoantrachitietFake.sanphamhoandoi.id;
                                $http.post("http://localhost:8080/api/hoadontrachitiet/add", $scope.hoadontrachitiets[i])
                                    .then(function (response) {
                                        console.log("Hóa đơn chi tiết hoàn hết phần đổi sản phẩm cập nhập thành công");
                                        $http.post("http://localhost:8080/api/watch/addsanpham", sanphamFake1)
                                            .then(function (response) {
                                                console.log("Sản phẩm yêu cầu hoàn cập nhập thành công!")
                                            })
                                            .catch(function (error) {
                                                // Xử lý lỗi nếu có
                                                console.error('Lỗi khi cập nhật trạng thái cho hóa đơn có ID:', error);
                                            });

                                        $http.post("http://localhost:8080/api/watch/addsanpham", sanphamFake2)
                                            .then(function (response) {
                                                console.log("Sản phẩm Shop hoàn cập nhập thành công!")
                                            })
                                            .catch(function (error) {
                                                // Xử lý lỗi nếu có
                                                console.error('Lỗi khi cập nhật trạng thái cho hóa đơn có ID:', error);
                                            });
                                        $scope.hoadon.status = 11;
                                        $http.post("http://localhost:8080/api/order/add", $scope.hoadon)
                                            .then(function (responseOrder) {
                                                var thongbaoFake = {
                                                    create_date: formattedDate,
                                                    status: 2,
                                                    order: responseOrder.data
                                                }
                                                $http.post("http://localhost:8080/api/thongbaoadmin/add", thongbaoFake)
                                                    .then(function (responseThongBao) {
                                                        console.log("Tạo thông báo thành công!");
                                                        $http.post("http://localhost:8080/api/checkemail/send-notificationAdmin", responseThongBao.data)
                                                            .then(function (response) {
                                                                console.log("Tạo thông báo tới email thành công!")
                                                            })
                                                            .catch(function (error) {
                                                                // Xử lý lỗi nếu có
                                                                console.error('Lỗi khi cập nhật trạng thái cho hóa đơn có ID:', order.id, error);
                                                            });
                                                    })
                                                    .catch(function (error) {
                                                        // Xử lý lỗi nếu có
                                                        console.error('Lỗi khi cập nhật trạng thái cho hóa đơn có ID:', order.id, error);
                                                    });
                                                $scope.hoadontras[0].updated_by = username;
                                                $scope.hoadontras[0].update_date = formattedDate;
                                                $scope.hoadontras[0].status = 1;
                                                $http.post("http://localhost:8080/api/hoadontra/add", $scope.hoadontras[0])
                                                    .then(function (response) {


                                                    }, function (error) {
                                                        console.error('Lỗi trong quá trình gọi API:', error);
                                                    });
                                            }, function (error) {
                                                console.error('Lỗi trong quá trình gọi API:', error);
                                            });
                                        alert("Đã xác nhận hóa đơn hoàn thành công!");
                                        $scope.showDoiTraChiTiet = false;
                                        $route.reload();
                                    })
                                    .catch(function (error) {
                                        // Xử lý lỗi nếu có
                                        console.error('Lỗi khi cập nhật trạng thái cho hóa đơn có ID:', error);
                                    });
                            }
                        }

                    } else {
                        // alert("Từ chối hoàn");
                        if (!$scope.hoadontrachitiets[i].lydotuchoihoan || !$scope.hoadontrachitiets[i].motachitietlydotuchoihoan) {
                            alert("Cần phải đầy đủ lý do từ chối!")
                        } else {
                            $scope.hoadontrachitiets[i].update_date = formattedDate;
                            $scope.hoadontrachitiets[i].updated_by = username;
                            $http.post("http://localhost:8080/api/hoadontrachitiet/add", $scope.hoadontrachitiets[i])
                                .then(function (response) {
                                    $scope.hoadon.status = 11;
                                    $http.post("http://localhost:8080/api/order/add", $scope.hoadon)
                                        .then(function (responseOrder) {
                                            var thongbaoFake = {
                                                create_date: formattedDate,
                                                status: 3,
                                                order: responseOrder.data
                                            }
                                            $http.post("http://localhost:8080/api/thongbaoadmin/add", thongbaoFake)
                                                .then(function (responseThongBao) {
                                                    console.log("Tạo thông báo thành công!");
                                                    $http.post("http://localhost:8080/api/checkemail/send-notificationAdmin", responseThongBao.data)
                                                        .then(function (response) {
                                                            console.log("Tạo thông báo tới email thành công!")
                                                        })
                                                        .catch(function (error) {
                                                            // Xử lý lỗi nếu có
                                                            console.error('Lỗi khi cập nhật trạng thái cho hóa đơn có ID:', order.id, error);
                                                        });
                                                })
                                                .catch(function (error) {
                                                    // Xử lý lỗi nếu có
                                                    console.error('Lỗi khi cập nhật trạng thái cho hóa đơn có ID:', order.id, error);
                                                });
                                            $scope.hoadontras[0].updated_by = username;
                                            $scope.hoadontras[0].update_date = formattedDate;
                                            $scope.hoadontras[0].status = 1;
                                            $http.post("http://localhost:8080/api/hoadontra/add", $scope.hoadontras[0])
                                                .then(function (response) {

                                                }, function (error) {
                                                    console.error('Lỗi trong quá trình gọi API:', error);
                                                });
                                        }, function (error) {
                                            console.error('Lỗi trong quá trình gọi API:', error);
                                        });
                                    alert("Đã xác nhận hóa đơn hoàn thành công!");
                                    $scope.showDoiTraChiTiet = false;
                                    $route.reload();
                                })
                                .catch(function (error) {
                                    // Xử lý lỗi nếu có
                                    console.error("Lỗi khi thêm hoadontrachitiet:", error);
                                });

                        }

                    }
                }
            }

        }
        // alert("Đây là hóa đơn cần update: "+ JSON.stringify($scope.hoadontras[0]));

    }

    $scope.watchdetails = [];
    $http.get("http://localhost:8080/api/watch")
        .then(function (imageResponse) {
            $scope.watchdetails = imageResponse.data;
        });

    $scope.showDoiTraChiTietThanhCong = false;
    $scope.startDoiTraChiTietThanhCong = function (ord) {
        console.log("Dữ liệu order khi bắt đầu:", ord);
        $scope.showDoiTraChiTietThanhCong = true;
        $scope.hoadon = ord;
        $http.get("http://localhost:8080/api/hoadontra")
            .then(function (response) {
                $scope.hoadontras = response.data;
                var foundHoadontra = $scope.hoadontras.find(function (hoadontra) {
                    return hoadontra.order.id === $scope.hoadon.id;
                });
                $http.get("http://localhost:8080/api/hoadontrachitiet/" + foundHoadontra.id + "/hoadontrachitietforhoadontra")
                    .then(function (response) {
                        $scope.hoadontrachitiets = response.data;
                        // alert("Đẩy dữ liệu vào đây là okla")
                        angular.forEach(response.data, function (cartItem) {
                            cartItem.hoadonchitiet.watchdetail.images = [];
                            $http.get("http://localhost:8080/api/watch/" + cartItem.hoadonchitiet.watchdetail.id + "/images").then(function (imageResponse) {
                                cartItem.hoadonchitiet.watchdetail.images = imageResponse.data;
                            });
                            angular.forEach($scope.watchdetails, function (spItem) {
                                if (cartItem.id_sanphamshophoan === spItem.id) {
                                    cartItem.sanphamhoandoi = spItem;
                                }
                            });
                        });

                    }, function (error) {
                        console.error('Lỗi trong quá trình gọi API:', error);
                    });
            }, function (error) {
                console.error('Lỗi trong quá trình gọi API:', error);
            });
    }
    $scope.DoiTraChiTietThanhCong = function () {
        $scope.showDoiTraChiTietThanhCong = false;
    }


    $scope.loadOrder();

})