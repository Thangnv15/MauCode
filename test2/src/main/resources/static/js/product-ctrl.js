myapp.controller("product-ctrl",function ($scope,$http,$filter){
    // alert("Quan li san pham")
    $scope.items = [];
    $scope.form = {};
    $scope.references = [];
    $scope.references.push({
        cates : [],
        hang:[],
        kichco:[],
        mausac:[],
        chatlieu:[],
        thuonghieu:[],
        xuatxu:[]
    })


    $scope.initialize = function (){
        //load products
        $http.get("/rest/products").then(resp=>{
            $scope.items = resp.data;
            $scope.items.forEach(item =>{
                let date = new Date(item.ngaycapnhap);
                item.ngaycapnhap = date.getDate()+"-"+date.getMonth()+"-"+date.getFullYear();
            })
        });
        //load references
        $http.get("/rest/references/loaigiay").then(resp=>{
            $scope.references.cates = resp.data;
        })

        $http.get("/rest/references/hang").then(resp=>{
            $scope.references.hang = resp.data;
        })

        $http.get("/rest/references/kichco").then(resp=>{
            $scope.references.kichco = resp.data;
        })

        $http.get("/rest/references/mausac").then(resp=>{
            $scope.references.mausac = resp.data;
        })

        $http.get("/rest/references/chatlieu").then(resp=>{
            $scope.references.chatlieu = resp.data;
        })

        $http.get("/rest/references/thuonghieu").then(resp=>{
            $scope.references.thuonghieu = resp.data;
        })

        $http.get("/rest/references/xuatxu").then(resp=>{
            $scope.references.xuatxu = resp.data;
        })
    }
    $scope.edit = function (item){
        $scope.form = angular.copy(item);
        $scope.form.ngaycapnhap = new Date(item.ngaycapnhap);
        $scope.form.image = '/images/'+item.image;
    }

    // $scope.imageChanged = function (files){
    //     var  data = new FormData();
    //     data.append('file',files[0]);
    //     $http.post()
    //     console.log(data);
    // }

    $scope.resest = function (){
        $scope.form = {
            ngaycapnhap:new Date(),
            image:'/images/cloud.png',

        }
    }

    $scope.create = function (){
        var file = document.getElementById('fileInput');
        const select = file.files[0];
        var item = angular.copy($scope.form);
        item.image = select.name;
        item.id = null;
        item.ngaycapnhap = new Date();
        $http.post('/rest/products',item).then(resp=>{
            resp.data.ngaycapnhap = new Date(resp.data.ngaycapnhap);
            $scope.items.push(resp.data);
            $scope.resest();
            $scope.initialize();
            alert("Insert successfully!");
        }).catch(e =>{
            console.log(e);
        })
    }

    $scope.update = function (){
        var file = document.getElementById('fileInput');
        const select = file.files[0];
        var item = angular.copy($scope.form);
        item.image = select.name;
        var uri = '/rest/products/'+item.id;
        $http.put(uri,item).then(resp=>{
            var index = $scope.items.findIndex(p=>p.id == item.id);
            $scope.items[index] = item;
            $scope.initialize();
            alert("Update successfully!");
        }).catch(e =>{
            console.log(e);
        })
    }
    $scope.delete = function (item){
            var uri = '/rest/products/'+item.id;
            $http.delete(uri,item).then(resp=>{
                var index = $scope.items.findIndex(p=>p.id == item.id);
                $scope.items.splice(index,1);
                $scope.resest();
                $scope.initialize();
                alert("Delete successfully!");
            }).catch(e =>{
                console.log(e);
            })

    }

    $scope.pager = {
        page:0,
        size:10,
        get items(){
            const start = this.page * this.size;
            return $scope.items.slice(start,start+this.size);
        },
        get count(){
            return Math.ceil(1*$scope.items.length/this.size);
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
            this.page = this.count-1;
        }

    }

    $scope.initialize();

})