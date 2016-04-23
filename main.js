angular.module('myApp', ['ngMessages'])
    .controller("myCtrl", function ($scope) {
        $scope.data = {};

        $scope.submit = function () {
            if ($scope.mealInput.$valid) {
                $scope.data.subtotal = ($scope.data.price + ($scope.data.price * ($scope.data.tax / 100)));
                $scope.data.tipAmt = ($scope.data.price * ($scope.data.tip / 100));
                $scope.data.total = ($scope.data.price + ($scope.data.price * ($scope.data.tax / 100)) + ($scope.data.price * ($scope.data.tip / 100)));
            };
        };


        $scope.reset = function () {
            $scope.data = {};
        };
    });
