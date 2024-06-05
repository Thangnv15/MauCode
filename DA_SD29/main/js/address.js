myapp.controller("address-ctrl", function ($scope, $http, $location, $route) {
    const addressSavedList = document.querySelectorAll(".address-saved");
    const continueButton = document.querySelector(".button-buy");

    // addressSavedList.forEach(function (addressSaved) {
    //     const checkIcon = addressSaved.querySelector(".bx-check");

    //     addressSaved.addEventListener("click", function () {
    //         // Ẩn tất cả icon i của tất cả các phần tử
    //         addressSavedList.forEach(function (element) {
    //             const otherCheckIcon = element.querySelector(".bx-check");
    //             otherCheckIcon.style.display = "none";
    //         });

    //         // Hiển thị hoặc ẩn icon i của phần tử được click
    //         const isShown = getComputedStyle(checkIcon).display !== "none";
    //         if (!isShown) {
    //             checkIcon.style.display = "block"; // Hiển thị phần tử i
    //         } else {
    //             checkIcon.style.display = "none"; // Ẩn phần tử i
    //         }
    //     });

    // });

    // addressSavedList.forEach(function (addressSaved) {
    //     addressSaved.addEventListener("click", function () {
    //         // Loại bỏ class .active từ tất cả các phần tử
    //         addressSavedList.forEach(function (element) {
    //             element.classList.remove("active");
    //         });

    //         // Thêm class .active vào phần tử được click
    //         addressSaved.classList.add("active");
    //     });
    // });
    //click buy
    // continueButton.addEventListener("click", function () {
    //     let selectedAddress = false;

    //     // Kiểm tra xem có địa chỉ nào được chọn không
    //     addressSavedList.forEach(function (addressSaved) {
    //         const checkIcon = addressSaved.querySelector(".bx-check");
    //         const isShown = getComputedStyle(checkIcon).display !== "none";
    //         if (isShown) {
    //             selectedAddress = true;
    //         }
    //     });

    //     // Nếu không có địa chỉ nào được chọn, hiển thị thông báo
    //     if (!selectedAddress) {
    //         alert("Vui lòng chọn địa chỉ để tiếp tục mua hàng");
    //     } else {
    //         // Nếu có địa chỉ được chọn, tiếp tục thực hiện hành động mua hàng
    //         // Thêm mã xử lý mua hàng ở đây (nếu cần)
    //     }
    // });

    $scope.selectAddress = function (selectedAddress) {
        if (selectedAddress.isActive) {
            selectedAddress.isActive = false; // Bỏ chọn địa chỉ nếu đã được chọn
            $scope.isAddressSelected = false; // Cập nhật trạng thái là không có địa chỉ nào được chọn
            $scope.selectedAddress = null; // Đặt biến selectedAddress về null
        } else {
            // Đặt tất cả các địa chỉ về trạng thái không active
            angular.forEach($scope.addressAcount, function (address) {
                address.isActive = false;
            });

            // Đặt địa chỉ được chọn về trạng thái active
            selectedAddress.isActive = true;
            $scope.selectedAddress = selectedAddress; // Cập nhật selectedAddress với địa chỉ đã chọn
            $scope.selectedAddress.indexAddress = ($scope.addressAcount.indexOf(selectedAddress) + 1);
            $scope.isAddressSelected = true; // Cập nhật trạng thái là đã có địa chỉ được chọn
        }
    };

    $scope.cart = JSON.parse(localStorage.getItem('cart')) || [];
    $scope.cartNow = JSON.parse(localStorage.getItem('ProductBuyNow')) || [];
    $scope.product = [];
    $scope.continueShopping = function () {
        if ($scope.isAddressSelected) {
            // Đã có địa chỉ được chọn, thực hiện điều hướng đến trang /pay
            // Lưu địa chỉ đã chọn vào localStorage trước khi điều hướng
            localStorage.setItem('selectedAddress', JSON.stringify($scope.selectedAddress));
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
                    // alert("Thành công! Chuyển tiếp đến bước tiếp theo.");
                    $location.path("/pay");
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
                        alert("Lỗi hệ thống mua ngay! Số lượng vượt quá giới hạn cho sản phẩm ");
                        $location.path("/home");
                        return; // Thoát khỏi vòng lặp nếu có lỗi
                    }

                    // Nếu không có lỗi, hiển thị thông báo thành công
                    // alert("Thành công CartNow! Chuyển tiếp đến bước tiếp theo.");
                    $location.path("/pay");
                }
            }

            // alert($scope.cartNow.price);
            // $location.path("/pay");
        } else {
            // Chưa có địa chỉ nào được chọn, hiển thị cảnh báo
            alert("Cần phải chọn địa chỉ để tiếp tục");
        }
    };


    // console.log("Day la san pham mua ngay:"+$scope.cartNow.brand.name);
    // Lặp qua danh sách cart và gán danh sách hình ảnh cho mỗi cartItem
    angular.forEach($scope.cart, function (cartItem) {
        // Gọi API để lấy danh sách images cho từng watchdetail
        $http.get("http://localhost:8080/api/watch/" + cartItem.id + "/images").then(function (imageResponse) {
            cartItem.images = imageResponse.data;
        });
    });


    $http.get("http://localhost:8080/api/watch/" + $scope.cartNow.id + "/images").then(function (imageResponse) {
        $scope.cartNow.images = imageResponse.data;
    });

    // $scope.buyNow = false;

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

    $scope.tongtienCart = 0;
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
            $scope.tongtienCart = total;
            console.log("Ddaay là giá:" + total);
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

    $scope.addresss = [];
    $http.get("https://provinces.open-api.vn/api/?depth=3")
        .then(function (response) {
            $scope.addresss = response.data;
        }, function (error) {
            console.error('Lỗi trong quá trình gọi API:', error);
        });

    $scope.resetForm = function () {
        $scope.selectedProvince = null;
        $scope.selectedDistrict = null;
        $scope.selectedWard = null;
        $scope.name = ""; // Đặt lại giá trị cho ô input "Tên"
        $scope.email = ""; // Đặt lại giá trị cho ô input "Email"
        $scope.phone = ""; // Đặt lại giá trị cho ô input "Điện thoại"
        $scope.address = ""; // Đặt lại giá trị cho ô input "Địa chỉ chi tiết"
    };

    $scope.localStorageUsername = localStorage.getItem('username');
    $scope.localStorageUserActor = localStorage.getItem('actor');
    $scope.localStorageIdac = JSON.parse(localStorage.getItem('idac')) || [];


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
    
    $scope.accounts = [];
    $http.get("http://localhost:8080/api/account")
        .then(function (response) {
            // Xử lý phản hồi từ máy chủ sau khi lưu thành công
            $scope.accounts = response.data;
        })
        .catch(function (error) {
            // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
            console.error("Lỗi khi lưu dữ liệu: ", error);
        });


    // Thêm sản phẩm
    $scope.addressAdd = {}; // Đối tượng để lưu thông tin địa chỉ mới

    $scope.saveAddress = function () {
        // Lấy dữ liệu từ các trường form và gán vào đối tượng addressAdd
        if (!$scope.selectedProvince || !$scope.selectedDistrict || !$scope.selectedWard
            || !$scope.address || !$scope.name || !$scope.phone
            || !$scope.email) {
            alert("Vui lòng điền đầy đủ các trường thông tin!");
            return;
        }
        $scope.addressAdd.province_code = $scope.selectedProvince.name;
        $scope.addressAdd.district_code = $scope.selectedDistrict.name;
        $scope.addressAdd.town_code = $scope.selectedWard.name;
        $scope.addressAdd.address_detail = $scope.address;
        $scope.addressAdd.username = $scope.name;
        $scope.addressAdd.phone = $scope.phone;
        $scope.addressAdd.email = $scope.email;
        $scope.addressAdd.account_address = $scope.localStorageIdac;

        if ($scope.emailError || $scope.phoneError) {
            alert("Vui lòng kiểm tra lại thông tin địa chỉ!");
            return;
        }

        if ($scope.addressAcount.length === 0) {
            $scope.localStorageIdac.phone = $scope.phone;
            $http.post("http://localhost:8080/api/account/add", $scope.localStorageIdac)
                .then(function (response) {
                    console.log("Thêm số điện thoại thành công cho tài khoản");
                })
                .catch(function (error) {
                    // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
                    console.error("Lỗi khi lưu dữ liệu: ", error);
                });
        }

        // alert("object: " + JSON.stringify($scope.addressAdd));
        if ($scope.localStorageUserActor) {
            // alert("Ao nhay")
            $scope.accountsWithSamePhone = $scope.accounts.filter(function (account) {
                return account.phone === $scope.phone;
            });

            if ($scope.accountsWithSamePhone.length > 0) {
                $scope.addressAdd.account_address = $scope.accountsWithSamePhone[0];
                alert(JSON.stringify($scope.addressAdd))
                $http.post("http://localhost:8080/api/address/add", $scope.addressAdd)
                    .then(function (response) {
                        // Xử lý phản hồi từ máy chủ sau khi lưu thành công
                        localStorage.setItem('idac', JSON.stringify($scope.accountsWithSamePhone[0]));
                        alert("Lưu thông tin địa chỉ thành công");
                        $scope.loadAddresses();
                        $route.reload();

                    })
                    .catch(function (error) {
                        // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
                        console.error("Lỗi khi lưu dữ liệu: ", error);
                    });
            } else {
                // alert("Không có tài khoản nào có số điện thoại giống " + $scope.phone);
                $scope.account = {};
                $scope.accountRole = {};
                $scope.account.username = $scope.email;
                $scope.account.phone = $scope.phone;
                $scope.account.email = $scope.email;
                $scope.role = {};
                $http.get("http://localhost:8080/api/role")
                    .then(function (response) {
                        var roles = response.data;
                        var custRole = roles.find(function (role) {
                            return role.name === 'CUST';
                        });

                        // Gán giá trị cho $scope.role nếu tìm thấy
                        if (custRole) {
                            $scope.role = custRole;
                            $http.post("http://localhost:8080/api/account/add", $scope.account)
                                .then(function (response) {
                                    // Xử lý phản hồi từ máy chủ sau khi lưu thành công
                                    // alert("Đăng kí tài khoản thành công!");
                                    // $location.path("/login");
                                    var dataAccount = response.data;
                                    $scope.accountRole.account = dataAccount;
                                    $scope.accountRole.role = $scope.role;
                                    $http.post("http://localhost:8080/api/accountrole/add", $scope.accountRole)
                                        .then(function (response) {
                                            $scope.addressAdd.account_address = dataAccount;
                                            $http.post("http://localhost:8080/api/address/add", $scope.addressAdd)
                                                .then(function (response) {
                                                    // Xử lý phản hồi từ máy chủ sau khi lưu thành công
                                                    alert("Lưu thông tin địa chỉ thành công");
                                                    // localStorage.setItem('username',  dataAccount.username);
                                                    localStorage.setItem('idac', JSON.stringify(dataAccount));
                                                    $scope.loadAddresses();

                                                })
                                                .catch(function (error) {
                                                    // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
                                                    console.error("Lỗi khi lưu dữ liệu: ", error);
                                                });
                                        })
                                        .catch(function (error) {
                                            // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
                                            console.error("Lỗi khi lưu dữ liệu: ", error);
                                        });
                                })
                                .catch(function (error) {
                                    // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
                                    console.error("Lỗi khi lưu dữ liệu: ", error);
                                });
                        }
                    })
                    .catch(function (error) {
                        // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
                        console.error("Lỗi khi lưu dữ liệu: ", error);
                    });
            }

        } else {
            $http.post("http://localhost:8080/api/address/add", $scope.addressAdd)
                .then(function (response) {
                    // Xử lý phản hồi từ máy chủ sau khi lưu thành công
                    alert("Lưu thông tin địa chỉ thành công");
                    $scope.loadAddresses();

                })
                .catch(function (error) {
                    // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
                    console.error("Lỗi khi lưu dữ liệu: ", error);
                });
        }


    };

    $scope.deleteAddress = function (idaddress) {
        var confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa địa chỉ này?");
        if (confirmDelete) {
            $http.delete("http://localhost:8080/api/address/delete/" + idaddress)
                .then(function (response) {
                    alert("Đã xóa thành công");
                    $scope.loadAddresses();
                })
                .catch(function (error) {
                    console.error("Lỗi khi xóa dữ liệu: ", error);
                });
        }
    }

    $scope.emailError = false;
    $scope.emailErrorMessage = "";

    $scope.emailError = false;
    $scope.emailErrorMessage = "";

    $scope.checkEmail = function () {
        // Regular expression for validating an Email
        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        $scope.emailError = !emailPattern.test($scope.email);
        $scope.emailErrorMessage = $scope.emailError ? "Email không hợp lệ" : "";
    };

    $scope.phoneError = false;
    $scope.phoneErrorMessage = "";

    $scope.checkPhone = function () {
        // Regular expression for validating a Phone Number with exactly 10 digits
        var phonePattern = /^\d{10}$/;

        $scope.phoneError = !phonePattern.test($scope.phone);
        $scope.phoneErrorMessage = $scope.phoneError ? "Số điện thoại phải có đúng 10 số" : "";
    };


    // Gọi hàm loadAddresses để tải danh sách địa chỉ ban đầu
    $scope.loadAddresses();

})