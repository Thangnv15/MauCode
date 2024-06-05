myapp.controller("createAccount-ctrl", function ($scope, $http, $location) {
    $scope.email = localStorage.getItem("EmailTamThoi");
    $scope.emailFormatError = false;
    $scope.checkEmailFormat = function () {
        // Biểu thức chính quy kiểm tra định dạng email
        var emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

        if (!emailRegex.test($scope.email)) {
            $scope.emailFormatError = true;
        } else {
            $scope.emailFormatError = false;
        }
    };

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
        $scope.checkFields();
        if ($scope.emailFormatError || $scope.passwordMatchError || $scope.passWordNew || $scope.is_null) {
            alert("Vui lòng kiểm tra lại thông tin cho chính xác!");
        } else {
            $scope.account.username = $scope.email;
            $scope.account.pass = $scope.pass;
            $scope.account.email = $scope.email;
            $scope.role = {};
            $http.get("http://localhost:8080/api/role")
                .then(function (response) {
                    var roles = response.data;
                    var custRole = roles.find(function (role) {
                        return role.name === 'CUST';
                    });

                    // Gán giá trị cho $scope.role nếu tìm thấy
                    if (custRole) {
                        $scope.role = custRole;
                        $http.post("http://localhost:8080/api/account/add", $scope.account)
                            .then(function (response) {
                                // Xử lý phản hồi từ máy chủ sau khi lưu thành công
                                // alert("Đăng kí tài khoản thành công!");
                                // $location.path("/login");
                                var dataAccount = response.data;
                                $scope.accountRole.account = dataAccount;
                                $scope.accountRole.role = $scope.role;
                                $http.post("http://localhost:8080/api/accountrole/add", $scope.accountRole)
                                    .then(function (response) {

                                        alert("Đăng kí tài khoản thành công!");
                                        $location.path("/login");
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

        }
    }

})