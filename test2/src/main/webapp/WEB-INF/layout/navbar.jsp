<%@ page pageEncoding="utf-8"%>
<%@ taglib prefix = "c" uri = "http://java.sun.com/jsp/jstl/core" %>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm" crossorigin="anonymous"></script>
<link rel="stylesheet" href="/css/navbar.css">

<div class="container-fluid  bg-dark" id="navbar">
    <header style="color: white" class="col-lg-12 d-flex justify-content-between container">
        <div class="d-flex align-items-center ddmenu">
            <c:choose>
                <c:when test="${not empty pageContext.request.remoteUser}">
                    <div class="dropdown">
                        <a data-bs-toggle="dropdown" href="#" style="color: white;text-decoration: none">Welcome ${pageContext.request.remoteUser}</a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#profile">Cá nhân</a></li>
                            <li><a class="dropdown-item" href="/order/list">Lịch sử mua hàng</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <c:if test="${pageContext.request.isUserInRole('DIRE') or pageContext.request.isUserInRole('STAF')}">
                                <li><a class="dropdown-item" href="/admin">Administrator</a></li>
                            </c:if>
                            <li><a class="dropdown-item" href="#changePass">Đổi mật khẩu</a></li>
                            <li><a class="dropdown-item" href="/security/logoff">Đăng xuất</a></li>
                        </ul>
                    </div>
                </c:when>
                <c:otherwise>
                    <a class="nav-item nav-link" href="/security/login/form">Sign In</a>
                </c:otherwise>
            </c:choose>
        </div>
        <div class="d-flex align-items-center">
            <h3 id="logo">Sneaker Good</h3>
        </div>
        <div class=" d-flex align-items-center">
            <i class="fas fa-shopping-cart"></i>
            <%--               <c:choose>--%>
            <%--                   <c:when test="${not empty pageContext.request.remoteUser}">--%>
            <%--                       <a style="text-decoration: none;color: white" href="/cart/view">{{cart.count}} items / {{cart.amount}}</a>--%>
            <%--                   </c:when>--%>
            <%--                   <c:otherwise>--%>
            <%--                       <a style="text-decoration: none;color: white" href="/cart/view">Sản phẩm / 0đ</a>--%>
            <%--                   </c:otherwise>--%>
            <%--                </c:choose>--%>
            <a style="text-decoration: none;color: white" href="/cart/view">{{cart.count}} items / {{cart.amount}}</a>
        </div>
    </header>
    <hr style="color: white; margin: 0px;padding: 0px;width: 100%">
    <nav class="col-lg-12 d-flex justify-content-center align-items-center" style="padding-right: 120px">
        <a href="/home">Trang chủ</a>
        <a href="/about">Giới thiệu</a>
        <a href="/product/list">Sản phẩm</a>
        <a href="/contact">Tin tức</a>
        <a href="/contact">Liên hệ</a>
    </nav>
</div>
<script>
    window.onscroll = function() {scrollFunction()};

    function scrollFunction() {
        if (document.body.scrollTop > 70 || document.documentElement.scrollTop > 70) {
            document.getElementById("navbar").style.padding = "20px 10px";
            document.getElementById("logo").style.fontSize = "25px";
        } else {

            document.getElementById("navbar").style.padding = "45px 10px";
            document.getElementById("logo").style.fontSize = "35px";
        }
    }
</script>

<%--<nav class="navbar navbar-expand-lg navbar-dark bg-primary p-0">--%>
<%--    <div class="navbar-nav collapse navbar-collapse">--%>
<%--        <div class="nav navbar-nav navbar-left">--%>
<%--            <a class="nav-item nav-link active" href="/product/list">Sản phẩm</a>--%>
<%--            <a class="nav-item nav-link" href="/about">Giới thiệu</a>--%>
<%--            <c:choose>--%>
<%--                <c:when test="${not empty pageContext.request.remoteUser}">--%>
<%--                    <a class="nav-item nav-link" href="/order/list">Your Orders</a>--%>
<%--                    <a class="nav-item nav-link" href="/security/logoff">Sign Out</a>--%>
<%--                    <c:if test="${pageContext.request.isUserInRole('DIRE') or pageContext.request.isUserInRole('STAF')}">--%>
<%--                        <a class="nav-item nav-link" href="/admin">Administration</a>--%>
<%--                    </c:if>--%>
<%--                </c:when>--%>
<%--                <c:otherwise>--%>
<%--                    <a class="nav-item nav-link" href="/security/login/form">Sign In</a>--%>
<%--                </c:otherwise>--%>
<%--            </c:choose>--%>
<%--        </div>--%>
<%--        <div class="nav navbar-nav navbar-right">--%>
<%--        <c:if test="${not empty pageContext.request.remoteUser}">--%>
<%--                <a href="#" style="color: white;text-decoration: none">Welcome ${pageContext.request.remoteUser}</a>--%>
<%--        </c:if>--%>
<%--        </div>--%>
<%--    </div>--%>
<%--</nav>--%>