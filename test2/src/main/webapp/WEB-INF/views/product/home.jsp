<%@ page pageEncoding="utf-8"%>
<%@ taglib prefix = "c" uri = "http://java.sun.com/jsp/jstl/core" %>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous"></script>
<script src="https://kit.fontawesome.com/6432a84392.js" crossorigin="anonymous"></script>
<%--<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js"></script>--%>
<link rel="stylesheet" href="/css/home.css">

<div class="container">
    <div id="carouselExampleIndicators" class="carousel slide">
        <div class="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div class="carousel-inner">
            <div class="carousel-item active">
                <img style="width: 840px;height: 560px" src="/images/carosel.jpg" class="d-block w-100" alt="carousel">
                <div class="image-text">Chào mừng đến với Sneaker Good - nơi tự hào là thiên đường của những đôi giày thể thao thời trang và chất lượng hàng đầu! Chúng tôi tự tin mang đến cho bạn những trải nghiệm mua sắm thú vị và đầy hứng thú với bộ sưu tập đa dạng của những đôi giày Sneaker phong cách.</div>
            </div>
            <div class="carousel-item">
                <img style="width: 840px;height: 560px" src="/images/carosel1.jpg" class="d-block w-100" alt="carousel">
                <div class="image-text">Chào mừng đến với Sneaker Good - nơi tự hào là thiên đường của những đôi giày thể thao thời trang và chất lượng hàng đầu! Chúng tôi tự tin mang đến cho bạn những trải nghiệm mua sắm thú vị và đầy hứng thú với bộ sưu tập đa dạng của những đôi giày Sneaker phong cách.</div>
            </div>
            <div class="carousel-item">
                <img style="width: 840px;height: 560px" src="/images/carosel2.jpg" class="d-block w-100" alt="carousel">
                <div class="image-text">Chào mừng đến với Sneaker Good - nơi tự hào là thiên đường của những đôi giày thể thao thời trang và chất lượng hàng đầu! Chúng tôi tự tin mang đến cho bạn những trải nghiệm mua sắm thú vị và đầy hứng thú với bộ sưu tập đa dạng của những đôi giày Sneaker phong cách.</div>
            </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>
</div>
<%--    Sản phẩm ban chay--%>
<%--Content1--%>
<div class="container-fluid" style="margin-top: 25px">
    <div class="container col-lg-12" style="border-bottom: 1px solid black">
        <h3>Sản phẩm bán chạy</h3>
    </div>
</div>
<div class="row" style="margin-top: 25px">
    <div class="col-lg-1 d-flex justify-content-end bton">
        <button ng-click="pager.prev()" class="btn btn-light" style="font-size: 30px"><</button>
    </div>
    <div class="col-lg-10 row">
<%--        <c:forEach items="${items.content}" var="sp">--%>
<%--            <div class="col-lg-3">--%>
<%--                <div class="panel panel-primary poly-item text-center">--%>
<%--                    <div class="panel-heading">--%>
<%--                        <div style="font-size: 18px" class=" text text-danger">${sp.ten}</div>--%>
<%--                    </div>--%>
<%--                    <div class="panel-body">--%>
<%--                        <a href="/product/detail/${sp.id}">--%>
<%--                            <img src="/images/${sp.image}">--%>
<%--                        </a>--%>
<%--                    </div>--%>
<%--                    <div class="panel-footer text-right">--%>
<%--                        <b class="pull-left">${sp.gia}</b>--%>
<%--                    </div>--%>
<%--                    <div class="panel-footer text-right">--%>
<%--                        <button ng-click="cart.add(${sp.id})" type="button" class="btn btn-light"><a href="#giohang" style="text-decoration: none; color: black;">Thêm vào giỏ hàng</a></button><br>--%>
<%--                        <button type="button" class="btn btn-danger" style=" margin-top: 15px;"><a href="thanhtoan.html" style="text-decoration: none; color: white;">Mua ngay</a></button>--%>
<%--                    </div>--%>
<%--                </div>--%>
<%--            </div>--%>
<%--        </c:forEach>--%>
        <div class="col-lg-3" ng-repeat="item in pager.items">
            <div class="panel panel-primary poly-item text-center">
                <div class="panel-heading">
                    <div style="font-size: 18px" class=" text text-danger">{{item.ten}}</div>
                </div>
                <div class="panel-body">
                    <a href="/product/detail/{{item.id}}">
                        <img style="width: 225px;height: 225px" src="/images/{{item.image}}">
                    </a>
                </div>
                <div class="panel-footer text-right">
                    <b class="pull-left">{{item.gia}}</b>
                </div>
                <div class="panel-footer text-right">
                    <button ng-click="cart.add(item.id)" type="button" class="btn btn-light">Thêm vào giỏ hàng</button><br>
                    <button ng-click="thanhtoanngay.actionMuaNgay(item.id)" type="button" class="btn btn-danger" style=" margin-top: 15px;">Mua ngay</button>
                </div>
            </div>
        </div>
    </div>
    <div class="col-lg-1 d-flex justify-content-start bton">
        <button ng-click="pager.next()" class="btn btn-light " style="font-size: 30px;margin-left: 10px">></button>
    </div>
