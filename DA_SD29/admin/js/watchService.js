myapp.service('WatchService', ['$http', function ($http) {
    this.sendWatchToServer = function (watch) {
        return $http.post("http://localhost:8080/api/watch/ImportExcel", watch);
    };
}]);