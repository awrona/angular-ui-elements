"use strict";

var angular = require('angular');

const ngModuleName = 'cre8.select.option';

module.exports = ngModuleName;

angular.module(ngModuleName, [

]).directive('cre8Option', SelectOptionDirective);


function SelectOptionDirective($parse) {
    return {
        restrict: 'E',
        require: ['^?ngModel', '^cre8Select'],
        replace: true,
        transclude: true,
        template: template,
        link: function(scope) {
            scope.isSelected = false;
            scope.toggle = function(evt) {
                scope.isSelected = !scope.isSelected;
            }
        }
    };

    function template(element, attrs) {
        return [
            '<li class="cre8-select-option" ng-click="toggle($event)" ng-class="{selected: isSelected}">',
                '<input ng-checked="isSelected" ',
                    'type="checkbox" ',
                '></input>',
                '<span ng-transclude></span>',
            '</li>'
        ].join('');
    }

}