"use strict";

var angular = require('angular');

const ngModuleName = 'cre8.select.selectedItems';

module.exports = ngModuleName;

angular.module(ngModuleName, [])
    .directive('cre8SelectedItems', SelectedItemsDirective);


function SelectedItemsDirective() {
    return {
        restrict: 'E',
        replace: true,
        require: ['^ngModel'],
        template: [
            '<ul class="cre8-selected-items">',
                '<li ng-repeat="item in getItems()">',
                    '<span ng-bind-html="getItemName(item)"></span>',
                '</li>',
            '</ul>'
        ].join('')
    };
}