myapp.controller("loginAdmin-ctrl", function ($scope, $http, $filter) {
    // alert("Hello loginAdmin");
    $scope.accounts = [];
    $scope.roles = [];
    // localStorage.removeItem('username');
    // localStorage.removeItem('role');

    // Khởi tạo hiển thị ban đầu
    $http.get("http://localhost:8080/api/account")
        .then(function (response) {
            // Gán dữ liệu trả về từ API vào biến $scope.accounts
            $scope.accounts = response.data;
        }, function (error) {
            console.error('Lỗi trong quá trình gọi API:', error);
        });

    // Lấy danh sách vai trò
    $http.get("http://localhost:8080/api/role")
        .then(function (response) {
            $scope.roles = response.data;
        }, function (error) {
            console.error('Lỗi trong quá trình gọi API:', error);
        });

    $scope.login = function () {

        var inputEmail = $scope.user.email;
        var inputPassword = $scope.user.password;

        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        $scope.emailError = !emailPattern.test(inputEmail);
        $scope.emailErrorMessage = $scope.emailError ? "Email không hợp lệ" : "";

        if ($scope.emailError) {
            return;
        }
        // Tìm kiếm thông tin tài khoản
        var account = null;
        for (var i = 0; i < $scope.accounts.length; i++) {
            if ($scope.accounts[i].email === inputEmail && $scope.accounts[i].pass === inputPassword) {
                account = $scope.accounts[i];
                $scope.accountofUser = account;
                break;
            }
        }

        if (account) {
            // Tìm thấy tài khoản và đăng nhập thành công
            var accountId = account.id;

            // Sử dụng API để lấy thông tin vai trò
            $http.get("http://localhost:8080/api/accountrole")
                .then(function (response) {
                    var accountroles = response.data;

                    for (var i = 0; i < accountroles.length; i++) {
                        var accountrole = accountroles[i];
                        if (accountrole.account.id === accountId) {
                            var roleId = accountrole.role.id;

                            // Tìm tên vai trò dựa trên roleId
                            var role = $scope.roles.find(function (r) {
                                return r.id === roleId;
                            });

                            if (role) {
                                // Lưu thông tin tài khoản và vai trò vào Local Storage
                                localStorage.setItem('username', inputEmail);
                                localStorage.setItem('role', role.name);
                                localStorage.setItem('idac', JSON.stringify($scope.accountofUser));


                                // Dựa vào tên vai trò, điều hướng trang
                                if (role.name === 'ADM' || role.name === 'STAFF') {
                                    window.location.href = "/admin/index.html";
                                } else if (role.name === 'CUST') {
                                    window.location.href = "/index.html";
                                }
                                return; // Kết thúc hàm sau khi điều hướng
                            }
                        }
                    }

                    // Nếu không tìm thấy vai trò, xử lý tùy ý (ví dụ: thông báo lỗi)
                    alert('Không tìm thấy vai trò cho tài khoản này');
                }, function (error) {
                    console.error('Lỗi trong quá trình gọi API:', error);
                });
        } else {
            // Xác thực thất bại
            alert('Đăng nhập thất bại. Vui lòng kiểm tra lại tên người dùng và mật khẩu.');
        }
    };

    $scope.register = function () {
        $location.path("/register");
    }
})