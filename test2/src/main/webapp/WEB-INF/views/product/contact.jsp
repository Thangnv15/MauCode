<%@ page pageEncoding="utf-8"%>
<%@ taglib prefix = "c" uri = "http://java.sun.com/jsp/jstl/core" %>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous"></script>
<script src="https://kit.fontawesome.com/6432a84392.js" crossorigin="anonymous"></script>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js"></script>

<div style="min-height: 600px">
    <div class="col-lg-12 container" style="margin-top: 20px; border-bottom: 1px double black;">
        <h2>Liên hệ</h2>
    </div>
    <div class="col-lg-12 container" style="margin-top: 30px;">
        <div class="col-lg-12 d-flex" >
            <div class="col-lg-4 d-flex align-items-center">
                <img src="/images/location.png" alt="?" height="64px" width="64px">
                <p style="margin-left: 10px;">Địa chỉ: Uy Nỗ-Đông Anh- Hà Nội</p>
            </div>
            <div class="col-lg-4 d-flex align-items-center">
                <img src="/images/call.png" alt="?" height="64px" width="64px">
                <p style="margin-left: 10px;">Số điện thoại: 0123456789</p>
            </div>
            <div class="col-lg-4 d-flex align-items-center">
                <img src="/images/gmail.png" alt="?" height="64px" width="64px">
                <p style="margin-left: 10px;">Email: goodsneaker@gmail.com</p>
            </div>
        </div>
        <div class="col-lg-12" style="margin-top: 50px;" align="center">
            <div class="col-lg-12" style="width: 60%;">
                <div class="col-lg-12 d-flex" style="margin-top: 10px;">
                    <div class="col-lg-6">
                        <input type="text" class="form-control" style="width: 90%;" placeholder="Họ và tên">
                    </div>
                    <div class="col-lg-6">
                        <input type="text" class="form-control" style="width: 90%;" placeholder="Số điện thoại">
                    </div>
                </div>
                <div class="col-lg-12 d-flex" style="margin-top: 10px;">
                    <div class="col-lg-6">
                        <input type="text" class="form-control" style="width: 90%;" placeholder="Email">
                    </div>
                    <div class="col-lg-6">
                        <input type="text" class="form-control" style="width: 90%;" placeholder="Địa chỉ">
                    </div>
                </div>
                <div class="col-lg-12 d-flex justify-content-center" style="margin-top: 10px;">
                    <textarea name="" id="" style="width: 95%;" rows="4" class="form-control" placeholder="Lời nhắn"></textarea>
                </div>
            </div>
        </div>
        <div class="col-lg-12" style="margin-top: 20px;" align="center">
            <button class="btn btn-primary" style="width: 300px;" onclick="send()">Gửi đi</button>
        </div>
    </div>
</div>