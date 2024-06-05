const app = angular.module("shopping-cart-app",[]);

app.controller("shopping-cart-ctrl", function ($scope, $http,$location) {
    $scope.selectedRow = {
        data: "",
        id: ""
    };

    // ...
    const tableRows = document.querySelectorAll('.table-row');
    tableRows.forEach(row => {
        row.addEventListener('click', () => {
            tableRows.forEach(row => {
                row.classList.remove('table-active');
            });
            row.classList.add('table-active');
            $scope.selectedRow.data = row.querySelector('td').textContent;
            $scope.selectedRow.id = row.getAttribute('data-id');
        });
    });
    // Đảm bảo rằng đã inject $http vào controller
    $scope.spBanChay = [];
    $scope.spGiamGia = [];
    $scope.spMoi = [];
    $scope.thuonghieus = [];
    $scope.initialize = function (){
        $http.get("/rest/products").then(resp=>{
            $scope.spBanChay = resp.data;
            $scope.spMoi = resp.data;
            $scope.spGiamGia = resp.data;
        });
        $http.get("/rest/references/thuonghieu").then(resp=>{
            $scope.thuonghieus = resp.data;
        });
    }
    $scope.pager = {
        page:0,
        size:4,
        get items(){
            const start = this.page * this.size;
            return $scope.spBanChay.slice(start,start+this.size);
        },
        get count(){
            return Math.ceil(1*$scope.spBanChay.length/this.size);
        },
        first(){
            this.page = 0;
        },
        prev(){
            this.page--;
            if(this.page<0){
                this.last();
            }
        },
        next(){
            this.page++;
            if(this.page>(this.count-1)){
                this.first();
            }
        },
        last(){
            this.page = this.count -1;
        }
    };
    $scope.pagerMoi = {
        page:0,
        size:4,
        get items(){
            const start = this.page * this.size;
            return $scope.spMoi.slice(start,start+this.size);
        },
        get count(){
            return Math.ceil(1*$scope.spMoi.length/this.size);
        },
        first(){
            this.page = 0;
        },
        prev(){
            this.page--;
            if(this.page<0){
                this.last();
            }
        },
        next(){
            this.page++;
            if(this.page>(this.count-1)){
                this.first();
            }
        },
        last(){
            this.page = this.count -1;
        }
    };
    $scope.pagerGiamGia = {
        page:0,
        size:4,
        get items(){
            const start = this.page * this.size;
            return $scope.spMoi.slice(start,start+this.size);
        },
        get count(){
            return Math.ceil(1*$scope.spMoi.length/this.size);
        },
        first(){
            this.page = 0;
        },
        prev(){
            this.page--;
            if(this.page<0){
                this.last();
            }
        },
        next(){
            this.page++;
            if(this.page>(this.count-1)){
                this.first();
            }
        },
        last(){
            this.page = this.count -1;
        }
    };

    $scope.thanhtoanngay={
        items: [],
        add: function (id) {
            var item = this.items.find(function (item) {
                return item.id == id;
            });
            if (item) {
                item.qty++;
                this.saveToLocalStorage();
            } else {
                $http.get(`/rest/products/${id}`).then(function (resp) {
                    resp.data.qty = 1;
                    this.items.push(resp.data);
                    this.saveToLocalStorage();
                }.bind(this)); // Sử dụng bind để đảm bảo this đúng context trong hàm callback
            }
        },
        //Luu gio hang vao localstorage
        saveToLocalStorage: function () {
            var json = JSON.stringify(angular.copy(this.items));
            localStorage.setItem("cartmuangay", json);
        },

        //Tong so luong cac mat hang trong gio
        get count(){
            return this.items.map(item => item.qty).reduce((total,qty) => total += qty,0);
        },

        //Tong tien cac mat hang trong gio
        get amount(){
            return this.items.map(item => item.qty * item.gia).reduce((total,qty) => total += qty,0);
        },
        //Doc gio hang tu localstorage
        loadFromLocalStorage(){
            var json = localStorage.getItem("cartmuangay");
            this.items = json? JSON.parse(json):[];
            // var date = new Date();
            // alert('Hom nay la ngay'+ date);
        },
        clear(){
            this.items = [];
            this.saveToLocalStorage();
        },
        actionMuaNgay(id){
            this.clear();
            this.add(id);
            this.saveToLocalStorage();
            this.loadFromLocalStorage();
            window.location.href='/order/checkout';
        }
    }
    $scope.thanhtoanngay.loadFromLocalStorage();

    $scope.cart = {
        items: [],
        add: function (id) {
            var item = this.items.find(function (item) {
                return item.id == id;
            });
            if (item) {
                item.qty++;
                this.saveToLocalStorage();
            } else {
                $http.get(`/rest/products/${id}`).then(function (resp) {
                    resp.data.qty = 1;
                    this.items.push(resp.data);
                    this.saveToLocalStorage();
                }.bind(this)); // Sử dụng bind để đảm bảo this đúng context trong hàm callback
            }
        },
        //Luu gio hang vao localstorage
        saveToLocalStorage: function () {
            var json = JSON.stringify(angular.copy(this.items));
            localStorage.setItem("cart", json);
        },

        //Tong so luong cac mat hang trong gio
        get count(){
            return this.items.map(item => item.qty).reduce((total,qty) => total += qty,0);
        },

        //Tong tien cac mat hang trong gio
        get amount(){
            return this.items.map(item => item.qty * item.gia).reduce((total,qty) => total += qty,0);
        },
        //Doc gio hang tu localstorage
        loadFromLocalStorage(){
            var json = localStorage.getItem("cart");
            this.items = json? JSON.parse(json):[];
            // var date = new Date();
            // alert('Hom nay la ngay'+ date);
        },
        //Xoa sp khoi gio hang
        remove(id){
            var index = this.items.findIndex(item => item.id == id);
            this.items.splice(index,1);
            this.saveToLocalStorage();
        },

        clear(){
            this.items = [];
            this.saveToLocalStorage();
        },
        purchase() {
            window.location.href="/order/checkout"
            $scope.thanhtoanngay.clear();
        }
    };

    $scope.cart.loadFromLocalStorage();

    var today = new Date();
    var day = today.getDate();
    var month = today.getMonth()+1;
    var year = today.getFullYear();
    var date = year+"/"+month+"/"+day;
    $scope.order={
        ngaydathang:new Date(),
        diachi:"",
        sdt:"",
        tongtien:$scope.cart.amount,
        purchase(){
            var order = angular.copy(this);
            //Thuc hien dat hang
            $http.post("/rest/orders",order).then(resp =>{
                $scope.cart.clear();
                location.href = "/order/detail/"+resp.data.id;
                alert("Dat hang thanh cong!");
            }).catch(e =>{
                alert("Loi dat hang!");
                console.log(e);
            })
        },

        get orderDetails(){
            return $scope.cart.items.map(item =>{
                return{
                    product:{id:item.id},
                    giaban:item.gia,
                    soluong:item.qty,
                }
            })
        }
    }
    $scope.orderofTTN={
        ngaydathang:new Date(),
        diachi:"",
        sdt:"",
        tongtien:$scope.thanhtoanngay.amount,
        purchase(){
            var order = angular.copy(this);
            //Thuc hien dat hang
            $http.post("/rest/orders",order).then(resp =>{
                location.href = "/order/detail/"+resp.data.id;
                alert("Dat hang thanh cong!");
            }).catch(e =>{
                alert("Loi dat hang!");
                console.log(e);
            })
        },

        get orderDetails(){
            return $scope.thanhtoanngay.items.map(item =>{
                return{
                    product:{id:item.id},
                    giaban:item.gia,
                    soluong:item.qty,
                }
            })
        }
    }
    $scope.showConfirm = false; // Ẩn hộp thoại xác nhận ban đầu

    // Hiển thị hộp thoại xác nhận
    $scope.showConfirmDialog = function() {
        $scope.showConfirm = true;
    };

    // Hủy bỏ việc xóa
    $scope.cancelDelete = function() {
        $scope.showConfirm = false;
    };

    // Xác nhận xóa
    $scope.confirmDelete = function() {
        $scope.cart.clear(); // Thực hiện xóa
        $scope.showConfirm = false; // Ẩn hộp thoại xác nhận sau khi xóa
    };
   // alert("heelo" + window.location.pathname);
    $scope.initialize();

    //List
    $scope.filters = {
        priceFrom: '',
        priceTo: '',
        brands: [],
        sizes: [],
        colors: []
    };

    $scope.applyFilters = function() {
        console.log('Applied Filters:', $scope.filters);
        console.log($scope.selectedRow.data+"/"+$scope.selectedRow.id);
        location.href = "/product/lists"+"?priceFrom="+$scope.filters.priceFrom+"&priceTo="+$scope.filters.priceTo
        +"&brands="+$scope.selectedRow.id+"&sizes="+$scope.filters.sizes+"&colors="+$scope.filters.colors;
        // Thêm xử lý gọi API ở đây để thực hiện tìm kiếm
    };

});

