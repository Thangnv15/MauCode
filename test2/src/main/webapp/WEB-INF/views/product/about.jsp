<%@ page pageEncoding="utf-8"%>
<%@ taglib prefix = "c" uri = "http://java.sun.com/jsp/jstl/core" %>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous"></script>
<script src="https://kit.fontawesome.com/6432a84392.js" crossorigin="anonymous"></script>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js"></script>
<link rel="stylesheet" href="/css/about.css">

<div class="container-fluid" style="padding: 0px;">
    <!-- Content1 -->
    <div class="col-lg-12 d-flex" style="margin-top: 20px;">
        <div class="col-lg-6 d-flex justify-content-end">
            <div id="content1_left">
            </div>
        </div>
        <div class="col-lg-6 d-flex justify-content-start">
            <div id="content1_right">
                <h3>Giới thiệu về Good Sneaker</h3>
                <p style="width: 400px;">“Cùng với sự phát triển không ngừng của thời trang thế giới, rất nhiều thương hiệu cho ra đời
                    những mẫu giày chính hãng đa dạng về phong cách, kiểu dáng, màu sắc, kích cỡ… Một chiếc
                    giày cao cấp chính hãng khắc họa một giá trị đích thực khi nói đến thời trang dành
                    cho con người.”</p>
            </div>
        </div>
    </div>
    <!-- Content2 -->
    <div class="col-lg-12 container" style="margin-top: 30px;">
        <div class="col-lg-12">
            <h3 style="color: #212529; border-bottom: 0.1px solid black;">Expand</h3>
        </div>
        <div class="col-lg-12 d-flex" style="margin-top: 20px; border-bottom: 1px dotted black; padding-bottom: 35px;">
            <div class="col-lg-3" align="center">
                <h5>1000</h5>
                <h6>Sản phẩm</h6>
                <img src="/icon/apple-watch.png" alt="">
            </div>
            <div class="col-lg-3" align="center">
                <h5>3</h5>
                <h6>Chứng nhận đạt chuẩn chất lượng cao</h6>
                <img src="/images/badge.png" alt="">
            </div>
            <div class="col-lg-3" align="center">
                <h5>12300</h5>
                <h6>Khách hàng hài lòng</h6>
                <img src="/images/like.png" alt="">
            </div>
            <div class="col-lg-3" align="center">
                <h5>10</h5>
                <h6>Chi nhánh từ Bắc -> Nam</h6>
                <img src="/images/company.png" alt="">
            </div>
        </div>
        <div class="col-lg-12 d-flex" style="margin-top: 45px;">
            <div class="col-lg-4" align="center">
                <div id="avartar"></div>
                <p style="margin-top: 10px;">Có 40 năm kinh nghiệm trong giới giày dép!</p><br>
                <h4>CEO-Marioto</h4>
            </div>
            <div class="col-lg-4" align="center">
                <div id="avartar1"></div>
                <p style="margin-top: 10px;">Chủ tịch tập đoàn công nghệ đồng hồ Bapple Run</p><br>
                <h4>Đối tác-IronMan</h4>
            </div>
            <div class="col-lg-4" align="center">
                <div id="avartar2"></div>
                <p style="margin-top: 10px;">Chủ tịch tập đoàn phân phối đồng hồ toàn thế giới SportWorld</p>
                <h4>Đối tác-BatMan</h4>
            </div>
        </div>
    </div>
    <!--  -->
    <!-- Content3 -->
    <div class="col-lg-12 container" style="margin-top: 50px;">
        <h3 style="color: #212529; border-bottom: 0.1px solid black;">More</h3>
    </div>
    <div class="container d-flex col-lg-12" style="margin-top: 20px;">
        <div id="firt_more" class="col-lg-4">
            <img class="img_more" src="/images/lshinhthanh.jfif" alt="LichSu"  width="95%" height="180px">
            <a class="a_more" href=""><h5>Lịch sử hình thành GoodSneaker</h5></a>
            <p>Chúng tôi luôn trân trọng tình cảm của khách hàng, các phản hồi, ...</p>
        </div>
        <div id="second_more" class="col-lg-4">
            <img class="img_more" src="/images/doitac.jfif" alt="DoiTac"  width="95%" height="180px">
            <a class="a_more" href=""><h5>Tất cả các đối tác của GoodSneaker</h5></a>
            <p>Chúng tôi luôn trân trọng tình cảm của khách hàng, các phản hồi, ...</p>
        </div>
        <div id="thirth_more" class="col-lg-4">
            <img class="img_more" src="/images/chinhanh.jfif" alt="ChiNhanh" width="95%" height="180px">
            <a class="a_more" href=""><h5>Địa điểm các chi nhánh của GoodSneaker</h5></a>
            <p>Chúng tôi luôn trân trọng tình cảm của khách hàng, các phản hồi, ...</p>
        </div>
    </div>
</div>