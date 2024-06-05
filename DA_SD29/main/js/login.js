myapp.controller("login-ctrl", function ($scope, $http, $location) {
    $scope.accounts = [];
    $scope.roles = [];
    localStorage.removeItem("EmailTamThoi");
    localStorage.removeItem("codeEmail");
    localStorage.removeItem("EmailChangepass");

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

    $scope.emailError = false;
    $scope.emailErrorMessage = "";

    $scope.checkEmail = function () {
        // Regular expression for validating an Email
        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        $scope.emailError = !emailPattern.test($scope.user.username);
        $scope.emailErrorMessage = $scope.emailError ? "Email không hợp lệ" : "";
    };

    $scope.login = function () {
        
        var inputEmail = $scope.user.email;
        var inputPassword = $scope.user.password;

        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        $scope.emailError = !emailPattern.test(inputEmail);
        $scope.emailErrorMessage = $scope.emailError ? "Email không hợp lệ" : "";

        if($scope.emailError){
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

    $scope.changePass = function () {
        $http.get("http://localhost:8080/api/account")
            .then(function (response) {
                $scope.accounts = response.data;

                var emailExists = $scope.accounts.some(function (account) {
                    return account.email === $scope.user.email;
                });

                if (!emailExists) {
                    alert("Email không tồn tại!");
                } else {
                    var generatedCode = Math.floor(100000 + Math.random() * 900000);

                    // Lưu mã vào localStorage với key là "codeEmail"
                    localStorage.setItem("codeEmail", generatedCode.toString());
                    localStorage.setItem("EmailChangepass", $scope.user.email);
                    localStorage.removeItem("EmailTamThoi");

                    // Đặt hẹn giờ để xóa mã sau 3 phút
                    setTimeout(function () {
                        localStorage.removeItem("codeEmail");
                        localStorage.removeItem("EmailChangepass");
                    }, 3 * 60 * 1000); // 3 phút expressed in milliseconds

                    // Gửi yêu cầu POST để đăng ký tài khoản mới với mã ngẫu nhiên
                    $http.post("http://localhost:8080/api/checkemail/send-code", { code: generatedCode.toString(), userEmail: $scope.user.email })
                        .then(function (response) {
                            $location.path("/checkEmailChangePass");
                        })
                        .catch(function (error) {
                            console.error("Lỗi khi đăng ký: ", error);
                        });
                }
            })
            .catch(function (error) {
                console.error("Lỗi khi lấy dữ liệu từ API: ", error);
            });
    }
});