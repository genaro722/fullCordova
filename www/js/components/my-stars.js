angular.module('app.components')
        .component('myStars', {templateUrl: 'templates/components/my-stars.html',
            controller: starsCtrl,
            bindings: {
                config: "=",
                value: "="
            }
        });
function starsCtrl($scope, $timeout) {
    var $ctrl = this;
    $ctrl.sizeStar = "";
    $ctrl.count = 0;

    $scope.$watchCollection('$ctrl.config', function (newValue, oldValue) {
        switch ($ctrl.config.size) {
            case 1:
                $ctrl.sizeStar = "";
                break;
            case 2:
                $ctrl.sizeStar = "fa-2x";
                break;
            case 3:
                $ctrl.sizeStar = "fa-3x";
                break;
            case 4:
                $ctrl.sizeStar = "fa-4x";
                break;
            case 5:
                $ctrl.sizeStar = "fa-5x";
                break;
        }
    });
    $scope.$watch('$ctrl.value', function (newValue, oldValue) {
        if ($ctrl.value !== null && $ctrl.value !== undefined && $ctrl.value !== "") {
            $ctrl.stars();
        } else {
            $ctrl.estrella = [];
            for (var i = 0; i < 5; i++) {
                $ctrl.estrella.push("fa-star-o");
            }
//            $ctrl.value = 0;
//            $ctrl.config.response = $ctrl.value;
        }
    });

    $ctrl.selectStar = function (number) {
        $ctrl.count += 1;
        if ($ctrl.config.type === "input") {
            $timeout(function () {
                if ($ctrl.count === 1) {
                    $ctrl.numberStar(number);
                    $ctrl.count = 0;
                } else {
                    if ($ctrl.config.decimal === true) {
                        $ctrl.count = 0;
                        $ctrl.value = (number - 1) + 1.5;
                        $ctrl.stars();
                    } else {
                        $ctrl.count = 0;
                    }
                }
            }, 400);
        }
    };
    if ($ctrl.config === null || $ctrl.config === undefined || $ctrl.config === null) {
        $ctrl.config = {};
        $ctrl.config.color = 'rgb(56, 126, 245)';
        $ctrl.config.type = "show";
        $ctrl.config.size = 2;
//        $ctrl.config.response = 0;
    }

    $ctrl.numberStar = function (number) {
        for (var h = 0; h < $ctrl.estrella.length; h++) {
            if (h <= number) {
                $ctrl.estrella[h] = "fa-star";
            } else {
                $ctrl.estrella[h] = "fa-star-o";
            }
        }
        $ctrl.value = number + 1;
    };

    $ctrl.stars = function () {
        if ($ctrl.value > 5) {

        } else {
            $ctrl.estrella = [];
            if ($ctrl.value % 1 === 0) {
//        console.log("Es un numero entero");
                for (var i = 0; i < $ctrl.value; i++) {
                    $ctrl.estrella.push("fa-star");
                }
                var resto = 5 - $ctrl.value;
                for (var a = 0; a < resto; a++) {
                    $ctrl.estrella.push("fa-star-o");
                }
            } else {
                var number = String($ctrl.value);
//        console.log("Es un numero decimal");
                var sp = number.split(".");
                sp[0] = parseInt(sp[0], 10);
                for (var e = 0; e < sp[0]; e++) {
                    $ctrl.estrella.push("fa-star");
                }
                $ctrl.estrella.push("fa-star-half-o");
                sp[2] = 5 - sp[0] - 1;
//            console.log(sp[2]);
                for (var o = 0; o < sp[2]; o++) {
                    $ctrl.estrella.push("fa-star-o");
                }
            }
//        $ctrl.config.response = $ctrl.value;
        }
    };

}
;