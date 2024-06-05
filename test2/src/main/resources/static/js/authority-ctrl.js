myapp.controller("authority-ctrl",function ($scope,$http,$location){
    $scope.roles=[];
    $scope.admins = [];
    $scope.authorities = [];

    $scope.initialize=function (){
        //load all roles
        $http.get("/rest/roles").then(resp=>{
            $scope.roles = resp.data;
        });

        //load staff and directors(administrators)
        $http.get("/rest/accounts?admin=true").then(resp=>{
            $scope.admins = resp.data;
        });
        //load authorities of staffs and directors
        $http.get("/rest/authorities?admin=true").then(resp=>{
            $scope.authorities = resp.data;
        }).catch(e=>{
            $location.path("/unauthorized");
            console.log(e);
        })
    }

    $scope.authority_of = function (acc,role){
        if($scope.authorities){
            return $scope.authorities.find(ur =>ur.account.username == acc.username && ur.chucvu.id == role.id)
        }
    }

    $scope.authority_change = function (acc,role){
        var authority = $scope.authority_of(acc,role);
        if(authority){//da cap quyen => thu hoi quyen (xoa)
            $scope.revoke_authority(authority);
        }else{//chua dc cap quyen => cap quyen (them moi)
            authority ={account:acc,chucvu:role};
            $scope.grant_authority(authority);
        }
    }

    //Them moi authority
    $scope.grant_authority = function (authority){
        $http.post("/rest/authorities",authority).then(resp=>{
            $scope.authorities.push(resp.data);
            alert("Cap quyen thanh cong!");
        }).catch(e=>{
            alert("Cap quyen that bai");
            console.log(e);
        })
    }
    //Xoa authority
    $scope.revoke_authority = function (authority){
        var uri = "/rest/authorities/"+authority.id;
        $http.delete(uri).then(resp=>{
            var index = $scope.authorities.findIndex(a => a.id == authority.id);
            $scope.authorities.splice(index,1);
            alert("Thu hoi quyen su dung thanh cong!");
        }).catch(e=>{
            alert("Thu hoi quyen su dung that bai!");
            console.log(e);
        })
    }

    $scope.initialize();
})