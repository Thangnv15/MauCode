var app = angular.module('QRCodeScannerApp', []);

app.controller('QRCodeScannerController', ['$scope', function($scope) {
    $scope.qrCodeResult = 'No QR Code detected';
    $scope.qrCodeObject = null;

    let scanner = new Instascan.Scanner({ video: document.getElementById('qr-video') });

    scanner.addListener('scan', function (content) {
        $scope.$apply(function() {
            $scope.qrCodeResult = 'QRCode content: ' + content;
            $scope.qrCodeObject = JSON.parse(content); // Chuyển đổi JSON thành đối tượng
        });
        scanner.stop(); // Dừng quét sau khi quét thành công
    });

    Instascan.Camera.getCameras().then(function (cameras) {
        if (cameras.length > 0) {
            scanner.start(cameras[0]); // Sử dụng camera đầu tiên
        } else {
            console.error('No cameras found.');
        }
    }).catch(function (e) {
        console.error(e);
    });
}]);
