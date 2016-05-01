var app = angular.module('myApp', ['ngMessages', 'ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/details', {
            templateUrl: 'partials/details.html',
            controller: 'inputController'
        })
        .when('/charges', {
            templateUrl: 'partials/charges.html',
            controller: 'chargesController'
        })
        .when('/earnings', {
            templateUrl: 'partials/earnings.html',
            controller: 'earningsController'
        })
        .otherwise({
            redirectTo: "/details"
        });
});


app.service("mealDataService", function () {
    var meals = [];

    var totals = {
        mealCount: 0,
        tipTotal: 0,
        tipAvg: 0
    };
    return {
        addMeal: function (meal) {
            meals.push(meal);
            totals.mealCount++;
            totals.tipTotal += meal.tipAmt;
            totals.tipAvg = (totals.tipTotal / totals.mealCount);
        },

        getMeals: function () {
            return meals;
            console.log(meals);
        },
        getTotals: function () {
            return totals;
            console.log(totals);
        },

        reset: function () {
            meals.length = 0;
            totals = {
                mealCount: 0,
                tipTotal: 0,
                tipAvg: 0
            };
        }

    };

});

app.controller('inputController', function ($scope, mealDataService) {
    $scope.mealCount = 0;

    $scope.submit = function () {
        // console.log("I submitted something");
        if ($scope.mealInput.$valid) {
            $scope.mealCount++;
            // console.log('mealCount ' + $scope.mealCount);
            $scope.subtotal = ($scope.price + ($scope.price * ($scope.tax / 100)));
            // console.log('subtotal ' + $scope.subtotal);
            $scope.tipAmt = ($scope.price * ($scope.tip / 100));
            //console.log('tipAmt ' + $scope.tipAmt);
            $scope.total = ($scope.subtotal + $scope.tipAmt);
            // console.log('total ' + $scope.total);

            var meal = {
                subtotal: $scope.subtotal,
                tipAmt: $scope.tipAmt,
                total: $scope.total
            };
            //console.log(meal.total);
        }
        mealDataService.addMeal(meal);
        //console.log(mealDataService);
        //console.log('meal' + meal);

    };

});


app.controller('chargesController', function ($scope, mealDataService) {
    $scope.getMeals = function () {
        var meals = mealDataService.getMeals();
        $scope.meals = meals;

    };

    $scope.getMeals();
    //console.log($scope.meals[0].total);
    $scope.mealCount = $scope.meals.length;

});

app.controller('earningsController', function ($scope, mealDataService) {
    //console.log(mealDataService);
    //Update Earnings Info
    $scope.getTotals = function () {
        var tipTotal = mealDataService.getTotals().tipTotal;
        var mealCount = mealDataService.getTotals().mealCount;
        var tipAvg = mealDataService.getTotals().tipAvg;
        $scope.tipTotal = tipTotal;
        $scope.mealCount = mealCount;
        $scope.tipAvg = tipAvg;
    };
    $scope.getTotals();
    //console.log($scope.tipTotal);

});

app.controller('resetCtrl', function ($scope, mealDataService) {
    //Reset
    $scope.reset = function () {
        location.reload();
    };

})
