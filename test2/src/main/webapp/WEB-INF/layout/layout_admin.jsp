<%@ page pageEncoding="utf-8"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
      integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular-route.js"></script>

<style>
    #main{
        min-height: 100vh;
    }
</style>
<div ng-app="admin-app">
    <div><tiles:insertAttribute name="navbar" /></div>
    <div id="main"><tiles:insertAttribute name="body" /></div>
    <div ng-view></div>
    <div><tiles:insertAttribute name="footer" /></div>
</div>
<script src="/js/admin-app.js"></script>
<script src="/js/product-ctrl.js"></script>
<script src="/js/authority-ctrl.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
        crossorigin="anonymous"></script>
