myapp.controller("order-ctrl", function ($scope, $http, $filter, $route) {
    // alert("Hello order");
    $scope.localStorageIdac = JSON.parse(localStorage.getItem('idac')) || [];
    $scope.selectedTab = 'all';

    // Hàm để chọn tab
    $scope.selectTab = function (tabName) {
        $scope.selectedTab = tabName;
        $scope.loadOrder();
    };

    // Hàm để kiểm tra xem một tab có được chọn không
    $scope.isSelected = function (tabName) {
        return $scope.selectedTab === tabName;
    };

    $scope.chuyenTabOrder = function (order) {
        $scope.orders = [order];
        switch (order.status) {
            case 0:
                $scope.selectedTab = 'choXacNhan';
                break;
            case 1:
                $scope.selectedTab = 'cholayhang'
                break;
            case 2:
                $scope.selectedTab = 'danggiao'
                break;
            case 3:
                $scope.selectedTab = 'huy'
                break;
            case 4:
                $scope.selectedTab = 'giaothanhcong'
                break;
            case 5:
                $scope.selectedTab = 'khonggiaothanhcong'
                break;
            case 6:
                $scope.selectedTab = 'thanhCong'
                break;
            case 7:
                $scope.selectedTab = 'taiquay'
                break;
            // Thêm các trạng thái khác nếu cần
            default:
                // Một trạng thái mặc định nếu không khớp với bất kỳ giá trị nào trên
                $scope.selectedTab = 'all'
                break;
        }
    }



    // search caties

    $scope.searchOrders = function (searchTerm) {
        if (!searchTerm || searchTerm.trim() === '') {
            // Nếu searchTerm rỗng, hiển thị lại toàn bộ danh sách gốc
            $scope.orders = angular.copy($scope.originalOrders);
            return;
        }

        var regex = new RegExp(searchTerm.trim().split('').join('.*?'), 'i');

        $scope.orders = $scope.originalOrders.filter(function (order) {
            return regex.test(order.code);
        });

        if ($scope.orders.length === 0) {
            // Nếu không tìm thấy sản phẩm, có thể hiển thị thông báo hoặc thực hiện các thao tác khác
            $scope.loadOrder();
            // alert("Co cai nit")
        }
    };
    // checkbox
    // const selectAllCheckbox = document.getElementById('selectAllCheckbox');
    // const allCheckboxes = document.querySelectorAll('tbody input[type="checkbox"]');

    // // Thêm sự kiện click cho th
    // selectAllCheckbox.addEventListener('click', function () {
    //     const isChecked = this.checked;

    //     // Duyệt qua tất cả các checkbox trong tbody và thiết lập trạng thái
    //     allCheckboxes.forEach(function (checkbox) {
    //         checkbox.checked = isChecked;
    //     });
    // });

    $scope.showScanner = false;  // Initially hide the scanner

    $scope.startQRCodeScanner = function () {
        $scope.showScanner = true;  // Hiển thị máy quét khi nút được nhấp

        $scope.scanner = new Instascan.Scanner({ video: document.getElementById('qr-video') });

        $scope.scanner.addListener('scan', function (content) {
            $scope.$apply(function () {
                console.log('Nội dung QR code:', content);

                let scannedProduct = JSON.parse(content);
                var mainOrder = $scope.orders.find(function (order) {
                    return order.id === scannedProduct.id;
                });
                // alert(mainOrder);
                $scope.orders = [mainOrder];

                $scope.scanner.stop();
                $scope.showScanner = false;  // Ẩn máy quét sau khi quét thành công
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

    $scope.showScannerSP = false;  // Initially hide the scanner

    $scope.startQRCodeScannerSP = function (order) {
        $scope.showScannerSP = true;  // Hiển thị máy quét khi nút được nhấp

        $scope.scannerSP = new Instascan.Scanner({ video: document.getElementById('qr-videosp') });

        $scope.scannerSP.addListener('scan', function (content) {
            $scope.$apply(function () {
                console.log('Nội dung QR code:', content);

                let scannedProduct = content;
                var mainWatch = $scope.watchs.find(function (watch) {
                    return watch.id === scannedProduct;
                });
                // alert(mainWatch);
                $scope.addToCart(order, mainWatch);

                $scope.scanner.stop();
                $scope.showScanner = false;
            });
        });

        Instascan.Camera.getCameras().then(function (cameras) {
            if (cameras.length > 0) {
                $scope.scannerSP.start(cameras[0]);
            } else {
                console.error('Không tìm thấy camera.');
            }
        }).catch(function (e) {
            console.error('Lỗi khi lấy danh sách camera:', e);
        });
    };

    $scope.closeQRCodeScannerSP = function () {
        if ($scope.scannerSP) {
            $scope.scannerSP.stop();
        }

        $scope.showScannerSP = false;
    };


    // // edit table
    // // Lấy danh sách tất cả các biểu tượng 3 chấm
    // const editIcons = document.querySelectorAll('.bx-dots-horizontal-rounded');

    // // Lặp qua từng biểu tượng 3 chấm
    // editIcons.forEach((icon, index) => {
    //     // Gán sự kiện click cho từng biểu tượng
    //     icon.addEventListener('click', () => {
    //         // Lấy phần tử edit-tr tương ứng dựa vào index
    //         const editTr = document.querySelectorAll('.edit-tr')[index];

    //         // Kiểm tra trạng thái hiển thị của phần tử edit-tr
    //         if (editTr.style.display === 'none' || editTr.style.display === '') {
    //             // Nếu ẩn hoặc chưa có style display thì hiển thị
    //             editTr.style.display = 'table-row';
    //         } else {
    //             // Nếu đang hiển thị thì ẩn đi
    //             editTr.style.display = 'none';
    //         }
    //     });
    // });

    $scope.orders = [];
    $scope.originalOrders = [];
    $scope.loadOrder = function () {
        $http.get("http://localhost:8080/api/order")
            .then(function (response) {
                // Gán dữ liệu trả về từ API vào biến $scope.orders
                $scope.orders = response.data;
                $scope.originalOrders = angular.copy($scope.orders);
                // Lặp qua từng order để lấy thông tin order detail
                angular.forEach($scope.orders, function (order) {
                    // Gọi API để lấy danh sách order detail cho từng order
                    $http.get("http://localhost:8080/api/orderdetail/" + order.id + "/orderdetailfororder")
                        .then(function (orderDetailResponse) {
                            order.orderDetails = orderDetailResponse.data;

                            // Lặp qua từng order detail để lấy danh sách images cho từng watchdetail
                            angular.forEach(order.orderDetails, function (cartItem) {
                                cartItem.watchdetail.images = [];
                                $http.get("http://localhost:8080/api/watch/" + cartItem.watchdetail.id + "/images")
                                    .then(function (imageResponse) {
                                        cartItem.watchdetail.images = imageResponse.data;
                                    });
                                var maxGiamGia = -1;  // Giả sử giamgia không bao giờ là số âm
                                var selectedGiamGia = null;

                                angular.forEach($scope.km3s, function (itemProduct) {
                                    if (itemProduct.watchdetail.id === cartItem.watchdetail.id && itemProduct.chietkhausanpham.status === 2) {
                                        if (itemProduct.giamgia > maxGiamGia) {
                                            // Nếu giamgia lớn hơn maxGiamGia, cập nhật maxGiamGia và selectedGiamGia
                                            maxGiamGia = itemProduct.giamgia;
                                            selectedGiamGia = itemProduct.giamgia;
                                        }
                                    }
                                });

                                // Kiểm tra xem có giamgia nào được chọn không
                                if (selectedGiamGia !== null) {
                                    cartItem.watchdetail.giamoi = cartItem.watchdetail.price - ((selectedGiamGia * cartItem.watchdetail.price) / 100);
                                    cartItem.watchdetail.giamgia = selectedGiamGia;
                                    // Các thao tác khác nếu cần
                                }
                            });
                        }, function (error) {
                            console.error('Lỗi trong quá trình gọi API orderdetail:', error);
                        });
                });
                angular.forEach($scope.originalOrders, function (order) {
                    // Gọi API để lấy danh sách order detail cho từng order
                    $http.get("http://localhost:8080/api/orderdetail/" + order.id + "/orderdetailfororder")
                        .then(function (orderDetailResponse) {
                            order.orderDetails = orderDetailResponse.data;

                            // Lặp qua từng order detail để lấy danh sách images cho từng watchdetail
                            angular.forEach(order.orderDetails, function (cartItem) {
                                cartItem.watchdetail.images = [];
                                $http.get("http://localhost:8080/api/watch/" + cartItem.watchdetail.id + "/images")
                                    .then(function (imageResponse) {
                                        cartItem.watchdetail.images = imageResponse.data;
                                    });
                            });
                        }, function (error) {
                            console.error('Lỗi trong quá trình gọi API orderdetail:', error);
                        });
                });
            }, function (error) {
                console.error('Lỗi trong quá trình gọi API order:', error);
            });
    }

    $scope.getCombinedAddress = function (address) {
        return address.address_detail + '-' + address.town_code + '-' + address.district_code + '-' + address.province_code;
    };

    $scope.toggleDetails = function (order) {
        // Toggle trạng thái hiển thị của chi tiết đơn hàng
        order.showDetails = !order.showDetails;
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

    $scope.watchs = [];
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
                angular.forEach($scope.filteredWatchs, function (cartItem) {
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

    $scope.qrcodeData = '';

    // Function to generate QR code for the invoice
    // $scope.generateQRCode = function (order) {
    //     if (order) {
    //         // Lọc bỏ các thuộc tính không mong muốn
    //         var cleanOrder = {
    //             id: order.id
    //         };

    //         var qrcode = new QRCode(document.getElementById("qrcode"), {
    //             width: 100,
    //             height: 100
    //         });

    //         var qrData = JSON.stringify(cleanOrder);

    //         if (qrData) {
    //             qrcode.makeCode(qrData);

    //             // Tạo một canvas từ hình ảnh mã QR
    //             var canvas = document.createElement('canvas');
    //             var ctx = canvas.getContext('2d');
    //             var qrImage = document.getElementById("qrcode").querySelector("img");

    //             canvas.width = qrImage.width;
    //             canvas.height = qrImage.height;
    //             ctx.drawImage(qrImage, 0, 0, qrImage.width, qrImage.height);

    //             // Sử dụng thư viện FileSaver để tải về
    //             if (window.navigator.msSaveOrOpenBlob) {
    //                 // Cho Internet Explorer
    //                 window.navigator.msSaveBlob(canvas.msToBlob(), "qrcode.png");
    //             } else {
    //                 // Cho các trình duyệt khác
    //                 canvas.toBlob(function (blob) {
    //                     var link = document.createElement("a");
    //                     link.href = URL.createObjectURL(blob);
    //                     link.download = "qrcode.png";
    //                     document.body.appendChild(link);
    //                     link.click();
    //                     document.body.removeChild(link);
    //                 }, "image/png", 1); // Chất lượng đặt là 1 (tối đa)
    //             }
    //         } else {
    //             console.error("Dữ liệu QR code không hợp lệ.");
    //         }
    //     } else {
    //         console.error("Dữ liệu đơn hàng không tồn tại.");
    //     }
    // };
    $scope.generateQRCode = function (order) {
        if (order) {
            // Lọc bỏ các thuộc tính không mong muốn
            var cleanOrder = {
                id: order.id
            };

            var qrcode = new QRious({
                element: document.getElementById("qrcode"),
                value: JSON.stringify(cleanOrder),
                size: 300, // Kích thước của QR code
                padding: 20, // Padding trắng xung quanh QR code
                foreground: 'black', // Màu chữ
                background: 'white' // Màu nền
            });

            // Sử dụng thư viện FileSaver để tải về
            if (window.navigator.msSaveOrOpenBlob) {
                // Cho Internet Explorer
                window.navigator.msSaveBlob(new Blob([qrcode.toDataURL().split(',')[1]], { type: 'image/png' }), 'qrcode.png');
            } else {
                // Cho các trình duyệt khác
                var link = document.createElement("a");
                link.href = qrcode.toDataURL();
                link.download = "qrcode.png";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        } else {
            console.error("Dữ liệu đơn hàng không tồn tại.");
        }
    };
    $scope.generatePDF = function (order) {
        if (order) {
            // Tạo tài liệu PDF
            var docDefinition = {
                content: [
                    { text: 'BeeWatch', style: 'header', alignment: 'center' },
                    { text: 'Số điện thoại: 0563797816', alignment: 'center' },
                    { text: 'Địa chỉ: Phúc lộc - Uy Nỗ - Đông Anh - Hà Nội', alignment: 'center' },
                    { text: 'Ngân hàng: MBBank - Số tài khoản: 0563797816', alignment: 'center' },
                    { text: 'Chủ tài khoản: Nguyễn Minh Đức', alignment: 'center' },

                    { text: 'Hóa đơn bán hàng', style: 'subheader', alignment: 'center' },
                    { text: 'Mã hóa đơn: ' + order.code, alignment: 'center' },

                    { text: 'Tên khách hàng: ' + order.name_user, margin: [40, 10, 0, 0] },
                    { text: 'Địa chỉ: ' + order.address_user, margin: [40, 0] },
                    { text: 'Số điện thoại: ' + order.sdt_user, margin: [40, 0] },
                    { text: 'Ngày mua: ' + order.create_date, margin: [40, 0] },
                    { text: 'Nhân viên bán hàng: ' + order.created_by, margin: [40, 0] },

                    {
                        table: {
                            headerRows: 1,
                            widths: [20, '*', 50, 50, 50, 50],
                            body: [
                                ['#', 'Sản phẩm', 'Số lượng', 'Đơn giá', 'Giảm giá', 'Thành tiền'],
                                ...order.orderDetails.map((detail, index) => {
                                    if (detail.giamgia) {
                                        return [
                                            index + 1,
                                            detail.watchdetail.product.name || '',     // Kiểm tra và sử dụng giá trị mặc định nếu productName không tồn tại
                                            detail.quantity || '',        // Kiểm tra và sử dụng giá trị mặc định nếu quantity không tồn tại
                                            detail.watchdetail.price || '',
                                            detail.watchdetail.price * ((100 - detail.giamgia) / 100) || '',       // Kiểm tra và sử dụng giá trị mặc định nếu unitPrice không tồn tại
                                            detail.total_price || ''       // Kiểm tra và sử dụng giá trị mặc định nếu totalPrice không tồn tại
                                        ];
                                    } else {
                                        return [
                                            index + 1,
                                            detail.watchdetail.product.name || '',     // Kiểm tra và sử dụng giá trị mặc định nếu productName không tồn tại
                                            detail.quantity || '',        // Kiểm tra và sử dụng giá trị mặc định nếu quantity không tồn tại
                                            detail.watchdetail.price || '',       // Kiểm tra và sử dụng giá trị mặc định nếu unitPrice không tồn tại
                                            '',       // Kiểm tra và sử dụng giá trị mặc định nếu unitPrice không tồn tại
                                            detail.total_price || ''       // Kiểm tra và sử dụng giá trị mặc định nếu totalPrice không tồn tại
                                        ];
                                    }

                                })
                            ]
                        },
                        layout: 'lightHorizontalLines',
                        margin: [0, 20, 0, 0]
                    },

                    { text: 'Phí ship: 0', alignment: 'right', margin: [40, 35, 0, 0] },
                    { text: 'Tổng tiền thanh toán: ' + order.total_money + ' VND', alignment: 'right' },
                    {
                        text: 'Trạng thái đơn hàng: ' + (order.status === 7 ? 'Thành công' : order.status),
                        alignment: 'right',
                        margin: [0, 10]
                    },
                    // Thêm hình ảnh QR vào chỗ này
                    // { text: 'Cảm ơn quý khách!', alignment: 'center', margin: [0, 70, 0, 0] },
                ],
                styles: {
                    header: {
                        fontSize: 18,
                        bold: true
                    },
                    subheader: {
                        fontSize: 14,
                        bold: true,
                        margin: [0, 10, 0, 5]
                    }
                }
            };

            // Generate QR code data
            var cleanOrder = {
                id: order.id
            };
            var qrCodeData = JSON.stringify(cleanOrder);

            // Generate QR code image using the QR Code Generator service
            var qrCodeImageUrl = 'https://api.qrserver.com/v1/create-qr-code/?data=' + encodeURIComponent(qrCodeData);

            // Fetch the image as a data URL
            $http.get(qrCodeImageUrl, { responseType: 'arraybuffer' })
                .then(function (response) {
                    var base64Data = btoa(new Uint8Array(response.data).reduce(function (data, byte) {
                        return data + String.fromCharCode(byte);
                    }, ''));

                    // Continue with the rest of your PDF document creation logic

                    // Add the QR code image to the PDF document
                    docDefinition.content.push({
                        image: 'data:image/png;base64,' + base64Data,
                        width: 70,
                        alignment: 'center',
                        margin: [0, 60, 0, 0]
                    });

                    // Add the "Cảm ơn quý khách!" text below the QR code image
                    docDefinition.content.push({
                        text: '(Cảm ơn quý khách!)',
                        alignment: 'center',
                        margin: [0, 10],
                        italics: true
                    });

                    // Tạo và tải về tài liệu PDF
                    pdfMake.createPdf(docDefinition).download('hoadon.pdf');
                })
                .catch(function (error) {
                    console.error("Error fetching QR code image:", error);
                });
            // pdfMake.createPdf(docDefinition).download('hoadon.pdf');
        } else {
            console.error("Dữ liệu đơn hàng không tồn tại.");
        }
    };


    $scope.generatePDFHDON = function (order) {
        // $scope.qrCodeContent = order.id;
        if (order) {
            // var qrCodeDefinition = {
            //     qr: $scope.qrCodeContent,
            //     fit: 50,  // Điều chỉnh kích thước của QR code ở đây
            //     hAlign: 'center',
            //     vAlign: 'middle',
            //     renderer: 'canvas' // Sử dụng renderer canvas để chất lượng tốt hơn
            // };

            // Đoạn mã tạo QR code
            // var qrCode = pdfMake.createPdf(qrCodeDefinition);
            var docDefinition = {
                content: [
                    { text: 'BeeWatch', style: 'header', alignment: 'center' },
                    { text: 'Số điện thoại: 0563797816', alignment: 'center' },
                    { text: 'Địa chỉ: Phúc lộc - Uy Nỗ - Đông Anh - Hà Nội', alignment: 'center' },
                    { text: 'Ngân hàng: MBBank - Số tài khoản: 0563797816', alignment: 'center' },
                    { text: 'Chủ tài khoản: Nguyễn Minh Đức', alignment: 'center' },

                    { text: 'Hóa đơn bán hàng', style: 'subheader', alignment: 'center' },
                    { text: 'Mã hóa đơn: ' + order.code, alignment: 'center' },

                    { text: 'Tên khách hàng: ' + order.account.username, margin: [40, 10, 0, 0] },
                    {
                        text: 'Địa chỉ: ' + order.address.address_detail + '-'
                            + order.address.town_code + '-' + order.address.district_code + '-' +
                            order.address.province_code, margin: [40, 0]
                    },
                    { text: 'Số điện thoại: ' + order.account.phone, margin: [40, 0] },
                    { text: 'Ngày mua: ' + order.create_date, margin: [40, 0] },

                    {
                        table: {
                            headerRows: 1,
                            widths: [20, '*', 50, 50, 50, 50],
                            body: [
                                ['#', 'Sản phẩm', 'Số lượng', 'Đơn giá', 'Giảm giá', 'Thành tiền'],
                                ...order.orderDetails.map((detail, index) => {
                                    if (detail.giamgia) {
                                        return [
                                            index + 1,
                                            detail.watchdetail.product.name || '',     // Kiểm tra và sử dụng giá trị mặc định nếu productName không tồn tại
                                            detail.quantity || '',        // Kiểm tra và sử dụng giá trị mặc định nếu quantity không tồn tại
                                            detail.watchdetail.price || '',
                                            detail.watchdetail.price * ((100 - detail.giamgia) / 100) || '',       // Kiểm tra và sử dụng giá trị mặc định nếu unitPrice không tồn tại
                                            detail.total_price || ''       // Kiểm tra và sử dụng giá trị mặc định nếu totalPrice không tồn tại
                                        ];
                                    } else {
                                        return [
                                            index + 1,
                                            detail.watchdetail.product.name || '',     // Kiểm tra và sử dụng giá trị mặc định nếu productName không tồn tại
                                            detail.quantity || '',        // Kiểm tra và sử dụng giá trị mặc định nếu quantity không tồn tại
                                            detail.watchdetail.price || '',       // Kiểm tra và sử dụng giá trị mặc định nếu unitPrice không tồn tại
                                            '',       // Kiểm tra và sử dụng giá trị mặc định nếu unitPrice không tồn tại
                                            detail.total_price || ''       // Kiểm tra và sử dụng giá trị mặc định nếu totalPrice không tồn tại
                                        ];
                                    }

                                })
                            ]
                        },
                        layout: 'lightHorizontalLines',
                        margin: [0, 20, 0, 0]
                    },

                    { text: 'Tổng tiền: ' + (order.total_money - order.shipping_price) + ' VND', alignment: 'right', margin: [40, 35, 0, 0] },
                    { text: 'Phí ship: ' + order.shipping_price + ' VND', alignment: 'right', margin: [0, 10] },
                    { text: 'Tổng tiền thanh toán: ' + order.total_money + ' VND', alignment: 'right' },
                    {
                        text: 'Trạng thái đơn hàng: ' + (
                            order.status === 2 ? 'Đang giao hàng' :
                                order.status === 3 ? 'Bị hủy' :
                                    order.status === 4 ? 'Giao hàng thành công' :
                                        order.status === 5 ? 'Giao hàng không thành công' :
                                            order.status === 6 ? 'Đơn hàng thành công' :
                                                'Không xác định'
                        ),
                        alignment: 'right',
                        margin: [0, 10]
                    },
                    // Dòng này để qrcode hóa đơn
                    // { image: qrCode, alignment: 'center', margin: [0, 20] },
                    // { text: 'Cảm ơn quý khách!', alignment: 'center', margin: [0, 70, 0, 0] },
                ],
                styles: {
                    header: {
                        fontSize: 18,
                        bold: true
                    },
                    subheader: {
                        fontSize: 14,
                        bold: true,
                        margin: [0, 10, 0, 5]
                    }
                }
            };
            // Generate QR code data
            var cleanOrder = {
                id: order.id
            };
            var qrCodeData = JSON.stringify(cleanOrder);

            // Generate QR code image using the QR Code Generator service
            var qrCodeImageUrl = 'https://api.qrserver.com/v1/create-qr-code/?data=' + encodeURIComponent(qrCodeData);

            // Fetch the image as a data URL
            $http.get(qrCodeImageUrl, { responseType: 'arraybuffer' })
                .then(function (response) {
                    var base64Data = btoa(new Uint8Array(response.data).reduce(function (data, byte) {
                        return data + String.fromCharCode(byte);
                    }, ''));

                    // Continue with the rest of your PDF document creation logic

                    // Add the QR code image to the PDF document
                    docDefinition.content.push({
                        image: 'data:image/png;base64,' + base64Data,
                        width: 70,
                        alignment: 'center',
                        margin: [0, 60, 0, 0]
                    });

                    // Add the "Cảm ơn quý khách!" text below the QR code image
                    docDefinition.content.push({
                        text: '(Cảm ơn quý khách!)',
                        alignment: 'center',
                        margin: [0, 10],
                        italics: true
                    });

                    // Tạo và tải về tài liệu PDF
                    pdfMake.createPdf(docDefinition).download('hoadon.pdf');
                })
                .catch(function (error) {
                    console.error("Error fetching QR code image:", error);
                });

            // pdfMake.createPdf(docDefinition).download('hoadon.pdf');
        } else {
            console.error("Dữ liệu đơn hàng không tồn tại.");
        }
    };

    $scope.selectAllCheckedCXN = false;

    $scope.toggleSelectAllCXN = function () {
        angular.forEach($scope.orders, function (order) {
            order.isSelectedCXN = $scope.selectAllCheckedCXN;
        });
    };

    $scope.updateSelectAllCXN = function () {
        $scope.selectAllCheckedCXN = $scope.orders.every(function (order) {
            return order.isSelectedCXN;
        });
    };
    $scope.getSelectedOrders = function () {
        return $scope.orders.filter(function (order) {
            return order.isSelectedCXN && order.status === 0;
        });
    };

    $scope.confirmSelectedOrdersCXN = function () {
        var selectedOrders = $scope.getSelectedOrders();

        if (selectedOrders.length > 0) {
            selectedOrders.forEach(function (order) {
                $http.post("http://localhost:8080/api/order/" + order.id + "/updateStatus")
                    .then(function (response) {
                        var orderNext = response.data;
                        var currentDate = new Date();
                        // Định dạng ngày thành chuỗi 'yyyy-MM-dd'
                        var formattedDate = currentDate.toISOString().split('T')[0];
                        orderNext.updated_by = $scope.localStorageIdac.username;
                        orderNext.update_date = formattedDate;
                        $http.post("http://localhost:8080/api/order/add", orderNext)
                            .then(function (responseOrder) {
                                var thongbaoFake = {
                                    create_date: formattedDate,
                                    status: 0,
                                    order: responseOrder.data
                                }
                                $http.post("http://localhost:8080/api/thongbaoadmin/add", thongbaoFake)
                                    .then(function (responseThongBao) {
                                        console.log("Tạo thông báo thành công!")
                                        $http.post("http://localhost:8080/api/checkemail/send-notificationAdmin", responseThongBao.data)
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
                                // Xử lý phản hồi từ server nếu cần
                                $scope.loadOrder();
                            })
                            .catch(function (error) {
                                // Xử lý lỗi nếu có
                                console.error('Lỗi khi cập nhật trạng thái cho hóa đơn có ID:', order.id, error);
                            });
                        // $scope.loadOrder();
                    })
                    .catch(function (error) {
                        // Xử lý lỗi nếu có
                        console.error('Lỗi khi cập nhật trạng thái cho hóa đơn có ID:', order.id, error);
                    });
            });
            alert("Xác nhận hóa đơn thành công!");
            // Thêm các bước xác nhận khác ở đây nếu cần
        } else {
            alert("Vui lòng chọn ít nhất một hóa đơn!");
        }
    };


    // Xác nhận giao hàng
    $scope.selectAllCheckedXNG = false;

    $scope.toggleSelectAllXNG = function () {
        angular.forEach($scope.orders, function (order) {
            order.isSelectedXNG = $scope.selectAllCheckedXNG;
        });
    };

    $scope.updateSelectAllXNG = function () {
        $scope.selectAllCheckedXNG = $scope.orders.every(function (order) {
            return order.isSelectedXNG;
        });
    };
    $scope.getSelectedOrdersXNG = function () {
        return $scope.orders.filter(function (order) {
            return order.isSelectedXNG && order.status === 1;
        });
    };



    $scope.confirmSelectedOrdersXNG = function () {
        var selectedOrders = $scope.getSelectedOrdersXNG();

        var allGiamGiaExist = selectedOrders.every(function (sp) {
            return sp.shipping_price !== undefined && sp.shipping_price !== null;
        });
        if (allGiamGiaExist) {
            if (selectedOrders.length > 0) {
                selectedOrders.forEach(function (order) {
                    $http.post("http://localhost:8080/api/order/" + order.id + "/updateStatusGiaohang")
                        .then(function (response) {
                            var orderNext = response.data;
                            var currentDate = new Date();
                            // Định dạng ngày thành chuỗi 'yyyy-MM-dd'
                            var formattedDate = currentDate.toISOString().split('T')[0];
                            orderNext.updated_by = $scope.localStorageIdac.username;
                            orderNext.update_date = formattedDate;
                            $http.post("http://localhost:8080/api/order/add", orderNext)
                                .then(function (responseOrder) {
                                    var thongbaoFake = {
                                        create_date: formattedDate,
                                        status: 1,
                                        order: responseOrder.data
                                    }
                                    $http.post("http://localhost:8080/api/thongbaoadmin/add", thongbaoFake)
                                        .then(function (responseThongBao) {
                                            console.log("Tạo thông báo thành công!")
                                            $http.post("http://localhost:8080/api/checkemail/send-notificationAdmin", responseThongBao.data)
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
                                    // Xử lý phản hồi từ server nếu cần
                                    $scope.loadOrder();
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
                });
                alert("Xác nhận hóa đơn giao hàng thành công!");
                // Thêm các bước xác nhận khác ở đây nếu cần
            } else {
                alert("Vui lòng chọn ít nhất một hóa đơn!");
            }
        } else {
            alert("Có đơn hàng chưa được cập nhập tiền ship!");
        }


    };

    $scope.selectAllCheckedGiao = false;

    $scope.toggleSelectAllGiao = function () {
        angular.forEach($scope.orders, function (order) {
            order.isSelectedGiao = $scope.selectAllCheckedGiao;
        });
    };

    $scope.updateSelectAllGiao = function () {
        $scope.selectAllCheckedGiao = $scope.orders.every(function (order) {
            return order.isSelectedGiao;
        });
    };
    $scope.getSelectedOrdersGiao = function () {
        return $scope.orders.filter(function (order) {
            return order.isSelectedGiao && order.status === 2;
        });
    };

    $scope.confirmSelectedOrdersGiaoThanhCong = function () {
        var selectedOrders = $scope.getSelectedOrdersGiao();

        if (selectedOrders.length > 0) {
            selectedOrders.forEach(function (order) {
                $http.post("http://localhost:8080/api/order/" + order.id + "/updateStatusGiaohangthanhcong")
                    .then(function (response) {
                        var orderNext = response.data;
                        var currentDate = new Date();
                        // Định dạng ngày thành chuỗi 'yyyy-MM-dd'
                        var formattedDate = currentDate.toISOString().split('T')[0];
                        orderNext.updated_by = $scope.localStorageIdac.username;
                        orderNext.update_date = formattedDate;
                        $http.post("http://localhost:8080/api/order/add", orderNext)
                            .then(function (response) {
                                $scope.loadOrder();
                                // var orderNextTwo = response.data;
                                // $http.post("http://localhost:8080/api/order/" + orderNextTwo.id + "/updateStatusHoadonthanhcong")
                                //     .then(function (response) {

                                //         $scope.loadOrder();
                                //     })
                                //     .catch(function (error) {
                                //         // Xử lý lỗi nếu có
                                //         console.error('Lỗi khi cập nhật trạng thái cho hóa đơn có ID:', order.id, error);
                                //     });
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
            });
            alert("Xác nhận hóa đơn đã được giao thành công!");
            // Thêm các bước xác nhận khác ở đây nếu cần
        } else {
            alert("Vui lòng chọn ít nhất một hóa đơn!");
        }
    };

    $scope.confirmSelectedOrdersGiaoKhongThanhCong = function () {
        var selectedOrders = $scope.getSelectedOrdersGiao();

        if (selectedOrders.length > 0) {
            selectedOrders.forEach(function (order) {
                $http.post("http://localhost:8080/api/order/" + order.id + "/updateStatusGiaohangkhongthanhcong")
                    .then(function (response) {
                        var orderNext = response.data;
                        var currentDate = new Date();
                        // Định dạng ngày thành chuỗi 'yyyy-MM-dd'
                        var formattedDate = currentDate.toISOString().split('T')[0];
                        orderNext.updated_by = $scope.localStorageIdac.username;
                        orderNext.update_date = formattedDate;
                        $http.post("http://localhost:8080/api/order/add", orderNext)
                            .then(function (responseOrder) {
                                var thongbaoFake = {
                                    create_date: formattedDate,
                                    status: 5,
                                    order: responseOrder.data
                                }
                                $http.post("http://localhost:8080/api/thongbaoadmin/add", thongbaoFake)
                                    .then(function (responseThongBao) {
                                        console.log("Tạo thông báo thành công!")
                                        $http.post("http://localhost:8080/api/checkemail/send-notificationAdmin", responseThongBao.data)
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
                                angular.forEach($scope.hoadonchitiets, function (ordItem) {
                                    if (ordItem.order.id === orderNext.id) {
                                        var sanphamFake = ordItem.watchdetail;
                                        sanphamFake.quantity_stock = ordItem.quantity + ordItem.watchdetail.quantity_stock;
                                        $http.post("http://localhost:8080/api/watch/addsanpham", sanphamFake)
                                            .then(function (response) {
                                                console.log("Cập nhập sản phẩm thành công!");
                                            })
                                            .catch(function (error) {
                                                console.error("Lỗi khi lưu dữ liệu: ", error);
                                            });
                                    }
                                });
                                $scope.loadOrder();
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
            });
            alert("Xác nhận hóa đơn không được được giao thành công!");
            // Thêm các bước xác nhận khác ở đây nếu cần
        } else {
            alert("Vui lòng chọn ít nhất một hóa đơn!");
        }
    };


    $scope.hoadonchitiets = [];
    $http.get("http://localhost:8080/api/orderdetail")
        .then(function (response) {
            // Gán dữ liệu trả về từ API vào biến $scope.watchs
            $scope.hoadonchitiets = response.data;

        }).catch(function (error) {
            // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
            console.error("Lỗi khi lưu dữ liệu: ", error);
        });


    $scope.updateSoLuong = function (order, ordd) {
        // Tính lại giá tổng khi số lượng thay đổi
        if (ordd.quantity <= 1) {
            ordd.quantity = 1;
        }
        var price = ordd.watchdetail.price;
        if(ordd.giamgia){
            price = ordd.watchdetail.price * ((100-ordd.giamgia)/100)
        }
        ordd.total_price = price * ordd.quantity;
        var soluongBanDau = 0;
        var TongSanLuongBanDau = 0;
        angular.forEach($scope.hoadonchitiets, function (ordItem) {
            if (ordItem.id === ordd.id) {
                soluongBanDau = ordItem.quantity;
                TongSanLuongBanDau = ordItem.quantity + ordItem.watchdetail.quantity_stock;
            }
        });
        if (ordd.quantity >= TongSanLuongBanDau) {
            ordd.quantity = TongSanLuongBanDau;
        }

        // alert("Tổng Số lượng ban đầu:"+TongSanLuongBanDau)
        angular.forEach($scope.watchs, function (spItem) {
            if (spItem.id === ordd.watchdetail.id) {
                spItem.quantity_stock = TongSanLuongBanDau - ordd.quantity;
            }
        });

        // Cập nhật lại tổng giá cho order
        $scope.updateOrderTotal(order);
    };

    $scope.updateOrderTotal = function (order) {
        // Tính lại tổng giá cho order dựa trên danh sách orderDetails
        var subtotal = order.orderDetails.reduce(function (total, item) {
            return total + item.total_price;
        }, 0);

        // Cộng thêm giá ship vào tổng giá
        order.total_money = subtotal + order.shipping_price;
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
        soLuongConstant = mainWatch.quantity_stock;
        mainWatch.quantity_stock = cartItem.quantity_stock + 1 - cartItem.quantity;
        if (cartItem.quantity > (cartItem.quantity_stock + 1)) {
            cartItem.quantity = cartItem.quantity_stock + 1;
            mainWatch.quantity_stock = 0;
            // alert("Vuot qua so luong roi an cai j lam the!")
        }
    };

    $scope.updateOrder = function (order) {
        var currentDate = new Date();
        // Định dạng ngày thành chuỗi 'yyyy-MM-dd'
        var formattedDate = currentDate.toISOString().split('T')[0];
        // Chuyển đổi orderData thành JSON
        var orderData = {
            id: order.id,
            code: order.code,
            name_user: order.name_user,
            sdt_user: order.sdt_user,
            address_user: order.address_user,
            total_money: order.total_money,
            total_payment: order.total_payment,
            total_payment_off: order.total_payment_off,
            shipping_price: order.shipping_price,
            status: order.status,
            create_date: order.create_date,
            update_date: formattedDate,
            account: order.account,
            address: order.address,
            payment: order.payment,
            // Thêm các trường khác nếu cần thiết
        };

        $http.post("http://localhost:8080/api/order/add", orderData)
            .then(function (response) {
                var orderDataFromServer = response.data;

                // Xử lý orderDetails
                var promises = order.orderDetails.map(function (watch) {
                    // Chuyển đổi orderDetail thành JSON
                    if (watch.watchdetail.giamoi) {
                        var orderDetail = {
                            id: watch.id,
                            quantity: watch.quantity,
                            total_price: watch.quantity * watch.watchdetail.giamoi,
                            giamgia: watch.watchdetail.giamgia,
                            order: orderDataFromServer,
                            watchdetail: watch.watchdetail
                        };
                    } else {
                        var orderDetail = {
                            id: watch.id,
                            quantity: watch.quantity,
                            total_price: watch.quantity * watch.watchdetail.price,
                            order: orderDataFromServer,
                            watchdetail: watch.watchdetail
                        };
                    }
                    var TongSanLuongBanDau = 0
                    angular.forEach($scope.hoadonchitiets, function (ordItem) {
                        if (ordItem.id === watch.id) {
                            TongSanLuongBanDau = ordItem.quantity + ordItem.watchdetail.quantity_stock;
                            var soLuongSau = TongSanLuongBanDau - watch.quantity;
                            var sanphamFake = ordItem.watchdetail;
                            sanphamFake.quantity_stock = soLuongSau;
                            $http.post("http://localhost:8080/api/watch/addsanpham", sanphamFake)
                                .then(function (response) {
                                    console.log("Cập nhập sản phẩm thành công!");
                                })
                                .catch(function (error) {
                                    console.error("Lỗi khi lưu dữ liệu: ", error);
                                });
                        }
                    });

                    // Gửi dữ liệu orderDetail lên server
                    return $http.post("http://localhost:8080/api/orderdetail/add", orderDetail);
                });

                // Chờ tất cả các promise hoàn thành
                Promise.all(promises)
                    .then(function () {
                        alert("Cập nhật hóa đơn thành công");
                        $route.reload();
                    })
                    .catch(function (error) {
                        console.error("Lỗi khi lưu dữ liệu: ", error);
                    });
            })
            .catch(function (error) {
                console.error("Lỗi khi lưu dữ liệu: ", error);
            });
    };


    $scope.addToCart = function (order, watch) {
        // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
        var existingOrderDetail = order.orderDetails.find(function (od) {
            return od.watchdetail.id === watch.id;
        });
        watch.quantity_stock -= 1;
        if (watch.quantity_stock < 0) {
            watch.quantity_stock = 0;
            return;
        }
        if (existingOrderDetail) {
            // Nếu sản phẩm đã có trong giỏ hàng, cập nhật số lượng

            existingOrderDetail.quantity += 1;
            existingOrderDetail.total_price = existingOrderDetail.quantity * watch.price;
        } else {
            // Nếu sản phẩm chưa có trong giỏ hàng, thêm mới vào giỏ hàng
            var newOrderDetail = {
                order: order,
                watchdetail: watch,
                quantity: 1,
                total_price: watch.price * 1 // Số lượng mặc định là 1
                // Các thông tin khác của orderDetail
            };

            // Thêm orderDetail mới vào danh sách orderDetails của order
            order.orderDetails.push(newOrderDetail);
        }

        // Gọi hàm tính lại tổng tiền cho order
        $scope.updateOrderTotal(order);
    };

    $scope.removeFromCart = function (order, orderDetail) {
        // Tìm vị trí của orderDetail trong danh sách orderDetails của order
        var index = order.orderDetails.indexOf(orderDetail);

        // Nếu tìm thấy, loại bỏ orderDetail khỏi danh sách
        if (index !== -1) {
            // Lấy số lượng của orderDetail
            var removedQuantity = orderDetail.quantity;

            // Loại bỏ orderDetail khỏi danh sách
            order.orderDetails.splice(index, 1);

            // Tăng lại watch.quantity_stock
            orderDetail.watchdetail.quantity_stock += removedQuantity;

            // Gọi hàm tính lại tổng tiền cho order
            $scope.updateOrderTotal(order);
        }
    };

    $scope.huyHoadon = function (order) {
        // Kiểm tra nếu order.mota không có dữ liệu
        if (!order.mota || order.mota.trim() === '') {
            alert('Vui lòng điền vào mô tả lý do hủy');
        } else {
            var currentDate = new Date();
            // Định dạng ngày thành chuỗi 'yyyy-MM-dd'
            var formattedDate = currentDate.toISOString().split('T')[0];
            order.updated_by = $scope.localStorageIdac.username;
            order.update_date = formattedDate;
            $http.post("http://localhost:8080/api/order/huyHoadon", order)
                .then(function (responseOrder) {
                    var thongbaoFake = {
                        create_date: formattedDate,
                        status: 4,
                        order: responseOrder.data
                    }
                    $http.post("http://localhost:8080/api/thongbaoadmin/add", thongbaoFake)
                        .then(function (responseThongBao) {
                            console.log("Tạo thông báo thành công!")
                            $http.post("http://localhost:8080/api/checkemail/send-notificationAdmin", responseThongBao.data)
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
                    angular.forEach($scope.hoadonchitiets, function (ordItem) {
                        if (ordItem.order.id === order.id) {
                            var sanphamFake = ordItem.watchdetail;
                            sanphamFake.quantity_stock = ordItem.quantity + ordItem.watchdetail.quantity_stock;
                            $http.post("http://localhost:8080/api/watch/addsanpham", sanphamFake)
                                .then(function (response) {
                                    console.log("Cập nhập sản phẩm thành công!");
                                })
                                .catch(function (error) {
                                    console.error("Lỗi khi lưu dữ liệu: ", error);
                                });
                        }
                    });
                    alert("Hủy hóa đơn thành công!")
                    $scope.loadOrder();
                })
                .catch(function (error) {
                    console.error("Lỗi khi lưu dữ liệu: ", error);
                });
        }
    };

    // $scope.searchSP = null;
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

    $scope.exportOrdersToExcel = function () {
        // Call the API to fetch all orders
        $http.get("http://localhost:8080/api/order")
            .then(function (response) {
                // Extract data from the API response
                var orders = response.data;

                if (orders.length === 0) {
                    alert('No orders available to export.');
                    return;
                }

                // Convert data to Excel format
                var data = [];
                data.push(['Order ID', 'Code', 'Name', 'Phone Number', 'Address', 'Total Money', 'Total Payment', 'Total Payment Off', 'Shipping Price', 'Status', 'QR Code', 'Created By', 'Updated By']);

                orders.forEach(function (order) {
                    var email = order.account ? order.account.email : '';
                    var phone = order.account ? order.account.phone : order.sdt_user;
                    data.push([
                        order.id,
                        order.code,
                        order.name_user,
                        phone,
                        order.address_user,
                        order.total_money,
                        order.total_payment,
                        order.total_payment_off,
                        order.shipping_price,
                        order.status,
                        order.QR_Code,
                        email,
                        order.updated_by
                    ]);
                    // data.push([
                    //     order.id,
                    //     order.code,
                    //     order.name_user,
                    //     order.sdt_user,
                    //     order.address_user,
                    //     order.total_money,
                    //     order.total_payment,
                    //     order.total_payment_off,
                    //     order.shipping_price,
                    //     order.status,
                    //     order.QR_Code,
                    //     order.account.email,
                    //     order.updated_by
                    // ]);
                });

                // Create a worksheet
                var ws = XLSX.utils.aoa_to_sheet(data);

                // Create a workbook
                var wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, 'Orders');

                // Save the workbook
                XLSX.writeFile(wb, 'orders.xlsx');
            })
            .catch(function (error) {
                // Handle errors if any
                console.error('Error fetching orders:', error);
                alert('Error fetching orders. Please try again.');
            });
    };


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
                                            // $route.reload();
                                            $scope.loadOrder();
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


    $scope.loadPage();
    $scope.loadOrder();

});