angular.module('app.components', [])
        .component('dropDown', {templateUrl: 'templates/components/dropdown.html',
            controller: dropCtrl,
            bindings: {
                config: "="
            }
        });
function dropCtrl($scope, $ionicPopover) {

    $scope.$watch('$ctrl.config.response', function (newValue, oldValue) {
        if ($ctrl.config.response[0] !== undefined) {
            $ctrl.selected = $ctrl.config.response[0].name;
        }
    });

    var $ctrl = this;
    if ($ctrl.config.response.length === 0) {
        $ctrl.selected = $ctrl.config.title;
    } else {
        $ctrl.selected = $ctrl.config.list[0].name;
    }

    // .fromTemplate() method
//            var template = '<ion-popover-view><ion-header-bar> <h1 class="title">My Popover Title</h1> </ion-header-bar> <ion-content><p ng-repeat="p in [0,1,2,3]"> Hello! </p></ion-content></ion-popover-view>';
//
//            $scope.popover = $ionicPopover.fromTemplateUrl(template, {
//                scope: $scope
//            });
//
    // .fromTemplateUrl() method
    $ionicPopover.fromTemplateUrl('my-popover.html', {
        scope: $scope
    }).then(function (popover) {
        $scope.popover = popover;
    });


    $scope.openPopover = function ($event) {
        $scope.popover.show($event);
    };
    $scope.closePopover = function (item) {
        if (item === false) {
            $ctrl.selected = $ctrl.config.title;
            $ctrl.config.response.splice(0, 1);
        } else {
            $ctrl.selected = item.name;
            $ctrl.config.response.splice(0, 1);
            $ctrl.config.response.push(item);
        }
        console.log($ctrl.config.response);
        $scope.popover.hide();
    };
    //Cleanup the popover when we're done with it!
    $scope.$on('$destroy', function () {
        $scope.popover.remove();
    });
    // Execute action on hide popover
    $scope.$on('popover.hidden', function () {
        // Execute action
    });
    // Execute action on remove popover
    $scope.$on('popover.removed', function () {
        // Execute action
    });
}