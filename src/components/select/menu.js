"use strict";

var angular = require('angular');

const ngModuleName = 'cre8.select.menu';

module.exports = ngModuleName;

angular.module(ngModuleName, [

]).directive('cre8SelectMenu', SelectMenuDirective);


function SelectMenuDirective() {
    return {
        restrict: 'E',
        //require: ['^ngModel'],
        replace: true,
        transclude: true,
        template: [
            '<ul class="cre8-select-menu" ',
                //'ng-model="' + ngModel + '" ',
                'ng-transclude></ul>'
        ].join('')
    };
}