</div>
<%--Content2--%>

<div class="container" style="border-top: 1px dotted black;margin-top: 30px">
    <div class="col-lg-12 d-flex" style="margin-top: 10px;">
        <div class="col-lg-6 d-flex justify-content-end">
            <div id="ct_left" style="background-image: url(/images/ct1.jpg)">
                <div style="margin-top: 70px; margin-left: 15px;">
                    <p>Đẳng cấp và sang trọng</p>
                    <button type="button" class="btn btn-dark"><a href="/product/list" style="text-decoration: none; color: white;">Xem thêm</a></button>
                </div>
            </div>
        </div>
        <div class="col-lg-6 d-flex justify-content-start">
            <div id="ct_right"  style="background-image: url(/images/ct2.jpg)">
                <div style="margin-top: 70px; margin-left: 15px;">
                    <p>Hiện đại và tinh tế</p>
                    <button type="button" class="btn btn-dark"><a href="/product/list" style="text-decoration: none; color: white;">Xem thêm</a></button>
                </div>
            </div>
        </div>
    </div>
</div>

<%--    Sản phẩm moi--%>
<%--Conten1--%>
<div class="container-fluid" style="margin-top: 30px">
    <div class="container col-lg-12" style="border-bottom: 1px solid black">
        <h3>Sản phẩm mới</h3>
    </div>
</div>
<div class="row" style="margin-top: 25px">
    <div class="col-lg-1 d-flex justify-content-end bton">
        <button ng-click="pagerMoi.prev()" class="btn btn-light" style="font-size: 30px"><</button>
    </div>
    <div class="col-lg-10 row">
        <div class="col-lg-3" ng-repeat="item in pagerMoi.items">
            <div class="panel panel-primary poly-item text-center">
                <div class="panel-heading">
                    <div style="font-size: 18px" class=" text text-danger">{{item.ten}}</div>
                </div>
                <div class="panel-body">
                    <a href="/product/detail/{{item.id}}">
                        <img style="width: 225px;height: 225px" src="/images/{{item.image}}">
                    </a>
                </div>
                <div class="panel-footer text-right">
                    <b class="pull-left">{{item.gia}}</b>
                </div>
                <div class="panel-footer text-right">
                    <button ng-click="cart.add(item.id)" type="button" class="btn btn-light">Thêm vào giỏ hàng</button><br>
                    <button ng-click="thanhtoanngay.actionMuaNgay(item.id)" type="button" class="btn btn-danger" style=" margin-top: 15px;">Mua ngay</button>
                </div>
            </div>
        </div>
    </div>
    <div class="col-lg-1 d-flex justify-content-start bton">
        <button ng-click="pagerMoi.next()" class="btn btn-light " style="font-size: 30px;margin-left: 10px">></button>
    </div>
</div>

<%--Conten2--%>

<%--Content3--%>

<div class="container-fluid" style="margin-top: 85px">
    <div class="container col-lg-12" style  ="border-bottom: 1px solid black">
        <h3>Sản phẩm giảm giá</h3>
    </div>
</div>
<div class="row" style="margin-top: 25px">
    <div class="col-lg-1 d-flex justify-content-end bton">
        <button ng-click="pagerGiamGia.prev()" class="btn btn-light" style="font-size: 30px"><</button>
    </div>
    <div class="col-lg-10 row">
        <div class="col-lg-3" ng-repeat="item in pagerGiamGia.items">
            <div class="panel panel-primary poly-item text-center">
                <div class="panel-heading">
                    <div style="font-size: 18px" class=" text text-danger">{{item.ten}}</div>
                </div>
                <div class="panel-body">
                    <a href="/product/detail/{{item.id}}">
                        <img style="width: 225px;height: 225px" src="/images/{{item.image}}">
                    </a>
                </div>
                <div class="panel-footer text-right">
                    <b class="pull-left">{{item.gia}}</b>
                </div>
                <div class="panel-footer text-right">
                    <button ng-click="cart.add(item.id)" type="button" class="btn btn-light">Thêm vào giỏ hàng</button><br>
                    <button ng-click="thanhtoanngay.actionMuaNgay(item.id)" type="button" class="btn btn-danger" style=" margin-top: 15px;">Mua ngay</button>
                    </div>
            </div>
        </div>
    </div>
    <div class="col-lg-1 d-flex justify-content-start bton">
        <button ng-click="pagerGiamGia.next()" class="btn btn-light " style="font-size: 30px;margin-left: 10px">></button>
    </div>
</div>




