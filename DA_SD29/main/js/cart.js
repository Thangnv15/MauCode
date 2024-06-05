myapp.controller("cart-ctrl", function ($scope, $http, $location, $route, CartService) {
    // alert("Carthi")
    // var input = document.querySelector("input"),
    //     input_val = parseInt(input.value),
    //     btn_add = document.querySelector(".add"),
    //     btn_remove = document.querySelector(".remove");

    // input.addEventListener("keyup", function () {
    //     input_val = parseInt(input.value);
    // });

    // btn_add.addEventListener("click", function (e) {
    //     if (e.shiftKey) {
    //         input_val += 10;
    //     } else {
    //         input_val++;
    //     }
    //     input.value = input_val;
    // });

    // btn_remove.addEventListener("click", function (e) {
    //     if (input_val > 11 && e.shiftKey) {
    //         input_val -= 10;
    //     } else if (input_val > 1) {
    //         input_val--;
    //     }
    //     input.value = input_val;
    // });
    localStorage.removeItem("ProductBuyNow");

    $scope.showSoLuongLoi = false;
    $scope.increaseQuantity = function (product) {
        if (event.shiftKey) {
            product.quantity += 10;
        } else {
            product.quantity++;
        }
        if (product.quantity >= product.quantity_stock) {
            product.quantity = product.quantity_stock;
            $scope.showSoLuongLoi = true;
        } else {
            $scope.showSoLuongLoi = false;
        }
        updateLocalStorage();
    };

    $scope.decreaseQuantity = function (product) {
        if (product.quantity > 11 && event.shiftKey) {
            product.quantity -= 10;
        } else if (product.quantity > 1) {
            product.quantity--;
        }
        if (product.quantity <= product.quantity_stock) {
            $scope.showSoLuongLoi = false;
        }
        updateLocalStorage();
    };

    // var thongtin_thanhtoan = document.getElementById("content_thongtin_thanhtoan");
    // var dropdown_thongtin_thanhtoan = document.getElementById("dropdown_thongtin_thanhtoan");
    // var chevronIcon_thongtin_thanhtoan = document.querySelector("#content_thongtin_thanhtoan i");
    // var isDropdownVisible = false;

    // thongtin_thanhtoan.addEventListener("click", function () {
    //     dropdown_thongtin_thanhtoan.style.display = isDropdownVisible ? "none" : "block";

    //     // Thay đổi lớp CSS của phần tử <i>
    //     chevronIcon_thongtin_thanhtoan.classList.toggle("chevron-up");
    //     chevronIcon_thongtin_thanhtoan.classList.toggle("chevron-down");

    //     isDropdownVisible = !isDropdownVisible;
    // });

    // var magiamgia_thanhtoan = document.getElementById("content_magiamgia_thanhtoan");
    // var dropdown_magiamgia_thanhtoan = document.getElementById("dropdown_magiamgia_thanhtoan");
    // var chevronIcon_magiamgia_thanhtoan = document.querySelector("#content_magiamgia_thanhtoan i");
    // var isDropdownVisible_magiamgia = false;

    // magiamgia_thanhtoan.addEventListener("click", function () {
    //     dropdown_magiamgia_thanhtoan.style.display = isDropdownVisible_magiamgia ? "none" : "block";

    //     // Thay đổi lớp CSS của phần tử <i>
    //     chevronIcon_magiamgia_thanhtoan.classList.toggle("chevron-up");
    //     chevronIcon_magiamgia_thanhtoan.classList.toggle("chevron-down");

    //     isDropdownVisible_magiamgia = !isDropdownVisible_magiamgia;
    // });
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

    // Khởi tạo giỏ hàng từ localStorage (nếu có)
    $scope.cart = JSON.parse(localStorage.getItem('cart')) || [];
    $scope.products = [];
    $http.get("http://localhost:8080/api/watch").then(function (response) {
        $scope.products = response.data;
        checkCart();
    });
    function checkCart() {
        angular.forEach($scope.cart, function (cartItem) {
            var productItem = $scope.products.find(function (product) {
                return product.id === cartItem.id;
            });

            if (productItem) {
                cartItem.quantity_stock = productItem.quantity_stock;
                // Kiểm tra và cập nhật quantity nếu cần
                if (cartItem.quantity > productItem.quantity_stock) {
                    cartItem.quantity = productItem.quantity_stock;
                    cartItem.quantity_stock = productItem.quantity_stock;
                    updateLocalStorage();
                }

                // Gọi API để lấy danh sách images cho từng watchdetail
                $http.get("http://localhost:8080/api/watch/" + cartItem.id + "/images").then(function (imageResponse) {
                    cartItem.images = imageResponse.data;
                    console.log(cartItem.images.image_link);
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
                    // cartItem.price = cartItem.giamoi;
                    cartItem.giamgia = selectedGiamGia;
                    // Các thao tác khác nếu cần
                }
            }
           

        });

        // Tiếp tục xử lý hoặc hiển thị thông báo thành công ở đây nếu cần
    }
    // Hàm để tính tổng giá trị của giỏ hàng
    // angular.forEach($scope.cart, function (cartItem) {
    //     // if (cartItem.quantity > cartItem.quantity_stock) {
    //     //     cartItem.quantity = cartItem.quantity_stock;
    //     // }
    //     // Gọi API để lấy danh sách images cho từng watchdetail
    //     $http.get("http://localhost:8080/api/watch/" + cartItem.id + "/images").then(function (imageResponse) {
    //         cartItem.images = imageResponse.data;
    //         console.log(cartItem.images.image_link)
    //     });
    // });

    $scope.calculateTotal = function () {
        var total = 0;
    
        for (var i = 0; i < $scope.cart.length; i++) {
            // Sử dụng cartItem.giamoi nếu có giá mới, ngược lại sử dụng cartItem.price
            var price = $scope.cart[i].giamoi !== undefined ? $scope.cart[i].giamoi : $scope.cart[i].price;
            total += price * $scope.cart[i].quantity;
        }
    
        return total;
    };
    $scope.clearCart = function () {
        // Xóa giỏ hàng khỏi localStorage và khởi tạo giỏ hàng rỗng
        CartService.clearCart();
        $scope.cart = CartService.getCart();
        $route.reload();
    };

    $scope.removeFromCart = function (productId) {
        CartService.removeFromCart(productId);
        $scope.cart = CartService.getCart();
    };

    $scope.checkout = function () {
        var username = localStorage.getItem('username');

        if (username) {
            $location.path("/address");
        } else {
            $location.path("/checkout");
        }
    };
    function updateLocalStorage() {
        localStorage.setItem('cart', JSON.stringify($scope.cart));
    }

})