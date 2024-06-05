myapp.controller("checkout-ctrl", function ($scope, $http, $location) {
    $scope.login=function(){
        $location.path("/login")
    }
    $scope.guestCheck=function(){
        localStorage.setItem("actor",'khachvanglai');
        $location.path("/address")
    }
})