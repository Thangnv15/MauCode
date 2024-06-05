myapp.controller("thuonghieu-ctrl", function ($scope, $http, $location, $route) {
    // alert("Hello ban hang");
    $scope.brands = [];
    $http.get("http://localhost:8080/api/brand")
        .then(function (response) {
            $scope.brands = response.data;
        }).catch(function (error) {
            // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
            console.error("Lỗi khi lưu dữ liệu: ", error);
        });

    $scope.watchs = [];
    $http.get("http://localhost:8080/api/watch")
        .then(function (response) {
            $scope.watchs = response.data;
            angular.forEach($scope.watchs, function (item) {
                angular.forEach($scope.brands, function (brandItem) {
                    if (item.brand.id === brandItem.id) {
                        brandItem.notXoa = true;
                    }
                })
                angular.forEach($scope.mauvos, function (brandItem) {
                    if (item.casecolor.id === brandItem.id) {
                        brandItem.notXoa = true;
                    }
                })
                angular.forEach($scope.dongmays, function (brandItem) {
                    if (item.machinetype.id === brandItem.id) {
                        brandItem.notXoa = true;
                    }
                })
                angular.forEach($scope.chatlieudays, function (brandItem) {
                    if (item.strap.id === brandItem.id) {
                        brandItem.notXoa = true;
                    }
                })
                angular.forEach($scope.chatlieukinhs, function (brandItem) {
                    if (item.glassmaterial.id === brandItem.id) {
                        brandItem.notXoa = true;
                    }
                })
                angular.forEach($scope.sizemats, function (brandItem) {
                    if (item.size.id === brandItem.id) {
                        brandItem.notXoa = true;
                    }
                })
                angular.forEach($scope.xuatxus, function (brandItem) {
                    if (item.origin.id === brandItem.id) {
                        brandItem.notXoa = true;
                    }
                })
                angular.forEach($scope.hinhdangs, function (brandItem) {
                    if (item.shape.id === brandItem.id) {
                        brandItem.notXoa = true;
                    }
                })
                angular.forEach($scope.mauvos, function (brandItem) {
                    if (item.casecolor.id === brandItem.id) {
                        brandItem.notXoa = true;
                    }
                })
                angular.forEach($scope.tinhnangs, function (brandItem) {
                    if (item.feature.id === brandItem.id) {
                        brandItem.notXoa = true;
                    }
                })
            })

        }).catch(function (error) {
            // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
            console.error("Lỗi khi lưu dữ liệu: ", error);
        });

    $scope.themThuongHieu = false;
    $scope.openThuongHieu = function () {
        $scope.themThuongHieu = true;

    }
    $scope.closeThuongHieu = function () {
        $scope.themThuongHieu = false;

    }
    $scope.addThuongHieu = function () {
        if (!$scope.nameThuongHieu) {
            return;
        }
        $scope.errorThuongHieu = false;
        if ($scope.brands.some(item => item.name === $scope.nameThuongHieu)) {
            // Nếu nameThuongHieu đã tồn tại trong mảng, đặt biến errorThuongHieu thành true và thoát khỏi hàm.
            $scope.errorThuongHieu = true;
            return;
        }
        $http.post("http://localhost:8080/api/brand/add", $scope.nameThuongHieu)
            .then(function (response) {
                $http.get("http://localhost:8080/api/brand")
                    .then(function (brandRespon) {
                        $scope.brands = brandRespon.data;
                        $route.reload();
                    })
                    .catch(function (error) {
                        // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
                        console.error("Lỗi khi lưu dữ liệu: ", error);
                    });
                $scope.closeThuongHieu();
            })
            .catch(function (error) {
                // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
                console.error("Lỗi khi lưu dữ liệu: ", error);
            });
    }

    $scope.capnhapThuongHieu = false;
    $scope.brandCapNhap = {};
    $scope.openUpdateThuongHieu = function (brand) {
        $scope.capnhapThuongHieu = true;
        $scope.brandCapNhap = brand;

    }
    $scope.closeUpdateThuongHieu = function () {
        $scope.capnhapThuongHieu = false;

    }

    $scope.updateThuongHieu = function () {
        if (!$scope.nameThuongHieuUpdate) {
            return;
        }
        $scope.errorThuongHieuUpdate = false;
        if ($scope.brands.some(item => item.name === $scope.nameThuongHieuUpdate)) {
            // Nếu nameThuongHieu đã tồn tại trong mảng, đặt biến errorThuongHieu thành true và thoát khỏi hàm.
            $scope.errorThuongHieuUpdate = true;
            return;
        }
        $scope.brandCapNhap.name = $scope.nameThuongHieuUpdate;
        $http.post("http://localhost:8080/api/brand/them", $scope.brandCapNhap)
            .then(function (response) {
                alert("Cập nhập thương hiệu thành công!");
                $route.reload();
                $scope.closeUpdateThuongHieu();
            })
            .catch(function (error) {
                // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
                console.error("Lỗi khi lưu dữ liệu: ", error);
            });
    }

    $scope.xoaThuongHieu = function (brand) {
        var userConfirmed = confirm("Xác nhận xóa thương hiệu này? Hành động này không thể hoàn tác!");
        if (userConfirmed) {
            $http.delete("http://localhost:8080/api/brand/delete/" + brand.id)
                .then(function (response) {
                    alert("Xóa thương hiệu thành công!");
                    $route.reload();
                })
                .catch(function (error) {
                    // Xử lý lỗi nếu có lỗi xảy ra trong quá trình POST
                    console.error("Lỗi khi gửi yêu cầu POST: ", error);
                });
        }
    }

    // End thuong hieu

    // Start Mau vo

    $scope.mauvos = [];
    $http.get("http://localhost:8080/api/casecolor")
        .then(function (response) {
            $scope.mauvos = response.data;
        }).catch(function (error) {
            // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
            console.error("Lỗi khi lưu dữ liệu: ", error);
        });

    $scope.themMauVo = false;
    $scope.openMauVo = function () {
        $scope.themMauVo = true;

    }
    $scope.closeMauVo = function () {
        $scope.themMauVo = false;

    }
    $scope.addMauVo = function () {
        if (!$scope.nameMauVo) {
            return;
        }
        $scope.errorMauVo = false;
        if ($scope.mauvos.some(item => item.name === $scope.nameMauVo)) {
            // Nếu nameThuongHieu đã tồn tại trong mảng, đặt biến errorThuongHieu thành true và thoát khỏi hàm.
            $scope.errorMauVo = true;
            return;
        }
        $http.post("http://localhost:8080/api/casecolor/addExcel", $scope.nameMauVo)
            .then(function (response) {
                $http.get("http://localhost:8080/api/casecolor")
                    .then(function (brandRespon) {
                        $scope.mauvos = brandRespon.data;
                        $route.reload();
                    })
                    .catch(function (error) {
                        // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
                        console.error("Lỗi khi lưu dữ liệu: ", error);
                    });
                $scope.closeMauVo();
            })
            .catch(function (error) {
                // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
                console.error("Lỗi khi lưu dữ liệu: ", error);
            });
    }

    $scope.capnhapMauVo = false;
    $scope.mauvoCapNhap = {};
    $scope.openUpdateMauVo = function (mauvo) {
        $scope.capnhapMauVo = true;
        $scope.mauvoCapNhap = mauvo;

    }
    $scope.closeUpdateMauVo = function () {
        $scope.capnhapMauVo = false;

    }

    $scope.updateMauVo = function () {
        if (!$scope.nameMauVoUpdate) {
            return;
        }
        $scope.errorMauVoUpdate = false;
        if ($scope.mauvos.some(item => item.name === $scope.nameMauVoUpdate)) {
            // Nếu nameThuongHieu đã tồn tại trong mảng, đặt biến errorThuongHieu thành true và thoát khỏi hàm.
            $scope.errorMauVoUpdate = true;
            return;
        }
        $scope.mauvoCapNhap.name = $scope.nameMauVoUpdate;
        $http.post("http://localhost:8080/api/casecolor/them", $scope.mauvoCapNhap)
            .then(function (response) {
                alert("Cập nhập màu vỏ thành công!");
                $route.reload();
                $scope.closeUpdateMauVo();
            })
            .catch(function (error) {
                // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
                console.error("Lỗi khi lưu dữ liệu: ", error);
            });
    }

    $scope.xoaMauVo = function (mauvo) {
        var userConfirmed = confirm("Xác nhận xóa màu vỏ này? Hành động này không thể hoàn tác!");
        if (userConfirmed) {
            $http.delete("http://localhost:8080/api/casecolor/delete/" + mauvo.id)
                .then(function (response) {
                    alert("Xóa màu vỏ thành công!");
                    $route.reload();
                })
                .catch(function (error) {
                    // Xử lý lỗi nếu có lỗi xảy ra trong quá trình POST
                    console.error("Lỗi khi gửi yêu cầu POST: ", error);
                });
        }
    }

    // End mau vo

    // Start Dong may

    $scope.dongmays = [];
    $http.get("http://localhost:8080/api/dongmay")
        .then(function (response) {
            $scope.dongmays = response.data;
        }).catch(function (error) {
            // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
            console.error("Lỗi khi lưu dữ liệu: ", error);
        });

    $scope.themDongMay = false;
    $scope.openDongMay = function () {
        $scope.themDongMay = true;

    }
    $scope.closeDongMay = function () {
        $scope.themDongMay = false;

    }
    $scope.addDongMay = function () {
        if (!$scope.nameDongMay) {
            return;
        }
        $scope.errorDongMay = false;
        if ($scope.dongmays.some(item => item.name === $scope.nameDongMay)) {
            // Nếu nameThuongHieu đã tồn tại trong mảng, đặt biến errorThuongHieu thành true và thoát khỏi hàm.
            $scope.errorDongMay = true;
            return;
        }
        $http.post("http://localhost:8080/api/dongmay/addExcel", $scope.nameDongMay)
            .then(function (response) {
                $http.get("http://localhost:8080/api/dongmay")
                    .then(function (brandRespon) {
                        $scope.dongmays = brandRespon.data;
                        $route.reload();
                    })
                    .catch(function (error) {
                        // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
                        console.error("Lỗi khi lưu dữ liệu: ", error);
                    });
                $scope.closeDongMay();
            })
            .catch(function (error) {
                // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
                console.error("Lỗi khi lưu dữ liệu: ", error);
            });
    }

    $scope.capnhapDongMay = false;
    $scope.dongmayCapNhap = {};
    $scope.openUpdateDongMay = function (dongmay) {
        $scope.capnhapDongMay = true;
        $scope.dongmayCapNhap = dongmay;

    }
    $scope.closeUpdateDongMay = function () {
        $scope.capnhapDongMay = false;

    }

    $scope.updateDongMay = function () {
        if (!$scope.nameDongMayUpdate) {
            return;
        }
        $scope.errorDongMayUpdate = false;
        if ($scope.dongmays.some(item => item.name === $scope.nameDongMayUpdate)) {
            // Nếu nameThuongHieu đã tồn tại trong mảng, đặt biến errorThuongHieu thành true và thoát khỏi hàm.
            $scope.errorDongMayUpdate = true;
            return;
        }
        $scope.dongmayCapNhap.name = $scope.nameDongMayUpdate;
        $http.post("http://localhost:8080/api/dongmay/them", $scope.dongmayCapNhap)
            .then(function (response) {
                alert("Cập nhập dòng máy thành công!");
                $route.reload();
                $scope.closeUpdateDongMay();
            })
            .catch(function (error) {
                // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
                console.error("Lỗi khi lưu dữ liệu: ", error);
            });
    }

    $scope.xoaDongMay = function (dongmay) {
        var userConfirmed = confirm("Xác nhận xóa dòng máy này? Hành động này không thể hoàn tác!");
        if (userConfirmed) {
            $http.delete("http://localhost:8080/api/dongmay/delete/" + dongmay.id)
                .then(function (response) {
                    alert("Xóa dòng máy thành công!");
                    $route.reload();
                })
                .catch(function (error) {
                    // Xử lý lỗi nếu có lỗi xảy ra trong quá trình POST
                    console.error("Lỗi khi gửi yêu cầu POST: ", error);
                });
        }
    }

    // End Dong may

    // Start Chat lieu day

    $scope.chatlieudays = [];
    $http.get("http://localhost:8080/api/strap")
        .then(function (response) {
            $scope.chatlieudays = response.data;
        }).catch(function (error) {
            // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
            console.error("Lỗi khi lưu dữ liệu: ", error);
        });

    $scope.themChatLieuDay = false;
    $scope.openChatLieuDay = function () {
        $scope.themChatLieuDay = true;

    }
    $scope.closeChatLieuDay = function () {
        $scope.themChatLieuDay = false;

    }
    $scope.addChatLieuDay = function () {
        if (!$scope.nameChatLieuDay) {
            return;
        }
        $scope.errorChatLieuDay = false;
        if ($scope.chatlieudays.some(item => item.name === $scope.nameChatLieuDay)) {
            // Nếu nameThuongHieu đã tồn tại trong mảng, đặt biến errorThuongHieu thành true và thoát khỏi hàm.
            $scope.errorChatLieuDay = true;
            return;
        }
        $http.post("http://localhost:8080/api/strap/addExcel", $scope.nameChatLieuDay)
            .then(function (response) {
                $http.get("http://localhost:8080/api/strap")
                    .then(function (brandRespon) {
                        $scope.chatlieudays = brandRespon.data;
                        $route.reload();
                    })
                    .catch(function (error) {
                        // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
                        console.error("Lỗi khi lưu dữ liệu: ", error);
                    });
                $scope.closeChatLieuDay();
            })
            .catch(function (error) {
                // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
                console.error("Lỗi khi lưu dữ liệu: ", error);
            });
    }

    $scope.capnhapChatLieuDay = false;
    $scope.chatlieudayCapNhap = {};
    $scope.openUpdateChatLieuDay = function (chatlieuday) {
        $scope.capnhapChatLieuDay = true;
        $scope.chatlieudayCapNhap = chatlieuday;

    }
    $scope.closeUpdateChatLieuDay = function () {
        $scope.capnhapChatLieuDay = false;

    }

    $scope.updateChatLieuDay = function () {
        if (!$scope.nameChatLieuDayUpdate) {
            return;
        }
        $scope.errorChatLieuDayUpdate = false;
        if ($scope.chatlieudays.some(item => item.name === $scope.nameChatLieuDayUpdate)) {
            // Nếu nameThuongHieu đã tồn tại trong mảng, đặt biến errorThuongHieu thành true và thoát khỏi hàm.
            $scope.errorChatLieuDayUpdate = true;
            return;
        }
        $scope.chatlieudayCapNhap.name = $scope.nameChatLieuDayUpdate;
        $http.post("http://localhost:8080/api/strap/them", $scope.chatlieudayCapNhap)
            .then(function (response) {
                alert("Cập nhập chất liệu dây thành công!");
                $route.reload();
                $scope.closeUpdateChatLieuDay();
            })
            .catch(function (error) {
                // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
                console.error("Lỗi khi lưu dữ liệu: ", error);
            });
    }

    $scope.xoaChatLieuDay = function (chatlieuday) {
        var userConfirmed = confirm("Xác nhận xóa chất liệu dây này? Hành động này không thể hoàn tác!");
        if (userConfirmed) {
            $http.delete("http://localhost:8080/api/strap/delete/" + chatlieuday.id)
                .then(function (response) {
                    alert("Xóa chất liệu dây thành công!");
                    $route.reload();
                })
                .catch(function (error) {
                    // Xử lý lỗi nếu có lỗi xảy ra trong quá trình POST
                    console.error("Lỗi khi gửi yêu cầu POST: ", error);
                });
        }
    }

    // End Chat lieu day

    // Start Chat lieu kinh

    $scope.chatlieukinhs = [];
    $http.get("http://localhost:8080/api/chatlieukinh")
        .then(function (response) {
            $scope.chatlieukinhs = response.data;
        }).catch(function (error) {
            // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
            console.error("Lỗi khi lưu dữ liệu: ", error);
        });

    $scope.themChatLieuKinh = false;
    $scope.openChatLieuKinh = function () {
        $scope.themChatLieuKinh = true;

    }
    $scope.closeChatLieuKinh = function () {
        $scope.themChatLieuKinh = false;

    }
    $scope.addChatLieuKinh = function () {
        if (!$scope.nameChatLieuKinh) {
            return;
        }
        $scope.errorChatLieuKinh = false;
        if ($scope.chatlieukinhs.some(item => item.name === $scope.nameChatLieuKinh)) {
            // Nếu nameThuongHieu đã tồn tại trong mảng, đặt biến errorThuongHieu thành true và thoát khỏi hàm.
            $scope.errorChatLieuKinh = true;
            return;
        }
        $http.post("http://localhost:8080/api/chatlieukinh/addExcel", $scope.nameChatLieuKinh)
            .then(function (response) {
                $http.get("http://localhost:8080/api/chatlieukinh")
                    .then(function (brandRespon) {
                        $scope.chatlieukinhs = brandRespon.data;
                        $route.reload();
                    })
                    .catch(function (error) {
                        // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
                        console.error("Lỗi khi lưu dữ liệu: ", error);
                    });
                $scope.closeChatLieuKinh();
            })
            .catch(function (error) {
                // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
                console.error("Lỗi khi lưu dữ liệu: ", error);
            });
    }

    $scope.capnhapChatLieuKinh = false;
    $scope.chatlieukinhCapNhap = {};
    $scope.openUpdateChatLieuKinh = function (chatlieukinh) {
        $scope.capnhapChatLieuKinh = true;
        $scope.chatlieukinhCapNhap = chatlieukinh;

    }
    $scope.closeUpdateChatLieuKinh = function () {
        $scope.capnhapChatLieuKinh = false;

    }

    $scope.updateChatLieuKinh = function () {
        if (!$scope.nameChatLieuKinhUpdate) {
            return;
        }
        $scope.errorChatLieuKinhUpdate = false;
        if ($scope.chatlieukinhs.some(item => item.name === $scope.nameChatLieuKinhUpdate)) {
            // Nếu nameThuongHieu đã tồn tại trong mảng, đặt biến errorThuongHieu thành true và thoát khỏi hàm.
            $scope.errorChatLieuKinhUpdate = true;
            return;
        }
        $scope.chatlieukinhCapNhap.name = $scope.nameChatLieuKinhUpdate;
        $http.post("http://localhost:8080/api/chatlieukinh/them", $scope.chatlieukinhCapNhap)
            .then(function (response) {
                alert("Cập nhập chất liệu kính thành công!");
                $route.reload();
                $scope.closeUpdateChatLieuKinh();
            })
            .catch(function (error) {
                // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
                console.error("Lỗi khi lưu dữ liệu: ", error);
            });
    }

    $scope.xoaChatLieuKinh = function (chatlieukinh) {
        var userConfirmed = confirm("Xác nhận xóa chất liệu dây này? Hành động này không thể hoàn tác!");
        if (userConfirmed) {
            $http.delete("http://localhost:8080/api/chatlieukinh/delete/" + chatlieukinh.id)
                .then(function (response) {
                    alert("Xóa chất liệu kính thành công!");
                    $route.reload();
                })
                .catch(function (error) {
                    // Xử lý lỗi nếu có lỗi xảy ra trong quá trình POST
                    console.error("Lỗi khi gửi yêu cầu POST: ", error);
                });
        }
    }

    // End Chat lieu kinh

    // Start Size mat

    $scope.sizemats = [];
    $http.get("http://localhost:8080/api/size")
        .then(function (response) {
            $scope.sizemats = response.data;
        }).catch(function (error) {
            // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
            console.error("Lỗi khi lưu dữ liệu: ", error);
        });

    $scope.themSizemat = false;
    $scope.openSizemat = function () {
        $scope.themSizemat = true;

    }
    $scope.closeSizemat = function () {
        $scope.themSizemat = false;

    }
    $scope.addSizemat = function () {
        if (!$scope.nameSizemat) {
            return;
        }
        $scope.errorSizemat = false;
        if ($scope.sizemats.some(item => item.name === $scope.nameSizemat)) {
            // Nếu nameThuongHieu đã tồn tại trong mảng, đặt biến errorThuongHieu thành true và thoát khỏi hàm.
            $scope.errorSizemat = true;
            return;
        }
        $http.post("http://localhost:8080/api/size/addExcel", $scope.nameSizemat)
            .then(function (response) {
                $http.get("http://localhost:8080/api/size")
                    .then(function (brandRespon) {
                        $scope.sizemats = brandRespon.data;
                        $route.reload();
                    })
                    .catch(function (error) {
                        // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
                        console.error("Lỗi khi lưu dữ liệu: ", error);
                    });
                $scope.closeSizemat();
            })
            .catch(function (error) {
                // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
                console.error("Lỗi khi lưu dữ liệu: ", error);
            });
    }

    $scope.capnhapSizemat = false;
    $scope.sizematCapNhap = {};
    $scope.openUpdateSizemat = function (size) {
        $scope.capnhapSizemat = true;
        $scope.sizematCapNhap = size;

    }
    $scope.closeUpdateSizemat = function () {
        $scope.capnhapSizemat = false;

    }

    $scope.updateSizemat = function () {
        if (!$scope.nameSizematUpdate) {
            return;
        }
        $scope.errorSizematUpdate = false;
        if ($scope.sizemats.some(item => item.name === $scope.nameSizematUpdate)) {
            // Nếu nameThuongHieu đã tồn tại trong mảng, đặt biến errorThuongHieu thành true và thoát khỏi hàm.
            $scope.errorSizematUpdate = true;
            return;
        }
        $scope.sizematCapNhap.name = $scope.nameSizematUpdate;
        $http.post("http://localhost:8080/api/size/them", $scope.sizematCapNhap)
            .then(function (response) {
                alert("Cập nhập size thành công!");
                $route.reload();
                $scope.closeUpdateSizemat();
            })
            .catch(function (error) {
                // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
                console.error("Lỗi khi lưu dữ liệu: ", error);
            });
    }

    $scope.xoaSizemat = function (size) {
        var userConfirmed = confirm("Xác nhận xóa size này? Hành động này không thể hoàn tác!");
        if (userConfirmed) {
            $http.delete("http://localhost:8080/api/size/delete/" + size.id)
                .then(function (response) {
                    alert("Xóa size thành công!");
                    $route.reload();
                })
                .catch(function (error) {
                    // Xử lý lỗi nếu có lỗi xảy ra trong quá trình POST
                    console.error("Lỗi khi gửi yêu cầu POST: ", error);
                });
        }
    }

    // End Size mat

    // Start xuat xu

    $scope.xuatxus = [];
    $http.get("http://localhost:8080/api/origin")
        .then(function (response) {
            $scope.xuatxus = response.data;
        }).catch(function (error) {
            // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
            console.error("Lỗi khi lưu dữ liệu: ", error);
        });

    $scope.themXuatxu = false;
    $scope.openXuatxu = function () {
        $scope.themXuatxu = true;

    }
    $scope.closeXuatxu = function () {
        $scope.themXuatxu = false;

    }
    $scope.addXuatxu = function () {
        if (!$scope.nameXuatxu) {
            return;
        }
        $scope.errorXuatxu = false;
        if ($scope.xuatxus.some(item => item.name === $scope.nameXuatxu)) {
            // Nếu nameThuongHieu đã tồn tại trong mảng, đặt biến errorThuongHieu thành true và thoát khỏi hàm.
            $scope.errorXuatxu = true;
            return;
        }
        $http.post("http://localhost:8080/api/origin/addExcel", $scope.nameXuatxu)
            .then(function (response) {
                $http.get("http://localhost:8080/api/origin")
                    .then(function (brandRespon) {
                        $scope.xuatxus = brandRespon.data;
                        $route.reload();
                    })
                    .catch(function (error) {
                        // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
                        console.error("Lỗi khi lưu dữ liệu: ", error);
                    });
                $scope.closeXuatxu();
            })
            .catch(function (error) {
                // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
                console.error("Lỗi khi lưu dữ liệu: ", error);
            });
    }

    $scope.capnhapXuatxu = false;
    $scope.xuatxuCapNhap = {};
    $scope.openUpdateXuatxu = function (xuatxu) {
        $scope.capnhapXuatxu = true;
        $scope.xuatxuCapNhap = xuatxu;

    }
    $scope.closeUpdateXuatxu = function () {
        $scope.capnhapXuatxu = false;

    }

    $scope.updateXuatxu = function () {
        if (!$scope.nameXuatxuUpdate) {
            return;
        }
        $scope.errorXuatxuUpdate = false;
        if ($scope.xuatxus.some(item => item.name === $scope.nameXuatxuUpdate)) {
            // Nếu nameThuongHieu đã tồn tại trong mảng, đặt biến errorThuongHieu thành true và thoát khỏi hàm.
            $scope.errorXuatxuUpdate = true;
            return;
        }
        $scope.xuatxuCapNhap.name = $scope.nameXuatxuUpdate;
        $http.post("http://localhost:8080/api/origin/them", $scope.xuatxuCapNhap)
            .then(function (response) {
                alert("Cập nhập xuất xứ thành công!");
                $route.reload();
                $scope.closeUpdateXuatxu();
            })
            .catch(function (error) {
                // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
                console.error("Lỗi khi lưu dữ liệu: ", error);
            });
    }

    $scope.xoaXuatxu = function (xuatxu) {
        var userConfirmed = confirm("Xác nhận xóa xuất xứ này? Hành động này không thể hoàn tác!");
        if (userConfirmed) {
            $http.delete("http://localhost:8080/api/origin/delete/" + xuatxu.id)
                .then(function (response) {
                    alert("Xóa xuất xứ thành công!");
                    $route.reload();
                })
                .catch(function (error) {
                    // Xử lý lỗi nếu có lỗi xảy ra trong quá trình POST
                    console.error("Lỗi khi gửi yêu cầu POST: ", error);
                });
        }
    }

    // End xuat xu

    // Start hinh dang

    $scope.hinhdangs = [];
    $http.get("http://localhost:8080/api/shape")
        .then(function (response) {
            $scope.hinhdangs = response.data;
        }).catch(function (error) {
            // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
            console.error("Lỗi khi lưu dữ liệu: ", error);
        });

    $scope.themHinhDang = false;
    $scope.openHinhDang = function () {
        $scope.themHinhDang = true;

    }
    $scope.closeHinhDang = function () {
        $scope.themHinhDang = false;

    }
    $scope.addHinhDang = function () {
        if (!$scope.nameHinhDang) {
            return;
        }
        $scope.errorHinhDang = false;
        if ($scope.hinhdangs.some(item => item.name === $scope.nameHinhDang)) {
            // Nếu nameThuongHieu đã tồn tại trong mảng, đặt biến errorThuongHieu thành true và thoát khỏi hàm.
            $scope.errorHinhDang = true;
            return;
        }
        $http.post("http://localhost:8080/api/shape/addExcel", $scope.nameHinhDang)
            .then(function (response) {
                $http.get("http://localhost:8080/api/shape")
                    .then(function (brandRespon) {
                        $scope.hinhdangs = brandRespon.data;
                        $route.reload();
                    })
                    .catch(function (error) {
                        // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
                        console.error("Lỗi khi lưu dữ liệu: ", error);
                    });
                $scope.closeHinhDang();
            })
            .catch(function (error) {
                // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
                console.error("Lỗi khi lưu dữ liệu: ", error);
            });
    }

    $scope.capnhapHinhDang = false;
    $scope.hinhdangCapNhap = {};
    $scope.openUpdateHinhDang = function (hinhdang) {
        $scope.capnhapHinhDang = true;
        $scope.hinhdangCapNhap = hinhdang;

    }
    $scope.closeUpdateHinhDang = function () {
        $scope.capnhapHinhDang = false;

    }

    $scope.updateHinhDang = function () {
        if (!$scope.nameHinhDangUpdate) {
            return;
        }
        $scope.errorHinhDangUpdate = false;
        if ($scope.hinhdangs.some(item => item.name === $scope.nameHinhDangUpdate)) {
            // Nếu nameThuongHieu đã tồn tại trong mảng, đặt biến errorThuongHieu thành true và thoát khỏi hàm.
            $scope.errorHinhDangUpdate = true;
            return;
        }
        $scope.hinhdangCapNhap.name = $scope.nameHinhDangUpdate;
        $http.post("http://localhost:8080/api/shape/them", $scope.hinhdangCapNhap)
            .then(function (response) {
                alert("Cập nhập hình dạng thành công!");
                $route.reload();
                $scope.closeUpdateHinhDang();
            })
            .catch(function (error) {
                // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
                console.error("Lỗi khi lưu dữ liệu: ", error);
            });
    }

    $scope.xoaHinhDang = function (hinhdang) {
        var userConfirmed = confirm("Xác nhận xóa hình dạng này? Hành động này không thể hoàn tác!");
        if (userConfirmed) {
            $http.delete("http://localhost:8080/api/shape/delete/" + hinhdang.id)
                .then(function (response) {
                    alert("Xóa hình dạng thành công!");
                    $route.reload();
                })
                .catch(function (error) {
                    // Xử lý lỗi nếu có lỗi xảy ra trong quá trình POST
                    console.error("Lỗi khi gửi yêu cầu POST: ", error);
                });
        }
    }

    // End hinh dang

    // Start tinh nang

    $scope.tinhnangs = [];
    $http.get("http://localhost:8080/api/feature")
        .then(function (response) {
            $scope.tinhnangs = response.data;
        }).catch(function (error) {
            // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
            console.error("Lỗi khi lưu dữ liệu: ", error);
        });

    $scope.themTinhNang = false;
    $scope.openTinhNang = function () {
        $scope.themTinhNang = true;

    }
    $scope.closeTinhNang = function () {
        $scope.themTinhNang = false;

    }
    $scope.addTinhNang = function () {
        if (!$scope.nameTinhNang) {
            return;
        }
        $scope.errorTinhNang = false;
        if ($scope.tinhnangs.some(item => item.name === $scope.nameTinhNang)) {
            // Nếu nameThuongHieu đã tồn tại trong mảng, đặt biến errorThuongHieu thành true và thoát khỏi hàm.
            $scope.errorTinhNang = true;
            return;
        }
        $http.post("http://localhost:8080/api/feature/addExcel", $scope.nameTinhNang)
            .then(function (response) {
                $http.get("http://localhost:8080/api/feature")
                    .then(function (brandRespon) {
                        $scope.tinhnangs = brandRespon.data;
                        $route.reload();
                    })
                    .catch(function (error) {
                        // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
                        console.error("Lỗi khi lưu dữ liệu: ", error);
                    });
                $scope.closeTinhNang();
            })
            .catch(function (error) {
                // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
                console.error("Lỗi khi lưu dữ liệu: ", error);
            });
    }

    $scope.capnhapTinhNang = false;
    $scope.tinhnangCapNhap = {};
    $scope.openUpdateTinhNang = function (tinhnang) {
        $scope.capnhapTinhNang = true;
        $scope.tinhnangCapNhap = tinhnang;

    }
    $scope.closeUpdateTinhNang = function () {
        $scope.capnhapTinhNang = false;

    }

    $scope.updateTinhNang = function () {
        if (!$scope.nameTinhNangUpdate) {
            return;
        }
        $scope.errorTinhNangUpdate = false;
        if ($scope.tinhnangs.some(item => item.name === $scope.nameTinhNangUpdate)) {
            // Nếu nameThuongHieu đã tồn tại trong mảng, đặt biến errorThuongHieu thành true và thoát khỏi hàm.
            $scope.errorTinhNangUpdate = true;
            return;
        }
        $scope.tinhnangCapNhap.name = $scope.nameTinhNangUpdate;
        $http.post("http://localhost:8080/api/feature/them", $scope.tinhnangCapNhap)
            .then(function (response) {
                alert("Cập nhập tính năng thành công!");
                $route.reload();
                $scope.closeUpdateTinhNang();
            })
            .catch(function (error) {
                // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
                console.error("Lỗi khi lưu dữ liệu: ", error);
            });
    }

    $scope.xoaTinhNang = function (tinhnang) {
        var userConfirmed = confirm("Xác nhận xóa tính năng này? Hành động này không thể hoàn tác!");
        if (userConfirmed) {
            $http.delete("http://localhost:8080/api/feature/delete/" + tinhnang.id)
                .then(function (response) {
                    alert("Xóa tính năng thành công!");
                    $route.reload();
                })
                .catch(function (error) {
                    // Xử lý lỗi nếu có lỗi xảy ra trong quá trình POST
                    console.error("Lỗi khi gửi yêu cầu POST: ", error);
                });
        }
    }

    // End tinh nang

});