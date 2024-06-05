myapp.controller("checkEmailChangePass-ctrl", function ($scope, $http, $location) {
    // alert("Hello change passs")
    $scope.emailChangePass = localStorage.getItem("EmailChangepass");
    if(!$scope.emailChangePass){
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
                $location.path("/changePass"); 
            }
        }
        
    }
})