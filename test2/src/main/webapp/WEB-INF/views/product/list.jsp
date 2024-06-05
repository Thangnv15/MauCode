<%@ page pageEncoding="utf-8"%>
<%@ taglib prefix = "c" uri = "http://java.sun.com/jsp/jstl/core" %>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous"></script>
<script src="https://kit.fontawesome.com/6432a84392.js" crossorigin="anonymous"></script>
<%--<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js"></script>--%>
<link rel="stylesheet" href="/css/list.css">

<style>
    /* Custom CSS for highlighting */
    .highlight {
        background-color: rgb(0, 170, 255); /* Bootstrap warning color */
    }
</style>

<%--<ul class="breadcrumbb container">--%>
<%--    <li><a href="#">Sản phẩm</a></li>--%>
<%--    <li><a href="#">Nam</a></li>--%>
<%--    <li><a href="#">Summer 15</a></li>--%>
<%--    <li>Italy</li>--%>
<%--</ul>--%>
<%--<div class="dropdown">--%>
<%--    <button class="btn btn-secondary dropdown-toggle" type="button" id="filterDropdown" data-bs-toggle="dropdown" aria-expanded="false">--%>
<%--        Chọn một mục--%>
<%--    </button>--%>
<%--    <ul class="dropdown-menu" aria-labelledby="filterDropdown">--%>
<%--        <li><a class="dropdown-item" href="#">Mục 1</a></li>--%>
<%--        <li><a class="dropdown-item" href="#">Mục 2</a></li>--%>
<%--        <li><a class="dropdown-item" href="#">Mục 3</a></li>--%>
<%--        <!-- Thêm các mục khác tùy ý -->--%>
<%--    </ul>--%>
<%--</div>--%>

<div class="container" style="padding-top: 30px">
    <div class="col-lg-12 row">
        <div class="col-lg-2">
            <div>
                <img style="width: 16px;height: 16px" src="/images/category.png"></b>    Danh mục sản phẩm
            </div>
            <div class="list-group">
                <c:forEach items="${cates}" var="loai">
                    <a class="list-group-item" href="/product/list?cid=${loai.id}">${loai.ten}</a>
                </c:forEach>
            </div>
            <div style="padding-top: 20px">
                <img style="width: 16px;height: 16px" src="/images/filter.png"></b>    Lọc theo filter
            </div>
            <div class="list-group">
                <div class="list-group-item">
                    <div style="border-bottom: 0.1px dotted black; ">Theo giá</div>
                    từ
                    <input ng-model="filters.priceFrom" class="form-control" type="text" style="width: 150px">
                    đến
                    <input ng-model="filters.priceTo" class="form-control" type="text" style="width: 150px">
                </div>
                <div class="list-group-item">
                    <div style="border-bottom: 0.1px dotted black; ">Theo thương hiệu</div>
                   <table class="table">
                       <tbody>
                       <c:forEach items="${thuonghieus}" var="th">
                           <tr data-id="${th.id}" class="table-row" data-toggle="tooltip"  data-placement="top" title="Click to highlight and display data">
                               <td>${th.ten}</td>
                           </tr>
                       </c:forEach>
                       </tbody>
                   </table>
                </div>
                <div class="list-group-item">
                    <div style="border-bottom: 0.1px dotted black; ">Theo kích cỡ</div>
                    <c:forEach items="${sizes}" var="kc">
                        <div class="form-check">
                            <label class="form-check-label" for="flexCheckDefault">
                                ${kc.giatri}
                            </label>
                            <input ng-model="filters.sizes" ng-true-value="${kc.id}" ng-false-value="" class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                        </div>
                    </c:forEach>
                </div>
                <div class="list-group-item">
                    <div style="border-bottom: 0.1px dotted black; ">Theo màu sắc</div>
                    <c:forEach items="${mausacs}" var="ms">
                        <div class="form-check">
                            <label class="form-check-label" for="flexCheckDefaultMS${ms.id}">
                                    ${ms.ten}
                            </label>
                            <input ng-model="filters.colors" ng-true-value="${ms.id}" ng-false-value="" class="form-check-input" type="checkbox" value="" id="flexCheckDefaultMS${ms.id}">
                        </div>
                    </c:forEach>
                </div>
                <div style="padding-top: 15px" class="d-flex justify-content-center">
                    <button ng-click="applyFilters()" class="btn btn-primary align-items-center">Áp dụng</button>
                </div>
            </div>
        </div>
        <div class="col-lg-10 row">
            <c:forEach items="${items}" var="sp">
                <div class="col-lg-3" style="margin-bottom: 50px">
                    <div class="panel panel-primary poly-item text-center">
                        <div class="panel-heading">
                            <div style="font-size: 18px" class=" text text-danger">${sp.ten}</div>
                        </div>
                        <div class="panel-body">
                            <a href="/product/detail/${sp.id}">
                                <img style="width: 225px;height: 225px" src="/images/${sp.image}">
                            </a>
                        </div>
                        <div class="panel-footer text-right">
                            <b class="pull-left">${sp.gia}</b>
                        </div>
                        <div class="panel-footer text-right">
                            <button ng-click="cart.add(${sp.id})" type="button" class="btn btn-light">Thêm vào giỏ hàng</button><br>
                            <button ng-click="thanhtoanngay.actionMuaNgay(${sp.id})" type="button" class="btn btn-danger" style=" margin-top: 15px;">Mua ngay</button>
                        </div>
                    </div>
                </div>
            </c:forEach>
        </div>
    </div>
</div>
<%--<script>--%>
<%--    const tableRows = document.querySelectorAll('.table-row');--%>

<%--    tableRows.forEach(row => {--%>
<%--        row.addEventListener('click', () => {--%>
<%--            tableRows.forEach(row => {--%>
<%--                row.classList.remove('table-active');--%>
<%--            });--%>
<%--            row.classList.add('table-active');--%>
<%--            const rowData = row.querySelector('td').textContent;--%>
<%--            const rowId = row.getAttribute('data-id');--%>

<%--            console.log('Selected row data:', rowData);--%>
<%--            console.log('Selected row id:', rowId);--%>
<%--        });--%>
<%--    });--%>
<%--</script>--%>

