angular.module('app.components')
        .component('multiChecks', {templateUrl: 'templates/components/multi-checks.html',
            controller: checksCtrl,
            bindings: {
                config: "="
            }
        });
function checksCtrl($scope) {
    var $ctrl = this;
    $ctrl.listType = [[], []];
    $ctrl.typeLocation = [];
    $ctrl.typeLocation = $ctrl.config.list;

    $scope.$watch('$ctrl.config.response', function (newValue, oldValue) {
            $ctrl.itemsResponse = $ctrl.config.response;
            if ($ctrl.itemsResponse.length === 0) {
                $ctrl.noneItems = true;
            } else {
                $ctrl.noneItems = false;
            }
            for (var a = 0; a < $ctrl.typeLocation.length; a++) {
                for (var n = 0; n < $ctrl.itemsResponse.length; n++) {
                    if ($ctrl.itemsResponse[n].name === $ctrl.typeLocation[a].name) {
                        $ctrl.typeLocation[a].selected = true;
                    }
                }
            }
            $ctrl.order();
    });

    $ctrl.order = function () {
        $ctrl.listType = [left = [], rigth = []];
        for (var i = 0; i < $ctrl.typeLocation.length; i++) {
            if (i < Math.round($ctrl.typeLocation.length / 2)) {
                $ctrl.listType[0].push($ctrl.typeLocation[i]);
            } else {
                $ctrl.listType[1].push($ctrl.typeLocation[i]);
            }
        }
    };
    $ctrl.order();

    $ctrl.none = function () {
        for (var a = 0; a < $ctrl.typeLocation.length; a++) {
            $ctrl.typeLocation[a].selected = false;
        }
        $ctrl.itemsResponse = [];
        $ctrl.config.response = $ctrl.itemsResponse;
        $ctrl.order();
    };
    
    $ctrl.add = function (item) {
        if (item.selected === true) {
            $ctrl.itemsResponse.push(item);
            if ($ctrl.itemsResponse.length > 0) {
                $ctrl.noneItems = false;
            }
        } else {
            for (var t = 0; t < $ctrl.itemsResponse.length; t++) {
                if (item.name === $ctrl.itemsResponse[t].name) {
                    $ctrl.itemsResponse.splice(t, 1);
                    if ($ctrl.itemsResponse.length === 0) {
                        $ctrl.noneItems = true;
                    }
                }
            }
        }
        $ctrl.config.response = $ctrl.itemsResponse;
//        console.log($ctrl.itemsResponse);
    };
}