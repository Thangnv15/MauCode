<%@ page pageEncoding="utf-8"%>
<%@ taglib prefix = "c" uri = "http://java.sun.com/jsp/jstl/core" %>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous"></script>
<script src="https://kit.fontawesome.com/6432a84392.js" crossorigin="anonymous"></script>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js"></script>

<%--<div class="container">--%>
<%--    <table class="table table-hover" name="table">--%>
<%--        <thead>--%>
<%--        <th>Id</th>--%>
<%--        <th>Name</th>--%>
<%--        <th>Price</th>--%>
<%--        <th>Quantity</th>--%>
<%--        <th>Amount</th>--%>
<%--        </thead>--%>
<%--        <tbody>--%>
<%--        <tr ng-repeat="item in cart.items">--%>
<%--            <td>{{item.id}}</td>--%>
<%--            <td>{{item.ten}}</td>--%>
<%--            <td>{{item.gia}}</td>--%>
<%--            <td>{{item.qty}}</td>--%>
<%--            <td>{{item.qty*item.gia}}</td>--%>
<%--        </tr>--%>
<%--        </tbody>--%>
<%--    </table>--%>
<%--</div>--%>
<%--<div class="container">--%>
<%--    <div class="mb-3">--%>
<%--        <label>Purchase</label>--%>
<%--        <input class="form-control" value="${pageContext.request.remoteUser}" disabled="true">--%>
<%--    </div>--%>
<%--    <div class="mb-3">--%>
<%--        <label>Date</label>--%>
<%--        <input class="form-control" type="text" pattern="yyyy-MM-dd" disabled="true" value="{{order.ngaydathang}}">--%>
<%--    </div>--%>
<%--    <div class="mb-3">--%>
<%--        <label>Shipping Address</label>--%>
<%--        <input class="form-control" type="text" row="3" ng-model="order.diachi">--%>
<%--    </div>--%>
<%--    <div class="mb-3">--%>
<%--        <button ng-click="order.purchase()" class="btn btn-success">Purchase</button>--%>
<%--    </div>--%>
<%--</div>--%>

