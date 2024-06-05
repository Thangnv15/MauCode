<%@ page pageEncoding="utf-8"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm" crossorigin="anonymous"></script>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular-route.js"></script>


<%--<style>--%>
<%--    #main{--%>
<%--        min-height: 100vh;--%>
<%--    }--%>
<%--</style>--%>
<div ng-app="shopping-cart-app" ng-controller="shopping-cart-ctrl">
    <div><tiles:insertAttribute name="navbar" /></div>
    <div style="margin-top: 180px" id="main"><tiles:insertAttribute name="body" /></div>
    <div style="margin-top: 50px"><tiles:insertAttribute name="footer" /></div>
</div>
<script src="/js/shopping-cart-app.js"></script>
