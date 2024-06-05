myapp.controller("banhang-ctrl", function ($scope, $http, $location) {
    // alert("Hello ban hang");


    var storedUsername = localStorage.getItem('username');


    // Kiểm tra xem 'username' đã được lưu hay không
    if (storedUsername) {
        var roleIdAc = localStorage.getItem("role");
        console.log(roleIdAc);
        if (roleIdAc === 'CUST') {
            window.location.href = "/index.html";
        }
        $location.path("/banhang");
    } else {
        // Nếu 'username' không tồn tại, chuyển hướng đến trang đăng nhập
        $location.path("/login");
    }



    $scope.nguoiBan = storedUsername;
    $scope.localStorageUsername = localStorage.getItem('username');
    $scope.localStorageIdac = JSON.parse(localStorage.getItem('idac')) || [];

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

    $scope.watchs = [];
    $scope.searchTen = null;
    $scope.filteredWatchs = [];
    $scope.loadPage = function () {
        $http.get("http://localhost:8080/api/watch")
            .then(function (response) {
                // Gán dữ liệu trả về từ API vào biến $scope.watchs
                $scope.watchs = response.data;
                $scope.filteredWatchs = angular.copy($scope.watchs);
                // Lặp qua danh sách sản phẩm và lấy danh sách hình ảnh
                angular.forEach($scope.watchs, function (cartItem) {
                    $http.get("http://localhost:8080/api/watch/" + cartItem.id + "/images").then(function (imageResponse) {
                        cartItem.images = imageResponse.data;
                        console.log(cartItem.images[0].image_link); // Lấy hình ảnh đầu tiên từ danh sách
                    });
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
            }).catch(function (error) {
                // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
                console.error("Lỗi khi lưu dữ liệu: ", error);
            });
    }

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
            var maxGiamGia = -1;  // Giả sử giamgia không bao giờ là số âm
            var selectedGiamGia = null;

            angular.forEach($scope.km3s, function (itemProduct) {
                if (itemProduct.watchdetail.id === watch.id && itemProduct.chietkhausanpham.status === 2) {
                    if (itemProduct.giamgia > maxGiamGia) {
                        // Nếu giamgia lớn hơn maxGiamGia, cập nhật maxGiamGia và selectedGiamGia
                        maxGiamGia = itemProduct.giamgia;
                        selectedGiamGia = itemProduct.giamgia;
                    }
                }
            });

            // Kiểm tra xem có giamgia nào được chọn không
            if (selectedGiamGia !== null) {
                watch.giamoi = watch.price - ((selectedGiamGia * watch.price) / 100);
                watch.giamgia = selectedGiamGia;
                // Các thao tác khác nếu cần
            }
            return regex.test(watch.product.name);
        });

        if ($scope.watchs.length === 0) {
            // Nếu không tìm thấy sản phẩm, có thể hiển thị thông báo hoặc thực hiện các thao tác khác
            $scope.loadPage();
            // alert("Co cai nit")
        }
    };
    $scope.onEnterKeyPress = function (event) {
        if (event.key === "Enter") {
            // Xử lý sự kiện Enter ở đây
            // Ví dụ: Gọi hàm searchProducts();
            $scope.searchProducts();
        }
    };

    $scope.carts = [];



    $scope.invoices = [];
    $scope.invoiceCount = 0; // Biến để theo dõi số hóa đơn
    $scope.createNewInvoice = function () {
        var newInvoice = {
            title: "Hóa đơn " + ++$scope.invoiceCount,
            isActive: false,
            cart: [], // Each invoice has its own shopping cart
            order: {}
        };
        $scope.invoices.push(newInvoice);

        // Ensure only the new invoice is active
        $scope.invoices.forEach(function (invoice) {
            invoice.isActive = false;
        });
        newInvoice.isActive = true;
    };




    $scope.showInvoice = function (invoice, index) {
        $scope.invoices.forEach(function (inv, i) {
            inv.isActive = (i === index);
        });
    };
    $scope.activeInvoice = function () {
        return $scope.invoices.find(function (invoice) {
            return invoice.isActive;
        });
    };
    $scope.addToCart = function (watch) {
        if ($scope.activeInvoice()) {
            if (watch.quantity_stock > 0) {
                // Tìm sản phẩm tương ứng trong watchs
                var mainWatch = $scope.watchs.find(function (mainWatch) {
                    return mainWatch.id === watch.id;
                });

                // Tìm sản phẩm trong giỏ hàng
                var existingCartItem = $scope.activeInvoice().cart.find(function (cartItem) {
                    return cartItem.id === watch.id;
                });

                if (existingCartItem) {
                    existingCartItem.quantity++;
                    // watch.quantity_stock--;
                    mainWatch.quantity_stock--; // Giảm quantity_stock trong watchs

                    // Log the updated cart item
                    console.log('Existing Cart Item:', existingCartItem);
                } else {
                    mainWatch.quantity_stock--;

                    var cartItem = angular.copy(watch);

                    // Additional property to store the original quantity for reference
                    cartItem.originalQuantity = watch.quantity_stock + 1;

                    cartItem.quantity = 1;
                    $scope.activeInvoice().cart.push(cartItem);

                    // Log the newly added cart item
                    console.log('New Cart Item:', cartItem);
                }

                // Sử dụng $timeout để đảm bảo áp dụng các thay đổi sau khi xử lý logic
                // $timeout(function () {
                //     // Callback function
                // });
            }
        }
    };

    $scope.removeFromCart = function (cartItem) {
        // Tìm vị trí của sản phẩm trong giỏ hàng
        var index = $scope.activeInvoice().cart.findIndex(function (item) {
            return item.id === cartItem.id;
        });

        if (index !== -1) {
            // Tăng lại quantity_stock trong watchs
            var mainWatch = $scope.watchs.find(function (watch) {
                return watch.id === cartItem.id;
            });
            mainWatch.quantity_stock += cartItem.quantity;

            // Loại bỏ sản phẩm khỏi giỏ hàng
            $scope.activeInvoice().cart.splice(index, 1);
        }
    };

    $scope.updateCartItemQuantity = function (cartItem) {
        // Kiểm tra nếu số lượng mới hợp lệ
        var soLuongConstant = null;
        // var soluongEnd = cartItem.quantity_stock - cartItem.quantity;
        var mainWatch = $scope.watchs.find(function (watch) {
            return watch.id === cartItem.id;
        });
        if (cartItem.quantity <= 1) {
            cartItem.quantity = 1;
        }
        // if(cartItem.quantity<=0){
        //     cartItem.quantity = 1;
        // }
        soLuongConstant = mainWatch.quantity_stock;
        mainWatch.quantity_stock = cartItem.quantity_stock + 1 - cartItem.quantity;
        if (cartItem.quantity > (cartItem.quantity_stock + 1)) {
            cartItem.quantity = cartItem.quantity_stock + 1;
            mainWatch.quantity_stock = 0;
            // alert("Vuot qua so luong roi an cai j lam the!")
        }
    };




    $scope.showScanner = false;  // Initially hide the scanner

    $scope.startQRCodeScanner = function () {
        $scope.showScanner = true;  // Hiển thị máy quét khi nút được nhấp

        $scope.scanner = new Instascan.Scanner({ video: document.getElementById('qr-video') });

        $scope.scanner.addListener('scan', function (content) {
            $scope.$apply(function () {
                console.log('Nội dung QR code:', content);

                let scannedProduct = content;
                var mainWatch = $scope.watchs.find(function (watch) {
                    return watch.id === scannedProduct;
                });
                // alert(mainWatch);
                $scope.addToCart(mainWatch);

                // $scope.scanner.stop();
                // $scope.showScanner = false;  // Ẩn máy quét sau khi quét thành công
            });
        });

        Instascan.Camera.getCameras().then(function (cameras) {
            if (cameras.length > 0) {
                $scope.scanner.start(cameras[0]);
            } else {
                console.error('Không tìm thấy camera.');
            }
        }).catch(function (e) {
            console.error('Lỗi khi lấy danh sách camera:', e);
        });
    };

    $scope.closeQRCodeScanner = function () {
        if ($scope.scanner) {
            $scope.scanner.stop();
        }

        $scope.showScanner = false;
    };


    $scope.calculateTotal = function () {
        var total = 0;
        var activeInvoice = $scope.activeInvoice();

        if (activeInvoice) {
            // for (var i = 0; i < activeInvoice.cart.length; i++) {
            //     total += activeInvoice.cart[i].price * activeInvoice.cart[i].quantity;
            // }
            for (var i = 0; i < activeInvoice.cart.length; i++) {
                var price = activeInvoice.cart[i].giamoi !== undefined ? activeInvoice.cart[i].giamoi : activeInvoice.cart[i].price;
                total += price * activeInvoice.cart[i].quantity;
            }
        }
        $scope.total_money = total;
        return total;
    };

    $scope.errorUser = false;
    $scope.errorPayment = false;
    $scope.errorPaymentValid = false;
    $scope.thanhToan = function () {
        // alert("hello add:" + $scope.calculateTotal());
        var activeInvoice = $scope.activeInvoice();

        if (activeInvoice) {
            if (!$scope.activeInvoice().order.name_user || !$scope.activeInvoice().order.sdt_user || !$scope.activeInvoice().order.address_user) {
                $scope.errorUser = true;
                return; // Không cho tiếp tục nếu có trường thông tin khách hàng trống
            } else {
                $scope.errorUser = false;
            }

            // Kiểm tra xem có trường thanh toán nào trống không
            if (!$scope.activeInvoice().order.total_payment_off || !$scope.activeInvoice().order.total_payment) {
                $scope.errorPayment = true;
                return; // Không cho tiếp tục nếu có trường thanh toán trống
            } else {
                $scope.errorPayment = false;
            }

            if (!$scope.calculateTotal()) {
                alert("Đơn hàng chưa có sản phẩm nào!")
                return;
            }
            var totalPaymentSum = parseFloat($scope.activeInvoice().order.total_payment_off) + parseFloat($scope.activeInvoice().order.total_payment);
            var calculatedTotal = parseFloat($scope.calculateTotal());

            if (totalPaymentSum !== calculatedTotal) {
                $scope.errorPaymentValid = true;
                return; // Không cho tiếp tục nếu tổng thanh toán không đúng
            } else {
                $scope.errorPaymentValid = false;
            }
            // alert("Tiền thanh toán tại quầy: " + $scope.activeInvoice().order.total_payment_off + "\n Tiền thanh toán online: " + $scope.activeInvoice().order.total_payment +
            //     "Thông tin người dùng:" + $scope.activeInvoice().order.name_user + "-" + $scope.activeInvoice().order.sdt_user + "-" + $scope.activeInvoice().order.address_user + "-");
            // console.log("Dữ liệu giỏ hàng: ", $scope.activeInvoice().cart)

            $scope.thanhtoan = [];
            $http.get("http://localhost:8080/api/payment")
                .then(function (response) {
                    $scope.thanhtoan = response.data;
                    $scope.thanhToanType = $scope.thanhtoan.find(function (item) {
                        return item.name === "Thanh toán tại quầy";
                    });
                    $http.get("http://localhost:8080/api/order")
                        .then(function (response) {
                            // Dữ liệu trả về từ API sẽ ở response.data
                            var numberOfOrders = response.data.length;

                            // Tạo mã cho hóa đơn mới
                            $scope.activeInvoice().order.code = "HD" + ('000' + (numberOfOrders + 1)).slice(-3);
                            $scope.activeInvoice().order.total_money = $scope.calculateTotal();
                            // $scope.activeInvoice().order.account = $scope.localStorageIdac;
                            $scope.activeInvoice().order.payment = $scope.thanhToanType;
                            $scope.activeInvoice().order.status = 7;
                            $scope.activeInvoice().order.created_by = $scope.localStorageIdac.username;
                            // Lấy ngày hiện tại
                            var currentDate = new Date();
                            // Định dạng ngày thành chuỗi 'yyyy-MM-dd'
                            var formattedDate = currentDate.toISOString().split('T')[0];
                            // Gán giá trị vào biến $scope.localStorageIdac.date_of_birth
                            $scope.activeInvoice().order.create_date = formattedDate;
                            $http.post("http://localhost:8080/api/order/add", $scope.activeInvoice().order)
                                .then(function (response) {
                                    // Xử lý phản hồi từ máy chủ sau khi lưu thành công
                                    var orderData = response.data; // Lấy ID của hóa đơn từ phản hồi

                                    // alert("Đặt hàng thành công. ID của hóa đơn: " + orderId);
                                    $scope.activeInvoice().cart.forEach(function (watch, index) {
                                        $scope.orderDetail = {};
                                        $scope.orderDetail.quantity = watch.quantity;
                                        $scope.orderDetail.total_price = watch.quantity * watch.price;
                                        if (watch.giamoi) {
                                            $scope.orderDetail.total_price = watch.giamoi * watch.quantity;
                                            $scope.orderDetail.giamgia = watch.giamgia;
                                        }
                                        $scope.orderDetail.order = orderData;
                                        $scope.orderDetail.watchdetail = watch;
                                        watch.quantity_stock = watch.quantity_stock + 1;
                                        $http.post("http://localhost:8080/api/orderdetail/add", $scope.orderDetail)
                                            .then(function (response) {
                                                // Xử lý phản hồi từ máy chủ sau khi lưu thành công
                                                // alert("Đẩy data thành công!");
                                            })
                                            .catch(function (error) {
                                                // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
                                                console.error("Lỗi khi lưu dữ liệu: ", error);
                                            });
                                        // watch.quantity_stock = watch.quantity_stock+1;
                                        console.log("Quantity_stock:" + watch.quantity_stock);
                                        console.log("Quantity:" + watch.quantity);
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
                                        // watch.quantity_stock = watch.quantity_stock-1;
                                    });

                                    $scope.removeInvoice($scope.activeInvoice());
                                    alert("Đặt hàng thành công thành công");
                                })
                                .catch(function (error) {
                                    // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
                                    console.error("Lỗi khi lưu dữ liệu: ", error);
                                });
                        }, function (error) {
                            console.error('Lỗi trong quá trình gọi API:', error);
                        });

                    // console.log("PTTT:" + $scope.thanhtoan)
                }, function (error) {
                    console.error('Lỗi trong quá trình gọi API thanh toán:', error);
                });



        }

    };
    $scope.removeInvoice = function (invoice) {
        var index = $scope.invoices.indexOf(invoice);
        if (index !== -1) {
            $scope.invoices.splice(index, 1);
        }
    };

    $scope.loadPage();

});