<div class="container-fluid" style="padding: 0px;">
    <!-- Content -->
    <div ng-switch="thanhtoanngay.count > 0">
        <div ng-switch-when="true">
            <div class="col-lg-12 container d-flex" style="margin-top: 25px;">
                <div class="col-lg-6">
                    <div style="border-bottom: 1px dotted black; margin-bottom: 5px;" class="col-lg-12"><h4>Thông tin thanh toán</h4></div>
                    <div class="col-lg-12 content_left" >
                        <label style="margin-top: 15px;" >Người mua*</label>
                        <input value="${pageContext.request.remoteUser}" type="text" class="form-control" disabled="true" style="margin-top: 5px; width: 80%;">

                        <label style="margin-top: 15px;" >Phone*</label>
                        <input type="text" class="form-control" ng-model="orderofTTN.sdt" placeholder="Điền số điện thoại" style="margin-top: 5px; width: 80%;">

                        <label style="margin-top: 15px;" >Địa chỉ*</label>
                        <input type="text" class="form-control" ng-model="orderofTTN.diachi" placeholder="Điền địa chỉ" style="margin-top: 5px; width: 80%;">

                        <label style="margin-top: 15px;" >Email(không bắt buộc)</label>
                        <input type="text" class="form-control" placeholder="Điền địa chỉ email" style="margin-top: 5px; width: 80%;">

                        <label style="margin-top: 15px;">Ghi chú(không bắt buộc)</label><br>
                        <textarea style="margin-top: 5px;width: 80%;" class="form-control"  rows="4" placeholder="Ghi chú về đơn hàng, ví du: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn"></textarea>
                    </div>
                </div>
                <div class="col-lg-6" style="padding-left: 40px;">
                    <div style="border-bottom: 1px dotted black; margin-bottom: 5px;" class="col-lg-12"><h4>Hóa đơn của bạn</h4></div>
                        <div class="col-lg-12 d-flex" style="border-bottom: 1px dotted black; margin-top: 15px;">
                            <div class="col-lg-6 d-flex justify-content-start">
                                <h6>Tổng tiền sản phẩm</h6>
                            </div>
                            <div class="col-lg-6 d-flex justify-content-end">
                                <p>{{thanhtoanngay.amount}}vnđ</p>
                            </div>
                        </div>
                        <div class="col-lg-12 d-flex" style="border-bottom: 1px dotted black; margin-top: 15px;">
                            <div class="col-lg-6 d-flex justify-content-start">
                                <h6>Phí vận chuyển</h6>
                            </div>
                            <div class="col-lg-6 d-flex justify-content-end">
                                <p>15.000vnđ</p>
                            </div>
                        </div>
                        <div class="col-lg-12 d-flex" style="border-bottom: 1.5px solid black; margin-top: 15px;">
                            <div class="col-lg-6 d-flex justify-content-start">
                                <h6>Thành tiền</h6>
                            </div>
                            <div class="col-lg-6 d-flex justify-content-end">
                                <p>{{thanhtoanngay.amount+15000}}vnđ</p>
                            </div>
                        </div>
                        <div class="col-lg-12 d-flex" style="border-bottom: 1.5px solid black; margin-top: 15px; padding-bottom: 10px;">
                            <div class="col-lg-6 d-flex justify-content-start">
                                <input class="form-check-input" type="radio" name="vanchuyen" checked>Trực tiếp
                            </div>
                            <div class="col-lg-6 d-flex justify-content-end">
                                <input class="form-check-input" type="radio" name="vanchuyen">Chuyển khoản
                            </div>
                        </div>
                        <div class="col-lg-12" style="margin-top: 5px;">
                            <button ng-click="orderofTTN.purchase()" type="button" class="btn btn-danger" style="width: 100%;">Đặt hàng</button>
                        </div>

                        <div style="margin-top: 15px">
                            <img src="/images/attach.png" style="width: 16px;height: 16px">
                            <label style="margin-top: 15px;" >Mã giảm giá</label>
                        </div>
                        <input type="text" class="form-control" placeholder="Điền mã giảm giá nếu có" style="margin-top: 5px; width: 100%;">
                        <div class="col-lg-12" style="margin-top: 5px;">
                            <button type="button" class="btn btn-light" style="width: 100%;">Áp dụng</button>
                        </div>
                </div>
            </div>
        </div>
        <div ng-switch-when="false">
            <div class="col-lg-12 container d-flex" style="margin-top: 25px;">
                <div class="col-lg-6">
                    <div style="border-bottom: 1px dotted black; margin-bottom: 5px;" class="col-lg-12"><h4>Thông tin thanh toán</h4></div>
                    <div class="col-lg-12 content_left" >
                        <label style="margin-top: 15px;" >Người mua*</label>
                        <input value="${pageContext.request.remoteUser}" type="text" class="form-control" disabled="true" style="margin-top: 5px; width: 80%;">

                        <label style="margin-top: 15px;" >Phone*</label>
                        <input type="text" class="form-control" ng-model="order.sdt" placeholder="Điền số điện thoại" style="margin-top: 5px; width: 80%;">

                        <label style="margin-top: 15px;" >Địa chỉ*</label>
                        <input type="text" class="form-control" ng-model="order.diachi" placeholder="Điền địa chỉ" style="margin-top: 5px; width: 80%;">

                        <label style="margin-top: 15px;" >Email(không bắt buộc)</label>
                        <input type="text" class="form-control" placeholder="Điền địa chỉ email" style="margin-top: 5px; width: 80%;">

                        <label style="margin-top: 15px;">Ghi chú(không bắt buộc)</label><br>
                        <textarea style="margin-top: 5px;width: 80%;" class="form-control" rows="4" placeholder="Ghi chú về đơn hàng, ví du: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn"></textarea>
                    </div>
                </div>
                <div class="col-lg-6" style="padding-left: 40px;">
                    <div style="border-bottom: 1px dotted black; margin-bottom: 5px;" class="col-lg-12"><h4>Hóa đơn của bạn</h4></div>
                        <div class="col-lg-12 d-flex" style="border-bottom: 1px dotted black; margin-top: 15px;">
                            <div class="col-lg-6 d-flex justify-content-start">
                                <h6>Tổng tiền sản phẩm</h6>
                            </div>
                            <div class="col-lg-6 d-flex justify-content-end">
                                <p>{{cart.amount}}vnđ</p>
                            </div>
                        </div>
                        <div class="col-lg-12 d-flex" style="border-bottom: 1px dotted black; margin-top: 15px;">
                            <div class="col-lg-6 d-flex justify-content-start">
                                <h6>Phí vận chuyển</h6>
                            </div>
                            <div class="col-lg-6 d-flex justify-content-end">
                                <p>15.000vnđ</p>
                            </div>
                        </div>
                        <div class="col-lg-12 d-flex" style="border-bottom: 1.5px solid black; margin-top: 15px;">
                            <div class="col-lg-6 d-flex justify-content-start">
                                <h6>Thành tiền</h6>
                            </div>
                            <div class="col-lg-6 d-flex justify-content-end">
                                <p>{{cart.amount+15000}}vnđ</p>
                            </div>
                        </div>
                        <div class="col-lg-12 d-flex" style="border-bottom: 1.5px solid black; margin-top: 15px; padding-bottom: 10px;">
                            <div class="col-lg-6 d-flex justify-content-start">
                                <input class="form-check-input" type="radio" name="vanchuyen" checked>Trực tiếp
                            </div>
                            <div class="col-lg-6 d-flex justify-content-end">
                                <input class="form-check-input" type="radio" name="vanchuyen">Chuyển khoản
                            </div>
                        </div>
                        <div class="col-lg-12" style="margin-top: 5px;">
                            <button ng-click="order.purchase()" type="button" class="btn btn-danger" style="width: 100%;">Đặt hàng</button>
                        </div>

                        <div style="margin-top: 15px">
                            <img src="/images/attach.png" style="width: 16px;height: 16px">
                            <label style="margin-top: 15px;" >Mã giảm giá</label>
                        </div>
                        <input type="text" class="form-control" placeholder="Điền mã giảm giá nếu có" style="margin-top: 5px; width: 100%;">
                        <div class="col-lg-12" style="margin-top: 5px;">
                            <button type="button" class="btn btn-light" style="width: 100%;">Áp dụng</button>
                        </div>
                </div>
            </div>
        </div>
    </div>

</div>