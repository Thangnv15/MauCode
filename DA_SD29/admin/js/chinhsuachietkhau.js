myapp.controller("chinhsuachietkhau-ctrl", function ($scope, $http, $location, $route) {
    // alert("Hello khuyen mai3!")
    $scope.km3s = [];
    var currentDate = new Date();
    $http.get("http://localhost:8080/api/chietkhausanphamdetail").then(function (imageResponse) {
        $scope.km3s = imageResponse.data;
        angular.forEach($scope.km3s, function (item) {
            var ngaybatdau = new Date(item.chietkhausanpham.ngaybatdau);
            var ngayketthuc = new Date(item.chietkhausanpham.ngayketthuc);
            if (currentDate >= ngaybatdau && currentDate <= ngayketthuc) {
                // console.log("Có 1 cái");
                if(item.chietkhausanpham.status===4){

                }else{
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
    $scope.khuyenmais = [];
    $http.get("http://localhost:8080/api/chietkhausanpham")
        .then(function (response) {
            $scope.khuyenmais = response.data;
        }).catch(function (error) {
            // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
            console.error("Lỗi khi lưu dữ liệu: ", error);
        });

    $scope.localStorageKMDT = JSON.parse(localStorage.getItem('DetailKhuyenMai')) || [];

    console.log($scope.localStorageKMDT.name)
    $scope.startTime = new Date($scope.localStorageKMDT.ngaybatdau);
    $scope.endTime = new Date($scope.localStorageKMDT.ngayketthuc);

    console.log($scope.localStorageKMDT.status)

    // const currentDate = new Date();
    $scope.emtyName = false;
    $scope.NameValid = false;
    $scope.emtyTime = false;
    $scope.timeValid = false;
    $scope.timeBatDau = false;

    $scope.xacNhan = function () {
        $scope.NameValid = false;

        var batdau = new Date($scope.startTime);
        var ketthuc = new Date($scope.endTime);
        // $scope.test = new Date(formattedTime);
        if (!$scope.localStorageKMDT.name) {
            $scope.emtyName = true;
            return;
        } else {
            $scope.emtyName = false;
        }
        // angular.forEach($scope.khuyenmais, function (item) {
        //     console.log(item.name)
        //     if (item.name === $scope.localStorageKMDT.name) {
        //         $scope.NameValid = true;
        //         return;
        //     }
        // })
        if (!$scope.startTime || !$scope.endTime) {
            $scope.emtyTime = true;
            return;
        } else {
            $scope.emtyTime = false;
        }
        if ($scope.startTime >= $scope.endTime) {
            $scope.timeValid = true;
            return;
        } else {
            $scope.timeValid = false;
        }

        if ($scope.startTime <= currentDate) {
            if ($scope.localStorageKMDT.status === 2) {
                $scope.timeBatDau = false;
            } else {
                $scope.timeBatDau = true;
                return;
            }
        } else {
            $scope.timeBatDau = false;
        }

        var allGiamGiaExist = $scope.mangSanPham.every(function (sp) {
            return sp.id_sanpham.giamgia !== undefined && sp.id_sanpham.giamgia !== null || sp.giamgia !== undefined;
        });

        if (allGiamGiaExist && $scope.mangSanPham && $scope.mangSanPham.length > 0 && !$scope.loigiamgia) {
            if ($scope.localStorageKMDT.status === 2) {
                var chietkhausanpham = {
                    id: $scope.localStorageKMDT.id,
                    name: $scope.localStorageKMDT.name,
                    ngaytao: new Date($scope.localStorageKMDT.ngaytao) ,
                    ngaybatdau: new Date($scope.localStorageKMDT.ngaybatdau) ,
                    ngayketthuc: ketthuc,
                    loaivoucher: 3,
                    status: $scope.localStorageKMDT.status
                };
            } else {
                var chietkhausanpham = {
                    id: $scope.localStorageKMDT.id,
                    name: $scope.localStorageKMDT.name,
                    ngaytao: new Date($scope.localStorageKMDT.ngaytao) ,
                    ngaybatdau: batdau,
                    ngayketthuc: ketthuc,
                    loaivoucher: 3,
                    status: $scope.localStorageKMDT.status
                };
            }
            // alert("Chiết khấu sản phẩm đây:" + JSON.stringify(chietkhausanpham));
            $http.post("http://localhost:8080/api/chietkhausanpham/add", chietkhausanpham)
                .then(function (response) {
                    var ckspFake = response.data;
                    // Xử lý phản hồi từ server nếu cần
                    angular.forEach($scope.mangSanPham, function (sp) {
                        if (sp.giamgia) {
                            angular.forEach($scope.km3s, function (spItem) {
                                if (sp.id_sanpham.product.name === spItem.watchdetail.product.name && spItem.chietkhausanpham.id === $scope.localStorageKMDT.id) {
                                    var chietkhausanphamdetail = {
                                        id: spItem.id,
                                        chietkhausanpham: ckspFake,
                                        watchdetail: spItem.watchdetail,
                                        giamgia: sp.giamgia,
                                        status: 0
                                    }
                                    $http.post("http://localhost:8080/api/chietkhausanphamdetail/add", chietkhausanphamdetail)
                                        .then(function (response) {
                                        })
                                        .catch(function (error) {
                                            // Xử lý lỗi nếu có
                                            console.error('Lỗi khi cập nhật trạng thái cho hóa đơn có ID:', error);
                                        });
                                }
                            });
                        } else {
                            angular.forEach($scope.Oridinalwatchs, function (spItem) {
                                if (sp.id_sanpham.product.name === spItem.product.name) {
                                    var chietkhausanphamdetail = {
                                        chietkhausanpham: ckspFake,
                                        watchdetail: spItem,
                                        giamgia: sp.id_sanpham.giamgia,
                                        status: 0
                                    }
                                    $http.post("http://localhost:8080/api/chietkhausanphamdetail/add", chietkhausanphamdetail)
                                        .then(function (response) {
                                        })
                                        .catch(function (error) {
                                            // Xử lý lỗi nếu có
                                            console.error('Lỗi khi cập nhật trạng thái cho hóa đơn có ID:', error);
                                        });
                                }
                            });

                        }

                    });
                    alert("Cập nhập khuyến mãi thành công!")
                    $location.path("/khuyenMai");
                })
                .catch(function (error) {
                    // Xử lý lỗi nếu có
                    console.error('Lỗi khi cập nhật trạng thái cho hóa đơn có ID:', error);
                });

        } else {
            alert("Có sản phẩm chưa đặt chiết khấu")
        }
        // alert("Thời gian bắt đầu:" + formattedTime + "-Thời gian kết thuc" + ketthuc)
    }

    $scope.updateThoiGian = function () {
        if ($scope.startTime > $scope.endTime) {
            if ($scope.localStorageKMDT.status === 2) {
                $scope.timeValid = true;
            } else {
                $scope.startTime = null;
                $scope.timeValid = true;
            }

        } else {
            $scope.timeValid = false;
        }
    }

    $scope.showSanPham = false;
    $scope.showThemSanPham = function () {
        $scope.showSanPham = true;
    }

    $scope.closeSanPham = function () {
        $scope.showSanPham = false;
    }

    $scope.huySP = function () {
        $scope.showSanPham = false;
    }


    $scope.watchs = [];
    $scope.filteredWatchs = [];
    $scope.Oridinalwatchs = [];
    $scope.loadPage = function () {
        $http.get("http://localhost:8080/api/watch")
            .then(function (response) {
                // Gán dữ liệu trả về từ API vào biến $scope.watchs
                $scope.watchs = response.data;
                $scope.filteredWatchs = angular.copy($scope.watchs);
                $scope.Oridinalwatchs = angular.copy($scope.watchs);
                // Lặp qua danh sách sản phẩm và lấy danh sách hình ảnh
                var uniqueProductNames = {}; // Sử dụng đối tượng để theo dõi tên sản phẩm duy nhất
                var uniqueProductNamesfilteredWatchs = {}; // Sử dụng đối tượng để theo dõi tên sản phẩm duy nhất

                // Loại bỏ các sản phẩm trùng tên và gán danh sách sản phẩm duy nhất vào $scope.watchs
                $scope.watchs = $scope.watchs.filter(function (watch) {
                    if (!uniqueProductNames[watch.product.name]) {
                        uniqueProductNames[watch.product.name] = true;
                        return true; // Giữ sản phẩm nếu tên sản phẩm chưa được thấy
                    }
                    return false; // Loại bỏ sản phẩm nếu tên sản phẩm đã tồn tại
                });
                $scope.filteredWatchs = $scope.filteredWatchs.filter(function (watch) {
                    if (!uniqueProductNamesfilteredWatchs[watch.product.name]) {
                        uniqueProductNamesfilteredWatchs[watch.product.name] = true;
                        return true; // Giữ sản phẩm nếu tên sản phẩm chưa được thấy
                    }
                    return false; // Loại bỏ sản phẩm nếu tên sản phẩm đã tồn tại
                });
                angular.forEach($scope.watchs, function (cartItem) {
                    $http.get("http://localhost:8080/api/watch/" + cartItem.id + "/images").then(function (imageResponse) {
                        cartItem.images = imageResponse.data;
                        console.log(cartItem.images[0].image_link); // Lấy hình ảnh đầu tiên từ danh sách
                    });
                });
            }).catch(function (error) {
                // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
                console.error("Lỗi khi lưu dữ liệu: ", error);
            });

    }
    $scope.toggleSelectAll = function () {
        angular.forEach($scope.watchs, function (watch) {
            watch.selected = $scope.selectAll;
        });
    };

    $scope.toggleSelectAllSP = function () {
        angular.forEach($scope.mangSanPham, function (watch) {
            watch.selected = $scope.selectAllSP;
        });
    };

    $scope.mangSanPham = [];
    $scope.count = 0;
    $scope.xacNhanSP = function () {
        var selectedWatches = $scope.watchs.filter(function (watch) {
            return watch.selected;
        });
        $scope.showSanPham = false;

        if (selectedWatches.length > 0) {
            angular.forEach(selectedWatches, function (watch) {
                // Kiểm tra xem watch đã tồn tại trong mangSanPham chưa
                var isWatchExist = false;

                angular.forEach($scope.mangSanPham, function (detailsanpham) {
                    if (detailsanpham.id_sanpham.id === watch.id || detailsanpham.id_sanpham.product.name === watch.product.name) {
                        isWatchExist = true;
                        return; // Thoát khỏi vòng lặp khi tìm thấy sản phẩm
                    }
                });

                // Nếu watch chưa tồn tại trong mangSanPham, thêm vào
                if (!isWatchExist) {
                    var detailsanpham = {
                        id_sanpham: watch
                    };
                    $scope.count++;
                    $scope.mangSanPham.push(detailsanpham);
                }
            });
            angular.forEach($scope.mangSanPham, function (mang) {
                mang.tongQuantityStock = 0;
                angular.forEach($scope.Oridinalwatchs, function (watch) {
                    if (mang.id_sanpham.product.name === watch.product.name) {
                        mang.tongQuantityStock += watch.quantity_stock;
                    }
                });
            });


            // console.log(message);
        } else {
            alert("Không có sản phẩm nào được chọn.");
        }
        angular.forEach($scope.mangSanPham, function (cartItem) {
            $http.get("http://localhost:8080/api/watch/" + cartItem.id_sanpham.id + "/images").then(function (imageResponse) {
                cartItem.id_sanpham.images = imageResponse.data;
                // console.log(cartItem.images[0].image_link); // Lấy hình ảnh đầu tiên từ danh sách
            });
        });
    };
    // var idHM = $scope.localStorageKMDT.id;
    // console.log($scope.localStorageKMDT.id)

    $scope.chietkhaudetails = [];
    $http.get("http://localhost:8080/api/chietkhausanphamdetail")
        .then(function (response) {
            $scope.chietkhaudetails = response.data;
            var productMap = {}; // Đối tượng để lưu thông tin sản phẩm

            angular.forEach($scope.chietkhaudetails, function (item) {
                if (item.chietkhausanpham.id === $scope.localStorageKMDT.id) {
                    var productName = item.watchdetail.product.name;

                    if (productMap[productName]) {
                        // Nếu sản phẩm đã tồn tại trong đối tượng, cộng thêm quantity_stock
                        productMap[productName].tongQuantityStock += item.watchdetail.quantity_stock;
                    } else {
                        // Nếu sản phẩm chưa tồn tại, tạo mới đối tượng cho sản phẩm
                        productMap[productName] = {
                            id_sanpham: item.watchdetail,
                            giamgia: item.giamgia,
                            tongQuantityStock: item.watchdetail.quantity_stock
                        };
                        $scope.count++;
                    }
                }
            });

            // Chuyển đối tượng thành mảng
            $scope.mangSanPham = Object.values(productMap);

            // Tính tổng quantity_stock cho từng sản phẩm
            angular.forEach($scope.mangSanPham, function (cartItem) {
                $http.get("http://localhost:8080/api/watch/" + cartItem.id_sanpham.id + "/images").then(function (imageResponse) {
                    cartItem.id_sanpham.images = imageResponse.data;
                    console.log("Ảnh của các bố đây" + cartItem.id_sanpham.images[0].image_link); // Lấy hình ảnh đầu tiên từ danh sách
                });
            });
        }).catch(function (error) {
            console.error("Lỗi khi lấy dữ liệu từ API: ", error);
        });

    $scope.xoaSP = function (sanpham) {
        // Tìm vị trí của sản phẩm trong mangSanPham
        var indexToRemove = -1;

        for (var i = 0; i < $scope.mangSanPham.length; i++) {
            if ($scope.mangSanPham[i].id_sanpham.id === sanpham.id_sanpham.id) {
                indexToRemove = i;
                break;
            }
        }

        // Nếu sản phẩm có tồn tại trong mangSanPham, xóa nó
        if (indexToRemove !== -1) {
            $scope.mangSanPham.splice(indexToRemove, 1);
        }
        $scope.count--;
    };

    $scope.loigiamgia = false;
    $scope.updateSoLuongSanPham = function (sp) {
        sp.fix = false;
        sp.fix40 = false;
        sp.fix60 = false;
        sp.fix80 = false;
        $scope.loigiamgia = false;
        if (sp.id_sanpham.giamgia <= 0) {
            sp.id_sanpham.giamgia = 0;
            sp.fix = true
            $scope.loigiamgia = true;
        }

        if (sp.id_sanpham.giamgia >= 40) {
            sp.fix = false;
            sp.fix40 = true;
            sp.fix60 = false;
            sp.fix80 = false;
        }


        if (sp.id_sanpham.giamgia >= 60) {
            sp.fix = false;
            sp.fix40 = false;
            sp.fix60 = true;
            sp.fix80 = false;
        }


        if (sp.id_sanpham.giamgia >= 80) {
            sp.fix = false;
            sp.fix40 = false;
            sp.fix60 = false;
            sp.fix80 = true;
        }

        if (sp.id_sanpham.giamgia >= 100) {
            sp.id_sanpham.giamgia = 100;
            sp.fix = true;
            sp.fix40 = false;
            sp.fix60 = false;
            sp.fix80 = false;
            $scope.loigiamgia = true;
        }


        // Tính giá giảm dựa trên phần trăm
        var giaGiam = (sp.id_sanpham.giamgia / 100) * sp.id_sanpham.price;

        // Cập nhật giá mới
        sp.giaMoi = sp.id_sanpham.price - giaGiam;
    };
    $scope.updateGiamgiahangloat = function () {
        if ($scope.giamgiahangloat <= 0) {
            $scope.giamgiahangloat = 0;
        }

        if ($scope.giamgiahangloat >= 100) {
            $scope.giamgiahangloat = 100;
        }
    };

    $scope.searchProducts = function (searchTerm) {
        // alert("Alo babae!" + searchTerm);
        // $scope.watchs = $scope.watchs.filter(function (watch) {
        //     return watch.product.name.toLowerCase().includes(searchTerm.toLowerCase());
        // });
        // if(searchTerm==='' || searchTerm===null || $scope.watchs.length === 0){
        //     $scope.loadPage();
        // }

        if (!searchTerm || searchTerm.trim() === '') {
            // Nếu searchTerm rỗng, load lại trang
            $scope.loadPage();
            return;
        }

        var regex = new RegExp(searchTerm.trim().split('').join('.*?'), 'i');

        $scope.watchs = $scope.filteredWatchs.filter(function (watch) {
            $http.get("http://localhost:8080/api/watch/" + watch.id + "/images").then(function (imageResponse) {
                watch.images = imageResponse.data;
            });
            return regex.test(watch.product.name);
        });

        if ($scope.watchs.length === 0) {
            // Nếu không tìm thấy sản phẩm, có thể hiển thị thông báo hoặc thực hiện các thao tác khác
            $scope.loadPage();
            // alert("Co cai nit")
        }
    };

    $scope.capnhapHangloat = function () {
        // Lặp qua danh sách sản phẩm và cập nhật giảm giá cho các sản phẩm đã chọn
        angular.forEach($scope.mangSanPham, function (sp) {
            if (sp.selected) {
                sp.id_sanpham.giamgia = $scope.giamgiahangloat;
                $scope.updateSoLuongSanPham(sp);
                if (sp.giamgia) {
                    sp.giamgia = $scope.giamgiahangloat
                    $scope.updateSoLuongSanPham(sp);
                }
            }
        });
    };



    $scope.loadPage()
});