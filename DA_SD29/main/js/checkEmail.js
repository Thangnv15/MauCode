myapp.controller("checkEmail-ctrl", function ($scope, $http, $location) {
    $scope.emailTamThoi = localStorage.getItem("EmailTamThoi");
    if(!$scope.emailTamThoi){
        $location.path("/login");
    }
    $scope.codeMail = localStorage.getItem("codeEmail");
    $scope.emailFormatError = false;
    $scope.xacNhan = function(){
        // alert($scope.codeMail);
        if(!$scope.codeMail){
            alert("Mã đã hết hạn, vui lòng thao tác lại để mã mới gửi về!")
        }else{
            if($scope.codeMail !== $scope.codeEmail){
                $scope.emailFormatError = true;
            }else{
                $scope.emailFormatError = false;
                $location.path("/createAccount");
            }
        }
        
    }
})