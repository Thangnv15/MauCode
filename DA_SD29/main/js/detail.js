myapp.controller("detail-ctrl", function ($scope, $http, $location, $route, CartService) {
    // Lấy tất cả các mục danh sách <li>
    // alert("hllo detail");
    const listItems = document.querySelectorAll('.product-list ul li');
    const tabContents = document.querySelectorAll('.tab-content');

    // Ẩn tất cả nội dung tab trừ tab đầu tiên
    tabContents.forEach((content, index) => {
        if (index !== 0) {
            content.style.display = 'none';
        }
    });

    // Lặp qua từng mục danh sách và thêm sự kiện click
    listItems.forEach((item) => {
        item.addEventListener('click', () => {
            // Xóa lớp active khỏi tất cả các mục danh sách
            listItems.forEach((li) => {
                li.classList.remove('active');
            });

            // Thêm lớp active vào mục danh sách được nhấp vào
            item.classList.add('active');

            // Ẩn tất cả nội dung tab
            tabContents.forEach((content) => {
                content.style.display = 'none';
            });

            // Lấy giá trị data-tab của li được click
            const tabName = item.getAttribute('data-tab');

            // Hiển thị nội dung tab tương ứng
            const tabContent = document.getElementById(tabName + '-content');
            if (tabContent) {
                tabContent.style.display = 'block';
            }
        });
    });

    // const leftImage = document.getElementById('left-image');
    // const rightImages = document.querySelectorAll('.right ul li img');
    // let currentIndex = 0;

    // // Thêm sự kiện click vào nút "btn-next"
    // document.querySelector('.btn-next').addEventListener('click', () => {
    //     currentIndex++; // Tăng chỉ số hiện tại

    //     // Kiểm tra nếu chỉ số vượt quá số lượng hình ảnh bên phải, đặt lại chỉ số về 0
    //     if (currentIndex >= rightImages.length) {
    //         currentIndex = 0;
    //     }

    //     // Thay đổi hình ảnh ở phần "left" bằng hình ảnh tương ứng từ phần "right"
    //     leftImage.src = rightImages[currentIndex].src;
    // });

    // // Thêm sự kiện click vào nút "btn-next"
    // document.querySelector('.btn-prev').addEventListener('click', () => {
    //     currentIndex--; // Tăng chỉ số hiện tại

    //     // Kiểm tra nếu chỉ số vượt quá số lượng hình ảnh bên phải, đặt lại chỉ số về 0
    //     if (currentIndex < 0) {
    //         currentIndex = rightImages.length - 1;
    //     }

    //     // Thay đổi hình ảnh ở phần "left" bằng hình ảnh tương ứng từ phần "right"
    //     leftImage.src = rightImages[currentIndex].src;
    // });

    // rightImages.forEach((rightImage, index) => {
    //     rightImage.addEventListener('click', () => {
    //         currentIndex = index; // Cập nhật chỉ số hiện tại dựa trên hình ảnh được click
    //         leftImage.src = rightImage.src; // Thay đổi hình ảnh ở phần "left" dựa trên hình ảnh được click
    //     });
    // });




    // const colorItems = document.querySelectorAll(".product-color ul li");
    // const sizeItems = document.querySelectorAll(".product-size ul li");

    // // Xử lý sự kiện khi một phần tử màu được chọn
    // colorItems.forEach((colorItem) => {
    //     colorItem.addEventListener("click", () => {
    //         // Loại bỏ lớp selected từ tất cả các phần tử màu
    //         colorItems.forEach((item) => {
    //             item.classList.remove("selected");
    //         });

    //         // Thêm lớp selected cho phần tử màu được chọn
    //         colorItem.classList.add("selected");
    //     });
    // });

    // // Xử lý sự kiện khi một phần tử kích thước được chọn
    // sizeItems.forEach((sizeItem) => {
    //     sizeItem.addEventListener("click", () => {
    //         // Loại bỏ lớp selected từ tất cả các phần tử kích thước
    //         sizeItems.forEach((item) => {
    //             item.classList.remove("selected");
    //         });

    //         // Thêm lớp selected cho phần tử kích thước được chọn
    //         sizeItem.classList.add("selected");
    //     });
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

    $scope.localStorageProduct = JSON.parse(localStorage.getItem('ProductDetail')) || [];
    $scope.loadPage = function () {
        console.log($scope.localStorageProduct.description);
        $http.get("http://localhost:8080/api/watch/" + $scope.localStorageProduct.id + "/images").then(function (imageResponse) {
            $scope.localStorageProduct.images = imageResponse.data;
            console.log($scope.localStorageProduct.images[0].image_link); // Lấy hình ảnh đầu tiên từ danh sách
        });
        var maxGiamGia = -1;  // Giả sử giamgia không bao giờ là số âm
        var selectedGiamGia = null;

        angular.forEach($scope.km3s, function (itemProduct) {
            if (itemProduct.watchdetail.id === $scope.localStorageProduct.id && itemProduct.chietkhausanpham.status === 2) {
                if (itemProduct.giamgia > maxGiamGia) {
                    // Nếu giamgia lớn hơn maxGiamGia, cập nhật maxGiamGia và selectedGiamGia
                    maxGiamGia = itemProduct.giamgia;
                    selectedGiamGia = itemProduct.giamgia;
                }
            }
        });

        // Kiểm tra xem có giamgia nào được chọn không
        if (selectedGiamGia !== null) {
            $scope.localStorageProduct.giamoi = $scope.localStorageProduct.price - ((selectedGiamGia * $scope.localStorageProduct.price) / 100);
            $scope.localStorageProduct.giamgia = selectedGiamGia;
            // Các thao tác khác nếu cần
        }
    }

    $scope.products = [];
    $http.get("http://localhost:8080/api/watch")
        .then(function (response) {
            // Gán dữ liệu trả về từ API vào biến $scope.products
            $scope.products = response.data;
            angular.forEach($scope.products, function (cartItem) {
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

            // Sắp xếp sản phẩm theo trường 'name' tăng dần
            $scope.products = $scope.products.sort(function (a, b) {
                return a.size.name.localeCompare(b.size.name);
            });

            // Lọc sản phẩm có tên giống với localStorageProduct.product.name
            $scope.filteredProducts = $scope.products.filter(function (product) {
                return product.product.name === $scope.localStorageProduct.product.name;
            });

        }, function (error) {
            console.error('Lỗi trong quá trình gọi API:', error);
        });

    $scope.detailProduct = function (watch) {
        localStorage.setItem('ProductDetail', JSON.stringify(watch));
        $scope.loadPage();
        $route.reload();
    }

    $scope.quantity = 1;
    $scope.showError = false;
    $scope.addtoCart = function () {
        if ($scope.quantity === undefined) {
            $scope.showError = true;
            return;
        } else {
            $scope.showError = false;
            // Kiểm tra xem đồng hồ đã có trong giỏ hàng chưa
            $scope.localStorageProduct = JSON.parse(localStorage.getItem('ProductDetail')) || [];
            if ($scope.quantity > $scope.localStorageProduct.quantity_stock) {
                $scope.showError = true;
            } else {
                $scope.showError = false;
                $scope.localStorageProduct.quantity = $scope.quantity;

                CartService.addToCartDetail($scope.localStorageProduct);

                // Cập nhật dữ liệu trên navbar
                $scope.cart = CartService.getCart();
                alert("Thêm vào giỏ hàng thành công !")
                $scope.loadPage();
            }

        }


    };


    $scope.buyNow = function () {
        if ($scope.quantity === undefined) {
            $scope.showError = true;
            return;
        } else {
            $scope.showError = false;
            $scope.localStorageProduct = JSON.parse(localStorage.getItem('ProductDetail')) || [];
            if ($scope.quantity > $scope.localStorageProduct.quantity_stock) {
                $scope.showError = true;
            } else {
                $scope.showError = false;
                var username = localStorage.getItem('username');
                $scope.localStorageProduct.quantity = $scope.quantity;
                localStorage.setItem("ProductBuyNow", JSON.stringify($scope.localStorageProduct));
                if (username) {
                    $location.path("/address");

                } else {
                    $location.path("/checkout");
                }
            }
        }
    };

    $scope.productTuongtus = [];
    $scope.displayedProducts = [];
    var currentPage = 0;
    var productsPerPage = 4;

    function updateDisplayedProducts() {
        var startIndex = currentPage * productsPerPage;
        var endIndex = startIndex + productsPerPage;
        $scope.displayedProducts = $scope.productTuongtus.slice(startIndex, endIndex);
    }

    $scope.previousPage = function () {
        if (currentPage > 0) {
            currentPage--;
            updateDisplayedProducts();
        }
    };

    $scope.nextPage = function () {
        if (currentPage < Math.ceil($scope.productTuongtus.length / productsPerPage) - 1) {
            currentPage++;
            updateDisplayedProducts();
        }
    };

    console.log($scope.localStorageProduct.id)
    $scope.danhgiasanpham = [];
    $scope.checkRong = true;
    $http.get("http://localhost:8080/api/danhgia")
        .then(function (response) {
            $scope.danhgiasanpham = response.data;
            angular.forEach($scope.danhgiasanpham,function(item){
                if($scope.localStorageProduct.product.name === item.watchdetail.product.name){
                    $scope.checkRong = false;
                }
            })
        }, function (error) {
            console.error('Lỗi trong quá trình gọi API:', error);
        });

    // Khởi tạo hiển thị ban đầu
    $http.get("http://localhost:8080/api/watch")
        .then(function (response) {
            // Gán dữ liệu trả về từ API vào biến $scope.products
            $scope.productTuongtus = response.data;

            // Lọc sản phẩm theo brand.name
            $scope.productTuongtus = $scope.productTuongtus.filter(function (watch) {
                return watch.brand.name === $scope.localStorageProduct.brand.name;
            });

            // Logic loại bỏ sản phẩm trùng tên
            var uniqueProductNames = {};
            $scope.productTuongtus = $scope.productTuongtus.filter(function (watch) {
                if (!uniqueProductNames[watch.product.name]) {
                    uniqueProductNames[watch.product.name] = true;
                    return true; // Giữ sản phẩm nếu tên sản phẩm chưa được thấy
                }
                return false; // Loại bỏ sản phẩm nếu tên sản phẩm đã tồn tại
            });

            // Lặp qua danh sách sản phẩm và lấy danh sách hình ảnh
            angular.forEach($scope.productTuongtus, function (cartItem) {
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

            updateDisplayedProducts();
            // UpdateDisplayedProducts ở đây nếu cần
        }, function (error) {
            console.error('Lỗi trong quá trình gọi API:', error);
        });

    $scope.detailProduct = function (watch) {
        localStorage.setItem('ProductDetail', JSON.stringify(watch));
        $location.path("/detail");
        $route.reload();
    }

    // Function to increment quantity
    $scope.incrementQuantity = function () {
        $scope.quantity++;
        $scope.updateQuantity();
    };

    // Function to decrement quantity
    $scope.decrementQuantity = function () {
        if ($scope.quantity > 1) {
            $scope.quantity--;
            $scope.updateQuantity();
        }
    };

    $scope.updateQuantity = function () {
        // Kiểm tra nếu quantity nhỏ hơn 1, đặt lại giá trị thành 1
        if ($scope.quantity < 1) {
            $scope.quantity = 1;
        }

        // Các bước khác bạn muốn thực hiện khi quantity thay đổi
    };

    $scope.loadPage();
});



