myapp.controller("phanquyen-ctrl", function ($scope, $http, $filter, $q, WatchService) {
    // alert("A loi")
    $scope.accounts = [];
    $scope.accountroles = [];
    $scope.quyen = localStorage.getItem("role");

    // Lấy danh sách AccountRole từ API
    $http.get("http://localhost:8080/api/accountrole")
        .then(function (response) {
            $scope.accountroles = response.data;

            // Lấy danh sách Account từ API
            $http.get("http://localhost:8080/api/account")
                .then(function (accountResponse) {
                    $scope.accounts = accountResponse.data;
                    angular.forEach($scope.accountroles,function(itemacrole){
                        angular.forEach($scope.accounts,function(itemac){
                            if(itemacrole.account.id === itemac.id){
                                itemac.vaitroFake = itemacrole.role.name;
                            }
                        })
                    })

                    // Duyệt qua từng AccountRole
                    angular.forEach($scope.accounts, function (account) {
                        // Initialize selectedRoles object for each account
                        account.selectedRoles = {
                            'ADM': false,
                            'STAFF': false,
                            'CUST': false
                        };

                        // Lấy danh sách vai trò tương ứng
                        var rolesForAccount = $scope.accountroles.filter(function (accountRole) {
                            return accountRole.account.id === account.id;
                        });

                        // Nếu có vai trò, set trạng thái checked cho các checkbox tương ứng
                        angular.forEach(rolesForAccount, function (roleForAccount) {
                            account.selectedRoles[roleForAccount.role.name] = true;
                        });
                    });
                })
                .catch(function (error) {
                    console.error("Lỗi khi lấy danh sách Account: ", error);
                });
        })
        .catch(function (error) {
            console.error("Lỗi khi lấy danh sách AccountRole: ", error);
        });

    $scope.updateSelectedRoles = function (acc, role) {
        var confirmed = window.confirm('Bạn có chắc chắn về việc cập nhập quyền cho tài khoản này?');

        if (confirmed) {
            // Check if at least one checkbox is selected
            var atLeastOneSelected = acc.selectedRoles.ADM || acc.selectedRoles.STAFF || acc.selectedRoles.CUST;

            // If at least one checkbox is selected, proceed with the update
            if (atLeastOneSelected) {
                // Uncheck other roles for the current account
                if (role !== 'ADM') {
                    acc.selectedRoles.ADM = false;
                }
                if (role !== 'STAFF') {
                    acc.selectedRoles.STAFF = false;
                }
                if (role !== 'CUST') {
                    acc.selectedRoles.CUST = false;
                }

                // Make an HTTP request to get the array of roles
                $http.get("http://localhost:8080/api/role")
                    .then(function (response) {
                        // Handle the response and find the role by name
                        var rolesArray = response.data;
                        var matchingRole = rolesArray.find(function (roleData) {
                            return roleData.name === role;
                        });
                        var matchingAccountRole = $scope.accountroles.find(function (accountrole) {
                            return accountrole.account.id === acc.id; // Assuming acc has an 'id' property
                        });
                        matchingAccountRole.role = matchingRole;
                        // Alert the matching role object
                        // alert("Đây là accountrole: " + JSON.stringify(matchingAccountRole));
                        $http.post("http://localhost:8080/api/accountrole/add",matchingAccountRole)
                            .then(function (response) {
                                alert("Phân quyền thành công!");
                            })
                            .catch(function (error) {
                                console.error('Error fetching roles:', error);
                            });
                        // alert("Role: " + JSON.stringify(matchingRole) + "\nAccount: " + JSON.stringify(acc));
                    })
                    .catch(function (error) {
                        console.error('Error fetching roles:', error);
                    });
            } else {
                // If no checkbox is selected, prevent unchecking the current checkbox
                acc.selectedRoles[role] = true;
            }
        } else {
            // If not confirmed, revert the checkbox state
            acc.selectedRoles[role] = !acc.selectedRoles[role];
        }
    };


    // $scope.hasRole = function (account, roleName) {
    //     return account.roles && account.roles.some(function (role) {
    //         return role.name === roleName;
    //     });
    // };
});