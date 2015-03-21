require('./style.scss');

var angular = require('angular');
var ngModuleName = 'cre8.button';
var ngModule = angular.module(ngModuleName, []);

module.exports = ngModuleName;

ngModule.directive('wowUiButton', Directive);


function Directive() {
    return {
        restrict: 'EA',
        replace: true,
        transclude: true,
        template: getTemplate,
        link: postLink
    };

    function isAnchor(attr) {
        return angular.isDefined(attr.href) || angular.isDefined(attr.ngHref);
    }

    function getTemplate(element, attr) {
        return isAnchor(attr) ?
            '<a class="wow-ui-button" ng-transclude></a>' :
            '<button class="wow-ui-button" ng-transclude></button>';
    }

    function postLink(scope, element, attr) {
        var node = element[0];

        // For anchor elements, we have to set tabindex manually when the
        // element is disabled
        if (isAnchor(attr) && angular.isDefined(attr.ngDisabled) ) {
            scope.$watch(attr.ngDisabled, function(isDisabled) {
                element.attr('tabindex', isDisabled ? -1 : 0);
            });
        }
    }

}