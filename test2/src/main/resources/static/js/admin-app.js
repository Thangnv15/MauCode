var myapp = angular.module("admin-app",["ngRoute"]);

myapp.config(function ($routeProvider,$locationProvider){
    $locationProvider.hashPrefix("");
    $routeProvider
        .when("/product",{
            templateUrl:"/assets/admin/product/index.html",
            controller:"product-ctrl"
        })
        .when("/authorize",{
            templateUrl:"/assets/admin/authority/index.html",
            controller:"authority-ctrl"
        })
        .when("/unauthorized",{
            templateUrl:"/assets/admin/authority/unauthorized.html",
            controller:"authority-ctrl"
        })
        .otherwise({
            template:"<h3>Administrator</h3>"
        });
})