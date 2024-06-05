myapp.controller("home-ctrl", function ($scope, $http, $route, $location, CartService) {
    var roleIdAc = localStorage.getItem("role");
    console.log(roleIdAc);
    if (roleIdAc === 'ADM' || roleIdAc === 'STAFF') {
        window.location.href = "/admin/index.html";
    }

    localStorage.removeItem("ProductBuyNow");
    localStorage.removeItem("catesName");
    localStorage.removeItem("actor");
    localStorage.removeItem("ProductDetail");
    localStorage.removeItem("selectedAddress");
    localStorage.removeItem("EmailTamThoi");
    localStorage.removeItem("codeEmail");
    localStorage.removeItem("EmailChangepass");

    let slider = document.querySelector('.slider .list');
    let items = document.querySelectorAll('.slider .list .item');
    let next = document.getElementById('next');
    let prev = document.getElementById('prev');
    let dots = document.querySelectorAll('.slider .dots li');

    let lengthItems = items.length - 1;
    let active = 0;
    next.onclick = function () {
        active = active + 1 <= lengthItems ? active + 1 : 0;
        reloadSlider();
    }
    prev.onclick = function () {
        active = active - 1 >= 0 ? active - 1 : lengthItems;
        reloadSlider();
    }
    // let refreshInterval = setInterval(() => { next.click() }, 9000);
    function reloadSlider() {
        slider.style.left = -items[active].offsetLeft + 'px';
        // 
        let last_active_dot = document.querySelector('.slider .dots li.active');
        last_active_dot.classList.remove('active');
        dots[active].classList.add('active');
        // clearInterval(refreshInterval);
        // refreshInterval = setInterval(() => { next.click() }, 8000);
    }

    dots.forEach((li, key) => {
        li.addEventListener('click', () => {
            active = key;
            reloadSlider();
        })
    })
    window.onresize = function (event) {
        reloadSlider();
    };

    // Lấy tất cả các mục danh sách <li>
    const listItems = document.querySelectorAll('.category-list ul li');

    // Lặp qua từng mục danh sách và thêm sự kiện click
    listItems.forEach((item) => {
        item.addEventListener('click', () => {
            // Xóa lớp active khỏi tất cả các mục danh sách
            listItems.forEach((li) => {
                li.classList.remove('active');
            });

            // Thêm lớp active vào mục danh sách được nhấp vào
            item.classList.add('active');
        });
    });
    $scope.chuyenTrang = function(){
        $location.path("/product");
    }

    $scope.products = [];
    $scope.displayedProducts = [];
    var currentPage = 0;
    var productsPerPage = 6;

    function updateDisplayedProducts() {
        var startIndex = currentPage * productsPerPage;
        var endIndex = startIndex + productsPerPage;
        $scope.displayedProducts = $scope.products.slice(startIndex, endIndex);
    }

    $scope.previousPage = function () {
        if (currentPage > 0) {
            currentPage--;
            updateDisplayedProducts();
        }
    };

    $scope.nextPage = function () {
        if (currentPage < Math.ceil($scope.products.length / productsPerPage) - 1) {
            currentPage++;
            updateDisplayedProducts();
        }
    };

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

    // Khởi tạo hiển thị ban đầu
    $http.get("http://localhost:8080/api/watch")
        .then(function (response) {
            // Gán dữ liệu trả về từ API vào biến $scope.products
            $scope.products = response.data;
            var uniqueProductNames = {}; // Sử dụng đối tượng để theo dõi tên sản phẩm duy nhất



            // Loại bỏ các sản phẩm trùng tên và gán danh sách sản phẩm duy nhất vào $scope.watchs
            $scope.products = $scope.products.filter(function (watch) {
                if (!uniqueProductNames[watch.product.name]) {
                    uniqueProductNames[watch.product.name] = true;
                    return true; // Giữ sản phẩm nếu tên sản phẩm chưa được thấy
                }
                return false; // Loại bỏ sản phẩm nếu tên sản phẩm đã tồn tại
            });

            $scope.products = $scope.products.filter(function (cartItem) {
                return cartItem.status !== 1;
            });

            // Lặp qua danh sách sản phẩm và lấy danh sách hình ảnh
            angular.forEach($scope.products, function (cartItem) {
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

    // Khởi tạo giỏ hàng từ localStorage (nếu có)
    $scope.cart = JSON.parse(localStorage.getItem('cart')) || [];

    $scope.showFormAddCart = false;


    $scope.Productcart = {};
    $scope.addtoCart = function (watch) {
        // // Kiểm tra xem đồng hồ đã có trong giỏ hàng chưa
        $scope.showFormAddCart = true;

        $scope.Productcart = watch;
        // $scope.selectProductDetail(watch);


        $http.get("http://localhost:8080/api/watch/" + $scope.Productcart.id + "/images").then(function (imageResponse) {
            $scope.Productcart.images = imageResponse.data;
        });
        $scope.productsDetail = [];
        $http.get("http://localhost:8080/api/watch")
            .then(function (response) {
                // Gán dữ liệu trả về từ API vào biến $scope.products
                $scope.productsDetail = response.data;

                // Sắp xếp sản phẩm theo trường 'name' tăng dần
                $scope.productsDetail = $scope.productsDetail.sort(function (a, b) {
                    return a.size.name.localeCompare(b.size.name);
                });
                // Lọc sản phẩm có tên giống với localStorageProduct.product.name
                $scope.filteredProducts = $scope.productsDetail.filter(function (product) {
                    return product.product.name === $scope.Productcart.product.name;
                });


            }, function (error) {
                console.error('Lỗi trong quá trình gọi API:', error);
            });

        var maxGiamGia = -1;  // Giả sử giamgia không bao giờ là số âm
        var selectedGiamGia = null;

        angular.forEach($scope.km3s, function (itemProduct) {
            if (itemProduct.watchdetail.id === $scope.Productcart.id && itemProduct.chietkhausanpham.status === 2) {
                if (itemProduct.giamgia > maxGiamGia) {
                    // Nếu giamgia lớn hơn maxGiamGia, cập nhật maxGiamGia và selectedGiamGia
                    maxGiamGia = itemProduct.giamgia;
                    selectedGiamGia = itemProduct.giamgia;
                }
            }
        });

        // Kiểm tra xem có giamgia nào được chọn không
        if (selectedGiamGia !== null) {
            $scope.Productcart.giamoi = $scope.Productcart.price - ((selectedGiamGia * $scope.Productcart.price) / 100);
            $scope.Productcart.giamgia = selectedGiamGia;
            // Các thao tác khác nếu cần
        }

        angular.forEach($scope.filteredProducts, function (product) {
            product.isSelected = (product === watch);
            var maxGiamGia = -1;  // Giả sử giamgia không bao giờ là số âm
            var selectedGiamGia = null;

            angular.forEach($scope.km3s, function (itemProduct) {
                if (itemProduct.watchdetail.id === product.id && itemProduct.chietkhausanpham.status === 2) {
                    if (itemProduct.giamgia > maxGiamGia) {
                        // Nếu giamgia lớn hơn maxGiamGia, cập nhật maxGiamGia và selectedGiamGia
                        maxGiamGia = itemProduct.giamgia;
                        selectedGiamGia = itemProduct.giamgia;
                    }
                }
            });

            // Kiểm tra xem có giamgia nào được chọn không
            if (selectedGiamGia !== null) {
                product.giamoi = product.price - ((selectedGiamGia * product.price) / 100);
                product.giamgia = selectedGiamGia;
                // Các thao tác khác nếu cần
            }
        });
        // CartService.addToCart(watch);

        // // // Cập nhật dữ liệu trên navbar
        // $scope.cart = CartService.getCart();
    };

    $scope.quantityCart = 1;
    $scope.sizeShow = null;
    $scope.selectProductDetail = function (selectedProduct) {
        // Đặt trạng thái được chọn cho sản phẩm
        if ($scope.Productcart.size && selectedProduct.size.name === $scope.Productcart.size.name) {
            // Nếu giống nhau, đặt trạng thái được chọn cho sản phẩm
            selectedProduct.isSelected = !selectedProduct.isSelected;
            $scope.Productcart = selectedProduct;
            $scope.sizeShow = selectedProduct.size.name;
            $scope.quantityCart = 1;

            var maxGiamGia = -1;  // Giả sử giamgia không bao giờ là số âm
            var selectedGiamGia = null;

            angular.forEach($scope.km3s, function (itemProduct) {
                if (itemProduct.watchdetail.id === $scope.Productcart.id && itemProduct.chietkhausanpham.status === 2) {
                    if (itemProduct.giamgia > maxGiamGia) {
                        // Nếu giamgia lớn hơn maxGiamGia, cập nhật maxGiamGia và selectedGiamGia
                        maxGiamGia = itemProduct.giamgia;
                        selectedGiamGia = itemProduct.giamgia;
                    }
                }
            });

            // Kiểm tra xem có giamgia nào được chọn không
            if (selectedGiamGia !== null) {
                $scope.Productcart.giamoi = $scope.Productcart.price - ((selectedGiamGia * $scope.Productcart.price) / 100);
                $scope.Productcart.giamgia = selectedGiamGia;
                // Các thao tác khác nếu cần
            }

        } else {
            // Nếu không giống nhau, đặt trạng thái được chọn cho sản phẩm và cập nhật Productcart
            $scope.Productcart = selectedProduct;
            $scope.sizeShow = selectedProduct.size.name;
            $scope.quantityCart = 1;
            angular.forEach($scope.filteredProducts, function (product) {
                product.isSelected = false;
                var maxGiamGia = -1;  // Giả sử giamgia không bao giờ là số âm
                var selectedGiamGia = null;

                angular.forEach($scope.km3s, function (itemProduct) {
                    if (itemProduct.watchdetail.id === product.id && itemProduct.chietkhausanpham.status === 2) {
                        if (itemProduct.giamgia > maxGiamGia) {
                            // Nếu giamgia lớn hơn maxGiamGia, cập nhật maxGiamGia và selectedGiamGia
                            maxGiamGia = itemProduct.giamgia;
                            selectedGiamGia = itemProduct.giamgia;
                        }
                    }
                });

                // Kiểm tra xem có giamgia nào được chọn không
                if (selectedGiamGia !== null) {
                    product.giamoi = product.price - ((selectedGiamGia * product.price) / 100);
                    product.giamgia = selectedGiamGia;
                    // Các thao tác khác nếu cần
                }
            });
            selectedProduct.isSelected = true;
        }
    };

    $scope.showSoLuongLoi = false;
    $scope.themvaogio = function () {
        // Kiểm tra xem có sản phẩm nào được chọn không
        if ($scope.Productcart && $scope.Productcart.isSelected) {
            if ($scope.showSoLuongLoi === true || $scope.Productcart.quantity_stock === 0) {
                alert("Mặt hàng này đã hết!");
            } else {
                $scope.Productcart.quantity = $scope.quantityCart;
                CartService.addToCartDetail($scope.Productcart);

                // // // Cập nhật dữ liệu trên navbar
                $scope.cart = CartService.getCart();
                alert("Thêm thành công!");
                $scope.quantityCart = 1;
            }
        } else {
            // Hiển thị cảnh báo nếu không có sản phẩm nào được chọn
            alert('Vui lòng chọn kích cỡ trước khi thêm vào giỏ hàng.');
        }
    };

    $scope.incrementQuantity = function () {
        $scope.quantityCart++;
        $scope.updateQuantity();
    };

    // Function to decrement quantity
    $scope.decrementQuantity = function () {
        if ($scope.quantityCart > 1) {
            $scope.quantityCart--;
            $scope.updateQuantity();
        }
    };

    $scope.updateQuantity = function () {
        // Kiểm tra nếu quantity nhỏ hơn 1, đặt lại giá trị thành 1
        if ($scope.quantityCart < 1) {
            $scope.quantityCart = 1;
        }
        if ($scope.quantityCart > $scope.Productcart.quantity_stock) {
            $scope.showSoLuongLoi = true;
        } else {
            $scope.showSoLuongLoi = false;
        }
    }


    $scope.closePopup = function () {
        $scope.showFormAddCart = false
        $scope.sizeShow = null;
        $scope.showSoLuongLoi = false;
        $scope.quantityCart = 1;
    }

    $scope.detailProduct = function (watch) {
        localStorage.setItem('ProductDetail', JSON.stringify(watch));
        $location.path("/detail");
    }

    $scope.buyNow = function (watch) {
        var username = localStorage.getItem('username');
        if (watch.quantity_stock <= 0) {
            alert("Số lượng hàng đã hết, vui lòng chọn mẫu hoặc size khác !");
        } else {
            watch.quantity = 1;
            localStorage.setItem("ProductBuyNow", JSON.stringify(watch));
            if (username) {
                $location.path("/address");

            } else {
                $location.path("/checkout");
            }
        }
    };



    $scope.productCasts = []
    $http.get("http://localhost:8080/api/watch")
        .then(function (response) {
            // Gán dữ liệu trả về từ API vào biến $scope.products
            $scope.productCasts = response.data;

            $scope.productCasts = $scope.products.filter(function (cartItem) {
                return cartItem.status !== 1;
            });
            var uniqueProductNames = {}; // Sử dụng đối tượng để theo dõi tên sản phẩm duy nhất

            // Loại bỏ các sản phẩm trùng tên và gán danh sách sản phẩm duy nhất vào $scope.watchs
            $scope.productCasts = $scope.productCasts.filter(function (watch) {
                if (!uniqueProductNames[watch.product.name]) {
                    uniqueProductNames[watch.product.name] = true;
                    return true; // Giữ sản phẩm nếu tên sản phẩm chưa được thấy
                }
                return false; // Loại bỏ sản phẩm nếu tên sản phẩm đã tồn tại
            });
            // Lặp qua danh sách sản phẩm và lấy danh sách hình ảnh
            angular.forEach($scope.productCasts, function (cartItem) {
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
            // UpdateDisplayedProducts ở đây nếu cần
        }, function (error) {
            console.error('Lỗi trong quá trình gọi API:', error);
        });
    // 

    $scope.filterZenithProducts = function (product) {
        return product.brand.name === 'Zenith';
    };


    $scope.filterOmegaProducts = function (product) {
        return product.brand.name === 'Omega';
    };

    $scope.filterHublotProducts = function (product) {
        return product.brand.name === 'Hublot';
    };

    $scope.filterRolexProducts = function (product) {
        return product.brand.name === 'Rolex';
    };

    $scope.searchCates = function (value) {
        // alert(value);
        if (value === 'none') {
            localStorage.removeItem('catesNameBrand');
            localStorage.removeItem('catesName');
            $route.reload();
            $location.path('/product');
        } else {
            localStorage.removeItem('catesName');
            localStorage.setItem('catesNameBrand', value);
            // $location.path('/home');
            $route.reload();
            $location.path('/product');
        }
    }



})