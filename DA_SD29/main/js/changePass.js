myapp.controller("changePass-ctrl", function ($scope, $http, $location) {
    $scope.emailChangePass = localStorage.getItem("EmailChangepass");
    if (!$scope.emailChangePass) {
        $location.path("/login");
    }

    $scope.passWordNew = false;
    $scope.checkPassNew = function () {
        if ($scope.pass.length<8 || /\s/.test($scope.pass)) {
            $scope.passWordNew = true;
        } else {
            $scope.passWordNew = false;
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
        if (!$scope.pass || !$scope.confirmPass) {
            $scope.is_null = true;
        } else {
            $scope.is_null = false;
        }
    };

    $scope.xacNhan = function () {
        $scope.checkFields();
        if ($scope.passwordMatchError || $scope.passWordNew || $scope.is_null) {
            alert("Vui lòng kiểm tra lại thông tin cho chính xác!");
        } else {
            $http.get("http://localhost:8080/api/account")
                .then(function (response) {
                    $scope.accounts = response.data;

                    // Tìm account có email giống với emailToChangePass
                    var accountToChangePass = $scope.accounts.find(function (account) {
                        return account.email === $scope.emailChangePass;
                    });

                    // Kiểm tra nếu tìm thấy account
                    if (accountToChangePass) {
                        $scope.accountPass = accountToChangePass;
                        $scope.accountPass.pass = $scope.pass;
                        $http.post("http://localhost:8080/api/account/add",  $scope.accountPass)
                            .then(function (response) {
                                alert("Thay đổi mật khẩu thành công!");
                                $location.path("/login");
                            })
                            .catch(function (error) {
                                // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
                                console.error("Lỗi khi lưu dữ liệu: ", error);
                            });
                    } 
                })
                .catch(function (error) {
                    console.error("Lỗi khi lấy dữ liệu từ API: ", error);
                });
        }
    }

})