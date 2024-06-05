<%@ page pageEncoding="utf-8"%>
<%@ taglib prefix = "c" uri = "http://java.sun.com/jsp/jstl/core" %>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous"></script>
<script src="https://kit.fontawesome.com/6432a84392.js" crossorigin="anonymous"></script>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js"></script>

<div class="container" style="min-height: 600px">
    <table class="table table-hover" name="table">
        <thead>
        <th>No</th>
        <th>Order No.</th>
        <th>Order Date</th>
        <th>Shipping Adrress</th>
        <th>Detail</th>
        </thead>
        <tbody>
        <c:set var="count" value="1" /> <!-- Khởi tạo biến đếm với giá trị ban đầu là 1 -->
        <c:forEach items="${orders}" var="item">
            <tr>
                <td>${count}</td>
                <td>${item.id}</td>
                <td>${item.ngaydathang}</td>
                <td>${item.diachi}</td>
               <td>
                   <a style="text-decoration: none;color: blue" href="/order/detail/${item.id}">Click</a>
               </td>
            </tr>
            <c:set var="count" value="${count + 1}" /> <!-- Tăng biến đếm lên 1 sau mỗi lần lặp -->
        </c:forEach>
        </tbody>
    </table>
</div>
