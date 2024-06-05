<%@ page pageEncoding="utf-8"%>
<%@ taglib prefix = "c" uri = "http://java.sun.com/jsp/jstl/core" %>

<div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary p-0">
        <div class="navbar-nav collapse navbar-collapse">
            <a class="nav-item nav-link" href="/">Home</a>
            <a class="nav-item nav-link" href="#!product">Product</a>
            <a class="nav-item nav-link" href="#!authorize">Authorizing</a>
            <a class="nav-item nav-link" href="/security/logoff">Sign Out</a>
        </div>
    </nav>
    <div ng-view></div>
</div>


