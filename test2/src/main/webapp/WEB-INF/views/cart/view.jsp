<%@ page pageEncoding="utf-8"%>
<%@ taglib prefix = "c" uri = "http://java.sun.com/jsp/jstl/core" %>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous"></script>
<script src="https://kit.fontawesome.com/6432a84392.js" crossorigin="anonymous"></script>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js"></script>


<div  class="container">
    <table class="table table-hover" name="table">
        <thead>
            <th>#</th>
            <th>Tên</th>
            <th>Giá</th>
            <th colspan="2">Số lượng</th>
            <th>Tổng tiền</th>
        </thead>
        <tbody>
            <tr ng-repeat="item in cart.items">
                <td>
                    <div class="align-items-center">
                        <img src="/images/{{item.image}}" alt="?" height="50px" width="50px">
                    </div>
                </td>
                <td>{{item.ten}}</td>
                <td>{{item.gia}}</td>
                <td>{{item.qty}}</td>
                <td><input ng-change="cart.saveToLocalStorage()" ng-model="item.qty" type="number" min="1" style="width: 50px"></td>
                <td>{{item.qty*item.gia}}</td>
                <td>
                    <button ng-click="cart.remove(item.id)" class="btn btn-danger">Xóa</button>
                </td>
            </tr>
        </tbody>
    </table>
    <div>
        <button ng-click="showConfirmDialog()" class="btn btn-dark">Xóa hết</button>
        <button ng-click="cart.purchase()" class="btn btn-primary">Thanh toán</button>
    </div>
    <div ng-show="showConfirm">
        <div class="confirm-dialog">
            <p>Bạn có chắc chắn muốn xóa hết không?</p>
            <button ng-click="cancelDelete()" class="btn btn-secondary">Hủy</button>
            <button ng-click="confirmDelete()" class="btn btn-danger">Xóa</button>
        </div>
    </div>

</div>