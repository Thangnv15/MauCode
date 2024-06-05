const sideLinks = document.querySelectorAll('.sidebar .side-menu li a:not(.logout)');

sideLinks.forEach(item => {
    const li = item.parentElement;
    item.addEventListener('click', () => {
        sideLinks.forEach(i => {
            i.parentElement.classList.remove('active');
        })
        li.classList.add('active');
    })
});

const menuBar = document.querySelector('.content_index nav .bx.bx-menu');
const sideBar = document.querySelector('.sidebar');

menuBar.addEventListener('click', () => {
    sideBar.classList.toggle('close');
});

const searchBtn = document.querySelector('.content_index nav form .form-input button');
const searchBtnIcon = document.querySelector('.content_index nav form .form-input button .bx');
const searchForm = document.querySelector('.content_index nav form');

// searchBtn.addEventListener('click', function (e) {
//     if (window.innerWidth < 576) {
//         e.preventDefault;
//         searchForm.classList.toggle('show');
//         if (searchForm.classList.contains('show')) {
//             searchBtnIcon.classList.replace('bx-search', 'bx-x');
//         } else {
//             searchBtnIcon.classList.replace('bx-x', 'bx-search');
//         }
//     }
// });

window.addEventListener('resize', () => {
    if (window.innerWidth < 768) {
        sideBar.classList.add('close');
    } else {
        sideBar.classList.remove('close');
    }
    if (window.innerWidth > 576) {
        // searchBtnIcon.classList.replace('bx-x', 'bx-search');
        searchForm.classList.remove('show');
    }
});

const toggler = document.getElementById('theme-toggle');

toggler.addEventListener('change', function () {
    if (this.checked) {
        document.body.classList.add('dark');
    } else {
        document.body.classList.remove('dark');
    }
});

// Lấy danh sách các mục con của "Product"
const productSubMenu = document.querySelector('.sub-menu');

// Lấy mục "Product"
const productMenuItem = document.querySelector('.product');

// Bắt đầu ẩn mục con của "Product"
productSubMenu.style.display = 'none';

// Thêm sự kiện click vào mục "Product"
productMenuItem.addEventListener('click', () => {
    // Toggle hiển thị mục con của "Product"
    if (productSubMenu.style.display === 'none') {
        productSubMenu.style.display = 'block';
    } else {
        productSubMenu.style.display = 'none';
    }
});

// function logout(){
//     window.location.href="/index.html"
// }



var myapp = angular.module('adminapp',["ngRoute"]);
myapp.controller("HeaderController", function ($scope, $http, $location) {
    var username = localStorage.getItem('username');
    var role = localStorage.getItem('role');
    $scope.showPhanquyen = false;
    if(role==="ADM"){
        $scope.showPhanquyen = true;
    }

    if (username) {
        $scope.username = username;
    }
    $scope.logout = function() {
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        localStorage.removeItem("idac");
        $scope.username = "";
        // $rootScope.isLoggedIn = false;
        $location.path('/login');
    };
    $scope.showThongBaoFlag = false;

    $scope.showThongBao = function () {
        $scope.showThongBaoFlag = !$scope.showThongBaoFlag;
    };

    $scope.thongbaos = [];
    $http.get("http://localhost:8080/api/thongbaouser")
        .then(function (response) {
            // Xử lý phản hồi từ máy chủ sau khi lưu thành công
            $scope.thongbaos = response.data;
            $scope.thongbaos.sort(function (a, b) {
                return new Date(b.create_date) - new Date(a.create_date);
            });
        })
        .catch(function (error) {
            // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
            console.error("Lỗi khi lưu dữ liệu: ", error);
        });
})
// myapp.controller('HeaderController', ['$scope', '$location', '$route', function($scope, $location) {
    
// }]);

myapp.config(function ($routeProvider,$locationProvider){
    $locationProvider.hashPrefix("");
    $routeProvider
        .when("/banhang",{
            templateUrl:"banhang.html",
            controller:"banhang-ctrl"
        })
        .when("/product",{
            templateUrl:"productAdmin.html",
            controller:"product-ctrl"
        })
        .when("/order",{
            templateUrl:"order.html",
            controller:"order-ctrl"
        })
        .when("/phanquyen",{
            templateUrl:"phanquyen.html",
            controller:"phanquyen-ctrl"
        })
        .when("/hoantra",{
            templateUrl:"hoadonhoan.html",
            controller:"hoantra-ctrl"
        })
        .when("/khuyenMai",{
            templateUrl:"khuyenmai.html",
            controller:"khuyenmai-ctrl"
        })
        .when("/khuyenMai3",{
            templateUrl:"khuyenmai3.html",
            controller:"khuyenmai3-ctrl"
        })
        .when("/chinhSuaChietKhau",{
            templateUrl:"chinhsuachietkhau.html",
            controller:"chinhsuachietkhau-ctrl"
        })
        .when("/khachHang",{
            templateUrl:"khachhang.html",
            controller:"khachhang-ctrl"
        })
        .when("/thongKe",{
            templateUrl:"thongke.html",
            controller:"thongke-ctrl"
        })
        .when("/login",{
            templateUrl:"login.html",
            controller:"loginAdmin-ctrl"
        })
        .when("/thuongHieu",{
            templateUrl:"thuonghieu.html",
            controller:"thuonghieu-ctrl"
        })
        .when("/mauVo",{
            templateUrl:"z_maumat.html",
            controller:"thuonghieu-ctrl"
        })
        .when("/dongMay",{
            templateUrl:"z_dongmay.html",
            controller:"thuonghieu-ctrl"
        })
        .when("/chatLieuDay",{
            templateUrl:"z_chatlieuday.html",
            controller:"thuonghieu-ctrl"
        })
        .when("/chatLieuKinh",{
            templateUrl:"z_chatlieukinh.html",
            controller:"thuonghieu-ctrl"
        })
        .when("/sizeMat",{
            templateUrl:"z_sizemat.html",
            controller:"thuonghieu-ctrl"
        })
        .when("/xuatXu",{
            templateUrl:"z_xuatxu.html",
            controller:"thuonghieu-ctrl"
        })
        .when("/hinhDang",{
            templateUrl:"z_hinhdang.html",
            controller:"thuonghieu-ctrl"
        })
        .when("/tinhNang",{
            templateUrl:"z_tinhnang.html",
            controller:"thuonghieu-ctrl"
        })
        .otherwise({
            redirectTo: "/banhang"
        });
})
