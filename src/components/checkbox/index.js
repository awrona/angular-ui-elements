require('./style.scss');

var angular = require('angular');
var ngModuleName = 'cre8.checkbox';
var ngModule = angular.module(ngModuleName, []);

module.exports = ngModuleName;

ngModule.directive('wowUiCheckbox', Directive);


function Directive() {
    var CHECKED_CSS = 'wow-ui-checked';

    return {
        restrict: 'EA',
        transclude: true,
        require: '?ngModel',
        template:
        '<div class="wow-ui-checkbox-container">' +
            '<div class="wow-ui-checkbox-icon"></div>' +
        '</div>' +
        '<div ng-transclude class="wow-ui-checkbox-label"></div>',
        compile: compile
    };

    // **********************************************************
    // Private Methods
    // **********************************************************

    function compile(tElement, tAttrs) {
        tAttrs.type = 'checkbox';
        tAttrs.tabIndex = 0;
        tElement.attr('role', tAttrs.type);

        return function postLink(scope, element, attr, ngModelCtrl) {
            ngModelCtrl = ngModelCtrl;
            var checked = false;

            if (attr.ngChecked) {
                scope.$watch(
                    scope.$eval.bind(scope, attr.ngChecked),
                    ngModelCtrl.$setViewValue.bind(ngModelCtrl)
                );
            }

            // Reuse the original input[type=checkbox] directive from Angular core.
            // This is a bit hacky as we need our own event listener and own render
            // function.
            //inputDirective.link.pre(scope, {
            //    on: angular.noop,
            //    0: {}
            //}, attr, [ngModelCtrl]);

            element.on('click', listener);

            ngModelCtrl.$render = render;

            function listener(ev) {
                if (element[0].hasAttribute('disabled')) return;

                scope.$apply(function() {
                    checked = !checked;
                    ngModelCtrl.$setViewValue(checked, ev && ev.type);
                    ngModelCtrl.$render();
                });
            }

            function render() {
                checked = ngModelCtrl.$viewValue;
                if(checked) {
                    element.addClass(CHECKED_CSS);
                } else {
                    element.removeClass(CHECKED_CSS);
                }
            }


        };

    }

}