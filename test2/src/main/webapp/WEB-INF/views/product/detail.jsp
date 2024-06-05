<%@ page pageEncoding="utf-8"%>
<%@ taglib prefix = "c" uri = "http://java.sun.com/jsp/jstl/core" %>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous"></script>
<script src="https://kit.fontawesome.com/6432a84392.js" crossorigin="anonymous"></script>
<link rel="stylesheet" href="/css/detail.css">

<main>
    <div class="col-lg-12 container d-flex" style="margin-top: 20px;">
        <div class="col-lg-6" style="margin-right: 20px;">
            <div class="col-lg-12" style="border-bottom: 1px dotted black;">
                <h3>Sản phẩm</h3>
            </div>
            <div class="col-lg-12" style="margin-top: 20px;background-image: url('/images/${items.image}'); height: 550px; background-size: 100%; background-repeat: no-repeat; background-position: center;"></div>
        </div>
        <div class="col-lg-6">
            <div class="col-lg-12" style="border-bottom: 1px dotted black;">
                <h3>Thông tin</h3>
            </div>
            <div class="col-lg-12" style="margin-top: 20px;">
                <h5>${items.ten}</h5>
                <h4 style="margin-top: 35px; color: #FFC107;">${items.gia}<u>vnđ</u></h4>
                <h6 style="margin-top: 20px;">Mô tả</h6>
                <ul>
                    <li>Mã: SP${items.id}</li>
                    <li>Loại sản phẩm: ${items.loaigiay.ten}</li>
                    <li>Hãng sản xuất: ${items.hang.ten}</li>
                    <li>Màu sắc: ${items.mausac.ten}</li>
                    <li>Kích cỡ: 38-45</li>
                    <li>Chất liệu: ${items.chatlieu.ten}</li>
                    <li>Xuất xứ: ${items.xuatxu.ten}</li>
                    <li>Số lượng đã bán: 1011</li>
                    <li>Mô tả: ${items.mota}</li>
                </ul>
            </div>
            <div class="col-lg-12 d-flex" style="margin-top: 30px; border-bottom: 1px dotted black; padding-bottom: 10px;">
                <div class="btn-group col-lg-3" role="group" aria-label="Basic example">
                    <button  ng-click="decrease()" type="button" class="btn btn-light">-</button>
                    <button id="soluong" type="button" class="btn btn-light">1</button>
                    <button ng-click="increase()" type="button" class="btn btn-light">+</button>
                </div>
                <div class="col-lg-5 d-flex justify-content-center">
                    <button style="width: 80%;" class="btn btn-danger"><a href="#thanhtoan" style="text-decoration: none; color: white;">Mua ngay</a></button>
                </div>
                <div class="col-lg-4 d-flex justify-content-start">
                    <button ng-click="cart.add(${items.id})" style="width: 80%;" class="btn btn-secondary"><a style="text-decoration: none; color: white;">Thêm vào giỏ hàng</a></button>
                </div>
            </div>

            <div class="col-lg-12" style="margin-top: 15px;">
                <h6>Đánh giá</h6>
                <form action="">
                    <textarea placeholder="Nhận xét về sản phẩm của bạn(*không bắt buộc)" class="form-control" style="width: 93%;" name="" id=""rows="3"></textarea>
                    <div class="col-lg-12 d-flex" style="margin-top: 7px;">
                        <div class="col-lg-4">
                            <h6>Tên</h6>
                            <input style="width: 80%;" type="text" class="form-control" placeholder="Điền tên">
                        </div>
                        <div class="col-lg-4">
                            <h6>Email</h6>
                            <input style="width: 80%;" type="text" class="form-control" placeholder="Địa chỉ Email">
                        </div>
                        <div class="col-lg-4 align-self-end">
                            <button style="width: 50%;" class="btn btn-primary">Gửi đi</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- content2 -->
    <div class="col-lg-12 container" style="margin-top: 30px; border-bottom: 1px double black;">
        <h4>Sản phẩm tương tự</h4>
    </div>
    <div class="col-lg-12 d-flex" style="margin-top: 30px;">
        <c:set var="itemsPerPage" value="6" />
        <c:set var="currentPage" value="1" />
        <c:set var="startIndex" value="${(currentPage - 1) * itemsPerPage}" />
        <c:set var="endIndex" value="${startIndex + itemsPerPage - 1}" />

        <c:forEach var="l" items="${items.loaigiay.products}" varStatus="loop">
            <c:if test="${loop.index >= startIndex && loop.index <= endIndex}">
                <div class="col-lg-2 _product" align="center">
                    <img src="/images/${l.image}" alt="Clock" width="100%">
                    <h6>${l.ten}</h6>
                    <p>${l.gia}vnđ</p>
                </div>
            </c:if>
        </c:forEach>
    </div>
</main>

<%--    <div class="container-fluid row">--%>
<%--        <div class="col-lg-8">--%>
<%--                ChiTiet--%>
<%--                <h1>${items.ten}</h1>--%>
<%--                <h1>${items.loaigiay.ten}</h1>--%>

<%--                CungLoai--%>
<%--                <ul>--%>
<%--                    <c:forEach var="l" items="${items.loaigiay.products}">--%>
<%--                        <li>--%>
<%--                            <a href="/product/detail/${l.id}">${l.ten}</a>--%>
<%--                        </li>--%>
<%--                    </c:forEach>--%>
<%--                </ul>--%>
<%--        </div>--%>
<%--        <div class="col-lg-4">--%>
<%--            <div>--%>
<%--                <b class="fas fa-shopping-cart"></b>Danh mục--%>
<%--            </div>--%>
<%--            <div class="list-group">--%>
<%--                <c:forEach items="${cates}" var="loai">--%>
<%--                    <a class="list-group-item" href="/product/list?cid=${loai.id}">${loai.ten}</a>--%>
<%--                </c:forEach>--%>
<%--            </div>--%>
<%--        </div>--%>
<%--    </div>--%>
