myapp.controller("pay-ctrl", function ($scope, $http, $location, CartService) {
    $scope.editAddress = function () {
        $location.path("/address");
        localStorage.removeItem('selectedAddress');
    }
    $scope.localStorageAddress = JSON.parse(localStorage.getItem('selectedAddress')) || [];
    $scope.localStorageIdac = JSON.parse(localStorage.getItem('idac')) || [];

    $scope.cart = JSON.parse(localStorage.getItem('cart')) || [];
    $scope.cartNow = JSON.parse(localStorage.getItem('ProductBuyNow')) || [];

    angular.forEach($scope.cart, function (cartItem) {
        // Gọi API để lấy danh sách images cho từng watchdetail
        $http.get("http://localhost:8080/api/watch/" + cartItem.id + "/images").then(function (imageResponse) {
            cartItem.images = imageResponse.data;
            console.log(cartItem.images.image_link)
        });
    });
    $http.get("http://localhost:8080/api/watch/" + $scope.cartNow.id + "/images").then(function (imageResponse) {
        $scope.cartNow.images = imageResponse.data;
    });

    $scope.calculateTotal = function () {
        var total = 0;  // Declare total inside the function

        if ($scope.cartNow.price === undefined) {
            angular.forEach($scope.cart, function (cartItem) {
                var maxGiamGia = -1;  // Giả sử giamgia không bao giờ là số âm
                var selectedGiamGia = null;

                angular.forEach($scope.km3s, function (itemProduct) {
                    if (itemProduct.watchdetail.id === cartItem.id && itemProduct.chietkhausanpham.status === 2) {
                        if (itemProduct.giamgia > maxGiamGia) {
                            // Nếu giamgia lớn hơn maxGiamGia, cập nhật maxGiamGia và selectedGiamGia
                            maxGiamGia = itemProduct.giamgia;
                            selectedGiamGia = itemProduct.giamgia;
                        }
                    }
                });

                // Kiểm tra xem có giamgia nào được chọn không
                if (selectedGiamGia !== null) {
                    cartItem.giamoi = cartItem.price - ((selectedGiamGia * cartItem.price) / 100);
                    cartItem.giamgia = selectedGiamGia;
                    // Các thao tác khác nếu cần
                }
            });
            for (var i = 0; i < $scope.cart.length; i++) {
                var price = $scope.cart[i].giamoi !== undefined ? $scope.cart[i].giamoi : $scope.cart[i].price;
                total += price * $scope.cart[i].quantity;
            }
            console.log("Day là giá:" + total);
            $scope.total_money = total;
            return total;
        } else {
            var maxGiamGia = -1;  // Giả sử giamgia không bao giờ là số âm
            var selectedGiamGia = null;

            angular.forEach($scope.km3s, function (itemProduct) {
                if (itemProduct.watchdetail.id === $scope.cartNow.id && itemProduct.chietkhausanpham.status === 2) {
                    if (itemProduct.giamgia > maxGiamGia) {
                        // Nếu giamgia lớn hơn maxGiamGia, cập nhật maxGiamGia và selectedGiamGia
                        maxGiamGia = itemProduct.giamgia;
                        selectedGiamGia = itemProduct.giamgia;
                    }
                }
            });

            // Kiểm tra xem có giamgia nào được chọn không
            if (selectedGiamGia !== null) {
                $scope.cartNow.giamoi = $scope.cartNow.price - ((selectedGiamGia * $scope.cartNow.price) / 100);
                $scope.cartNow.price = giamoi
                $scope.cartNow.giamgia = selectedGiamGia;
                // Các thao tác khác nếu cần
            }
            return $scope.cartNow.giamoi !== undefined ? $scope.cartNow.giamoi : $scope.cartNow.price
        }
    };
    // $scope.calculateTotal = function () {
    //     var total = 0;
    //     for (var i = 0; i < $scope.cart.length; i++) {
    //         total += $scope.cart[i].price * $scope.cart[i].quantity;
    //     }
    //     $scope.total_money = total;
    //     return total;
    // };

    $scope.editCart = function () {
        $location.path("/cart");
    }

    $scope.thanhtoan = [];
    $http.get("http://localhost:8080/api/payment")
        .then(function (response) {
            $scope.thanhtoan = response.data;
        }, function (error) {
            console.error('Lỗi trong quá trình gọi API:', error);
        });

    $scope.hoadons = [];
    var countHoaDon = 0;
    $http.get("http://localhost:8080/api/order")
        .then(function (response) {
            $scope.hoadons = response.data;
            angular.forEach($scope.hoadons, function (item) {
                if (item.account && item.account.id) {
                    if (item.status === 0 && item.account.id === $scope.localStorageIdac.id) {
                        countHoaDon++;
                    }
                }
            });
            // alert(countHoaDon)
        }, function (error) {
            console.error('Lỗi trong quá trình gọi API:', error);
        });


    $scope.showPaymentName = function (option) {
        $scope.selectedPayment = option;
    };

    $scope.order = {};

    $scope.product = []
    $scope.placeOrder = function () {
        // var addressId = $scope.localStorageAddress.id; // Lấy ID của địa chỉ

        // Kiểm tra xem selectedPayment có được chọn hay không
        if ($scope.selectedPayment) {
            // var paymentId = $scope.selectedPayment.id; // Lấy ID của phương thức thanh toán
            if (countHoaDon >= 5) {
                alert("Đơn hàng của bạn đã tối đa là 5 và không đặt được nữa!");
                return;
            }
            // Hiển thị thông báo alert với ID của địa chỉ và phương thức thanh toán
            // alert("ID của địa chỉ: " + addressId + "\nID của phương thức thanh toán: " + paymentId);
            if ($scope.cartNow.id === undefined) {
                $http.get("http://localhost:8080/api/watch").then(function (response) {
                    $scope.product = response.data;
                    checkCart();
                });
                function checkCart() {
                    for (var i = 0; i < $scope.cart.length; i++) {
                        var cartItem = $scope.cart[i];

                        // Tìm phần tử tương ứng trong $scope.product
                        var productItem = $scope.product.find(function (product) {
                            return product.id === cartItem.id; // Sử dụng trường id để so sánh
                        });

                        // Kiểm tra điều kiện
                        if (productItem && cartItem.quantity > productItem.quantity_stock) {
                            alert("Lỗi hệ thống! Số lượng vượt quá giới hạn cho sản phẩm ");
                            $location.path("/home");
                            return; // Thoát khỏi vòng lặp nếu có lỗi
                        }
                    }

                    // Nếu không có lỗi, hiển thị thông báo thành công
                    $http.get("http://localhost:8080/api/order")
                        .then(function (response) {
                            // Dữ liệu trả về từ API sẽ ở response.data
                            var numberOfOrders = response.data.length;

                            // Tạo mã cho hóa đơn mới
                            $scope.order.code = "HD" + ('000' + (numberOfOrders + 1)).slice(-3);
                            $scope.order.total_money = $scope.total_money;
                            $scope.order.account = $scope.localStorageIdac;
                            $scope.order.address = $scope.localStorageAddress;
                            $scope.order.payment = $scope.selectedPayment;
                            $scope.order.status = 0;
                            // Lấy ngày hiện tại
                            var currentDate = new Date();
                            // Định dạng ngày thành chuỗi 'yyyy-MM-dd'
                            var formattedDate = currentDate.toISOString().split('T')[0];
                            $scope.order.create_date = formattedDate;

                            $http.post("http://localhost:8080/api/order/add", $scope.order)
                                .then(function (response) {
                                    // Xử lý phản hồi từ máy chủ sau khi lưu thành công
                                    var orderData = response.data; // Lấy ID của hóa đơn từ phản hồi

                                    var totalQuantity = 0;
                                    var totalValue = 0;

                                    $scope.cart.forEach(function (item) {
                                        totalQuantity += item.quantity;
                                        var itemPrice = item.giamoi !== undefined ? item.giamoi : item.price;
                                        totalValue += item.quantity * itemPrice;
                                    });

                                    var thongbaoFake = {
                                        create_date: formattedDate,
                                        status: 0,
                                        soluongsanpham: totalQuantity,
                                        tongtien: totalValue,
                                        order: orderData
                                    }
                                    $http.post("http://localhost:8080/api/thongbaouser/add", thongbaoFake)
                                        .then(function (response) {
                                            console.log("Tạo thông báo thành công!")
                                            $http.post("http://localhost:8080/api/checkemail/send-notificationUser", response.data)
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

                                    // alert("Đặt hàng thành công. ID của hóa đơn: " + orderId);
                                    $scope.cart.forEach(function (watch, index) {
                                        $scope.orderDetail = {};
                                        $scope.orderDetail.quantity = watch.quantity;
                                        $scope.orderDetail.total_price = watch.quantity * watch.price;
                                        if (watch.giamoi) {
                                            $scope.orderDetail.giamgia = watch.giamgia;
                                            $scope.orderDetail.total_price = watch.quantity * watch.giamoi;
                                        }
                                        $scope.orderDetail.order = orderData;
                                        $scope.orderDetail.watchdetail = watch;
                                        $http.post("http://localhost:8080/api/orderdetail/add", $scope.orderDetail)
                                            .then(function (response) {
                                                // Xử lý phản hồi từ máy chủ sau khi lưu thành công
                                            })
                                            .catch(function (error) {
                                                // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
                                                console.error("Lỗi khi lưu dữ liệu: ", error);
                                            });

                                        // Giảm số lượng của sản phẩm khi đặt hàng
                                        $http.post("http://localhost:8080/api/watch/giamSoLuong", watch, {
                                            params: { soLuong: watch.quantity }
                                        })
                                            .then(function (response) {
                                                console.log("Giảm số lượng thành công!");
                                            })
                                            .catch(function (error) {
                                                // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
                                                console.error("Lỗi khi lưu dữ liệu: ", error);
                                            });
                                    });

                                    alert("Đặt hàng thành công");
                                    localStorage.removeItem('cart');
                                    CartService.clearCart();
                                    $location.path("/home");
                                })
                                .catch(function (error) {
                                    // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
                                    console.error("Lỗi khi lưu dữ liệu: ", error);
                                });
                        }, function (error) {
                            console.error('Lỗi trong quá trình gọi API:', error);
                        });
                }

            } else {
                $http.get("http://localhost:8080/api/watch").then(function (response) {
                    $scope.product = response.data;
                    checkCartNow();
                });
                function checkCartNow() {
                    var cartItem = $scope.cartNow;

                    // Tìm phần tử tương ứng trong $scope.product
                    var productItem = $scope.product.find(function (product) {
                        return product.id === cartItem.id; // Sử dụng trường id để so sánh
                    });

                    // Kiểm tra điều kiện
                    if (productItem && cartItem.quantity > productItem.quantity_stock) {
                        // Cartnow
                        alert("Lỗi hệ thống! Số lượng vượt quá giới hạn cho sản phẩm ");
                        $location.path("/home");
                        return; // Thoát khỏi vòng lặp nếu có lỗi
                    }

                    // Nếu không có lỗi, hiển thị thông báo thành công
                    $http.get("http://localhost:8080/api/order")
                        .then(function (response) {
                            // Dữ liệu trả về từ API sẽ ở response.data
                            var numberOfOrders = response.data.length;

                            // Tạo mã cho hóa đơn mới
                            $scope.order.code = "HD" + ('000' + (numberOfOrders + 1)).slice(-3);
                            $scope.order.total_money = $scope.cartNow.price * $scope.cartNow.quantity;
                            if ($scope.cartNow.giamoi) {
                                $scope.order.total_money = $scope.cartNow.giamoi * $scope.cartNow.quantity;
                            }
                            $scope.order.account = $scope.localStorageIdac;
                            $scope.order.address = $scope.localStorageAddress;
                            $scope.order.payment = $scope.selectedPayment;
                            $scope.order.status = 0;
                            // Lấy ngày hiện tại
                            var currentDate = new Date();
                            // Định dạng ngày thành chuỗi 'yyyy-MM-dd'
                            var formattedDate = currentDate.toISOString().split('T')[0];
                            // Gán giá trị vào biến $scope.localStorageIdac.date_of_birth
                            $scope.order.create_date = formattedDate;

                            $http.post("http://localhost:8080/api/order/add", $scope.order)
                                .then(function (response) {
                                    // Xử lý phản hồi từ máy chủ sau khi lưu thành công
                                    var orderData = response.data; // Lấy ID của hóa đơn từ phản hồi

                                    // alert("Đặt hàng thành công. ID của hóa đơn: " + orderId);
                                    $scope.orderDetail = {};
                                    $scope.orderDetail.quantity = $scope.cartNow.quantity;
                                    $scope.orderDetail.total_price = $scope.cartNow.quantity * $scope.cartNow.price;
                                    if ($scope.cartNow.giamoi) {
                                        $scope.orderDetail.giamgia = $scope.cartNow.giamgia;
                                        $scope.orderDetail.total_price = $scope.cartNow.quantity * $scope.cartNow.giamoi;
                                    }
                                    $scope.orderDetail.order = orderData;
                                    $scope.orderDetail.watchdetail = $scope.cartNow;
                                    $http.post("http://localhost:8080/api/orderdetail/add", $scope.orderDetail)
                                        .then(function (response) {
                                            // Xử lý phản hồi từ máy chủ sau khi lưu thành công
                                        })
                                        .catch(function (error) {
                                            // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
                                            console.error("Lỗi khi lưu dữ liệu: ", error);
                                        });
                                    var thongbaoFake = {
                                        create_date: formattedDate,
                                        status: 0,
                                        soluongsanpham: $scope.cartNow.quantity,
                                        tongtien: $scope.orderDetail.total_price,
                                        order: orderData
                                    }
                                    $http.post("http://localhost:8080/api/thongbaouser/add", thongbaoFake)
                                        .then(function (response) {
                                            console.log("Tạo thông báo thành công!")
                                            $http.post("http://localhost:8080/api/checkemail/send-notificationUser", response.data)
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
                                    // Giảm số lượng của sản phẩm khi đặt hàng
                                    $http.post("http://localhost:8080/api/watch/giamSoLuong", $scope.cartNow, {
                                        params: { soLuong: $scope.cartNow.quantity }
                                    })
                                        .then(function (response) {
                                            // alert("Giảm số lượng thành công!");
                                        })
                                        .catch(function (error) {
                                            // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
                                            console.error("Lỗi khi lưu dữ liệu: ", error);
                                        });
                                    alert("Đặt hàng thành công");
                                    $location.path("/home");
                                    localStorage.removeItem('ProductBuyNow');
                                })
                                .catch(function (error) {
                                    // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
                                    console.error("Lỗi khi lưu dữ liệu: ", error);
                                });
                        }, function (error) {
                            console.error('Lỗi trong quá trình gọi API:', error);
                        });
                }

            }
        } else {
            alert("Vui lòng chọn một phương thức thanh toán trước khi đặt hàng.");
        }
    };


})