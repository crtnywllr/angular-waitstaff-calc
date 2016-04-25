var app = angular.module('myApp', ['ngMessages']);

app.service("mealDataService", function () {
    var meals = [];

    var totals = {
        mealCount: 0,
        tipTotal: 0,
        tipAvg: 0
    };
    return {
        addMeal: function (meal) {
            console.log(meal);
            meals.push(meal);
            //console.log(meals);
            totals.mealCount++;
            totals.tipTotal += meal.tipAmt;
            totals.tipAvg = (totals.tipTotal / totals.mealCount);
            console.log(totals);
            return totals;
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
    $scope.data = {};

    $scope.submit = function () {
        if ($scope.mealInput.$valid) {

            $scope.mealCount++;

            $scope.data.subtotal = ($scope.data.price + ($scope.data.price * ($scope.data.tax / 100)));
            $scope.data.tipAmt = ($scope.data.price * ($scope.data.tip / 100));
            $scope.data.total = ($scope.data.subtotal + $scope.data.tipAmt);


            var meal = {
                subtotal: $scope.data.subtotal,
                tipAmt: $scope.data.tipAmt,
                total: $scope.data.total
            }
        };
        mealDataService.addMeal(meal);
        $scope.getTotals();

    };

    $scope.getTotals = function () {
        var tipTotal = mealDataService.getTotals().tipTotal;
        console.log(tipTotal);
        var mealCount = mealDataService.getTotals().mealCount;
        var tipAvg = mealDataService.getTotals().tipAvg;
        $scope.tipTotal = tipTotal;
        $scope.mealCount = mealCount;
        $scope.tipAvg = tipAvg;
    }
    $scope.getTotals();
    console.log($scope.tipTotal);

});

/*app.controller('chargesController', function ($scope, mealDataService) {
    $scope.getMeals = function () {
        var meals = mealDataService.getMeals();
        $scope.meals = meals;

    };

    $scope.getMeals();
    console.log($scope.meals);
    $scope.mealCount = $scope.meals.length;

});*/

/*app.controller('earningsController', function ($scope, mealDataService) {
    console.log(mealDataService);

    console.log($scope.tipTotal);

});*/
