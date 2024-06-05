<%@ page pageEncoding="utf-8"%>
<%@ taglib prefix = "c" uri = "http://java.sun.com/jsp/jstl/core" %>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous"></script>
<script src="https://kit.fontawesome.com/6432a84392.js" crossorigin="anonymous"></script>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js"></script>

<div class="container" style="height: 500px">
    <form action="/signup/post" method="post">
        <!-- Email input -->
        <div class="form-outline mb-4">
            <label class="form-label">Tên đăng nhập</label>
            <input value="${valueUser}" type="text" name="username"  class="form-control" />
            <div style="color: red">${errorUsername}</div>
        </div>

        <!-- Password input -->
        <div class="form-outline mb-4">
            <label class="form-label">Mật khẩu</label>
            <input value="${valuePass}" type="password" name="password" class="form-control" />
            <div style="color: red"> ${errorPassword}</div>
        </div>

        <div class="form-outline mb-4">
            <label class="form-label">Nhập lại mật khẩu</label>
            <input value="${valueRepass}" type="password" name="repassword" class="form-control" />
            <div style="color: red">${errorRepassword}</div>
        </div>

        <button type="submit" class="btn btn-primary">Tạo tài khoản</button>
    </form>
</div>
