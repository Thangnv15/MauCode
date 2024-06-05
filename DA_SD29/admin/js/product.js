myapp.controller("product-ctrl", function ($scope, $http, $filter, $q, $route, WatchService) {
    const openPopup = document.getElementById("openPopup");
    const closePopup = document.getElementById("closePopup");
    const productPopup = document.getElementById("productPopup");

    openPopup.addEventListener("click", function () {
        productPopup.style.display = "block";
    });

    closePopup.addEventListener("click", function () {
        productPopup.style.display = "none";
    });

    //image product
    // const openPopupImage = document.getElementById("openPopup-image");
    // const closePopupImage = document.getElementById("closePopup-image");
    // const productPopupImage = document.getElementById("productImagePopup");

    // openPopupImage.addEventListener("click", function () {
    //     productPopupImage.style.display = "block";
    // });

    // closePopupImage.addEventListener("click", function () {
    //     productPopupImage.style.display = "none";
    // });

    //popup thuong hieu
    $scope.openedPopups = {};

    $scope.openPopup = function (popupName) {
        $scope.openedPopups[popupName] = true;
    };

    $scope.closePopup = function (popupName) {
        $scope.openedPopups[popupName] = false;
    };

    $scope.isPopupOpen = function (popupName) {
        return $scope.openedPopups[popupName];
    };

    $scope.currentTab = 'danhsach'; // Mặc định chọn tab 'Danh Sách'

    $scope.selectTab = function (tab) {
        $scope.currentTab = tab;
    };

    $scope.watchs = [];
    $scope.watchsOrdinal = [];
    $scope.watchsOrdinalConstant = [];
    $scope.watchsHetHang = [];
    $scope.countHetHang = 0;

    $scope.loadPage = function () {
        $http.get("http://localhost:8080/api/watch")
            .then(function (response) {
                // Gán dữ liệu trả về từ API vào biến $scope.watchs
                $scope.watchs = response.data;
                $scope.watchsOrdinal = response.data;
                $scope.watchsOrdinalConstant = response.data;
                // $scope.watchsHetHang = response.data;
                angular.forEach($scope.watchsOrdinalConstant, function (cartItem) {
                    if (cartItem.quantity_stock === 0) {
                        $scope.countHetHang++;
                    }
                });
                var uniqueProductNames = {}; // Sử dụng đối tượng để theo dõi tên sản phẩm duy nhất

                // Loại bỏ các sản phẩm trùng tên và gán danh sách sản phẩm duy nhất vào $scope.watchs
                $scope.watchs = $scope.watchs.filter(function (watch) {
                    if (!uniqueProductNames[watch.product.name]) {
                        uniqueProductNames[watch.product.name] = true;
                        return true; // Giữ sản phẩm nếu tên sản phẩm chưa được thấy
                    }
                    return false; // Loại bỏ sản phẩm nếu tên sản phẩm đã tồn tại
                });

                // Lặp qua danh sách sản phẩm và lấy danh sách hình ảnh
                angular.forEach($scope.watchs, function (cartItem) {
                    $http.get("http://localhost:8080/api/watch/" + cartItem.id + "/images").then(function (imageResponse) {
                        cartItem.images = imageResponse.data;
                        // console.log(cartItem.images[0].image_link); // Lấy hình ảnh đầu tiên từ danh sách
                    });
                });

                var uniqueProductNamesOrdinal = {}; // Sử dụng đối tượng để theo dõi tên sản phẩm duy nhất

                // Loại bỏ các sản phẩm trùng tên và gán danh sách sản phẩm duy nhất vào $scope.watchs
                $scope.watchsOrdinal = $scope.watchsOrdinal.filter(function (watch) {
                    if (!uniqueProductNamesOrdinal[watch.product.name]) {
                        uniqueProductNamesOrdinal[watch.product.name] = true;
                        return true; // Giữ sản phẩm nếu tên sản phẩm chưa được thấy
                    }
                    return false; // Loại bỏ sản phẩm nếu tên sản phẩm đã tồn tại
                });

                // Lặp qua danh sách sản phẩm và lấy danh sách hình ảnh
                angular.forEach($scope.watchsOrdinal, function (cartItem) {
                    $http.get("http://localhost:8080/api/watch/" + cartItem.id + "/images").then(function (imageResponse) {
                        cartItem.images = imageResponse.data;
                        // console.log(cartItem.images[0].image_link); // Lấy hình ảnh đầu tiên từ danh sách
                    });
                });

                for (var i = 0; i < $scope.watchsOrdinalConstant.length; i++) {
                    var currentWatch = $scope.watchsOrdinalConstant[i];

                    // Kiểm tra xem watch có quantity_stock = 0 không
                    if (currentWatch.quantity_stock === 0) {
                        // Kiểm tra xem watch có tên đã được xem qua chưa
                        var isNameExist = $scope.watchsHetHang.some(function (filteredWatch) {
                            return filteredWatch.product.name === currentWatch.product.name;
                        });

                        // Nếu chưa xem qua tên hoặc là watch duy nhất có tên đó
                        if (!isNameExist) {
                            $scope.watchsHetHang.push(currentWatch);
                        }
                    }
                }
                angular.forEach($scope.watchsHetHang, function (cartItem) {
                    $http.get("http://localhost:8080/api/watch/" + cartItem.id + "/images").then(function (imageResponse) {
                        cartItem.images = imageResponse.data;
                        // console.log(cartItem.images[0].image_link); // Lấy hình ảnh đầu tiên từ danh sách
                    });
                });
                console.log($scope.watchs)
                // UpdateDisplayedProducts ở đây nếu cần
            }, function (error) {
                console.error('Lỗi trong quá trình gọi API:', error);
            });
    }




    $scope.sizeMat = [];
    $scope.thuongHieu = [];
    $scope.caseColor = [];
    $scope.caseMaterial = [];
    $scope.feature = [];
    $scope.gender = [];
    $scope.glassMaterial = [];
    $scope.machineType = [];
    $scope.origin = [];
    $scope.shape = [];
    $scope.strap = [];
    $scope.product = [];

    var requests = [
        $http.get("http://localhost:8080/api/size"),
        $http.get("http://localhost:8080/api/brand"),
        $http.get("http://localhost:8080/api/casecolor"),
        $http.get("http://localhost:8080/api/casematerial"),
        $http.get("http://localhost:8080/api/feature"),
        $http.get("http://localhost:8080/api/gender"),
        $http.get("http://localhost:8080/api/chatlieukinh"),
        $http.get("http://localhost:8080/api/dongmay"),
        $http.get("http://localhost:8080/api/origin"),
        $http.get("http://localhost:8080/api/shape"),
        $http.get("http://localhost:8080/api/strap"),
        $http.get("http://localhost:8080/api/product")
    ];

    $q.all(requests).then(function (responses) {
        $scope.sizeMat = responses[0].data;
        $scope.thuongHieu = responses[1].data;
        $scope.caseColor = responses[2].data;
        $scope.caseMaterial = responses[3].data;
        $scope.feature = responses[4].data;
        $scope.gender = responses[5].data;
        $scope.glassMaterial = responses[6].data;
        $scope.machineType = responses[7].data;
        $scope.origin = responses[8].data;
        $scope.shape = responses[9].data;
        $scope.strap = responses[10].data;
        $scope.product = responses[11].data;
    }).catch(function (error) {
        console.error('Lỗi trong quá trình gọi API:', error);
    });


    // checkbox
    $scope.selectAll = false;
    // Hàm xử lý khi checkbox đầu tiên được chọn
    $scope.selectAllCheckboxes = function () {
        angular.forEach($scope.watchs, function (watch) {
            watch.selected = $scope.selectAllCheckbox;
        });
    };

    // dropdown
    const dropdownToggle = document.getElementById('dropdown-toggle');
    const dropdownMenu = document.getElementById('dropdown-menu');

    // Bắt sự kiện click trên nút toggle
    dropdownToggle.addEventListener('click', function () {
        // Kiểm tra trạng thái hiển thị của dropdown menu và thay đổi nó
        if (dropdownMenu.style.display === 'block') {
            dropdownMenu.style.display = 'none';
        } else {
            dropdownMenu.style.display = 'block';
        }
    });

    // Bắt sự kiện click trên mọi nơi để ẩn dropdown menu khi click bên ngoài
    document.addEventListener('click', function (event) {
        if (!dropdownToggle.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.style.display = 'none';
        }
    });

    // search caties
    const searchContainer = document.getElementById("search-container");
    const searchIcon = document.getElementById("search-icon");
    const closeIcon = document.getElementById("close-icon");
    const inputSearch = searchContainer.querySelector(".search-product input");

    searchContainer.addEventListener("click", function (event) {
        event.stopPropagation(); // Ngăn chặn sự kiện click từ lan ra các phần tử cha
        searchContainer.classList.add("expanded");
        inputSearch.style.display = "block";
        closeIcon.style.display = "block";
        searchIcon.style.display = "block";
    });

    closeIcon.addEventListener("click", function (event) {
        closeSearch();
        event.stopPropagation();
    });


    function closeSearch() {
        searchContainer.classList.remove("expanded");
        inputSearch.style.display = "none";
        closeIcon.style.display = "none";
        searchIcon.style.display = "block";
    }

    $scope.showContent = false;

    $scope.toggleContent = function () {
        $scope.showContent = !$scope.showContent;
    };


    $scope.showImageContent = false;

    $scope.toggleImageContent = function () {
        $scope.showImageContent = !$scope.showImageContent;
    };

    $scope.selectedValues = [];//Sizemat
    $scope.selectedValuesThuongHieu = [];
    $scope.selectedValuesGioiTinh = [];
    $scope.selectedValuesDongMay = [];
    $scope.selectedValues_ChatLieuDay = [];
    $scope.selectedValues_ChatLieuKinh = [];
    $scope.selectedValues_TinhNang = [];
    $scope.selectedValues_XuatXu = [];
    $scope.selectedValues_HinhDang = [];
    $scope.selectedValues_MauVo = [];




    $scope.productList = {};

    $scope.updateSelectedValues = function (selectedValue, targetArray) {
        if (selectedValue && !targetArray.includes(selectedValue)) {
            targetArray.push(selectedValue);
            $scope.selectedValue = '';
            generateProducts();
        }
    };

    $scope.deleteSelectedValue = function (selectedValue, targetArray) {
        var index = targetArray.indexOf(selectedValue);
        if (index !== -1) {
            targetArray.splice(index, 1);
        }
        generateProducts();
    };
    function generateProducts() {
        $scope.productList = [];
        for (var j = 0; j < $scope.selectedValues.length; j++) {
            var product = {
                size: $scope.selectedValues[j]
            };
            $scope.productList.push(product);
        }
    }

    // Hàm xóa sản phẩm
    $scope.deleteProduct = function (product) {
        var index = $scope.productList.indexOf(product);
        if (index !== -1) {
            $scope.productList.splice(index, 1);
        }
    };

    $scope.imageFile = null;
    $scope.imagePreview = null;

    var fileInput = document.getElementById('fileInput');

    fileInput.addEventListener('change', function () {
        $scope.$apply(function () {
            $scope.imageFile = fileInput.files[0];
            $scope.previewImage();
        });
    });

    $scope.previewImage = function () {
        if ($scope.imageFile) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $scope.$apply(function () {
                    $scope.imagePreview = e.target.result;
                });
            };
            reader.readAsDataURL($scope.imageFile);
        }
    };

    $scope.deleteImage = function () {
        // Xóa hình ảnh vừa chọn bằng cách đặt lại biến $scope.imageFile thành null
        $scope.imageFile = null;
        // Đồng thời đặt $scope.imagePreview thành null để ẩn hình ảnh xem trước
        $scope.imagePreview = null;
    };

    $scope.selectImage = function () {
        // Kích hoạt sự kiện chọn tệp của thẻ <input type="file> khi click vào biểu tượng "Thêm ảnh"
        fileInput.click();
    };

    $scope.checkNamebien = false;
    $scope.checkName = function () {
        $scope.checkNamebien = false; // Thay đổi tên của biến để tránh xung đột với hàm
        angular.forEach($scope.product, function (item) {
            if ($scope.sanpham.name === item.name) {
                $scope.checkNamebien = true;
            }
        });
    };
    // $scope.checkCodebien = false;
    $scope.mangTen = [];
    $scope.existingCodes = {};
    $scope.checkCode = function (product) {
        product.checkCodeError = false;
        angular.forEach($scope.watchsOrdinalConstant, function (item) {
            if (product.code === item.code) {
                product.checkCodeError = true;
            }
        });
    };
    $scope.checkSo = function (product) {
        product.checkSoError = false;

        // Kiểm tra nếu không phải là số hoặc nhỏ hơn 0
        if (isNaN(product.quantity_stock) || parseFloat(product.quantity_stock) < 0) {
            product.checkSoError = true;
        }
    };
    $scope.checkGiaBan = function (product) {
        product.checkGiaBanError = false;

        // Kiểm tra nếu không phải là số hoặc nhỏ hơn 0
        if (isNaN(product.price) || parseFloat(product.price) < 0) {
            product.checkGiaBanError = true;
        }
    };
    $scope.checkGiaNhap = function (product) {
        product.checkGiaNhapError = false;

        // Kiểm tra nếu không phải là số hoặc nhỏ hơn 0
        if (isNaN(product.price_im) || parseFloat(product.price_im) < 0) {
            product.checkGiaNhapError = true;
        }
    };
    $scope.sanpham = {};
    $scope.tenproduct = {};
    $scope.anhwatch = {};
    $scope.addProducts = function () {
        var item = angular.copy($scope.sanpham);
        if (!$scope.imageFile || !item.name || !item.kichCo || !item.gender || !item.machinetype || !item.strap
            || !item.glassmaterial || !item.feature || !item.origin || !item.shape || !item.casecolor || !item.casematerial) {
            alert("Vui lòng điền đầy đủ thông tin sản phẩm và sản phẩm cùng loại.");
            return;
        }

        angular.forEach($scope.productList, function (item) {
            if (!item.code || !item.price || !item.price_im || !item.quantity_stock) {
                alert('Chưa có dữ liệu cho sản phẩm!');
                return;
            }
        })

        var codeSet = new Set(); // Sử dụng Set để kiểm tra sự duy nhất

        for (var i = 0; i < $scope.productList.length; i++) {
            var code = $scope.productList[i].code;

            // Nếu mã đã tồn tại trong Set, có nghĩa là nó trùng lặp
            if (codeSet.has(code)) {
                alert("Mã trùng lặp: " + code);
                return; // Dừng hàm nếu có mã trùng lặp
            }

            // Thêm mã vào Set để kiểm tra sự duy nhất
            codeSet.add(code);
        }

        var hasError = false;

        angular.forEach($scope.productList, function (product) {
            if (product.checkSoError || product.checkCodeError || product.checkGiaBanError || product.checkGiaNhapError) {
                hasError = true;
                return; // Thoát khỏi vòng lặp nếu có lỗi
            }
        });

        if (hasError) {
            alert("Có lỗi trong dữ liệu sản phẩm. Vui lòng kiểm tra lại.");
            return;
        }



        item.image = $scope.imageFile.name;

        console.log(item);

        $scope.tenproduct.name = item.name;
        $scope.anhwatch.image_link = item.image;


        $http.post("http://localhost:8080/api/product/add", $scope.tenproduct)
            .then(function (response) {
                var productData = response.data;
                alert("Thêm thành công!");
                var items = angular.copy($scope.productList);
                for (var j = 0; j < items.length; j++) {
                    for (var key in item) {
                        if (item.hasOwnProperty(key)) {
                            items[j][key] = item[key];
                        }
                    }
                    items[j].product = productData;
                    // Lấy ngày hiện tại
                    var currentDate = new Date();
                    // Định dạng ngày thành chuỗi 'yyyy-MM-dd'
                    var formattedDate = currentDate.toISOString().split('T')[0];
                    items[j].created_date = formattedDate;
                    $http.post("http://localhost:8080/api/watch/add", items[j])
                        .then(function (response) {
                            var watchData = response.data;
                            // alert("Đẩy data thành công!")
                            $scope.anhwatch.watchdetail = watchData;
                            $http.post("http://localhost:8080/api/image/add", $scope.anhwatch)
                                .then(function (response) {
                                    var anhData = response.data;
                                    // alert("Lưu ảnh thành công!")
                                    $route.reload();
                                    console.log("Link ảnh:" + anhData.id);
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

        // console.log("Sản phẩm " + j + ": " + items[j].image);
    }

    $scope.applyFilters = function () {
        // Xây dựng đối tượng chứa các giá trị được chọn
        var filters = {
            thuonghieu: $scope.selectedThuonghieu,
            mauvo: $scope.selectedMauvo,
            chatlieuvo: $scope.selectedChatlieuvo,
            tinhnang: $scope.selectedTinhnang,
            chietlieukinh: $scope.selectedChatlieukinh,
            dongmay: $scope.selectedDongmay,
            xuatxu: $scope.selectedXuatxu,
            hinhdang: $scope.selectedHinhdang,
            loaiday: $scope.selectedLoaiday
            // Thêm các trường khác tương tự ở đây
        };

        // Áp dụng các bộ lọc để lọc mảng watchs
        $scope.watchs = $scope.watchsOrdinal.filter(function (watch) {
            return (!filters.thuonghieu || watch.brand.id == filters.thuonghieu) &&
                (!filters.mauvo || watch.casecolor.id == filters.mauvo) &&
                (!filters.chatlieuvo || watch.casematerial.id == filters.chatlieuvo) &&
                (!filters.tinhnang || watch.feature.id == filters.tinhnang) &&
                (!filters.chietlieukinh || watch.glassmaterial.id == filters.chietlieukinh) &&
                (!filters.dongmay || watch.machinetype.id == filters.dongmay) &&
                (!filters.xuatxu || watch.origin.id == filters.xuatxu) &&
                (!filters.hinhdang || watch.shape.id == filters.hinhdang) &&
                (!filters.loaiday || watch.strap.id == filters.loaiday);
            // Thêm các điều kiện khác tương tự ở đây
        });
    };

    $scope.clearFilters = function () {
        // Đặt giá trị "All" cho các biến ng-model tương ứng
        $scope.selectedThuonghieu = "";
        $scope.selectedMauvo = "";
        $scope.selectedChatlieuvo = "";
        $scope.selectedTinhnang = "";
        $scope.selectedChatlieukinh = "";
        $scope.selectedDongmay = "";
        $scope.selectedXuatxu = "";
        $scope.selectedHinhdang = "";
        $scope.selectedLoaiday = "";

        // Thêm các biến ng-model khác nếu cần

        // Gọi hàm loadPage
        $scope.loadPage();
    };

    $scope.updateHangLoat = function () {
        $scope.checkVar = false;
        if (!$scope.hlma) {
            $scope.checkVar = true;
        } else {
            angular.forEach($scope.productList, function (item) {
                item.code = $scope.hlma;
            })
            $scope.checkVar = false;

        };
        if (!$scope.hlban || isNaN($scope.hlban) || parseFloat($scope.hlban) < 0) {
            $scope.checkVar = true;
        } else {
            angular.forEach($scope.productList, function (item) {
                item.price = $scope.hlban;
            })
            $scope.checkVar = false;

        };

        if (!$scope.hlnhap || isNaN($scope.hlnhap) || parseFloat($scope.hlnhap) < 0) {
            $scope.checkVar = true;
        } else {
            angular.forEach($scope.productList, function (item) {
                item.price_im = $scope.hlnhap;
            })
            $scope.checkVar = false;

        };

        if (!$scope.hlsl || isNaN($scope.hlsl) || parseFloat($scope.hlsl) < 0) {
            $scope.checkVar = true;
        } else {
            angular.forEach($scope.productList, function (item) {
                item.quantity_stock = $scope.hlsl;
            })
            $scope.checkVar = false;
        };

        if ($scope.checkVar) {
            alert("Vui lòng nhập lại giá trị cập nhập hàng loạt!")
        }

    };

    $scope.updateHangLoatUpdate = function () {
        $scope.checkVarUpdate = false;
        if (!$scope.hlmaUP) {
            $scope.checkVarUpdate = true;
        } else {
            angular.forEach($scope.sizeMatselectedWatch, function (item) {
                item.code = $scope.hlmaUP;
            })
            $scope.checkVarUpdate = false;

        };
        if (!$scope.hlbanUP || isNaN($scope.hlbanUP) || parseFloat($scope.hlbanUP) < 0) {
            $scope.checkVarUpdate = true;
        } else {
            angular.forEach($scope.sizeMatselectedWatch, function (item) {
                item.price = $scope.hlbanUP;
            })
            $scope.checkVarUpdate = false;

        };

        if (!$scope.hlnhapUP || isNaN($scope.hlnhapUP) || parseFloat($scope.hlnhapUP) < 0) {
            $scope.checkVarUpdate = true;
        } else {
            angular.forEach($scope.sizeMatselectedWatch, function (item) {
                item.price_im = $scope.hlnhapUP;
            })
            $scope.checkVarUpdate = false;

        };

        if (!$scope.hlslUP || isNaN($scope.hlslUP) || parseFloat($scope.hlslUP) < 0) {
            $scope.checkVarUpdate = true;
        } else {
            angular.forEach($scope.sizeMatselectedWatch, function (item) {
                item.quantity_stock = $scope.hlslUP;
            })
            $scope.checkVarUpdate = false;
        };

        if ($scope.checkVarUpdate) {
            alert("Vui lòng nhập lại giá trị cập nhập hàng loạt!")
        }

    };

    $scope.restoreProduct = function (watch) {
        angular.forEach($scope.watchsOrdinalConstant, function (productItem) {
            if (watch.product.name === productItem.product.name) {
                productItem.status = 0;
                $http.post("http://localhost:8080/api/watch/addsanpham", productItem)
            }
        })
        alert("Khôi phục sản phẩm thành công!")
        $route.reload();
        console.log($scope.selectedWatches);

    }

    $scope.ngungBan = function () {
        $scope.selectedWatches = $scope.watchs.filter(function (watch) {
            return watch.selected;
        });

        if ($scope.selectedWatches.length === 0) {
            alert('Vui lòng chọn ít nhất 1 sản phẩm.');
            return;
        }
        var confirmation = confirm("Bạn có chắc chắn muốn ngưng bán sản phẩm?");
        if (confirmation) {
            angular.forEach($scope.selectedWatches, function (item) {
                angular.forEach($scope.watchsOrdinalConstant, function (productItem) {
                    if (item.product.name === productItem.product.name) {
                        productItem.status = 1;
                        $http.post("http://localhost:8080/api/watch/addsanpham", productItem)
                    }
                })
            })
            alert("Ngưng sản phẩm thành công!")
            $route.reload();
            console.log($scope.selectedWatches);
        }

    }

    $scope.resetProducts = function () {
        // Reset the form fields
        $scope.sanpham = {
            name: '',
            brand: '',
            kichCo: '',
            gender: '',
            machinetype: '',
            strap: '',
            glassmaterial: '',
            feature: '',
            origin: '',
            shape: '',
            casecolor: '',
            casematerial: '',
            image: '',
        };

        // Reset the selected values
        $scope.selectedValues = [];

        // Reset the image preview
        $scope.imagePreview = '';

        // Reset other form fields and selected values as needed
        // ...

        // Optionally, you can clear the file input
        var fileInput = document.getElementById('fileInput');
        fileInput.value = '';

        // Optionally, close any open popups or reset other UI states
        // ...

        // Add additional reset logic as needed
    };

    $scope.exportToExcel = function () {
        // Filter selected watches
        $scope.selectedWatches = $scope.watchs.filter(function (watch) {
            return watch.selected;
        });

        if ($scope.selectedWatches.length === 0) {
            alert('Please select at least one product.');
            return;
        }

        // Convert data to Excel format
        var data = [];
        data.push(['Mã sản phẩm', 'Tên sản phẩm', 'Giá bán', 'Giá nhập', 'Số lượng tồn', 'Mô tả', 'Trạng thái', 'Thương hiệu', 'Dòng máy', 'Giới tính',
            'Loại dây', 'Chất liệu kính', 'Tính năng', 'Kích cỡ', 'Xuất xứ', 'Chất liệu vỏ', 'Màu vỏ', 'Hình dáng']);

        $scope.selectedWatches.forEach(function (watch) {
            data.push([
                watch.code,
                watch.product.name,
                watch.price,
                watch.price_im,
                watch.quantity_stock,
                watch.description,
                watch.status,
                watch.brand.name,
                watch.machinetype.name,
                watch.gender.name,
                watch.strap.name,
                watch.glassmaterial.name,
                watch.feature.name,
                watch.size.name,
                watch.origin.name,
                watch.casematerial.name,
                watch.casecolor.name,
                watch.shape.name
            ]);
        });

        // Create a worksheet
        var ws = XLSX.utils.aoa_to_sheet(data);

        // Create a workbook
        var wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'SelectedWatches');

        // Save the workbook
        XLSX.writeFile(wb, 'selected_watches.xlsx');

        var blobUrl = URL.createObjectURL(new Blob([s2ab(blob)], { type: 'application/octet-stream' }));

        // Create a hidden input element
        var input = document.createElement('input');
        input.type = 'file';
        input.style.display = 'none';
        input.accept = '.xlsx';

        // Set the value of the input to the blob URL
        input.value = blobUrl;

        // Append the input to the body
        document.body.appendChild(input);

        // Trigger a click event on the input
        input.click();

        // Remove the input from the DOM
        document.body.removeChild(input);
    };



    function s2ab(s) {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    }



    // Đảm bảo rằng bạn đã thêm đúng đường dẫn đến thư viện xlsx trong file HTML của bạn

    $scope.importFile = function () {
        document.getElementById('fileInput').click();
    };

    function getBrand(thuongHieu) {
        for (var i = 0; i < $scope.thuongHieu.length; i++) {
            if ($scope.thuongHieu[i].name === thuongHieu) {
                return $scope.thuongHieu[i];
            }
        }
        return addNewBrand(thuongHieu); // hoặc giá trị mặc định khác tùy thuộc vào yêu cầu
    }
    function addNewBrand(thuongHieu) {
        if (!thuongHieu || thuongHieu.trim() === "") {
            return null;
        } else {
            return $http.post("http://localhost:8080/api/brand/add", thuongHieu);
        }
    }

    function getDongMay(thuongHieu) {
        for (var i = 0; i < $scope.machineType.length; i++) {
            if ($scope.machineType[i].name === thuongHieu) {
                return $scope.machineType[i];
            }
        }
        return addDongMay(thuongHieu); // hoặc giá trị mặc định khác tùy thuộc vào yêu cầu
    }
    function addDongMay(thuongHieu) {
        if (!thuongHieu || thuongHieu.trim() === "") {
            return null;
        } else {
            return $http.post("http://localhost:8080/api/dongmay/addExcel", thuongHieu);
        }
    }

    function getGioiTinh(thuongHieu) {
        for (var i = 0; i < $scope.gender.length; i++) {
            if ($scope.gender[i].name === thuongHieu) {
                return $scope.gender[i];
            }
        }
        return addGioiTinh(thuongHieu); // hoặc giá trị mặc định khác tùy thuộc vào yêu cầu
    }
    function addGioiTinh(thuongHieu) {
        if (!thuongHieu || thuongHieu.trim() === "") {
            return null;
        } else {
            return $http.post("http://localhost:8080/api/gender/addExcel", thuongHieu);
        }
    }

    function getLoaiKinh(thuongHieu) {
        for (var i = 0; i < $scope.glassMaterial.length; i++) {
            if ($scope.glassMaterial[i].name === thuongHieu) {
                return $scope.glassMaterial[i];
            }
        }
        return addLoaiKinh(thuongHieu); // hoặc giá trị mặc định khác tùy thuộc vào yêu cầu
    }
    function addLoaiKinh(thuongHieu) {
        if (!thuongHieu || thuongHieu.trim() === "") {
            return null;
        } else {
            return $http.post("http://localhost:8080/api/chatlieukinh/addExcel", thuongHieu);
        }
    }

    function getLoaiDay(thuongHieu) {
        for (var i = 0; i < $scope.strap.length; i++) {
            if ($scope.strap[i].name === thuongHieu) {
                return $scope.strap[i];
            }
        }
        return addLoaiDay(thuongHieu); // hoặc giá trị mặc định khác tùy thuộc vào yêu cầu
    }
    function addLoaiDay(thuongHieu) {
        if (!thuongHieu || thuongHieu.trim() === "") {
            return null;
        } else {
            return $http.post("http://localhost:8080/api/strap/addExcel", thuongHieu);
        }
    }

    function getTinhNang(thuongHieu) {
        for (var i = 0; i < $scope.feature.length; i++) {
            if ($scope.feature[i].name === thuongHieu) {
                return $scope.feature[i];
            }
        }
        return addTinhNang(thuongHieu); // hoặc giá trị mặc định khác tùy thuộc vào yêu cầu
    }
    function addTinhNang(thuongHieu) {
        if (!thuongHieu || thuongHieu.trim() === "") {
            return null;
        } else {
            return $http.post("http://localhost:8080/api/feature/addExcel", thuongHieu);

        }
    }

    function getKichCo(thuongHieu) {
        for (var i = 0; i < $scope.sizeMat.length; i++) {
            if ($scope.sizeMat[i].name === thuongHieu) {
                return $scope.sizeMat[i];
            }
        }
        return addKichCo(thuongHieu); // hoặc giá trị mặc định khác tùy thuộc vào yêu cầu
    }
    function addKichCo(thuongHieu) {
        if (!thuongHieu || thuongHieu.trim() === "") {
            return null;
        } else {
            return $http.post("http://localhost:8080/api/size/addExcel", thuongHieu);
        }
    }

    function getXuatXu(thuongHieu) {
        for (var i = 0; i < $scope.origin.length; i++) {
            if ($scope.origin[i].name === thuongHieu) {
                return $scope.origin[i];
            }
        }
        return addXuatXu(thuongHieu); // hoặc giá trị mặc định khác tùy thuộc vào yêu cầu
    }
    function addXuatXu(thuongHieu) {
        if (!thuongHieu || thuongHieu.trim() === "") {
            return null;
        } else {
            return $http.post("http://localhost:8080/api/origin/addExcel", thuongHieu);
        }
    }


    function getLoaiVo(thuongHieu) {
        for (var i = 0; i < $scope.caseMaterial.length; i++) {
            if ($scope.caseMaterial[i].name === thuongHieu) {
                return $scope.caseMaterial[i];
            }
        }
        return addLoaiVo(thuongHieu); // hoặc giá trị mặc định khác tùy thuộc vào yêu cầu
    }
    function addLoaiVo(thuongHieu) {
        if (!thuongHieu || thuongHieu.trim() === "") {
            return null;
        } else {
            return $http.post("http://localhost:8080/api/casematerial/addExcel", thuongHieu);
        }
    }

    function getMauVo(thuongHieu) {
        for (var i = 0; i < $scope.caseColor.length; i++) {
            if ($scope.caseColor[i].name === thuongHieu) {
                return $scope.caseColor[i];
            }
        }
        return addMauVo(thuongHieu); // hoặc giá trị mặc định khác tùy thuộc vào yêu cầu
    }
    function addMauVo(thuongHieu) {
        if (!thuongHieu || thuongHieu.trim() === "") {
            return null;
        } else {
            return $http.post("http://localhost:8080/api/casecolor/addExcel", thuongHieu);
        }
    }

    function getHinhDang(thuongHieu) {
        for (var i = 0; i < $scope.shape.length; i++) {
            if ($scope.shape[i].name === thuongHieu) {
                return $scope.shape[i];
            }
        }
        return addHinhDang(thuongHieu); // hoặc giá trị mặc định khác tùy thuộc vào yêu cầu
    }
    function addHinhDang(thuongHieu) {
        if (!thuongHieu || thuongHieu.trim() === "") {
            return null;
        } else {
            return $http.post("http://localhost:8080/api/shape/addExcel", thuongHieu);
        }
    }

    function getProduct(product) {
        for (var i = 0; i < $scope.product.length; i++) {
            if ($scope.product[i].name === product) {
                return $scope.product[i];
            }
        }
        // var product = {};
        return addProduct(product); // hoặc giá trị mặc định khác tùy thuộc vào yêu cầu
    }
    function addProduct(product) {
        if (!product || product.trim() === "") {
            return null;
        } else {
            return $http.post("http://localhost:8080/api/product/addExcel", product);
        }
    }
    $scope.donghos = {};
    async function importDataFromExcel() {
        var fileInput = document.getElementById('fileInput');
        var file = fileInput.files[0];

        if (file) {
            var reader = new FileReader();

            reader.onload = async function (e) {
                var data = new Uint8Array(e.target.result);
                var workbook = XLSX.read(data, { type: 'array' });

                // Assuming you have only one sheet in the workbook
                var sheet = workbook.Sheets[workbook.SheetNames[0]];

                // Iterate through each row
                var rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

                // Assuming the first row is the header, skip it
                rows.shift();

                for (const row of rows) {
                    var sanPham = row[1];
                    var thuongHieu = row[7];
                    var dongMay = row[8];
                    var gioiTinh = row[9];
                    var loaiDay = row[10];
                    var loaiKinh = row[11];
                    var tinhNang = row[12];
                    var kichCo = row[13];
                    var xuatXu = row[14];
                    var loaiVo = row[15];
                    var mauVo = row[16];
                    var hinhDang = row[17];

                    var watchDetail = {
                        code: row[0],
                        product: await getProduct(sanPham),
                        price: parseFloat(row[2]),
                        price_im: parseFloat(row[3]),
                        quantity_stock: parseInt(row[4]),
                        description: row[5],
                        status: parseInt(row[6]),
                        brand: await getBrand(thuongHieu),
                        machinetype: await getDongMay(dongMay),
                        gender: await getGioiTinh(gioiTinh),
                        strap: await getLoaiDay(loaiDay),
                        glassmaterial: await getLoaiKinh(loaiKinh),
                        feature: await getTinhNang(tinhNang),
                        size: await getKichCo(kichCo),
                        origin: await getXuatXu(xuatXu),
                        casematerial: await getLoaiVo(loaiVo),
                        casecolor: await getMauVo(mauVo),
                        shape: await getHinhDang(hinhDang)
                    };

                    $scope.donghos = JSON.stringify(watchDetail);
                    console.log("Đây là : " + $scope.donghos);

                    angular.forEach($scope.watchsOrdinalConstant, function (items) {
                        if (items.code === $scope.donghos.code) {
                            console.log("Phần tử này hiện đã tồn tại mã như vậy")
                            return;
                        }
                    })

                    try {
                        const response = await WatchService.sendWatchToServer($scope.donghos);

                        var watchData = response.data;
                        $scope.anhwatch.image_link = "picture.png";
                        $scope.anhwatch.watchdetail = watchData;

                        const imageResponse = await $http.post("http://localhost:8080/api/image/add", $scope.anhwatch);

                        // var anhData = imageResponse.data;
                        // alert("Lưu ảnh thành công!");
                    } catch (error) {
                        console.error("Lỗi khi lưu dữ liệu: ", error);
                    }
                }

                $scope.loadPage();
                alert("Thêm dữ liệu Excel thành công!");
            };

            reader.readAsArrayBuffer(file);
        }
    }

    // Gọi hàm importDataFromExcel khi có sự kiện thay đổi trong input file
    document.getElementById('fileInput').addEventListener('change', function (event) {
        importDataFromExcel();
    });




    $scope.showupdateProduct = false;
    $scope.selectedWatch = {};
    $scope.sizeMatselectedWatch = [];
    $scope.sizeMatselectedWatchFixed = [];

    $scope.updateProduct = function (watch) {
        $scope.showupdateProduct = true;
        $scope.selectedWatch = angular.copy(watch);
        $http.get("http://localhost:8080/api/watch/" + $scope.selectedWatch.id + "/images")
            .then(function (imageResponse) {
                $scope.selectedWatch.images = imageResponse.data;
                // if (!$scope.selectedWatch.images || $scope.selectedWatch.images.length === 0) {
                //     $scope.selectedWatch.images[0] = {};
                //     alert("Sản phẩm id: " + $scope.selectedWatch.id + " không có ảnh" + $scope.selectedWatch.images[0]);
                // }
                $http.get("http://localhost:8080/api/watch")
                    .then(function (response) {
                        // Gán dữ liệu trả về từ API vào biến $scope.watchs
                        $scope.watchs = response.data;

                        // Clear the existing sizes
                        $scope.sizeMatselectedWatch = [];
                        $scope.sizeMatselectedWatchFixed = [];

                        // Iterate through the watchs to find matching product names
                        for (var i = 0; i < $scope.watchs.length; i++) {
                            if ($scope.watchs[i].product.name === $scope.selectedWatch.product.name) {
                                // Add sizes of matching products to $scope.sizeMatselectedWatch
                                $scope.sizeMatselectedWatch.push($scope.watchs[i]);
                                $scope.sizeMatselectedWatchFixed.push($scope.watchs[i]);
                            }
                        }

                        // UpdateDisplayedProducts ở đây nếu cần
                    }, function (error) {
                        console.error('Lỗi trong quá trình gọi API:', error);
                    });
            });
    }

    $scope.closePopupUpdate = function () {
        $scope.showupdateProduct = false;
        $scope.loadPage();
    }

    $scope.updateSizeUpdate = function (size) {
        var sizeExists = false; // Flag to check if size exists

        for (var i = 0; i < $scope.sizeMatselectedWatch.length; i++) {
            if ($scope.sizeMatselectedWatch[i].size.name === size.name) {
                sizeExists = true;
                break; // Exit the loop since the size is found
            }
        }

        if (!sizeExists) {
            var watchThem = angular.copy($scope.selectedWatch);
            watchThem.id = null;
            watchThem.size = size;
            watchThem.code = null;
            watchThem.price = null;
            watchThem.price_im = null;
            watchThem.quantity_stock = null;
            $scope.sizeMatselectedWatch.push(watchThem);
        }
    }

    $scope.deleteSizeUpdate = function (selectedSizeMat) {
        var sizeExists = false; // Flag to check if size exists

        for (var i = 0; i < $scope.watchs.length; i++) {
            if ($scope.watchs[i].size.name === selectedSizeMat.size.name
                && $scope.watchs[i].product.name === $scope.selectedWatch.product.name) {
                sizeExists = true;
                break; // Exit the loop since the size is found
            }
        }

        if (!sizeExists) {
            var index = $scope.sizeMatselectedWatch.indexOf(selectedSizeMat);
            if (index !== -1) {
                $scope.sizeMatselectedWatch.splice(index, 1);
            }
        }


    }


    var fileInputUpdate = document.getElementById('fileInputUpdate');

    fileInputUpdate.addEventListener('change', function () {
        $scope.$apply(function () {
            $scope.selectedWatch.images[0].image_link = fileInputUpdate.files[0].name;
            // $scope.$apply();
        });
    });
    $scope.selectImageUpdate = function () {
        fileInputUpdate.click();
    }

    $scope.checkCodeUpdate = function (product) {
        product.checkCodeUPError = false;
        angular.forEach($scope.watchsOrdinalConstant, function (item) {
            if (product.code === item.code) {
                product.checkCodeUPError = true;
            }
        });
    };
    $scope.checkSoUpdate = function (product) {
        product.checkSoUPError = false;

        // Kiểm tra nếu không phải là số hoặc nhỏ hơn 0
        if (isNaN(product.quantity_stock) || parseFloat(product.quantity_stock) < 0) {
            product.checkSoUPError = true;
        }
    };
    $scope.checkGiaBanUpdate = function (product) {
        product.checkGiaBanUPError = false;

        // Kiểm tra nếu không phải là số hoặc nhỏ hơn 0
        if (isNaN(product.price) || parseFloat(product.price) < 0) {
            product.checkGiaBanUPError = true;
        }
    };
    $scope.checkGiaNhapUpdate = function (product) {
        product.checkGiaNhapUPError = false;

        // Kiểm tra nếu không phải là số hoặc nhỏ hơn 0
        if (isNaN(product.price_im) || parseFloat(product.price_im) < 0) {
            product.checkGiaNhapUPError = true;
        }
    };

    $scope.sanphamUpdate = {};
    $scope.tenproduct = {};
    $scope.anhwatch = {};
    $scope.anhwatchUpdate = {};
    $scope.capNhapProducts = function () {
        var hasError = false;

        angular.forEach($scope.sizeMatselectedWatch, function (product) {
            if (product.checkSoUPError || product.checkCodeUPError || product.checkGiaBanUPError || product.checkGiaNhapUPError) {
                hasError = true;
                return; // Thoát khỏi vòng lặp nếu có lỗi
            }
        });

        if (hasError) {
            alert("Có lỗi trong dữ liệu sản phẩm. Vui lòng kiểm tra lại.");
            return;
        }

        var item = angular.copy($scope.sanphamUpdate);
        var tenfake = {};
        if (item.tenSanPham === undefined || item.tenSanPham === "") {
        } else {
            // alert($scope.selectedWatch.product.name);
            var checkNameUpdate = false;
            angular.forEach($scope.product, function (Cartitem) {
                if (Cartitem.name === item.tenSanPham) {
                    checkNameUpdate = true;
                }
                if (Cartitem.name === $scope.sizeMatselectedWatch[0].product.name) {
                    tenfake = Cartitem;
                }
            })
            if (checkNameUpdate) {
                alert("Tên đã tồn tại")
                return;
            } else {
                tenfake.name = item.tenSanPham;
                $http.post("http://localhost:8080/api/product/add", tenfake)
                    .then(function (response) {
                        console.log("Thay tên đổi họ thành công!")
                    })
                    .catch(function (error) {
                        // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
                        console.error("Lỗi khi lưu dữ liệu: ", error);
                    });
            }

        }

        var items = angular.copy($scope.sizeMatselectedWatch);
        var checkVar = false;
        var checkVarCode = false;
        angular.forEach(items, function (cartItem) {
            if (!cartItem.code || !cartItem.price || !cartItem.price_im || !cartItem.quantity_stock) {
                checkVar = true;
                return;
            }
        })

        angular.forEach(items, function (productUpdate) {
            angular.forEach($scope.watchsOrdinalConstant,function(producItem){
                if(productUpdate.code === producItem.code && productUpdate.id !== producItem.id){
                    // alert(productUpdate.product.name+"Bị trùng code" + productUpdate.size.name +"Với sản phẩm "+producItem.product.name+producItem.size.name)
                    checkVarCode = true;
                    alert("Bị trùng code với sản phẩm khác!");
                    return;
                }
            })
        });

        if (checkVar) {
            alert("Có sản phẩm chưa điền đầy đủ thông tin")
        } else {
            if(checkVarCode){

            }else{
                for (var j = 0; j < items.length; j++) {
                    for (var key in item) {
                        if (item.hasOwnProperty(key)) {
                            items[j][key] = item[key];
                        }
                    }
    
                    if (items[j].id === null) {
                        // alert("Không có null :"+ items[j].id)
                        var currentDate = new Date();
                        // Định dạng ngày thành chuỗi 'yyyy-MM-dd'
                        var formattedDate = currentDate.toISOString().split('T')[0];
                        items[j].created_date = formattedDate;
                        $http.post("http://localhost:8080/api/watch/add", JSON.stringify(items[j]))
                            .then(function (response) {
                                var watchData = response.data;
                                // alert("Đẩy data thành công!")
                                $scope.anhwatch.image_link = $scope.selectedWatch.images[0].image_link;
                                $scope.anhwatch.watchdetail = watchData;
                                $http.post("http://localhost:8080/api/image/add", $scope.anhwatch)
                                    .then(function (response) {
                                        var anhData = response.data;
                                        // alert("Lưu ảnh thành công!")
                                        $route.reload();
                                        console.log("Link ảnh:" + anhData.id);
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
                    } else {
    
                        // alert("Tồn tại:"+ items[j].code +"-"+items[j].id)
                        var currentItem = items[j];//Phai khai bao de tranh bat dong bo http
                        // alert("Code: "+currentItem.code);
                        $scope.anhwatchUpdate = {};
                        $http.get("http://localhost:8080/api/watch/" + currentItem.id + "/images").then(function (imageResponse) {
                            var idImage = imageResponse.data;
                            // if (!idImage || idImage.length === 0) {
                            //     idImage[0] = {};
                            //     alert("Sản phẩm id: " + currentItem.code + "Làm gì có ảnh: " + idImage[0]);
                            // }
                            // alert(idImage[0].id);
                            // alert("Code: " + currentItem.id);
    
                            $scope.anhwatchUpdate.watchdetail = idImage[0].watchdetail;
                            $scope.anhwatchUpdate.id = idImage[0].id;
                            $scope.anhwatchUpdate.image_link = $scope.selectedWatch.images[0].image_link;
                            $http.post("http://localhost:8080/api/image/add", $scope.anhwatchUpdate)
                                .then(function (response) {
                                    var anhData = response.data;
                                    // alert("anhData:" + anhData.watchdetail.id)
    
                                })
                                .catch(function (error) {
                                    // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
                                    console.error("Lỗi khi lưu dữ liệu: ", error);
                                });
                        });
    
                        $http.post("http://localhost:8080/api/watch/" + currentItem.id + "/update", currentItem)
                            .then(function (response) {
                                var watchData = response.data;
                                // alert("Đẩy data thành công!")
                            })
                            .catch(function (error) {
                                // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
                                console.error("Lỗi khi lưu dữ liệu: ", error);
                            });
                    }
    
                }
    
    
                alert("Cập nhập sản phẩm thành công!");
                $route.reload();
            }
        }
        // console.log("Sản phẩm " + j + ": " + items[j].image);
    }

    $scope.searchOrders = function (searchMaHD) {
        if (!searchMaHD || searchMaHD.trim() === '') {
            $scope.loadPage();
            return;
        }

        var regex = new RegExp(searchMaHD.trim().split('').join('.*?'), 'i');

        $scope.watchs = $scope.watchsOrdinal.filter(function (order) {
            return regex.test(order.product.name);
        });

        if ($scope.voucher3s.length === 0) {
            // Nếu không tìm thấy sản phẩm, có thể hiển thị thông báo hoặc thực hiện các thao tác khác
            $scope.loadPage();
            // alert("Co cai nit")
        }
    }

    $scope.themMoiThuongHieu = function () {
        if (!$scope.nameThuongHieu) {
            return;
        }
        $scope.errorThuongHieu = false;
        if ($scope.thuongHieu.some(item => item.name === $scope.nameThuongHieu)) {
            // Nếu nameThuongHieu đã tồn tại trong mảng, đặt biến errorThuongHieu thành true và thoát khỏi hàm.
            $scope.errorThuongHieu = true;
            return;
        }
        $http.post("http://localhost:8080/api/brand/add", $scope.nameThuongHieu)
            .then(function (response) {
                $http.get("http://localhost:8080/api/brand")
                    .then(function (brandRespon) {
                        $scope.thuongHieu = brandRespon.data;
                    })
                    .catch(function (error) {
                        // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
                        console.error("Lỗi khi lưu dữ liệu: ", error);
                    });
                $scope.closePopup('thuonghieu');
            })
            .catch(function (error) {
                // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
                console.error("Lỗi khi lưu dữ liệu: ", error);
            });
    }

    $scope.themMoiSizemat = function () {
        if (!$scope.nameSize) {
            return;
        }
        $scope.errorSize = false;
        if ($scope.sizeMat.some(item => item.name === $scope.nameSize)) {
            // Nếu nameThuongHieu đã tồn tại trong mảng, đặt biến errorThuongHieu thành true và thoát khỏi hàm.
            $scope.errorSize = true;
            return;
        }
        $http.post("http://localhost:8080/api/size/addExcel", $scope.nameSize)
            .then(function (response) {
                $http.get("http://localhost:8080/api/size")
                    .then(function (brandRespon) {
                        $scope.sizeMat = brandRespon.data;
                    })
                    .catch(function (error) {
                        // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
                        console.error("Lỗi khi lưu dữ liệu: ", error);
                    });
                $scope.closePopup('sizemat');
            })
            .catch(function (error) {
                // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
                console.error("Lỗi khi lưu dữ liệu: ", error);
            });
    }

    $scope.themMoiGioiTinh = function () {
        if (!$scope.nameGioiTinh) {
            return;
        }
        $scope.errorGender = false;
        if ($scope.gender.some(item => item.name === $scope.nameGioiTinh)) {
            // Nếu nameThuongHieu đã tồn tại trong mảng, đặt biến errorThuongHieu thành true và thoát khỏi hàm.
            $scope.errorGender = true;
            return;
        }
        $http.post("http://localhost:8080/api/gender/addExcel", $scope.nameGioiTinh)
            .then(function (response) {
                $http.get("http://localhost:8080/api/gender")
                    .then(function (brandRespon) {
                        $scope.gender = brandRespon.data;
                    })
                    .catch(function (error) {
                        // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
                        console.error("Lỗi khi lưu dữ liệu: ", error);
                    });
                $scope.closePopup('gioitinh');
            })
            .catch(function (error) {
                // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
                console.error("Lỗi khi lưu dữ liệu: ", error);
            });
    }

    $scope.themMoiDongMay = function () {
        if (!$scope.nameDongMay) {
            return;
        }
        $scope.errorDongmay = false;
        if ($scope.machineType.some(item => item.name === $scope.nameDongMay)) {
            // Nếu nameThuongHieu đã tồn tại trong mảng, đặt biến errorThuongHieu thành true và thoát khỏi hàm.
            $scope.errorDongmay = true;
            return;
        }
        $http.post("http://localhost:8080/api/dongmay/addExcel", $scope.nameDongMay)
            .then(function (response) {
                $http.get("http://localhost:8080/api/dongmay")
                    .then(function (brandRespon) {
                        $scope.machineType = brandRespon.data;
                    })
                    .catch(function (error) {
                        // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
                        console.error("Lỗi khi lưu dữ liệu: ", error);
                    });
                $scope.closePopup('dongmay');
            })
            .catch(function (error) {
                // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
                console.error("Lỗi khi lưu dữ liệu: ", error);
            });
    }

    $scope.themMoiChatlieuday = function () {
        if (!$scope.nameChatLieuDay) {
            return;
        }
        $scope.errorChatlieuday = false;
        if ($scope.strap.some(item => item.name === $scope.nameChatLieuDay)) {
            // Nếu nameThuongHieu đã tồn tại trong mảng, đặt biến errorThuongHieu thành true và thoát khỏi hàm.
            $scope.errorChatlieuday = true;
            return;
        }
        $http.post("http://localhost:8080/api/strap/addExcel", $scope.nameChatLieuDay)
            .then(function (response) {
                $http.get("http://localhost:8080/api/strap")
                    .then(function (brandRespon) {
                        $scope.strap = brandRespon.data;
                    })
                    .catch(function (error) {
                        // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
                        console.error("Lỗi khi lưu dữ liệu: ", error);
                    });
                $scope.closePopup('chatlieuday');
            })
            .catch(function (error) {
                // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
                console.error("Lỗi khi lưu dữ liệu: ", error);
            });
    }

    $scope.themMoiChatlieukinh = function () {
        if (!$scope.nameChatLieuKinh) {
            return;
        }
        $scope.errorChatlieukinh = false;
        if ($scope.glassMaterial.some(item => item.name === $scope.nameChatLieuKinh)) {
            // Nếu nameThuongHieu đã tồn tại trong mảng, đặt biến errorThuongHieu thành true và thoát khỏi hàm.
            $scope.errorChatlieukinh = true;
            return;
        }
        $http.post("http://localhost:8080/api/chatlieukinh/addExcel", $scope.nameChatLieuKinh)
            .then(function (response) {
                $http.get("http://localhost:8080/api/chatlieukinh")
                    .then(function (brandRespon) {
                        $scope.glassMaterial = brandRespon.data;
                    })
                    .catch(function (error) {
                        // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
                        console.error("Lỗi khi lưu dữ liệu: ", error);
                    });
                $scope.closePopup('chatlieukinh');
            })
            .catch(function (error) {
                // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
                console.error("Lỗi khi lưu dữ liệu: ", error);
            });
    }

    $scope.themMoiTinhnang = function () {
        if (!$scope.nameTinhNang) {
            return;
        }
        $scope.errorTinhnang = false;
        if ($scope.feature.some(item => item.name === $scope.nameTinhNang)) {
            // Nếu nameThuongHieu đã tồn tại trong mảng, đặt biến errorThuongHieu thành true và thoát khỏi hàm.
            $scope.errorTinhnang = true;
            return;
        }
        $http.post("http://localhost:8080/api/feature/addExcel", $scope.nameTinhNang)
            .then(function (response) {
                $http.get("http://localhost:8080/api/feature")
                    .then(function (brandRespon) {
                        $scope.feature = brandRespon.data;
                    })
                    .catch(function (error) {
                        // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
                        console.error("Lỗi khi lưu dữ liệu: ", error);
                    });
                $scope.closePopup('h');
            })
            .catch(function (error) {
                // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
                console.error("Lỗi khi lưu dữ liệu: ", error);
            });
    }

    $scope.themMoiXuatxu = function () {
        if (!$scope.nameXuatXu) {
            return;
        }
        $scope.errorXuatxu = false;
        if ($scope.origin.some(item => item.name === $scope.nameXuatXu)) {
            // Nếu nameThuongHieu đã tồn tại trong mảng, đặt biến errorThuongHieu thành true và thoát khỏi hàm.
            $scope.errorXuatxu = true;
            return;
        }
        $http.post("http://localhost:8080/api/origin/addExcel", $scope.nameXuatXu)
            .then(function (response) {
                $http.get("http://localhost:8080/api/origin")
                    .then(function (brandRespon) {
                        $scope.origin = brandRespon.data;
                    })
                    .catch(function (error) {
                        // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
                        console.error("Lỗi khi lưu dữ liệu: ", error);
                    });
                $scope.closePopup('xuatxu');
            })
            .catch(function (error) {
                // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
                console.error("Lỗi khi lưu dữ liệu: ", error);
            });
    }

    $scope.themMoiHinhdang = function () {
        if (!$scope.nameHinhDang) {
            return;
        }
        $scope.errorHinhdang = false;
        if ($scope.shape.some(item => item.name === $scope.nameHinhDang)) {
            // Nếu nameThuongHieu đã tồn tại trong mảng, đặt biến errorThuongHieu thành true và thoát khỏi hàm.
            $scope.errorHinhdang = true;
            return;
        }
        $http.post("http://localhost:8080/api/shape/addExcel", $scope.nameHinhDang)
            .then(function (response) {
                $http.get("http://localhost:8080/api/shape")
                    .then(function (brandRespon) {
                        $scope.shape = brandRespon.data;
                    })
                    .catch(function (error) {
                        // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
                        console.error("Lỗi khi lưu dữ liệu: ", error);
                    });
                $scope.closePopup('hinhdang');
            })
            .catch(function (error) {
                // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
                console.error("Lỗi khi lưu dữ liệu: ", error);
            });
    }

    $scope.themMoiMauvo = function () {
        if (!$scope.nameMauVo) {
            return;
        }
        $scope.errorMauvo = false;
        if ($scope.caseColor.some(item => item.name === $scope.nameMauVo)) {
            // Nếu nameThuongHieu đã tồn tại trong mảng, đặt biến errorThuongHieu thành true và thoát khỏi hàm.
            $scope.errorMauvo = true;
            return;
        }
        $http.post("http://localhost:8080/api/casecolor/addExcel", $scope.nameMauVo)
            .then(function (response) {
                $http.get("http://localhost:8080/api/casecolor")
                    .then(function (brandRespon) {
                        $scope.caseColor = brandRespon.data;
                    })
                    .catch(function (error) {
                        // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
                        console.error("Lỗi khi lưu dữ liệu: ", error);
                    });
                $scope.closePopup('mauvo');
            })
            .catch(function (error) {
                // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
                console.error("Lỗi khi lưu dữ liệu: ", error);
            });
    }

    $scope.themMoiChatlieuvo = function () {
        if (!$scope.nameChatLieuVo) {
            return;
        }
        $scope.errorChatlieuvo = false;
        if ($scope.caseMaterial.some(item => item.name === $scope.nameChatLieuVo)) {
            // Nếu nameThuongHieu đã tồn tại trong mảng, đặt biến errorThuongHieu thành true và thoát khỏi hàm.
            $scope.errorChatlieuvo = true;
            return;
        }
        $http.post("http://localhost:8080/api/casematerial/addExcel", $scope.nameChatLieuVo)
            .then(function (response) {
                $http.get("http://localhost:8080/api/casematerial")
                    .then(function (brandRespon) {
                        $scope.caseMaterial = brandRespon.data;
                    })
                    .catch(function (error) {
                        // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
                        console.error("Lỗi khi lưu dữ liệu: ", error);
                    });
                $scope.closePopup('chatlieuvo');
            })
            .catch(function (error) {
                // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
                console.error("Lỗi khi lưu dữ liệu: ", error);
            });
    }


    $scope.loadPage();

})