myapp.controller("register-ctrl", function ($scope, $http, $location) {
    // alert("hello regis")
    $scope.login = function () {
        $location.path("/login");
    }

    $scope.emailFormatError = false;
    $scope.checkEmailFormat = function () {
        // Biểu thức chính quy kiểm tra định dạng email
        var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        if (!emailRegex.test($scope.email)) {
            $scope.emailFormatError = true;
        } else {
            $scope.emailFormatError = false;
        }
    };

    $scope.passwordMatchError = false;
    $scope.checkPass = function () {
        if ($scope.pass !== $scope.confirmPass) {
            $scope.passwordMatchError = true;
        } else {
            $scope.passwordMatchError = false;
        }
    };

    $scope.is_null = false;

    // Hàm kiểm tra trường có trống không
    $scope.checkFields = function () {
        if (!$scope.email || !$scope.pass || !$scope.confirmPass) {
            $scope.is_null = true;
        } else {
            $scope.is_null = false;
        }
    };


    $scope.account = {};
    $scope.accounts = [];
    $scope.accountRole = {};
    $scope.register = function () {
        $http.get("http://localhost:8080/api/account")
            .then(function (response) {
                $scope.accounts = response.data;

                var emailExists = $scope.accounts.some(function (account) {
                    return account.email === $scope.email;
                });

                if (emailExists) {
                    alert("Email đã tồn tại!");
                } else {


                    var generatedCode = Math.floor(100000 + Math.random() * 900000);

                    // Lưu mã vào localStorage với key là "codeEmail"
                    localStorage.setItem("codeEmail", generatedCode.toString());
                    localStorage.setItem("EmailTamThoi", $scope.email);
                    localStorage.removeItem("EmailChangepass");

                    // Đặt hẹn giờ để xóa mã sau 3 phút
                    setTimeout(function () {
                        localStorage.removeItem("codeEmail");
                        localStorage.removeItem("EmailTamThoi");
                    }, 3 * 60 * 1000); // 3 phút expressed in milliseconds

                    // Gửi yêu cầu POST để đăng ký tài khoản mới với mã ngẫu nhiên
                    $http.post("http://localhost:8080/api/checkemail/send-code", { code: generatedCode.toString(), userEmail: $scope.email })
                        .then(function (response) {
                            $location.path("/checkEmail");
                        })
                        .catch(function (error) {
                            console.error("Lỗi khi đăng ký: ", error);
                        });
                }
            })
            .catch(function (error) {
                console.error("Lỗi khi lấy dữ liệu từ API: ", error);
            });
    };

    
})