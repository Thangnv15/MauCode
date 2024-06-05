myapp.controller("user-ctrl", function ($scope, $http, $location, $route) {
    const userLeftHeaders = document.querySelectorAll('.user-left h4');

    userLeftHeaders.forEach((header) => {
        header.addEventListener('click', () => {
            // Xóa lớp active khỏi tất cả các h4
            userLeftHeaders.forEach((h4) => {
                h4.classList.remove('active');
            });

            // Thêm lớp active vào h4 được nhấp vào
            header.classList.add('active');
        });
    });
    // Lấy tất cả các mục danh sách <li>
    const listItemsthongtinthanhtoan = document.querySelectorAll('.category-thongtintaikhoan ul li');

    // Lặp qua từng mục danh sách và thêm sự kiện click
    listItemsthongtinthanhtoan.forEach((item) => {
        item.addEventListener('click', () => {
            // Xóa lớp active khỏi tất cả các mục danh sách
            listItemsthongtinthanhtoan.forEach((li) => {
                li.classList.remove('active');
            });

            // Thêm lớp active vào mục danh sách được nhấp vào
            item.classList.add('active');
        });
    });

    // Lấy tất cả các mục danh sách <li>
    const listItemshoadon = document.querySelectorAll('.category-hoadon ul li');

    // Lặp qua từng mục danh sách và thêm sự kiện click
    listItemshoadon.forEach((item) => {
        item.addEventListener('click', () => {
            // Xóa lớp active khỏi tất cả các mục danh sách
            listItemshoadon.forEach((li) => {
                li.classList.remove('active');
            });

            // Thêm lớp active vào mục danh sách được nhấp vào
            item.classList.add('active');
        });
    });

    $scope.showPersonalInfo = function () {
        $scope.isPersonalInfoVisible = true;
        $scope.isDeliveryAddressVisible = false;
    };

    $scope.showDeliveryAddress = function () {
        $scope.isPersonalInfoVisible = false;
        $scope.isDeliveryAddressVisible = true;
    };

    // Mặc định hiển thị thông tin cá nhân
    $scope.isPersonalInfoVisible = true;
    $scope.isDeliveryAddressVisible = false;

    $scope.localStorageIdac = JSON.parse(localStorage.getItem('idac')) || [];
    var phoneUnde = $scope.localStorageIdac.phone;
    $scope.orderAccount = [];
    $http.get("http://localhost:8080/api/order/" + $scope.localStorageIdac.id + "/orderforaccount")
        .then(function (response) {
            $scope.orderAccount = response.data;
        }, function (error) {
            console.error('Lỗi trong quá trình gọi API:', error);
        });

    $scope.detailOrder = function (ord) {
        localStorage.setItem('Order', JSON.stringify(ord));
        $location.path("/orderDetail");
    }

    $scope.addressAcount = []
    $scope.loadAddresses = function () {
        $http.get("http://localhost:8080/api/address/" + $scope.localStorageIdac.id + "/account")
            .then(function (response) {
                $scope.addressAcount = response.data;
                console.log($scope.addressAcount);
            }, function (error) {
                console.error('Lỗi trong quá trình gọi API:', error);
            });
    };

    $scope.selectedTab = 'all';

    // Hàm để chọn tab
    $scope.selectTab = function (tabName) {
        $scope.selectedTab = tabName;
    };

    // Hàm để kiểm tra xem một tab có được chọn không
    $scope.isSelected = function (tabName) {
        return $scope.selectedTab === tabName;
    };


    $scope.ngaySinh = new Date($scope.localStorageIdac.date_of_birth)
    // $scope.testDate = null;
    $scope.accounts = [];
    $http.get("http://localhost:8080/api/account")
        .then(function (response) {
            $scope.accounts = response.data;
        }, function (error) {
            console.error('Lỗi trong quá trình gọi API:', error);
        });

    $scope.phoneError = false;
    $scope.phoneErrorMessage = "";

    $scope.checkPhone = function () {
        // Regular expression for validating a Phone Number with exactly 10 digits
        var phonePattern = /^\d{10}$/;

        $scope.phoneError = !phonePattern.test($scope.localStorageIdac.phone);
        $scope.phoneErrorMessage = $scope.phoneError ? "Số điện thoại phải có đúng 10 số" : "";
    };
    $scope.updateUser = function () {
        // // Đối tượng Date từ giá trị ngày sinh
        // var dateOfBirth = new Date($scope.localStorageIdac.date_of_birth);
        if (!$scope.localStorageIdac.fullname || !$scope.localStorageIdac.phone || !$scope.ngaySinh) {
            alert("Bạn chưa điền đầy đủ trường thông tin!");
            return;
        }
        if ($scope.phoneError) {
            alert("Vui lòng kiểm tra lại định dạng thông tin chính xác!");
            return;
        }
        var phoneFake = $scope.accounts.find(function (acc) {
            return acc.phone === $scope.localStorageIdac.phone;
        });
        if (phoneFake) {
            if ($scope.localStorageIdac.phone === phoneUnde) {
                var formattedDate = $scope.ngaySinh.toISOString().split('T')[0];
                $scope.localStorageIdac.date_of_birth = formattedDate;
                $http.post("http://localhost:8080/api/account/add", $scope.localStorageIdac)
                    .then(function (response) {
                        localStorage.setItem('idac', JSON.stringify(response.data));
                        alert("Cập nhập thành công!");
                        $route.reload();
                    }, function (error) {
                        console.error('Lỗi trong quá trình gọi API:', error);
                    });
            } else {
                alert("Số điện thoại đã tồn tại ở tài khoản khác !!! Vui lòng kiểm tra lại.")
            }
        } else {
            var formattedDate = $scope.ngaySinh.toISOString().split('T')[0];
            $scope.localStorageIdac.date_of_birth = formattedDate;
            $http.post("http://localhost:8080/api/account/add", $scope.localStorageIdac)
                .then(function (response) {
                    localStorage.setItem('idac', JSON.stringify(response.data));
                    alert("Cập nhập thành công!");
                    $route.reload();
                }, function (error) {
                    console.error('Lỗi trong quá trình gọi API:', error);
                });
        }
        // // Định dạng lại ngày sinh thành chuỗi 'yyyy-MM-dd'

        // alert(JSON.stringify($scope.localStorageIdac));
        // alert("Ngày sinh: " + formattedDate+"-"+$scope.localStorageIdac.gender);


        // $scope.testDate = dateOfBirth;
    }

    // Thong tin dia chi
    $scope.resetForm = function () {
        $scope.selectedProvince = null;
        $scope.selectedDistrict = null;
        $scope.selectedWard = null;
        $scope.name = ""; // Đặt lại giá trị cho ô input "Tên"
        $scope.email = ""; // Đặt lại giá trị cho ô input "Email"
        $scope.phone = ""; // Đặt lại giá trị cho ô input "Điện thoại"
        $scope.address = ""; // Đặt lại giá trị cho ô input "Địa chỉ chi tiết"
    };


    // Hoa don

    $scope.openedPopups = {};

    $scope.openPopup = function (popupName, ord) {
        $scope.openedPopups[popupName] = true;
        $scope.mota = null;
        localStorage.setItem('hoaDonHuy', JSON.stringify(ord));

    };

    $scope.closePopup = function (popupName) {
        $scope.openedPopups[popupName] = false;
        localStorage.removeItem("hoaDonHuy");
    };

    $scope.isPopupOpen = function (popupName) {
        return $scope.openedPopups[popupName];
    };

    $scope.orderdetials = [];
    $http.get("http://localhost:8080/api/orderdetail")
        .then(function (imageResponse) {
            $scope.orderdetials = imageResponse.data;
        });
    $scope.huyDon = function () {
        // Kiểm tra xem có mô tả không
        $scope.hoaDonHuy = JSON.parse(localStorage.getItem('hoaDonHuy')) || [];
        var hoadonhuyFake = $scope.hoaDonHuy;
        var sanPhamHuy = [];
        if (!$scope.mota) {
            alert("Vui lòng nhập mô tả trước khi hủy đơn.");
            return;
        }

        // Nếu có mô tả, hiển thị hộp thoại xác nhận
        var confirmed = window.confirm("Bạn chắc chắn muốn hủy đơn? Hành động này không thể hoàn tác!!!");

        // Nếu người dùng xác nhận, thực hiện hủy đơn
        if (confirmed) {
            var currentDate = new Date();
            // Định dạng ngày thành chuỗi 'yyyy-MM-dd'
            var formattedDate = currentDate.toISOString().split('T')[0];
            $scope.hoaDonHuy.mota = $scope.mota;
            $scope.hoaDonHuy.updated_by = $scope.localStorageIdac.username;
            $scope.hoaDonHuy.update_date = formattedDate;
            $http.post("http://localhost:8080/api/order/huyHoadon", $scope.hoaDonHuy)
                .then(function (response) {
                    var thongbaoFake = {
                        create_date: formattedDate,
                        status: 1,
                        order: response.data
                    }
                    $http.post("http://localhost:8080/api/thongbaouser/add", thongbaoFake)
                        .then(function (responseThongBao) {
                            console.log("Tạo thông báo thành công!")
                            $http.post("http://localhost:8080/api/checkemail/send-notificationUser", responseThongBao.data)
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
                    angular.forEach($scope.orderdetials, function (orItem) {
                        if (hoadonhuyFake.id === orItem.order.id) {
                            // var soLuongDau = orItem.watchdetail.quantity_stock;
                            var soLuongSau = orItem.quantity + orItem.watchdetail.quantity_stock;
                            var sanPham = orItem.watchdetail;
                            sanPham.quantity_stock = soLuongSau;
                            //    alert("Số lượng lúc đầu: "+soLuongDau +"-Số lượng sau:"+sanPham.quantity_stock);
                            $http.post("http://localhost:8080/api/watch/addsanpham", sanPham)
                                .then(function (response) {
                                    console.log("Sản phẩm yêu cầu hoàn cập nhập thành công!")
                                })
                                .catch(function (error) {
                                    // Xử lý lỗi nếu có
                                    console.error('Lỗi khi cập nhật trạng thái cho hóa đơn có ID:', error);
                                });
                        }
                    });
                    alert("Hủy hóa đơn thành công!")
                    $route.reload();
                })
                .catch(function (error) {
                    console.error("Lỗi khi lưu dữ liệu: ", error);
                });


            // Đóng popup sau khi hoàn thành
            $scope.closePopup('thuonghieu');
        }
    };

    $scope.xacNhanHoaDonThanhCong = function (order) {

        var confirmed = window.confirm("Xác nhận hóa đơn ?");

        // Nếu người dùng xác nhận, thực hiện hủy đơn
        if (confirmed) {
            $http.post("http://localhost:8080/api/order/" + order.id + "/updateStatusHoadonthanhcong")
                .then(function (response) {
                    var orderNext = response.data;
                    var currentDate = new Date();
                    // Định dạng ngày thành chuỗi 'yyyy-MM-dd'
                    var formattedDate = currentDate.toISOString().split('T')[0];
                    orderNext.updated_by = $scope.localStorageIdac.username;
                    orderNext.update_date = formattedDate;
                    $http.post("http://localhost:8080/api/order/add", orderNext)
                        .then(function (response) {
                            alert("Hóa đơn của bạn đã thành công! Cảm ơn bạn.")
                            $route.reload();
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
        }

    }



    // Doi mat khau

    $scope.changePass = function () {
        $scope.showpassold = false;
        $scope.showrepass = false;
        $scope.shownewpass = false;
        // alert($scope.oldpass + "-"+ $scope.newpass + "-" +$scope.repass)
        if (!$scope.oldpass || !$scope.newpass || !$scope.repass) {
            // Kiểm tra nếu có bất kỳ trường nào trống, xuất hiện thông báo
            alert("Vui lòng điền đủ các trường.");
            return;
        }
        if ($scope.newpass.length < 8 || /\s/.test($scope.newpass)) {
            $scope.shownewpass = true;
            return;
        }
        if ($scope.localStorageIdac.pass !== $scope.oldpass) {
            $scope.showpassold = true;
            return;
        } else {
            $scope.showpassold = false;
            if ($scope.newpass === $scope.repass) {
                $scope.showrepass = false;
                $scope.localStorageIdac.pass = $scope.newpass;
                // alert(JSON.stringify($scope.localStorageIdac));
                $http.post("http://localhost:8080/api/account/add", $scope.localStorageIdac)
                    .then(function (response) {
                        alert("Thay đổi mật khẩu thành công!");
                        localStorage.setItem('idac', JSON.stringify(response.data));
                        $route.reload();
                    }, function (error) {
                        console.error('Lỗi trong quá trình gọi API:', error);
                    });
            } else {
                $scope.showrepass = true;
            }
        }
    }

    // Gọi hàm fetchData khi controller được khởi tạo
    fetchData();

    function fetchData() {
        // Gửi HTTP GET request để lấy dữ liệu của order
        $http.get('http://localhost:8080/api/order')
            .then(function (response) {
                // Kiểm tra xem response có dữ liệu không
                if (response.data && Array.isArray(response.data)) {
                    // Lọc các order có status = 6 và update_date không null
                    const filteredOrders = response.data.filter(order => order.status === 4 && order.update_date);

                    // Lấy thời điểm hiện tại
                    const currentDate = new Date();

                    // Duyệt qua từng order thỏa mãn điều kiện
                    filteredOrders.forEach(order => {
                        // Tính số ngày từ thời điểm lưu trong db đến thời điểm hiện tại
                        const updateDate = new Date(order.update_date);
                        const daysDifference = Math.floor((currentDate - updateDate) / (1000 * 60 * 60 * 24));

                        console.log(`Order ID: ${order.code}, Days Difference: ${daysDifference} days`);
                        if (daysDifference >= 3) {
                            // Thực hiện hành động của bạn ở đây
                            $http.post("http://localhost:8080/api/order/" + order.id + "/updateStatusHoadonthanhcong")
                                .then(function (response) {
                                    var orderNext = response.data;
                                    var currentDate = new Date();
                                    // Định dạng ngày thành chuỗi 'yyyy-MM-dd'
                                    var formattedDate = currentDate.toISOString().split('T')[0];
                                    orderNext.updated_by = $scope.localStorageIdac.username;
                                    orderNext.update_date = formattedDate;
                                    $http.post("http://localhost:8080/api/order/add", orderNext)
                                        .then(function (response) {
                                            // alert("Hóa đơn của bạn đã thành công! Cảm ơn bạn.")
                                            $route.reload();
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
                            // alert(`Order ${order.code} has a time difference greater than or equal to 2 days. Performing special action...`);
                        }
                    });
                } else {
                    console.error('Invalid response data');
                }
            })
            .catch(function (error) {
                console.error('Error fetching data:', error.message);
            });
    }

    $scope.showDoiTra = false;
    $scope.showDoiTraChiTiet = false;
    $scope.orderDetail = [];
    $scope.hoadon = {};
    $scope.startDoiTra = function (ord) {
        $scope.showDoiTra = true;
        $scope.hoadon = ord;
        $http.get("http://localhost:8080/api/orderdetail/" + ord.id + "/orderdetailfororder")
            .then(function (response) {
                $scope.orderDetail = response.data;

                angular.forEach(response.data, function (cartItem) {
                    // Gọi API để lấy danh sách images cho từng watchdetail
                    cartItem.soluong = 1;
                    cartItem.watchdetail.images = [];
                    $http.get("http://localhost:8080/api/watch/" + cartItem.watchdetail.id + "/images").then(function (imageResponse) {
                        cartItem.watchdetail.images = imageResponse.data;
                    });
                });

            }, function (error) {
                console.error('Lỗi trong quá trình gọi API:', error);
            });
    }

    $scope.closeDoiTra = function () {
        $scope.showDoiTra = false;
    }

    $scope.watchdetails = [];
    $http.get("http://localhost:8080/api/watch")
        .then(function (imageResponse) {
            $scope.watchdetails = imageResponse.data;
        });

    $scope.hoadontrachitietFakes = [];
    $scope.hoadontrachitietOrdionals = [];
    $http.get("http://localhost:8080/api/hoadontrachitiet")
        .then(function (response) {
            $scope.hoadontrachitietFakes = response.data;
            $scope.hoadontrachitietOrdionals = response.data;
        }, function (error) {
            console.error('Lỗi trong quá trình gọi API:', error);
        });

    $scope.hoadontras = [];
    $scope.hoadontrachitiets = [];
    $scope.startDoiTraChiTiet = function (ord) {
        $scope.showDoiTraChiTiet = true;
        $scope.hoadon = ord;
        angular.forEach($scope.hoadontrachitietFakes, function (item) {
            if ($scope.hoadon.id === item.hoadonchitiet.order.id) {
                // Nếu có id giống nhau, cập nhật thoigiansua của order
                $scope.hoadon.thoigiansua = item.update_date;
            }
        });
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
        // $http.get("http://localhost:8080/api/orderdetail/" + ord.id + "/orderdetailfororder")
        // .then(function (response) {
        //     $scope.orderDetail = response.data;

        //     angular.forEach(response.data, function (cartItem) {
        //         // Gọi API để lấy danh sách images cho từng watchdetail
        //         cartItem.soluong = 1;
        //         cartItem.watchdetail.images = [];
        //         $http.get("http://localhost:8080/api/watch/" + cartItem.watchdetail.id + "/images").then(function (imageResponse) {
        //             cartItem.watchdetail.images = imageResponse.data;
        //         });
        //     });

        // }, function (error) {
        //     console.error('Lỗi trong quá trình gọi API:', error);
        // });
    }

    $scope.closeDoiTraChiTiet = function () {
        $scope.showDoiTraChiTiet = false;
    }

    $scope.phuongthuchoans = [];
    $http.get("http://localhost:8080/api/phuongthuchoan")
        .then(function (response) {
            $scope.phuongthuchoans = response.data;

        }, function (error) {
            console.error('Lỗi trong quá trình gọi API:', error);
        });


    $scope.lydohoans = [];
    $http.get("http://localhost:8080/api/lydohoan")
        .then(function (response) {
            $scope.lydohoans = response.data;

        }, function (error) {
            console.error('Lỗi trong quá trình gọi API:', error);
        });

    $scope.updateSoluonghoan = function (ordd) {
        if (ordd.soluong > ordd.quantity) {
            ordd.soluong = ordd.quantity;
        }
    }


    //Xu ly don hoan tra
    $scope.selectAll = false;

    $scope.toggleSelectAll = function () {
        angular.forEach($scope.orderDetail, function (ordd) {
            ordd.selected = $scope.selectAll;
        });
    };

    $scope.hoadontra = {};
    $scope.confirmHoan = function () {
        var selectedItems = $scope.orderDetail.filter(function (ordd) {
            return ordd.selected;
        });

        if (selectedItems.length === 0) {
            alert('Vui lòng chọn ít nhất một sản phẩm.');
        } else {
            var coSanPhamChuaChonPhuongThucHoan = false;
            angular.forEach(selectedItems, function (item) {
                if (!item.phuongThucHoan) {
                    coSanPhamChuaChonPhuongThucHoan = true;
                    return; // Dừng vòng lặp nếu có ít nhất một sản phẩm chưa chọn phương thức hoàn
                } else {
                    if (item.phuongThucHoan.name === 'Hoàn tiền') {
                        if (!item.lyDoHoan || !item.MoTaLyDo) {
                            coSanPhamChuaChonPhuongThucHoan = true;
                            return;
                        }
                    } else {
                        if (!item.MoTaLyDo) {
                            coSanPhamChuaChonPhuongThucHoan = true;
                            return;
                        }
                    }
                }
            });
            if (coSanPhamChuaChonPhuongThucHoan) {
                alert("Có sản phẩm chưa điền đầ đủ thông tin");
            } else {
                var currentDate = new Date();
                // Định dạng ngày thành chuỗi 'yyyy-MM-dd'
                var formattedDate = currentDate.toISOString().split('T')[0];
                $scope.hoadontra.created_by = $scope.hoadon.account.email;
                $scope.hoadontra.created_date = formattedDate;
                $scope.hoadontra.status = 0;
                $scope.hoadontra.order = $scope.hoadon;
                $http.post("http://localhost:8080/api/hoadontra/add", $scope.hoadontra)
                    .then(function (response) {
                        // Tạo đối tượng orderHoanTra cho mỗi dòng đã chọn
                        $scope.selectedItems = selectedItems.map(function (ordd) {
                            var totalMoney = ordd.soluong * ordd.watchdetail.price;
                            if (ordd.giamgia) {
                                totalMoney = ordd.soluong * (ordd.watchdetail.price * ((100 - ordd.giamgia) / 100));
                            }
                            return {
                                hoadonchitiet: ordd,
                                id_sanphamhoan: ordd.watchdetail.id,
                                soluong: ordd.soluong,
                                total_money: totalMoney,
                                created_by: ordd.order.account.email,
                                created_date: formattedDate,
                                motachitiet: ordd.MoTaLyDo,
                                status: 0,
                                hoadontra: response.data,
                                phuongthuchoan: ordd.phuongThucHoan,
                                lydohoan: ordd.lyDoHoan,
                            };
                        });
                        $scope.selectedItems.forEach(function (item) {
                            // Thực hiện yêu cầu POST cho mỗi phần tử
                            $http.post("http://localhost:8080/api/hoadontrachitiet/add", item)
                                .then(function (response) {
                                    // Xử lý phản hồi nếu cần
                                    console.log("Đã thêm hoadontrachitiet:", response.data);
                                })
                                .catch(function (error) {
                                    // Xử lý lỗi nếu có
                                    console.error("Lỗi khi thêm hoadontrachitiet:", error);
                                });
                        });
                    })
                    .catch(function (error) {
                        // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
                        console.error("Lỗi khi lưu dữ liệu: ", error);
                    });

                $scope.hoadon.status = 10;
                $scope.hoadon.update_date = formattedDate;
                $scope.hoadon.updated_by = $scope.hoadon.account.username;
                $http.post("http://localhost:8080/api/order/add", $scope.hoadon)
                    .then(function (response) {
                        var thongbaoFake = {
                            create_date: formattedDate,
                            status: 2,
                            order: response.data
                        }
                        $http.post("http://localhost:8080/api/thongbaouser/add", thongbaoFake)
                            .then(function (responseThongBao) {
                                console.log("Tạo thông báo thành công!")
                                $http.post("http://localhost:8080/api/checkemail/send-notificationUser", responseThongBao.data)
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
                        console.log("Thay doi trang thai hoa don thanh cong")
                    })
                    .catch(function (error) {
                        // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
                        console.error("Lỗi khi lưu dữ liệu: ", error);
                    });
                alert("Yêu cầu hoàn trả đã được gửi đi!");
                $scope.showDoiTra = false;
            }
        }
    };

    $scope.hoadontrachitietFakes = [];
    $http.get("http://localhost:8080/api/hoadontrachitiet")
        .then(function (response) {
            // Gán dữ liệu trả về từ API vào biến $scope.watchs
            $scope.hoadontrachitietFakes = response.data;
        }, function (error) {
            console.error('Lỗi trong quá trình gọi API:', error);
        });

    $scope.huyHoanTra = function (ord) {
        var userConfirmed = confirm("Xác nhận hủy hoàn sản phẩm? Hành động này không thể hoàn tác!");
        if (userConfirmed) {
            var hoadon = ord;
            hoadon.status = 4;

            angular.forEach($scope.hoadontrachitietFakes, function (hdtraItem) {
                if (hoadon.id === hdtraItem.hoadontra.order.id) {
                    var hoadontrachitiet = hdtraItem;
                    // alert("Có dữ liệu" + hoadontrachitiet.hoadontra.order.code)
                    // alert("Id của hóa đơn chi tiết:" + hoadontrachitiet.id + "-ID của hóa đơn trả:" + hoadontrachitiet.hoadontra.id)
                    $http.delete("http://localhost:8080/api/hoadontrachitiet/delete/" + hoadontrachitiet.id)
                        .then(function (response) {
                            $http.delete("http://localhost:8080/api/hoadontra/delete/" + hoadontrachitiet.hoadontra.id)
                                .then(function (response) {
                                    // alert("Xóa hóa đơn hoàn chi tiết thành công!")
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
            var currentDate = new Date();
            // Định dạng ngày thành chuỗi 'yyyy-MM-dd'
            var formattedDate = currentDate.toISOString().split('T')[0];
            $http.post("http://localhost:8080/api/order/add", hoadon)
                .then(function (response) {
                    var thongbaoFake = {
                        create_date: formattedDate,
                        status: 3,
                        order: response.data
                    }
                    $http.post("http://localhost:8080/api/thongbaouser/add", thongbaoFake)
                        .then(function (responseThongBao) {
                            console.log("Tạo thông báo thành công!")
                            $http.post("http://localhost:8080/api/checkemail/send-notificationUser", responseThongBao.data)
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
                    alert("Yêu cầu hủy hoàn sản phẩm thành công!")
                })
                .catch(function (error) {
                    // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
                    console.error("Lỗi khi lưu dữ liệu: ", error);
                });
        }

    }

    $scope.imageListDB = [];
    $http.get("http://localhost:8080/api/danhgia")
        .then(function (response) {
            $scope.imageListDB = response.data;
        })
        .catch(function (error) {
            // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
            console.error("Lỗi khi lưu dữ liệu: ", error);
        });

    $scope.showDanhGia = false;
    $scope.orderDetailDanhGia = [];
    $scope.hoadonDanhGia = {};
    $scope.danhGia = function (ord) {
        $scope.showDanhGia = true;
        $scope.hoadonDanhGia = ord;
        $http.get("http://localhost:8080/api/orderdetail/" + ord.id + "/orderdetailfororder")
            .then(function (response) {
                $scope.orderDetailDanhGia = response.data;

                angular.forEach(response.data, function (cartItem) {
                    cartItem.review = 0;
                    angular.forEach($scope.imageListDB, function (itemdanhgia) {
                        if (itemdanhgia.hoadonchitiet.id === cartItem.id) {
                            cartItem.review = 1;
                        }
                    })
                    cartItem.watchdetail.images = [];
                    $http.get("http://localhost:8080/api/watch/" + cartItem.watchdetail.id + "/images").then(function (imageResponse) {
                        cartItem.watchdetail.images = imageResponse.data;
                    });

                });

            }, function (error) {
                console.error('Lỗi trong quá trình gọi API:', error);
            });
    }
    $scope.closeDanhGia = function () {
        $scope.showDanhGia = false;
    }


    $scope.showDanhGiaSanPham = false;
    $scope.sanphamDanhGia = {};
    $scope.danhGiaSanPham = function (ord) {
        $scope.sanphamDanhGia = ord;
        $scope.comDanhGia = null;
        $scope.stars = [
            { filled: false },
            { filled: false },
            { filled: false },
            { filled: false },
            { filled: false }
        ];
        $scope.imageList = [];
        $scope.showDanhGiaSanPham = true;
    }
    $scope.closeDanhGiaSanPham = function () {
        $scope.showDanhGiaSanPham = false;
    }

    $scope.stars = [
        { filled: false },
        { filled: false },
        { filled: false },
        { filled: false },
        { filled: false }
    ];

    $scope.toggleStar = function (index) {
        for (var i = 0; i <= index; i++) {
            $scope.stars[i].filled = true;
        }
        for (var j = index + 1; j < $scope.stars.length; j++) {
            $scope.stars[j].filled = false;
        }

        // alert(index + 1 + ' điểm');
    };

    $scope.imageList = [];
    $scope.maxImages = 3;
    $scope.imageCount = 0;

    var fileInput = document.getElementById('fileInput');

    fileInput.addEventListener('change', function () {
        $scope.$apply(function () {
            $scope.imageList = [];
            $scope.imageCount = 0;

            for (var i = 0; i < fileInput.files.length; i++) {
                if ($scope.imageCount >= $scope.maxImages) {
                    break; // Đã đạt đến số lượng tối đa, thoát khỏi vòng lặp
                }

                var file = fileInput.files[i];
                $scope.imageList.push({ name: file.name, preview: null });

                // Tạo một ID duy nhất cho mỗi ảnh, ví dụ sử dụng timestamp
                var imageId = 'image_' + Date.now() + '_' + i;

                $scope.previewImage(file, $scope.imageList.length - 1, imageId);

                $scope.imageCount++;
            }
        });
    });

    $scope.previewImage = function (file, index, imageId) {
        if (file) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $scope.$apply(function () {
                    $scope.imageList[index] = {
                        id: imageId,
                        preview: e.target.result
                    };
                    console.log("ID của ảnh " + (index + 1) + ":", imageId);
                });
            };
            reader.readAsDataURL(file);
        }
    };

    $scope.dataDanhgiaFake = {};
    $scope.confirmDanhgia = function () {
        // alert("Ra trò")
        // Tạo đối tượng đánh giá
        var currentDate = new Date();
        // Định dạng ngày thành chuỗi 'yyyy-MM-dd'
        var formattedDate = currentDate.toISOString().split('T')[0];
        var danhGiaObject = {
            diem: $scope.stars.filter(star => star.filled).length,
            comment: $scope.comDanhGia || '', // Sử dụng hoặc để tránh giá trị undefined nếu không có comment
            image_link1: $scope.imageList.length > 0 ? $scope.imageList[0].preview : '',
            image_link2: $scope.imageList.length > 1 ? $scope.imageList[1].preview : '',
            image_link3: $scope.imageList.length > 2 ? $scope.imageList[2].preview : '',
            create_date: formattedDate,
            watchdetail: $scope.sanphamDanhGia.watchdetail,
            hoadonchitiet: $scope.sanphamDanhGia
        };
        if (danhGiaObject.diem <= 0) {
            alert("Vui lòng chọn sao đánh giá")
        } else {
            $scope.dataDanhgiaFake = danhGiaObject;
            $http.post("http://localhost:8080/api/danhgia/add", danhGiaObject)
                .then(function (response) {
                    alert("Đánh giá sản phẩm thành công!")
                    $scope.closeDanhGiaSanPham();
                    $route.reload();
                })
                .catch(function (error) {
                    // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
                    console.error("Lỗi khi lưu dữ liệu: ", error);
                });
            // In ra đối tượng đánh giá để kiểm tra
            console.log(danhGiaObject);
        }


        // Gửi đối tượng đánh giá đến server hoặc thực hiện các thao tác khác ở đây
    };

    $scope.showReviewDanhGiaSanPham = false;
    $scope.orderDetailDanhGiaReview = {};
    $scope.review = function (ord) {
        angular.forEach($scope.imageListDB, function (item) {
            if (item.hoadonchitiet.id === ord.id) {
                $scope.orderDetailDanhGiaReview = item;
                $scope.orderDetailDanhGiaReview.hoadonchitiet.watchdetail.images = ord.watchdetail.images;
            }
        })
        // $http.get("http://localhost:8080/api/watch/" + cartItem.watchdetail.id + "/images").then(function (imageResponse) {
        //     cartItem.watchdetail.images = imageResponse.data;
        // });
        $scope.showReviewDanhGiaSanPham = true;
    }
    $scope.closeReviewDanhGiaSanPham = function () {
        $scope.showReviewDanhGiaSanPham = false;
    }

    // Lấy các phần tử cần điều khiển
    var userLeft = document.querySelector(".user-left");
    var userThongTinTaiKhoan = document.querySelector(".user-thongtintaikhoan");
    var userHoaDon = document.querySelector(".user-hoadon");
    var userRepass = document.querySelector(".user-repass")

    // Mặc định hiển thị Thông tin tài khoản
    userThongTinTaiKhoan.style.display = "block";
    userHoaDon.style.display = "none";
    userRepass.style.display = "none";

    // Đặt sự kiện cho việc chuyển đổi giữa Thông tin tài khoản và Hóa đơn
    userLeft.addEventListener("click", function (e) {
        if (e.target.classList.contains("user-left-thongtintaikhoan")) {
            userThongTinTaiKhoan.style.display = "block";
            userHoaDon.style.display = "none";
            userRepass.style.display = "none"
        } else if (e.target.classList.contains("user-left-hoadon")) {
            userThongTinTaiKhoan.style.display = "none";
            userHoaDon.style.display = "block";
            userRepass.style.display = "none"
        }
        else if (e.target.classList.contains("user-left-repass")) {
            userThongTinTaiKhoan.style.display = "none";
            userHoaDon.style.display = "none";
            userRepass.style.display = "block"
        }
    });

    const addressSavedList = document.querySelectorAll(".address-saved");

    addressSavedList.forEach(function (addressSaved) {
        const checkIcon = addressSaved.querySelector(".bx-check");

        addressSaved.addEventListener("click", function () {
            // Ẩn tất cả icon i của tất cả các phần tử
            addressSavedList.forEach(function (element) {
                const otherCheckIcon = element.querySelector(".bx-check");
                otherCheckIcon.style.display = "none";
            });

            // Hiển thị hoặc ẩn icon i của phần tử được click
            const isShown = getComputedStyle(checkIcon).display !== "none";
            if (!isShown) {
                checkIcon.style.display = "block"; // Hiển thị phần tử i
            } else {
                checkIcon.style.display = "none"; // Ẩn phần tử i
            }
        });

    });

    addressSavedList.forEach(function (addressSaved) {
        addressSaved.addEventListener("click", function () {
            // Loại bỏ class .active từ tất cả các phần tử
            addressSavedList.forEach(function (element) {
                element.classList.remove("active");
            });

            // Thêm class .active vào phần tử được click
            addressSaved.classList.add("active");
        });
    });

    $scope.loadAddresses();
});