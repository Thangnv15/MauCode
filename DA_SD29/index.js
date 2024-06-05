
var myapp = angular.module("client-app", ["ngRoute"]);

myapp.config(function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix("");
    $routeProvider
        .when("/home", {
            templateUrl: "/main/layout/home.html",
            controller: "home-ctrl"
        })
        .when("/login", {
            templateUrl: "/main/layout/login.html",
            controller: "login-ctrl"
        })
        .when("/product", {
            templateUrl: "/main/layout/product.html",
            controller: "product-ctrl"
        })
        .when("/contact", {
            templateUrl: "/main/layout/contact.html",
        })
        .when("/about", {
            templateUrl: "/main/layout/about.html",
        })
        .when("/cart", {
            templateUrl: "/main/layout/cart.html",
            controller: "cart-ctrl"
        })
        .when("/address", {
            templateUrl: "/main/layout/address.html",
            controller: "address-ctrl"
        })
        .when("/checkout", {
            templateUrl: "/main/layout/optionCheckout.html",
            controller: "checkout-ctrl"
        })
        .when("/pay", {
            templateUrl: "/main/layout/peyment.html",
            controller: "pay-ctrl"
        })
        .when("/user", {
            templateUrl: "/main/layout/user.html",
            controller: "user-ctrl"
        })
        .when("/orderDetail", {
            templateUrl: "/main/layout/orderdetail.html",
            controller: "orderDetail-ctrl"
        })
        .when("/detail", {
            templateUrl: "/main/layout/detail.html",
            controller: "detail-ctrl"
        })
        .when("/term", {
            templateUrl: "/main/layout/term.html",
            controller: "term-ctrl"
        })
        .when("/register", {
            templateUrl: "/main/layout/register.html",
            controller: "register-ctrl"
        })
        .when("/checkEmail", {
            templateUrl: "/main/layout/checkEmail.html",
            controller: "checkEmail-ctrl"
        })
        .when("/createAccount", {
            templateUrl: "/main/layout/createAccount.html",
            controller: "createAccount-ctrl"
        })
        .when("/checkEmailChangePass", {
            templateUrl: "/main/layout/checkEmailChangePass.html",
            controller: "checkEmailChangePass-ctrl"
        })
        .when("/changePass", {
            templateUrl: "/main/layout/createPass.html",
            controller: "changePass-ctrl"
        })
        .otherwise({
            redirectTo: "/home"
        });
});

myapp.controller('controllerNav', function ($scope, $http, $location, CartService, $route) {
    var username = localStorage.getItem('username');
    $scope.localStorageIdac = JSON.parse(localStorage.getItem('idac')) || [];
    if (username) {
        $scope.username = username;
    }
    $scope.logout = function () {
        // Remove 'username' and 'role' from Local Storage
        localStorage.removeItem('username');
        localStorage.removeItem('role');
        localStorage.removeItem("idac");
        localStorage.removeItem("actor");
        localStorage.removeItem("ProductDetail");
        localStorage.removeItem("selectedAddress");
        $scope.username = "";

        // Redirect to the login page
        $location.path('/login');
    };

    $scope.searchCates = function (value) {
        // alert(value);
        if (value === 'none') {
            localStorage.removeItem('catesName');
            localStorage.removeItem('catesNameBrand');
            $route.reload();
            $location.path('/product');
        } else {
            localStorage.removeItem('catesNameBrand');
            localStorage.setItem('catesName', value);
            // $location.path('/home');
            $route.reload();
            $location.path('/product');
        }
    }
    $scope.showThongBaoFlag = false;

    $scope.showThongBao = function () {
        $scope.showThongBaoFlag = !$scope.showThongBaoFlag;
    };

    $scope.thongbaos = [];
    $http.get("http://localhost:8080/api/thongbaoadmin")
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

    $scope.cart = CartService.getCart();
});